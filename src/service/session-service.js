import SessionModel from "../models/session-model.js"

export const createSession = async (userId, userAgent) => {
   console.info(`Session Service log : ${userId}`)
   const session = await SessionModel.create({
      userId, userAgent
   });

   return session.toJSON();
}


export const findSession = async (query) => {
   return SessionModel.findOne(query);
}