import express from "express";
import userController from "./controllers/UserController";
import appointmentController from "./controllers/ConsultaController";
import PatientController from "./controllers/PatientController";

const routes = express.Router();
// Users
routes.post("/user", userController.create);
routes.get("/user", userController.get);
routes.delete("/user/:id", userController.delete);
routes.patch("/user/:id", userController.update);

// Appointments
routes.post("/page-consulta", appointmentController.create);
routes.get("/page-consulta", appointmentController.get);
routes.get("/page-consulta/:id", appointmentController.getById);
routes.patch("/page-consulta/:id", appointmentController.update);
routes.delete("/page-consulta/:id", appointmentController.delete);

// Patients
routes.post("/page-paciente", PatientController.create);
routes.get("/page-paciente", PatientController.get);
routes.get("/page-paciente/:id", PatientController.getById);
routes.patch("/page-paciente/:id", PatientController.update);
routes.delete("/page-paciente/:id", PatientController.delete);

export default routes;
