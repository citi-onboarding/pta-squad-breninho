import { Request, Response } from "express";
import { Citi, Crud } from "../global";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AppointmentController implements Crud {
    constructor(private readonly citi = new Citi("Appointment")){}
    // Create a entity of Appointment
    create = async (req: Request, res: Response) => {
        // Destructuring the request body to get appointment details
        // This includes id, date, time, doctor, appointmentType, description, patientId, and patient
        const {date, time, doctor, appointmentType, description, patientId} = req.body;
        
        const isValuesUndefined = this.citi.areValuesUndefined(date, time, doctor, appointmentType, description, patientId);
        // Validation of required fields
        if (isValuesUndefined) {
            // If any field is undefined, return a 400 status with an error message
            return res.status(400).send({ message: "All fields are required." });
        }
        // Creating a new appointment object with the provided details
        const newAppointment = {date, time, doctor, appointmentType, description, patientId};
        // Inserting the new appointment into the database using the citi instance
        const {httpStatus, message} = await this.citi.insertIntoDatabase(newAppointment);
        
        return res.status(httpStatus).send({ message });
    };
    get = async (req: Request, res: Response) => {
        try {
            const values = await prisma.appointment.findMany({
            include: { patient: true } // Aqui você inclui os dados do paciente
            });

            return res.status(200).send(values);
        } catch (error) {
            console.error("Erro ao buscar consultas com paciente:", error);
            return res.status(500).send({ message: "Erro ao buscar consultas" });
        }
    }

    getById = async (req: Request, res: Response) => {
        // Fetching a specific appointment from the database using the Citi instace and through the findById function
        const { id } = req.params;
        const { httpStatus, value } = await this.citi.findById(Number(id));

        return res.status(httpStatus).send(value);
    };
    // Update appointment
    update = async (req: Request, res: Response) => {
        // 
        const { id } = req.params;
        const updatedAppointment = req.body;
        const { httpStatus, messageFromUpdate } = await this.citi.updateValue(Number(id), updatedAppointment);

        return res.status(httpStatus).send({ messageFromUpdate });
    };

    // Delete appointment
    delete = async (req: Request, res: Response) => {
        //
        const { id } = req.params;
        const { httpStatus, messageFromDelete} = await this.citi.deleteValue(Number(id));

        return res.status(httpStatus).send({ messageFromDelete });
    };
}

export default new AppointmentController();