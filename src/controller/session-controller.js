import config from "config";
import SessionModel from "../models/session-model.js";
import { createSession, findSession } from "../service/session-service.js";
import { validatePassword } from "../service/user-service.js";
import { signJwt } from "../utils/jwt-utils.js";
import logger from "../utils/logger.js";


export const createSessionHandler = async (req, res) => {
   const { email, password } = req.body
   console.info(email, password, req.body)
   const user = await validatePassword({ email, password });
   if (!user) return res.status(401).json({
      code: 401,
      status: "BAD_REQUEST",
      errors: {
         validationError: ["Invalid email or password"]
      }
   });

   console.info(`Session Controller log : ${user.id}`)
   const userId = user.id;
   const session = await createSession(userId, req.get("user-agent") || "");

   const accessToken = signJwt({ ...user, session: session.id }, {
      expiresIn: config.get("accessTokenTtl")
   });

   const refreshToken = signJwt({
      ...user,
      session
   }, {
      expiresIn: config.get("refreshTokenTtl")
   });

   return res.json({
      accessToken, refreshToken
   })

}

export const getUserSessionHandler = async (req, res) => {
   // const userId = res.locals.user.id
   console.table(res.locals)

   // const sessions = await findSession({
   //    where: {
   //       user: userId,
   //       valid: 0
   //    }
   // });

   return res.status(200)
}