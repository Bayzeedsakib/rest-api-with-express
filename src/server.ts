import config from "./Config/Index";
import app from "./app";
import { initDB } from "./db";

const main = async () => {
  initDB();
  app.listen(config.port, () => {
    console.log(`The express server is running on the port ${config.port}`);
  });
};

main();
