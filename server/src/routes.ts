import express from "express";
import userController from "./controllers/UserController";
import appointmentController from "./controllers/ConsultaController";

const routes = express.Router();

routes.post("/user", userController.create);
routes.get("/user", userController.get);
routes.delete("/user/:id", userController.delete);
routes.patch("/user/:id", userController.update);

routes.post("/page-cadastro", appointmentController.create);
routes.get("/page-atendimento", appointmentController.get);
routes.get("/page-detalhes-consulta", appointmentController.get);

export default routes;
