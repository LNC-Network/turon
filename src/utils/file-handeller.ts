import fsExtra from "fs-extra";
const { copySync, existsSync } = fsExtra;
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

/**
 * Copies a template directory to a destination path
 * @param templatePath - The relative path to the template directory
 * @param destinationPath - The absolute path where the template should be copied
 * @throws Will throw an error if the template doesn't exist or if copying fails
 */
export function copyTemplate(
  templatePath: string,
  destinationPath: string
): void {
  try {
    // Resolve the template path relative to the templates directory
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const resolvedTemplatePath = resolve(
      __dirname,
      "../../templates",
      templatePath
    );

    // Check if template exists
    if (!existsSync(resolvedTemplatePath)) {
      throw new Error(`Template not found at: ${resolvedTemplatePath}`);
    }

    // Copy template to destination
    copySync(resolvedTemplatePath, destinationPath, {
      overwrite: false,
      errorOnExist: true,
      preserveTimestamps: true,
    });

    console.log(
      chalk.green(`✓ Project files created at ${chalk.bold(destinationPath)}`)
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(chalk.red(`Failed to copy template: ${error.message}`));
    }
    throw error;
  }
}
