const validateResource = (schema) => async (req, res, next) => {
   const validated = schema.validate(req.body);

   // res.set({
   //    "Content-Type": "application/json"
   // });

   if (validated.error) {
      const errorObj = {};

      for (const e of validated.error.details) {
         errorObj[e.path[0]] = [e.message]
      }

      return res.status(400).json({
         code: 400,
         status: "OK",
         errors: errorObj
      });
   }

   next();
}

export default validateResource;