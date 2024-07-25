import { DataTypes, Model } from "sequelize";
import db from "../utils/database.js";

const sequelize = new db();

class Session extends Model { };

const SessionSchema = Session.init({
   user: {
      type: DataTypes.INTEGER
   },
   valid: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
   },
   userAgent: {
      type: DataTypes.STRING
   }
}, {
   sequelize,
   modelName: 'Session'
});

const SessionModel = SessionSchema;

export default SessionModel;