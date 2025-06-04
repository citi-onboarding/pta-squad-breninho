import { Request, Response } from "express";
import { Citi, Crud } from "../global";

class AppointmentController implements Crud {
    constructor(private readonly citi = new Citi("Appointment")){}
    // Create a entity of Appointment
    create = async (req: Request, res: Response) => {
        // Destructuring the request body to get appointment details
        // This includes id, date, time, doctor, appointmentType, description, patientId, and patient
        const {id, date, time, doctor, appointmentType, description, patientId, patient} = req.body;
        
        const isValuesUndefined = this.citi.areValuesUndefined(id, date, time, doctor, appointmentType, description, patientId, patient);
        // Validation of required fields
        if (isValuesUndefined) {
            // If any field is undefined, return a 400 status with an error message
            return res.status(400).send({ message: "All fields are required." });
        }
        // Creating a new appointment object with the provided details
        const newAppointment = {id, date, time, doctor, appointmentType, description, patientId, patient};
        // Inserting the new appointment into the database using the citi instance
        const {httpStatus, message} = await this.citi.insertIntoDatabase(newAppointment);
        
        return res.status(httpStatus).send({ message });
    };
    get = async (req: Request, res: Response) => {
        // Fetching all appointments from the database using the citi instance
        const {httpStatus, values} = await this.citi.getAll();

        return res.status(httpStatus).send(values);
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