"use client";

import React, { useState } from "react";
import Image from "next/image";
import Topbar from "@/components/top-bar";
import {
  Cat, Cow, Dog, Horse, Pig, Sheep,
  ArrowBack, downArrowIcon, alarmIcon, calendarIcon,
} from "@/assets";
import * as z from "zod";
import { useRouter } from "next/navigation";

const animalOptions = [
  { name: "Sheep", icon: Sheep },
  { name: "Cat", icon: Cat },
  { name: "Pig", icon: Pig },
  { name: "Cow", icon: Cow },
  { name: "Horse", icon: Horse },
  { name: "Dog", icon: Dog },
];

const cadastroSchema = z.object({
  nomePaciente: z.string().min(1, "Nome do paciente é obrigatório."),
  nomeTutor: z.string().min(1, "Nome do tutor é obrigatório."),
  especie: z.string().min(1, "Espécie é obrigatória."),
  idade: z.coerce.number({
    required_error: "Idade é obrigatória.",
    invalid_type_error: "Idade deve ser um número.",
  }).int("A idade deve ser um número inteiro").min(0, "Idade não pode ser negativa"),
  tipoConsulta: z.string().min(1, "Tipo de consulta é obrigatório."),
  medicoResponsavel: z.string().min(1, "Médico responsável é obrigatório."),
  data: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data deve estar no formato dd/mm/aa"),
  hora: z.string().regex(/^\d{2}:\d{2}$/, "Hora deve estar no formato hh:mm"),
  descricao: z.string(),
}).transform((data) => {
  const [day, month, year] = data.data.split("/").map(Number);
  const [hours, minutes] = data.hora.split(":").map(Number);
  const fullYear = 2000 + year;
  const dataHora = new Date(fullYear, month - 1, day, hours, minutes);
  return {
    ...data,
    idade: Number(data.idade),
    dataHora,
  };
});

const PageCadastro = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nomePaciente: "",
    nomeTutor: "",
    especie: "",
    idade: "",
    tipoConsulta: "",
    medicoResponsavel: "",
    data: "",
    hora: "",
    descricao: "",
  });

  const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEspecieClick = (especie: string) => {
    setFormData((prev) => ({ ...prev, especie }));
  };

  const registerPatient = async (patientData: {
    nomePaciente: string;
    nomeTutor: string;
    idade: string | number;
    especie: string;
  }) => {
    const response = await fetch("http://localhost:3001/page-paciente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: patientData.nomePaciente,
        tutorName: patientData.nomeTutor,
        age: Number(patientData.idade),
        species: patientData.especie.toLowerCase(), // must match enum in backend
      }),
    });
    return response.json();
  };

    // ...existing code...
  
  const registerAppointment = async (appointmentData: {
    date: string;
    time: string;
    doctor: string;
    appointmentType: string;
    description: string;
    patientId: number;
  }) => {
    const response = await fetch("http://localhost:3001/page-cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointmentData),
    });
    return response.json();
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = cadastroSchema.parse(formData);
      setFormErrors([]);
      // 1. Register patient
      const patientRes = await registerPatient(formData);
      if (!patientRes || !patientRes.message) {
        alert("Erro ao cadastrar paciente.");
        return;
      }
  
      // 2. Get patientId (you may need to adjust this depending on your backend response)
      // If your backend returns the patient object or id, use it. Otherwise, fetch the patient by name.
      let patientId = patientRes.id;
      if (!patientId) {
        // fallback: fetch all patients and find by name (not ideal, but works if unique)
        const allPatients = await fetch("http://localhost:3001/page-paciente").then(res => res.json());
        const found = allPatients.find((p: any) => p.name === formData.nomePaciente && p.tutorName === formData.nomeTutor);
        patientId = found?.id;
      }
      if (!patientId) {
        alert("Paciente cadastrado, mas não foi possível obter o ID.");
        return;
      }
  
      // 3. Register appointment
      const appointmentPayload = {
        date: result.dataHora.toISOString(), // convert Date to ISO string
        time: formData.hora,
        doctor: formData.medicoResponsavel,
        appointmentType: mapAppointmentType(formData.tipoConsulta),
        description: formData.descricao,
        patientId,
      };
      const appointmentRes = await registerAppointment(appointmentPayload);
  
      if (appointmentRes && appointmentRes.message) {
        alert("Consulta cadastrada com sucesso!");
        // Optionally, redirect or reset form here
      } else {
        alert("Erro ao cadastrar consulta.");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFormErrors(error.errors);
        console.error("Erros de validação:", error.errors);
      }
    }
  };
  
  // Helper to map frontend select to backend enum
  function mapAppointmentType(tipoConsulta: string) {
    switch (tipoConsulta) {
      case "primeiraConsulta":
        return "firstAppointment";
      case "retorno":
        return "return";
      case "checkUp":
        return "checkup";
      case "vacinacao":
        return "vaccination";
      default:
        return "firstAppointment";
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Topbar />

      <div className="py-10 w-[1532px] mx-auto">
        <div className="flex items-center gap-4 mb-8 h-[53px]">
          <button type="button" aria-label="Voltar" className="w-[32px] h-[32px]" onClick={() => router.back()}>
            <Image className="w-full h-full" src={ArrowBack} alt="Voltar" />
          </button>
          <h1 className="text-[48px] w-[231px] font-bold">Cadastro</h1>
        </div>

        <div className="w-full h-[664px] bg-white space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {formErrors.length > 0 && (
              <div className="p-4 bg-red-100 border border-red-400 rounded">
                <ul className="list-disc list-inside text-red-700">
                  {formErrors.map((err, index) => (
                    <li key={index}>{err.message}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-bold mb-3">Nome do Paciente</label>
                <input
                  className="w-full h-[50px] border border-black rounded-lg px-4 py-2"
                  type="text"
                  name="nomePaciente"
                  value={formData.nomePaciente}
                  onChange={handleChange}
                  placeholder="Digite aqui..."
                />
              </div>

              <div>
                <label className="block font-bold mb-3">Nome do Tutor</label>
                <input
                  className="w-full h-[50px] border border-black rounded-lg px-4 py-2"
                  type="text"
                  name="nomeTutor"
                  value={formData.nomeTutor}
                  onChange={handleChange}
                  placeholder="Digite aqui..."
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-3">Qual é a espécie do paciente?</label>
              <div className="flex h-[144px] gap-[60px] flex-wrap">
                {animalOptions.map((animal) => (
                  <button
                    className={`rounded-xl w-[120px] h-[120px] transition p-2 flex items-center justify-center ${
                      formData.especie === animal.name ? "bg-[#D9D9D9]" : ""
                    }`}
                    key={animal.name}
                    type="button"
                    onClick={() => handleEspecieClick(animal.name)}
                  >
                    <Image
                      className="w-[100px] h-[100px] rounded-xl"
                      src={animal.icon}
                      alt={animal.name}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-bold mb-3">Idade do Paciente</label>
                <input
                  className="w-full h-[50px] border border-black rounded-lg px-4 py-2"
                  type="text"
                  name="idade"
                  value={formData.idade}
                  onChange={handleChange}
                  placeholder="Digite aqui..."
                />
              </div>

              <div>
                <label className="block font-bold mb-3">Tipo de consulta</label>
                <div className="relative">
                  <select
                    className="w-full h-[50px] appearance-none border border-black rounded-lg px-4 py-2 pr-10"
                    name="tipoConsulta"
                    value={formData.tipoConsulta}
                    onChange={handleChange}
                  >
                    <option value="" disabled hidden style={{ color: '#D9D9D9' }}>Selecione aqui</option>
                    <option value="primeiraConsulta" style={{ color: 'black' }}>Primeira Consulta</option>
                    <option value="retorno" style={{ color: 'black' }}>Retorno</option>
                    <option value="checkUp" style={{ color: 'black' }}>Check-up</option>
                    <option value="vacinacao" style={{ color: 'black' }}>Vacinação</option>
                  </select>

                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <Image className="w-[24px] h-[24px]" src={downArrowIcon} alt="Seta para baixo" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-[696px]">
                <label className="block font-bold mb-3">Médico Responsável</label>
                <input
                  className="w-full h-[50px] border border-black rounded-lg px-4 py-2"
                  type="text"
                  name="medicoResponsavel"
                  value={formData.medicoResponsavel}
                  onChange={handleChange}
                  placeholder="Digite aqui..."
                />
              </div>

              <div className="flex flex-1 gap-6">
                <div className="flex-1">
                  <label className="block font-bold mb-3">Data do atendimento</label>
                  <div className="relative">
                    <input
                      className="w-full h-[50px] border border-black rounded-lg px-4 py-2 pr-10"
                      type="text"
                      name="data"
                      value={formData.data}
                      onChange={handleChange}
                      placeholder="dd/mm/aa"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <Image className="w-[24px] h-[24px]" src={calendarIcon} alt="Calendário" />
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <label className="block font-bold mb-3">Horário do atendimento</label>
                  <div className="relative">
                    <input
                      className="w-full h-[50px] border border-black rounded-lg px-4 py-2 pr-10"
                      type="text"
                      name="hora"
                      value={formData.hora}
                      onChange={handleChange}
                      placeholder="00:00"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <Image className="w-[24px] h-[24px]" src={alarmIcon} alt="Relógio" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block font-bold mb-3">Descrição do Problema </label>
              <textarea
                className="w-full h-[104px] border border-black rounded-lg px-4 py-2"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                placeholder="Digite aqui..."
                rows={4}
              />
            </div>

            <div className="flex justify-end py-[30px]">
              <button
                className="bg-[#50E678] w-[205px] h-[48px] text-white rounded-full shadow-md hover:bg-[#41C965] transition flex items-center justify-center"
                type="submit"
              >
                Finalizar Cadastro
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageCadastro;
