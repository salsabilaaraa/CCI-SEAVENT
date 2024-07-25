
import { Sequelize } from "sequelize";

export default function db() {
   const database = new Sequelize("auth_db", "root", "", {
      host: "localhost",
      dialect: "mysql"
   });
   return database;
}
