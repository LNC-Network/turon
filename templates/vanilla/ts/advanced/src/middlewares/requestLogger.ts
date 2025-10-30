import type http from "http";

export function requestLogger(req: http.IncomingMessage) {
  // eslint-disable-next-line no-console
  console.log(`${req.method} ${req.url}`);
}


