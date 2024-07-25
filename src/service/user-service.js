import UserModel from "../models/user-model.js";
import bcrypt from "bcrypt";
import logger from "../utils/logger.js";

export const createUser = async (input) => {
   try {
      const user = await UserModel.create(input);
      return user.toJSON();
   } catch (error) {
      throw new Error(`${error.message} : Email already use`);
   }
}

export const validatePassword = async ({ email, password }) => {
   const user = await UserModel.findOne({
      where: {
         email: email
      }
   });

   if (!user) return false;

   const isValid = await bcrypt.compare(password, user.password)

   if (!isValid) return false;

   return user.dataValues;

}