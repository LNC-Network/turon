import http from "http";
import { router } from "./routes/index.js";
import { requestLogger } from "./middlewares/requestLogger.js";

const port = Number(process.env.PORT) || 3000;

const server = http.createServer((req, res) => {
  requestLogger(req);
  router(req, res);
});

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`);
});


