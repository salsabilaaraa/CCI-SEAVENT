import { createSessionHandler, getUserSessionHandler } from "./controller/session-controller.js";
import { createUserHandler } from "./controller/user-controller.js";
import validateResource from "./middleware/validateResource.js";
import { createSessionSchema } from "./schema/session-schema.js";
import { createUserSchema } from "./schema/user-schema.js";

function routes(app) {
   app.get("/healthcheck", (req, res) => {
      res.sendStatus(200);
   });

   app.get("/register", (req, res) => {
      res.render('pages/register')
   });

   app.post("/api/users", validateResource(createUserSchema), createUserHandler);

   app.post("/api/sessions", validateResource(createSessionSchema), createSessionHandler);

}


export default routes;
