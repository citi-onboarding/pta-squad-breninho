import api from "./api";

export interface Appointment {
    id: number;
    date: string;
    time: string;
    doctor: string;
    appointmentType: string;
    description: string;
    patientId: number;
    patient: string;
}

export interface Patient {
    id: number;
    name: string;
    tutorName: string;
    age: number;
    species: string;
}

export const getAppointment = async () => {
    try {
        const response = await api.get("/page-consulta");
        console.log("Response from getAppointment:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const getAppointmentById = async (id: number) => {
    try {
        const response = await api.get(`/page-consulta/${id}`);
        console.log("Response from getAppointmentById:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching appointment by ID:", error);
        throw error;
    }
};

export const createAppointment = async (data: Omit<Appointment, ('id' | 'patient')>) => {
    try {
        const response = await api.post("/page-consulta", data);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

export async function getPatient(){
    try {
        const response = await api.get("/page-paciente");
        console.log("Response from getPatient:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching patients:", error);
        throw error;
    }
}

export async function getPatientById(id: number) {
    try {
        const response = await api.get(`/page-paciente/${id}`);
        console.log("Response from getPatientById:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching patient by ID:", error);
        throw error;
    }
}

export async function createPatient (data: Omit<Patient, "id">) {
    try {
        const response = await api.post("/page-paciente", data);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

