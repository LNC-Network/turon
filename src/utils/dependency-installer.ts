import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { execa } from "execa";
import chalk from "chalk";
import ora from "ora";

type Options = {
  variant: string; // 'typescript' | 'javascript'
  framework: string;
  testing: string | undefined;
  orm: string | undefined;
  linter: string | undefined;
};

function unique(arr: string[]) {
  return Array.from(new Set(arr));
}

export async function installDependencies(dest: string, opts: Options) {
  const deps: string[] = [];
  const devDeps: string[] = [];

  // Framework runtime deps
  if (opts.framework === "express") {
    deps.push("express");
    // Common middleware
    deps.push("cors", "dotenv");
    if (opts.variant === "javascript") {
      // nothing
    } else {
      devDeps.push("@types/express");
      devDeps.push("@types/cors");
    }
  }

  if (opts.framework === "fastify") {
    deps.push("fastify");
    // Apply dotenv as a common utility even for fastify
    deps.push("dotenv");
    if (opts.variant !== "javascript") devDeps.push("@types/fastify");
  }

  // Testing
  if (opts.testing === "jest") {
    devDeps.push("jest");
    if (opts.variant === "typescript") {
      devDeps.push("ts-jest", "@types/jest");
    }
  }

  if (opts.testing === "mocha") {
    devDeps.push("mocha");
    if (opts.variant === "typescript") devDeps.push("@types/mocha", "ts-node");
  }

  // ORM
  if (opts.orm === "prisma") {
    deps.push("@prisma/client");
    devDeps.push("prisma");
  }

  if (opts.orm === "drizzle") {
    deps.push("drizzle-orm");
  }

  // Linting
  if (opts.linter === "eslint") {
    devDeps.push("eslint");
    if (opts.variant === "typescript")
      devDeps.push(
        "@typescript-eslint/parser",
        "@typescript-eslint/eslint-plugin"
      );
  }

  if (opts.linter === "biome") {
    devDeps.push("biome");
  }

  // TypeScript general dev deps
  if (opts.variant === "typescript") {
    devDeps.push("typescript", "ts-node");
    devDeps.push("@types/node");
  }

  // Make lists unique
  const toInstall = unique(deps);
  const toInstallDev = unique(devDeps);

  try {
    if (toInstall.length > 0) {
      const spinner = ora("Installing dependencies").start();
      try {
        await execa("npm", ["install", "--save", ...toInstall], {
          cwd: dest,
        });
        spinner.succeed("Installed dependencies");
      } catch (e) {
        spinner.fail("Failed to install dependencies");
        throw e;
      }
    }

    if (toInstallDev.length > 0) {
      const spinner = ora("Installing dev dependencies").start();
      try {
        await execa("npm", ["install", "--save-dev", ...toInstallDev], {
          cwd: dest,
        });
        spinner.succeed("Installed dev dependencies");
      } catch (e) {
        spinner.fail("Failed to install dev dependencies");
        throw e;
      }
    }

    console.log(chalk.green("\n✓ All dependencies installed"));
  } catch (err) {
    console.error(chalk.red("Failed to install dependencies"));
    throw err;
  }
}

export function updatePackageJson(
  dest: string,
  pkgUpdates: Record<string, unknown>
) {
  const pkgPath = join(dest, "package.json");
  let pkg = {
    name: typeof pkgUpdates.name === "string" ? pkgUpdates.name : "my-app",
    version: "0.1.0",
    private: false,
    scripts: {
      start: "node ./dist/index.js",
    },
  } as any;

  if (existsSync(pkgPath)) {
    try {
      pkg = JSON.parse(readFileSync(pkgPath, "utf-8")) as any;
    } catch (err) {
      console.warn(
        chalk.yellow(
          "Could not parse template package.json, creating a new one"
        )
      );
    }
  }

  // Apply updates (shallow), with special handling for scripts merge
  const disallowed = new Set([
    "variant",
    "framework",
    "testing",
    "orm",
    "linter",
  ]);

  for (const key of Object.keys(pkgUpdates)) {
    if (key === "scripts" && typeof pkgUpdates[key] === "object") {
      pkg.scripts = {
        ...(pkg.scripts || {}),
        ...(pkgUpdates[key] as Record<string, string>),
      };
      continue;
    }
    if (disallowed.has(key)) continue; // do not persist non-standard fields
    pkg[key] = pkgUpdates[key];
  }

  // Ensure some sensible scripts for TS
  if (pkgUpdates["variant"] === "typescript") {
    pkg.scripts = pkg.scripts || {};
    pkg.scripts.build = pkg.scripts.build || "tsc";
    pkg.scripts.start = pkg.scripts.start || "node ./dist/index.js";
    // dev script with node --watch against built output
    pkg.scripts.dev = pkg.scripts.dev || "node --watch ./dist/index.js";
  } else {
    // JavaScript defaults
    pkg.scripts = pkg.scripts || {};
    // Try to keep existing start, else default
    pkg.scripts.start = pkg.scripts.start || "node index.js";
    pkg.scripts.dev = pkg.scripts.dev || "node --watch index.js";
  }

  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), "utf-8");
  console.log(chalk.green(`✓ package.json updated at ${pkgPath}`));
}
