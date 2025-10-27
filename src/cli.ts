#!/usr/bin/env node
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const cac = require("cac");

import { create } from "./commands/create.js";

const cli = cac("turon");

// main command
cli
  .command("create <name>", "Create a new Express.js project")
  .action(async (name: string) => {
    await create(name);
  });

// default (no args)
cli.command("", "Show help").action(() => {
  cli.outputHelp();
});

// general info
cli.usage("[command] [options]");
cli.version("0.0.1", "-v, --version", "Display version number");
cli.help();
cli.parse();
