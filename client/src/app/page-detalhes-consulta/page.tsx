import React from "react";
import Image from "next/image";
import Topbar from "@/components/top-bar";
import CardHistoricoConsulta from "@/components/card-historico-de-consulta";
import { Cat, Cow, Dog, Horse, Pig, Sheep, TreatmentIcon, ArrowBack } from "@/assets";

const historicoConsultas = [
  { date: "18/02", time: "13:00", typeOfConsultation: "Primeira Consulta", doctor: "Dr. José Carlos" },
  { date: "18/02", time: "13:00", typeOfConsultation: "Primeira Consulta", doctor: "Dr. José Carlos" },
  { date: "18/02", time: "13:00", typeOfConsultation: "Primeira Consulta", doctor: "Dr. José Carlos" },
  { date: "18/02", time: "13:00", typeOfConsultation: "Primeira Consulta", doctor: "Dr. José Carlos" },
];

const imagensAnimais = { Cat, Cow, Dog, Horse, Pig, Sheep };

const consultaExemplo = {
  animal: "Cat",
  nameAnimal: "Luna",
  age: "5 anos",
  owner: "Lucas Gomes",
  consultationDoctor: "Dr. José Carlos",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
  typeDetailedConsultation: "Vacinação",
};

const PageDetalhesConsulta = () => {
  const ImgAnimal = imagensAnimais[consultaExemplo.animal as keyof typeof imagensAnimais];

  return (
    <div className="min-h-screen bg-white">
      <Topbar />

      <div className="py-10 px-[194px]">
        {/* Página + Voltar */}
        <div className="flex items-center gap-4 mb-8">
          <button className="w-[32px] h-[32px]" type="button" aria-label="Voltar">
            <Image 
              src={ArrowBack} 
              alt="Voltar"
            />
          </button>
          <h1 className="text-[48px] font-bold">Detalhes da Consulta</h1>
        </div>

        <div className="flex gap-[40px] items-start">
          {/* Dados do Paciente */}
          <div className="flex-1">
            <h2 className="text-[24px] font-bold mb-6">Paciente</h2>

            <div className="flex gap-6 items-start mb-6">
              <Image className="w-[299px] h-[295px]"
                src={ImgAnimal}
                alt={consultaExemplo.nameAnimal}
              />
              <div className="flex flex-col justify-between py-2 h-[295px]">
                <div>
                  <h3 className="text-[24px] font-bold">{consultaExemplo.nameAnimal}</h3>
                  <p className="text-[24px]">{consultaExemplo.age}</p>
                </div>
                <div className="text-[16px]">
                  <p>{consultaExemplo.owner}</p>
                  <p>{consultaExemplo.consultationDoctor}</p>
                </div>
              </div>
            </div>

            {/* Descrição do Problema */}
            <div className="mb-6">
              <h3 className="text-[16px] font-bold mb-2">Descrição do problema:</h3>
              <p className="text-[16px] max-w-[631px]">{consultaExemplo.description}</p>
            </div>

            {/* Tipo de Consulta */}
            <div className="mb-[40px]">
              <div className="flex items-center gap-[24px] text-[16px]">
                <span className="font-bold">Tipo de consulta:</span>
                <span className="bg-[#AAE1FF] text-[#292929] px-3 py-1 rounded text-[16px]">
                  {consultaExemplo.typeDetailedConsultation}
                </span>
              </div>
            </div>

            {/* Agendamento */}
            <div className="border border-[#D9D9D9] rounded-3xl p-6 w-[624px]">
              <p className="mb-4 text-[16px] font-bold text-center">Deseja realizar outra consulta?</p>
              <button className="w-full h-[48px] rounded-[24px] bg-[#50E678] flex items-center justify-center hover:bg-[#41C965] transition shadow-[0_4px_4px_#0000001A]"
                type="button"
              >
                <Image className="w-[24px] h-[24px]"
                  src={TreatmentIcon} 
                  alt="icone"
                />
                <span className="ml-[12px] text-[16px] text-white">Agendamento</span>
              </button>
            </div>
          </div>

          {/* Coluna Direita: Histórico de Consultas */}
          <div className="w-[558px]">
            <h2 className="text-[24px] font-bold mb-6">Histórico de Consultas</h2>

            <div className="border border-dashed border-[#D9D9D9] p-6 rounded-3xl overflow-hidden">
              <div className="space-y-[24px]">
                {historicoConsultas.map((consulta, index) => (
                  <CardHistoricoConsulta
                    key={index}
                    date={consulta.date}
                    time={consulta.time}
                    typeOfConsultation={consulta.typeOfConsultation}
                    doctor={consulta.doctor}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDetalhesConsulta;