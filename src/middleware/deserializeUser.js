import { verifyJwt } from "jsonwebtoken";
import { get } from "lodash";


const deserializeUser = (req, res, next) => {
   const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

   if (!accessToken) {
      return next();
   }

   const { decoded, expired } = verifyJwt(accessToken);

   if (decoded) {
      res.locals.user = decoded;
      return next();
   }
}