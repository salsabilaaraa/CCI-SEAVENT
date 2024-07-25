import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import config from "config"
import db from "../utils/database.js";

const sequelize = new db();

class User extends Model { };

const UserSchema = User.init({
   email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
   },
   name: {
      type: DataTypes.STRING,
      allowNull: false
   },
   password: {
      type: DataTypes.STRING,
      allowNull: false
   }
}, {
   sequelize,
   modelName: 'User'
});

UserSchema.beforeSave(async (user, option) => {
   const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));
   const hashPassword = await bcrypt.hash(user.password, salt);

   user.password = hashPassword;
});

const UserModel = UserSchema;

UserModel.prototype.comparePassword = async function (email, candidatePassword) {
   const user = await UserModel.findOne({
      where: {
         email: email
      }
   })
   return await bcrypt.compare(user.password, candidatePassword);
}



export default UserModel;