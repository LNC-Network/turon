import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const src = path.resolve(__dirname, "../templates");
const dest = path.resolve(__dirname, "../dist/templates");

await fs.copy(src, dest);
console.log("Templates copied to dist/templates");
