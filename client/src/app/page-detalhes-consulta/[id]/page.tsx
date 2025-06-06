'use client'

import React, { useState, useEffect} from "react";
import Image, { StaticImageData } from "next/image";
import Topbar from "@/components/top-bar";
import CardHistoricoConsulta from "@/components/card-historico-consulta";
import ModalNovaConsulta from "@/components/modal-nova-consulta";
import { Cat, Cow, Dog, Horse, Pig, Sheep, TreatmentIcon, ArrowBack } from "@/assets";
import { useRouter } from "next/navigation";
import { Appointment, getAppointment, getAppointmentById, createAppointment, Patient, getPatient, getPatientById, createPatient } from "@/services/Appointments";


// functions by search more infos by index
interface configParams {
    params: {id: number};
};

const imagensAnimais = { Cat, Cow, Dog, Horse, Pig, Sheep };

const PageDetalhesConsulta = ({params}: configParams) => {
// Instance of App Router
const router = useRouter();

// State to control the modal visibility
const [showModal, setShowModal] = useState(false);

// State to store consultation details and patients
const [consultaCurrent, setConsultaCurrent] = useState<Appointment | null>(null);
const [patientCurrent, setPatientCurrent] = useState<Patient | null>(null);
// State to store all consultations and patients
const [consulta, setConsulta] = useState<Appointment[]>([]);
//------------

// Example data for creating a new appointment and patient
const appointmentData: Omit<Appointment, "id" | "patient"> = {
    date: "2025-06-04T14:00:00.000Z",
    time: "14:00",
    doctor: "Dr. House",
    appointmentType: "checkup",
    description: "Rotina",
    patientId: 1
}

const patientData: Omit<Patient, "id"> = {
    name: "Luna",
    tutorName: "Lucas Gomes",
    age: 5,
    species: "cat"
}
// ---------------------------


useEffect(() => {
    const fetchConsultaId = async () => {
        try {
            const data = await getAppointmentById(Number(params.id));
            setConsultaCurrent(data);
            console.log("Consulta details:", data);
        } catch (error) {
            console.error("Error fetching consultation details:", error);
        }
    };
    fetchConsultaId();
}, [params.id]);

useEffect(() => {
    if (!consultaCurrent || !consultaCurrent.patientId) return;
    const fetchPacienteId = async () => {
        try {
            const data = await getPatientById(Number(consultaCurrent.patientId));
            setPatientCurrent(data);
            console.log("Consulta details:", data);
        } catch (error) {
            console.error("Error fetching consultation details:", error);
        }
    };
    fetchPacienteId();
}, [consultaCurrent]);

useEffect(() => {
    const fetchConsulta = async () => {
        try {
            const data = await getAppointment();
            setConsulta(data);
            console.log("Consulta details:", data);
        } catch (error) {
            console.error("Error fetching consultation details:", error);
        }
    };
    fetchConsulta();
}, [params.id]);


const attemptions = consulta.filter(consulta => consulta.patientId === patientCurrent?.id);

const traduzirEspecie = (especie: string): string => {
    switch (especie) {
        case "cat": return "Cat";
        case "dog": return "Dog";
        case "pig": return "Pig";
        case "cow": return "Cow";
        case "horse": return "Horse";
        case "sheep": return "Sheep";
        default: return "";
    }
}

const ImgAnimal = patientCurrent 
? imagensAnimais[traduzirEspecie(patientCurrent.species) as keyof typeof imagensAnimais]
:imagensAnimais["Cat" as keyof typeof imagensAnimais];

const formatarDataExibicao = (data: string) => {
    const d = new Date(data);
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
}; 

    return (

            <div className="min-h-screen bg-white">
                <Topbar />

                <div className="py-10 px-[194px]">
                    {/* Página + Voltar */}
                    <div className="flex items-center gap-4 mb-8">
                        <button
                            className="w-8 h-8 flex items-center justify-center"
                            type="button"
                            aria-label="Voltar"
                            onClick={() => router.back()}
                        >
                            <Image src={ArrowBack} alt="Voltar" />
                        </button>
                        <h1 className="text-[40px] font-bold leading-none">Detalhes da Consulta</h1>
                    </div>

                    <div className="flex gap-[40px] items-start">
                        {/* Dados do Paciente */}
                        <div className="flex-1">
                            <h2 className="text-[24px] font-bold mb-6">Paciente</h2>

                            <div className="flex gap-6 items-start mb-6">
                                <Image
                                    className="w-[299px] h-[295px] rounded-2xl object-cover"
                                    src={ImgAnimal}
                                    alt={consultaCurrent?.patient || "Carregando..."}
                                />
                                <div className="flex flex-col justify-between py-2 h-[295px]">
                                    <div>
                                        <h3 className="text-[24px] font-bold">
                                            {patientCurrent?.name || "Carregando..."}
                                        </h3>
                                        <p className="text-[24px]">
                                            {patientCurrent?.age ? `${patientCurrent.age} anos` : "Carregando..."}
                                        </p>
                                    </div>

                                    <div className="text-[16px]">
                                        <p>{patientCurrent?.tutorName || "Carregando..."}</p>
                                        <p>{consultaCurrent?.doctor || "Carregando..."}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Descrição do Problema */}
                            <div className="mb-6">
                                <h3 className="text-[16px] font-bold mb-2">Descrição do problema:</h3>
                                <p className="text-[16px] max-w-[631px]">
                                    {consultaCurrent?.description || "Carregando..."}
                                </p>
                            </div>

                            {/* Tipo de Consulta */}
                            <div className="mb-[40px]">
                                <div className="flex items-center gap-[24px] text-[16px]">
                                    <span className="font-bold">Tipo de consulta:</span>
                                    <span className="flex flex-row justify-center items-center w-[101px] h-[30px] bg-[#AAE1FF] text-[#292929] px-3 py-1 rounded text-[16px]">
                                        {consultaCurrent?.appointmentType || "Carregando..."}
                                    </span>
                                </div>
                            </div>

                            {/* Agendamento */}
                            <div className="border border-[#D9D9D9] rounded-3xl p-6 w-[624px] shadow-sm">
                                <p className="mb-4 text-[16px] font-bold text-center">
                                    Deseja realizar outra consulta?
                                </p>
                                <button
                                    className="w-full h-[48px] rounded-[24px] bg-[#50E678] flex items-center justify-center hover:bg-[#41C965] transition shadow-md"
                                    type="button"
                                    onClick={() => setShowModal(true)}
                                >
                                    <Image className="w-[24px] h-[24px]" src={TreatmentIcon} alt="icone" />
                                    <span className="ml-[12px] text-[16px] text-white">Agendamento</span>
                                </button>
                            </div>
                        </div>

                        {/* Coluna Direita: Histórico de Consultas */}
                        <div className="w-[558px]">
                            <h2 className="text-[24px] font-bold mb-6">Histórico de Consultas</h2>

                            <div className="border border-dashed border-[#D9D9D9] p-6 rounded-3xl overflow-hidden shadow-sm">
                                <div className="space-y-[24px]">
                                    {attemptions.map((consulta: Appointment) => (
                                        <CardHistoricoConsulta
                                            key={consulta.id}
                                            date={formatarDataExibicao(consulta.date)}
                                            time={consulta.time}
                                            typeOfConsultation={consulta.appointmentType}
                                            doctor={consulta.doctor}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {showModal && patientCurrent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <ModalNovaConsulta
                            onClose={() => setShowModal(false)}
                            onSubmit={async (dados) => {
                                await createAppointment({
                                    ...dados,
                                    patientId: patientCurrent.id
                                });
                                setShowModal(false);
                                // Atualize a lista de consultas se necessário
                            }}
                        />
                    </div>
                )}
            </div>
    );
};

export default PageDetalhesConsulta;