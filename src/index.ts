import { server } from "./server/server";

const port = 3334;

server.listen(port, () => {
  console.log("Running...");
});
