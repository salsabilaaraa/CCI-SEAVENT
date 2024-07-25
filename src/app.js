import express from "express";
import config from "config";
import connect from "./utils/connect.js";
import logger from "./utils/logger.js";
import routes from "./routes.js";


const port = config.get("port");

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './src/views');



app.listen(port, async () => {
   logger.info(`App is running at port ${port}`);

   await connect();

   app.use(express.json());
   routes(app);
});
