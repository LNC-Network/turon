#!/usr/bin/env node

// Node.js built-ins
import { createRequire } from "module";

// Third-party packages
import chalk from "chalk";

// Local imports
import { create } from "./commands/create.js";

// Setup dynamic require
const require = createRequire(import.meta.url);

// Package imports
const cac = require("cac");
const pkg = require("../package.json");

// CLI initialization
const cli = cac("turon");

// Configure CLI commands
cli
  .command("create [name]", "Create a new Express.js project")
  .option("-n, --name <name>", "Project name")
  .option(
    "-t, --template <template>",
    "Template: minimal | standard | advanced",
    {
      default: "standard",
    }
  )
  .action(
    async (
      name: string | undefined,
      options: { name?: string; template?: string }
    ) => {
      const resolvedName = options?.name ?? name;
      await create(resolvedName, { template: options?.template });
    }
  );

// Configure default command (no args)
cli.command("", "Show version and available commands").action(() => {
  console.log(chalk.bold(`\n🚀 Turon v${pkg.version}`));
  console.log(chalk.dim("Create modern Express backends, fast."));
  console.log("");
  cli.help();
});

// Configure CLI options and metadata
cli.usage("[command] [options]");
cli.version(pkg.version, "-v, --version", "Display version number");

// Display help and parse arguments
cli.help();
cli.parse();
