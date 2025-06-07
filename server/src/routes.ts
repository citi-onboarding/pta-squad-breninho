import express from "express";
import userController from "./controllers/UserController";
import appointmentController from "./controllers/ConsultaController";
import PatientController from "./controllers/PatientController";
import MobileAppointmentController from "./controllers/ConsultaControllerMobile";

const routes = express.Router();

routes.post("/user", userController.create);
routes.get("/user", userController.get);
routes.delete("/user/:id", userController.delete);
routes.patch("/user/:id", userController.update);

routes.post("/page-cadastro", appointmentController.create);

routes.get("/page-atendimento", appointmentController.get);
routes.post("/page-atendimento", appointmentController.create); // VOU ALTERAR NA HORA DE CONFIGURAR O MODAL DE NOVA CONSULTA (MATHEUS)

routes.post("/page-detalhes-consulta", appointmentController.getById);
routes.get("/page-detalhes-consulta", appointmentController.get);
routes.get("/page-detalhes-consulta/:id", appointmentController.getById);
routes.patch("/page-detalhes-consulta/:id", appointmentController.update);
routes.delete("/page-detalhes-consulta/:id", appointmentController.delete);

routes.post("/page-paciente", PatientController.create);
routes.get("/page-paciente", PatientController.get);
routes.get("/page-paciente/:id", PatientController.getById);
routes.patch("/page-paciente/:id", PatientController.update);
routes.delete("/page-paciente/:id", PatientController.delete);

routes.get("/mobile/agenda", MobileAppointmentController.getNextByPeriod);

export default routes;
