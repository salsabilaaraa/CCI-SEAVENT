import Joi from "joi";

export const createUserSchema = Joi.object({
   name: Joi.string()
      .required()
      .max(10),
   password: Joi.string()
      .required()
      .label('Password'),
   passwordConfirmation: Joi.string().required().valid(Joi.ref('password')).options({
      messages: {
         any: {
            allowOnly: '!!Passwords do not match',
         }
      }
   }),
   email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

// export const createUserSchema = object({
//    body: object({
//       name: string({
//          required_error: "Name is required",
//          invalid_type_error: "Name must be a string"
//       }).min(5),
//       password: string({
//          required_error: 'Password is required'
//       }).min(5, "Password too short - should be 6 chars minimum"),
//       passwordConfirmation: string({
//          required_error: 'Confirm Password is required'
//       }),
//       email: string({
//          required_error: 'Name is required'
//       }).email("Not a valid email")
//    }).refine((data) => data.password === data.passwordConfirmation, {
//       message: "Password not match",
//       path: ["passwordConfirmation"]
//    })
// });


