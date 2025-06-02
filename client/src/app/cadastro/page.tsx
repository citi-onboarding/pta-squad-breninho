"use client";

import React, { useState } from "react";
import Image from "next/image";
import Topbar from "@/components/top-bar";
import { Cat, Cow, Dog, Horse, Pig, Sheep, ArrowBack, downArrowIcon, alarmIcon, calendarIcon } from "@/assets";

const animalOptions = [
  { name: "Sheep", icon: Sheep },
  { name: "Cat", icon: Cat },
  { name: "Pig", icon: Pig },
  { name: "Cow", icon: Cow },
  { name: "Horse", icon: Horse },
  { name: "Dog", icon: Dog },
];

const PageCadastro = () => {
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEspecieClick = (especie: string) => {
    setFormData((prev) => ({ ...prev, especie }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
  };

  return (
    <div className="min-h-screen bg-white">
      <Topbar />

      <div className="py-10 w-[1532px] mx-auto">

        <div className="flex items-center gap-4 mb-8 h-[53px]">
          <button type="button" aria-label="Voltar" className="w-[32px] h-[32px]">
            <Image className="w-full h-full"
              src={ArrowBack}
              alt="Voltar"
            />
          </button>
          <h1 className="text-[48px] w-[231px] font-bold">Cadastro</h1>
        </div>

        <div className="w-full h-[664px] bg-white space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-2 gap-6">

              {/* Nome do Paciente */}
              <div>
                <label className="block font-bold mb-3">Nome do Paciente</label>
                <input className="w-full h-[50px] border border-black rounded-lg px-4 py-2"
                  type="text"
                  name="nomePaciente"
                  value={formData.nomePaciente}
                  onChange={handleChange}
                  placeholder="Digite aqui..."
                />
              </div>

              {/* Nome do Tutor */}
              <div>
                <label className="block font-bold mb-3">Nome do Tutor</label>
                <input className="w-full h-[50px] border border-black rounded-lg px-4 py-2"
                  type="text"
                  name="nomeTutor"
                  value={formData.nomeTutor}
                  onChange={handleChange}
                  placeholder="Digite aqui..."
                />
              </div>
            </div>

            {/* Qual é a espécie do paciente? */}
            <div>
              <label className="block font-bold mb-3">Qual é a espécie do paciente?</label>
              <div className="flex h-[144px] gap-[60px] flex-wrap">
                {animalOptions.map((animal) => (
                  <button className={`rounded-xl w-[120px] h-[120px] transition p-2 flex items-center justify-center ${
                    formData.especie === animal.name ? "bg-[#D9D9D9]" : ""
                  }`}

                    key={animal.name}
                    type="button"
                    onClick={() => handleEspecieClick(animal.name)}
                  >
                    <Image className="w-[100px] h-[100px] rounded-xl"
                      src={animal.icon}
                      alt={animal.name}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">

              {/* Idade do Paciente */}
              <div>
                <label className="block font-bold mb-3">Idade do Paciente</label>
                <input className="w-full h-[50px] border border-black rounded-lg px-4 py-2"
                  type="text"
                  name="idade"
                  value={formData.idade}
                  onChange={handleChange}
                  placeholder="Digite aqui..."
                />
              </div>

              {/* Tipo de consulta */}
              <div>
                <label className="block font-bold mb-3">Tipo de consulta</label>
                <div className="relative">
                  <select className={`w-full h-[50px] appearance-none border border-black rounded-lg px-4 py-2 pr-10 ${
                    formData.tipoConsulta === "" ? "text-[#D9D9D9]" : "text-black"
                  }`}

                    name="tipoConsulta"
                    value={formData.tipoConsulta}
                    onChange={handleChange}
                  >
                    <option value="" disabled hidden>Selecione aqui</option>
                    <option value="squad">SQUAD</option>
                    <option value="breno">BRENO</option>
                    <option value="melhor">É O MELHOR</option>
                    <option value="doPTA">DO PTA</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <Image className="w-[24px] h-[24px]"
                      src={downArrowIcon}
                      alt="Seta para baixo"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-6">

              {/* Médico Responsável */}
              <div className="w-[696px]">
                <label className="block font-bold mb-3">Médico Responsável</label>
                <input className="w-full h-[50px] border border-black rounded-lg px-4 py-2"
                  type="text"
                  name="medicoResponsavel"
                  value={formData.medicoResponsavel}
                  onChange={handleChange}
                  placeholder="Digite aqui..."
                />
              </div>

              <div className="flex flex-1 gap-6">

                {/* Data do atendimento */}
                <div className="flex-1">
                  <label className="block font-bold mb-3">Data do atendimento</label>
                  <div className="relative">
                    <input className="w-full h-[50px] border border-black rounded-lg px-4 py-2 pr-10"
                      type="text"
                      name="data"
                      value={formData.data}
                      onChange={handleChange}
                      placeholder="dd/mm/aa"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <Image className="w-[24px] h-[24px]"
                        src={calendarIcon}
                        alt="Calendário"
                      />
                    </div>
                  </div>
                </div>

                {/* Horário do atendimento */}
                <div className="flex-1">
                  <label className="block font-bold mb-3">Horário do atendimento</label>
                  <div className="relative">
                    <input className="w-full h-[50px] border border-black rounded-lg px-4 py-2 pr-10"
                      type="text"
                      name="hora"
                      value={formData.hora}
                      onChange={handleChange}
                      placeholder="00:00"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <Image className="w-[24px] h-[24px]"
                        src={alarmIcon}
                        alt="Relógio"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Descrição do Problema */}
            <div>
              <label className="block font-bold mb-3">Descrição do Problema </label>
              <textarea className="w-full h-[104px] border border-black rounded-lg px-4 py-2"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                placeholder="Digite aqui..."
                rows={4}
              />
            </div>

            <div className="flex justify-end py-[30px]">
              <button className="bg-[#50E678] w-[205px] h-[48px] text-white rounded-full shadow-md hover:bg-[#41C965] transition flex items-center justify-center"
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