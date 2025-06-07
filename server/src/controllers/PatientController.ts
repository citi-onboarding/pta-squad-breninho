import { Request, Response } from "express";
import { Citi, Crud } from "../global";


class PatientController implements Crud {
  constructor(private readonly citi = new Citi("Patient")) {}

  // Create a new patient
  create = async (req: Request, res: Response) => {
    const { name, tutorName, age, species } = req.body;

    const validSpecies = ["cat", "dog", "pig", "horse", "sheep", "cow"];
    if (!validSpecies.includes(species)) {
      return res.status(400).send({ message: "Espécie inválida." });
}
    const isAnyUndefined = this.citi.areValuesUndefined(
      name,
      tutorName,
      age,
      species
      //appointments --> Comentado, nao eh necessario
    );
    if (isAnyUndefined) {
      return res.status(400).send({ message: "All fields are required." });
    }

    const newPatient = { name, tutorName, age, species };
    const { httpStatus, message } = await this.citi.insertIntoDatabase(newPatient);

    return res.status(httpStatus).send({ message });
  };

  // Get all patients
  get = async (req: Request, res: Response) => {
    const { httpStatus, values } = await this.citi.getAll();
    return res.status(httpStatus).send(values);
  };

  // Get patient by ID
  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { httpStatus, value } = await this.citi.findById(Number(id));
    return res.status(httpStatus).send(value);
  };

  // Update patient
  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedPatient = req.body;
    const { httpStatus, messageFromUpdate } = await this.citi.updateValue(Number(id), updatedPatient);
    return res.status(httpStatus).send({ messageFromUpdate });
  };

  // Delete patient
  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { httpStatus, messageFromDelete } = await this.citi.deleteValue(Number(id));
    return res.status(httpStatus).send({ messageFromDelete });
  };
}

export default new PatientController();