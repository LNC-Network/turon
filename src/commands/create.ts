import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { execa } from "execa";
import chalk from "chalk";
import prompts from "prompts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function create(projectName: string) {
  const cwd = process.cwd();
  const targetDir = path.join(cwd, projectName);

  if (await fs.pathExists(targetDir)) {
    console.log(chalk.red(`Directory "${projectName}" already exists.`));
    const { overwrite } = await prompts({
      type: "confirm",
      name: "overwrite",
      message: "Do you want to overwrite it?",
      initial: false,
    });
    if (!overwrite) process.exit(1);
    await fs.remove(targetDir);
  }

  // ✅ ESM-safe path resolution
  const templateDir = path.resolve(__dirname, "../../templates/express");
  await fs.copy(templateDir, targetDir);

  console.log(chalk.green(`✔ Project created at ${targetDir}`));

  console.log(chalk.yellow("\nInstalling dependencies...\n"));
  await execa("npm", ["install"], { cwd: targetDir, stdio: "inherit" });

  console.log(chalk.green("\n✅ Setup complete!"));
  console.log(chalk.cyan(`\nNext steps:`));
  console.log(`  cd ${projectName}`);
  console.log(`  npm run dev`);
}
