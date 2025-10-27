#!/usr/bin/env node
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const cac = require("cac"); 

import { create } from "./commands/create.js";

const cli = cac("turon");

cli
  .command("create <name>", "Create a new Express.js project")
  .action(async (name: string) => {
    await create(name);
  });

cli.help();
cli.parse();
