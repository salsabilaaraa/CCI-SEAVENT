import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get("privateKey");
const publicKey = config.get("publicKey");

export function signJwt(object, options) {

   return jwt.sign(object, privateKey, options);
}

export function verifyJwt(token) {
   try {
      const decoded = jwt.verify(token, publicKey);

      return {
         valid: true,
         expired: false,
         decoded: decoded
      }
   } catch (error) {
      return {
         valid: false,
         expired: error.message === "jwt expired",
         decoded: null
      }
   }
}