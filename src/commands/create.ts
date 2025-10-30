// Import the picker with explicit .js extension so the compiled ESM output
// resolves correctly at runtime (Node's ESM loader requires .js extensions).
import { runPicker } from "./picker.js";
import { copyTemplate } from "../utils/file-handeller.js";
import {
  installDependencies,
  updatePackageJson,
} from "../utils/dependency-installer.js";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import fsExtra from "fs-extra";
const { copySync, existsSync } = fsExtra;
import chalk from "chalk";
import ora from "ora";
import { createInterface } from "readline/promises";
import { stdin as input, stdout as output } from "process";

type CreateOptions = { template?: string | undefined };

export async function create(projectName?: string, options?: CreateOptions) {
  try {
    const config = await runPicker(projectName);

    // Resolve fields from picker response (picker may use different casing)
    let chosenName = (config as any).projectName || projectName;
    if (!chosenName) {
      const rl = createInterface({ input, output });
      const answer = (
        await rl.question("Project name (default: my-app): ")
      ).trim();
      rl.close();
      chosenName = answer || "my-app";
    }
    const framework = (config as any).Framework as string;
    const variant = (config as any).Variant as string; // 'typescript' | 'javascript'
    const testing = ((config as any).Testing as string | undefined) || "none";
    // Map picker boolean to linter name; keep undefined when not selected
    const linter = ((): string | undefined => {
      const useLinter = (config as any).useLinter as boolean | undefined;
      if (typeof useLinter === "boolean")
        return useLinter ? "eslint" : undefined;
      const pickLinter = (config as any).Linter as string | undefined;
      return pickLinter;
    })();
    const orm = "none"; // ORM removed from picker for now

    console.log(chalk.bold(`\n> Creating ${chosenName}`));
    console.log(
      chalk.gray(
        `  • Framework: ${framework}  • Variant: ${variant}  • Template: ${(options?.template || "standard").toLowerCase()}  • Test: ${testing || "none"}  • Linter: ${linter || "none"}`
      )
    );

    // Determine template path. templates are organized as templates/<framework>/<ts|js>/<template>
    const variantDir = variant === "typescript" ? "ts" : "js";
    const templateChoice = (options?.template || "standard").toLowerCase();
    const allowedTemplates = ["minimal", "standard", "advanced"] as const;
    const resolvedTemplate = (allowedTemplates as readonly string[]).includes(
      templateChoice
    )
      ? templateChoice
      : "standard";
    const templatePath = `${framework}/${variantDir}/${resolvedTemplate}`;

    const destination = resolve(process.cwd(), chosenName);

    // Copy template files
    const copySpinner = ora("Generating files").start();
    try {
      copyTemplate(templatePath, destination);
      copySpinner.succeed("Generated files");
    } catch (e) {
      copySpinner.fail("Failed to scaffold files");
      throw e;
    }

    // Optionally copy root-level config files (eslint, jest)
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const rootTemplates = resolve(__dirname, "../../templates");

    if (linter === "eslint") {
      const srcEslint = resolve(rootTemplates, "eslint.config.js");
      const destEslint = resolve(destination, "eslint.config.js");
      if (existsSync(srcEslint) && !existsSync(destEslint)) {
        copySync(srcEslint, destEslint, {
          overwrite: false,
          errorOnExist: true,
        });
      }
    }

    if (testing === "jest") {
      const srcJest = resolve(rootTemplates, "jest.config.js");
      const destJest = resolve(destination, "jest.config.js");
      if (existsSync(srcJest) && !existsSync(destJest)) {
        copySync(srcJest, destJest, { overwrite: false, errorOnExist: true });
      }
    }

    // Update (or create) package.json in the new project
    const scripts: Record<string, string> = {};
    if (testing === "jest") scripts["test"] = scripts["test"] || "jest";
    if (linter === "eslint") scripts["lint"] = scripts["lint"] || "eslint .";

    const pkgSpinner = ora("Configuring package.json").start();
    try {
      updatePackageJson(destination, {
        name: chosenName,
        variant,
        framework,
        ...(Object.keys(scripts).length ? { scripts } : {}),
      });
      pkgSpinner.succeed("Configured package.json");
    } catch (e) {
      pkgSpinner.fail("Failed to configure package.json");
      throw e;
    }

    // Install dependencies according to choices
    await installDependencies(destination, {
      variant,
      framework,
      testing,
      orm,
      linter,
    });

    console.log(chalk.green(`\n✔ Project ready at ${destination}`));
    console.log(chalk.gray("\nNext steps:"));
    console.log(`  cd ${chosenName}`);
    if (variant === "typescript") console.log("  npm run build");
    console.log("  npm run dev");
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(
      chalk.red("\n✖ Failed to create project:"),
      chalk.dim(message)
    );
    process.exitCode = 1;
  }
}
