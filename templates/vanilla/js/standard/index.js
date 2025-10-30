import http from "http";
import { router } from "./src/routes/index.js";

const port = Number(process.env.PORT) || 3000;

const server = http.createServer((req, res) => {
  if (!req.url || !req.method) {
    res.writeHead(400);
    res.end();
    return;
  }
  router(req, res);
});

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});


