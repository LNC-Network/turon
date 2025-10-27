# turon
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/LNC-Network/turon)

`turon` is a fast command-line tool designed to scaffold and configure Express.js backend projects. It sets up a new project with a modern TypeScript environment, allowing you to start building your API immediately.

## Features

*   **Quick Scaffolding:** Create a new Express.js project with a single command.
*   **TypeScript Ready:** Comes pre-configured with a modern TypeScript setup.
*   **Automatic Dependency Installation:** Installs all necessary project dependencies automatically.
*   **Interactive CLI:** Prompts for user confirmation before overwriting existing directories.

## Installation

There is no need to install `turon` globally. You can use it directly with `npx`, which ensures you are always using the latest version.

## Usage

To create a new Express.js project, run the `create` command followed by your desired project name:

```bash
npx turon create <your-project-name>
```

For example, to create a project named `my-express-api`:

```bash
npx turon create my-express-api
```

The tool will create a new directory named `my-express-api`, copy the template files, and install the dependencies.

### Getting Started

Once the setup is complete, you can start your development server with the following commands:

```bash
cd <your-project-name>
npm run dev
```

Your server will be running at `http://localhost:3000`.

## Generated Project Structure

`turon` generates a clean and simple project structure to get you started:

```
<your-project-name>/
├── src/
│   └── index.ts      # Main application entry point
├── package.json      # Project dependencies and scripts
└── tsconfig.json     # TypeScript configuration
```

## Contributing

Contributions are welcome! Please review the [Code of Conduct](./CODE_OF_CONDUCT.md) before participating.

## License

This project is licensed under the MIT License. See the [LICENSE.MD](./LICENSE.MD) file for details.