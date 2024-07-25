import db from "./database.js";
import logger from "./logger.js";

const connect = async function () {
   const connect = new db();

   try {
      await connect.authenticate();
      logger.info("Database Connected");
      return connect
   } catch (error) {
      logger.error(error);
      process.exit(1);
   }
}


export default connect