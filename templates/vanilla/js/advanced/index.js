import http from "http";
import { router } from "./src/routes/index.js";
import { requestLogger } from "./src/middlewares/requestLogger.js";

const port = Number(process.env.PORT) || 3000;

const server = http.createServer((req, res) => {
  requestLogger(req);
  router(req, res);
});

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});


