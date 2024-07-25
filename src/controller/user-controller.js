import { createUser } from "../service/user-service.js";

export const createUserHandler = async (req, res) => {

   try {
      const user = await createUser(req.body);

      res.set({
         "Content-Type": "application/json"
      });

      return res.status(200).json({
         code: 200,
         status: "OK",
         data: {
            name: user.name,
            email: user.email,
            password: user.password
         }
      });
   } catch (error) {
      return res.status(409).json({
         code: 409,
         status: "BAD_REQUEST",
         errors: {
            validationError: [error.message]
         }
      });
   }
}

