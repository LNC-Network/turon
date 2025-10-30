import prompts, { type PromptObject } from "prompts";
import chalk from "chalk";

export async function runPicker(name?: string) {
  const questions: PromptObject[] = [];

  if (!name) {
    questions.push({
      type: "text",
      name: "projectName",
      message: chalk.green("Project name:"),
      initial: "my-app",
      validate: (v) =>
        v.trim().length > 0 ? true : "Project name cannot be empty.",
    });
  }

  questions.push(
    {
      type: "select",
      name: "Framework",
      message: chalk.green("Select a framework:"),
      choices: [
        { title: chalk.green("Express"), value: "express" },
        { title: chalk.gray("Vanilla (no framework)"), value: "vanilla" },
      ],
      initial: 0,
    },
    {
      type: "select",
      name: "Variant",
      message: chalk.green("Select a variant:"),
      choices: [
        { title: chalk.yellow("TypeScript"), value: "typescript" },
        { title: chalk.cyan("JavaScript"), value: "javascript" },
      ],
      initial: 0,
    },
    {
      type: "select",
      name: "Testing",
      message: chalk.green("Select a testing framework:"),
      choices: [
        { title: chalk.magenta("Jest"), value: "jest" },
        { title: chalk.magenta("None"), value: "none" },
      ],
      initial: 0,
    },
    {
      type: "toggle",
      name: "useLinter",
      message: chalk.green("Enable ESLint?"),
      initial: true,
      active: "yes",
      inactive: "no",
    },
  );

  const response = await prompts(questions, {
    onCancel: () => {
      console.log(chalk.red("\n✖ Operation cancelled."));
      process.exit(1);
    },
  });

  // Keep the CLI quiet and polished; detailed summary is shown during creation

  return response;
}

// Note: we do NOT call runPicker() here so importing this module doesn't
// trigger interactive prompts. Consumers should call runPicker(...) when
// they want to prompt the user (for example, from `create`).
