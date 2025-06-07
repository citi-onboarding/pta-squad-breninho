'use client'

import Image from "next/image";
import TopBar from "@/components/top-bar";
import CardConsulta from "@/components/card-consulta";
import { Button } from "@/components/ui/button";
import { ArrowBack, PlusCircled, CalendarMonth } from "@/assets";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

interface interfProps {
  id: number;
  date: string;
  time: string;
  nameOwner: string;
  namePet: string;
  nameDoctor: string;
  imageAnimal: string;
  status: "Primeira Consulta" | "Check-up" | "Retorno" | "Vacinação" | "";
  isHistorico?: boolean;
}

const traduzirStatus = (tipo: string): interfProps["status"] => {
  switch (tipo) {
    case "firstAppointment": return "Primeira Consulta";
    case "checkup": return "Check-up";
    case "vaccination": return "Vacinação";
    case "return": return "Retorno";
    default: return "";
  }
};

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
};

const formatarDataExibicao = (data: string) => {
  const d = new Date(data);
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
};

const formatarDataComparacao = (data: Date) => {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
};

const PageAtendimento = () => {
  const [cardsConsultas, setCardsConsultas] = useState<interfProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modoExibicao, setModoExibicao] = useState<"agendamento" | "historico">("agendamento");
  const [inputNomeMedico, setInputNomeMedico] = useState<string>("");
  const [filtroNomeMedico, setFiltroNomeMedico] = useState<string>("");
  const [filtroDataInicio, setFiltroDataInicio] = useState<string>("");
  const [filtroDataFim, setFiltroDataFim] = useState<string>("");

  const inputInicioRef = useRef<HTMLInputElement>(null);
  const inputFimRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const response = await axios.get('http://localhost:3001/page-consulta');
        const data = response.data;
        const agora = new Date();

        const consultasFormatadas: interfProps[] = data.map((consulta: any) => {
          const localDate = new Date(consulta.date);
          const [hora, minuto] = consulta.time.split(':').map(Number);
          const dataHora = new Date(
            localDate.getFullYear(),
            localDate.getMonth(),
            localDate.getDate(),
            hora,
            minuto
          );

          const isHistorico = dataHora < agora;

          return {
            id: consulta.id,
            date: consulta.date,
            time: consulta.time,
            nameOwner: consulta.patient?.tutorName || "Desconhecido",
            namePet: consulta.patient?.name || "Desconhecido",
            nameDoctor: consulta.doctor,
            imageAnimal: traduzirEspecie(consulta.patient?.species || ""),
            status: traduzirStatus(consulta.appointmentType || ""),
            isHistorico
          };
        });

        setCardsConsultas(consultasFormatadas);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar consultas:", error);
        setLoading(false);
      }
    };

    fetchConsultas();
  }, []);

  const aplicarFiltroNome = () => {
    setFiltroNomeMedico(inputNomeMedico);
  };

  const filtrarModo = (consultas: interfProps[]) => {
    const agora = new Date();

    let filtradas = consultas.filter((consulta) => {
      const localDate = new Date(consulta.date);
      const [hora, minuto] = consulta.time.split(':').map(Number);
      const dataHoraConsulta = new Date(
        localDate.getFullYear(),
        localDate.getMonth(),
        localDate.getDate(),
        hora,
        minuto
      );

      const isHistorico = dataHoraConsulta < agora;
      const dentroDoModo = modoExibicao === "historico" ? isHistorico : !isHistorico;

      const nomeMedicoValido =
        filtroNomeMedico.trim() === "" ||
        consulta.nameDoctor.toLowerCase().includes(filtroNomeMedico.toLowerCase());

      const dataStr = formatarDataComparacao(localDate);

      let dentroDoIntervalo = true;
      if (filtroDataInicio) dentroDoIntervalo &&= dataStr >= filtroDataInicio;
      if (filtroDataFim) dentroDoIntervalo &&= dataStr <= filtroDataFim;

      return dentroDoModo && nomeMedicoValido && dentroDoIntervalo;
    });

    const toDateTime = (item: interfProps) => {
      const dateObj = new Date(item.date);
      const [hour, minute] = item.time.split(':').map(Number);
      return new Date(
        dateObj.getFullYear(),
        dateObj.getMonth(),
        dateObj.getDate(),
        hour,
        minute
      );
    };

    filtradas.sort((a, b) => {
      const dateA = toDateTime(a);
      const dateB = toDateTime(b);
      return modoExibicao === "historico"
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });

    return filtradas.slice(0, 6);
  };

  const renderCards = (objCards: interfProps[]) =>
    objCards.map((consulta: interfProps) => (
      <CardConsulta
        key={consulta.id}
        date={formatarDataExibicao(consulta.date)}
        time={consulta.time}
        nameOwner={consulta.nameOwner}
        namePet={consulta.namePet}
        nameDoctor={consulta.nameDoctor}
        imageAnimal={consulta.imageAnimal}
        status={consulta.status}
        isHistorico={consulta.isHistorico}
        onClick={() => router.push(`/page-detalhes-consulta/${consulta.id}`)}
      />
    ));

  const cardsFiltrados = filtrarModo(cardsConsultas);

  const consultRows = cardsFiltrados.map((_, index) => {
    if ((index % 3) === 0) {
      const cards = cardsFiltrados.slice(index, index + 3);
      return (
        <div key={index} className="flex flex-row gap-[24px]">
          {renderCards(cards)}
        </div>
      );
    }
    return null;
  });

  if (loading) {
    return <p className="text-center text-lg mt-10">Carregando consultas...</p>;
  }

  return (
    <body className="flex flex-col items-center">
      <TopBar />

      <section className="flex flex-col justify-center pt-[48px] pb-[76px] px-[194px] gap-[32px]">
        {/* Título */}
        <div className="flex flex-row items-center h-[53px] w-[365px] gap-[16px]">
          <button className="h-[32px] w-[32px] hover:skew-3" onClick={() => router.back()}>
            <Image src={ArrowBack} alt="Arrow Back Icon" />
          </button>
          <p className="text-[48px] font-bold">Atendimento</p>
        </div>

        {/* Filtro Médico */}
        <div className="flex flex-col gap-[24px]">
          <p className="text-[24px] font-normal">Qual é o médico?</p>
          <div className="flex flex-row items-center h-[50px] w-[660px] gap-[24px]">
            <input
              className="h-[50px] w-[520px] rounded-[8px] border-[#101010] border-[1px] p-[16px]"
              type="text"
              placeholder="Pesquise aqui..."
              value={inputNomeMedico}
              onChange={(e) => setInputNomeMedico(e.target.value)}
            />
            <Button
              className="h-[42px] w-[116px] rounded-[24px] py-[12px] px-[32px] bg-[#7D1AD7] hover:bg-[#7D1AD7]"
              onClick={aplicarFiltroNome}
            >
              Buscar
            </Button>
          </div>
        </div>

        {/* Botões modo de exibição e datas */}
        <div className="flex flex-row justify-between items-center">
          {/* Histórico / Agendamento */}
          <div className="flex flex-row items-center justify-center h-[58px] w-[243px] rounded-[12px] p-[8px] gap-[8px] bg-[#F0F0F0]">
            <Button
              variant="link"
              onClick={() => setModoExibicao("historico")}
              className={`flex items-center justify-center h-[42px] w-[92px] rounded-[8px] hover:no-underline focus:outline-none focus:ring-0 ${
                modoExibicao === "historico" ? "bg-white" : "bg-[#F0F0F0]"
              }`}
            >
              <p>Histórico</p>
            </Button>
            <Button
              variant="link"
              onClick={() => setModoExibicao("agendamento")}
              className={`flex items-center justify-center h-[42px] w-[127px] rounded-[8px] hover:no-underline focus:outline-none focus:ring-0 ${
                modoExibicao === "agendamento" ? "bg-white" : "bg-[#F0F0F0]"
              }`}
            >
              <p>Agendamento</p>
            </Button>
          </div>

          {/* Filtro por datas */}
          <div className="flex flex-row h-[56px] w-[300px] gap-[16px]">
            <div className="relative w-[144px]">
              <input
                ref={inputInicioRef}
                type="date"
                className="appearance-none h-[56px] w-full rounded-[8px] border border-[#D9D9D9] pl-[8px] pr-[36px] text-[#101010] text-[16px]"
                value={filtroDataInicio}
                onChange={(e) => setFiltroDataInicio(e.target.value)}
              />
              <Image
                src={CalendarMonth}
                alt="Calendário Início"
                width={20}
                height={20}
                onClick={() => inputInicioRef.current?.showPicker()}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              />
            </div>

            <div className="relative w-[144px]">
              <input
                ref={inputFimRef}
                type="date"
                className="appearance-none h-[56px] w-full rounded-[8px] border border-[#D9D9D9] pl-[8px] pr-[36px] text-[#101010] text-[16px]"
                value={filtroDataFim}
                onChange={(e) => setFiltroDataFim(e.target.value)}
              />
              <Image
                src={CalendarMonth}
                alt="Calendário Fim"
                width={20}
                height={20}
                onClick={() => inputFimRef.current?.showPicker()}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-[24px]">{consultRows}</div>

        {/* Botão nova consulta */}
        <div className="flex justify-end w-full mt-[153px]">
          <Button
            className="h-[48px] w-[205px] bg-[#50E678] rounded-[24px] py-[12px] px-[32px] gap-[10px] shadow-[0_4px_4px_#0000001A] hover:bg-[#50E678]/80"
            onClick={() => router.push("/page-cadastro")}
          >
            <Image src={PlusCircled} alt="Plus Circled Icon" />
            Nova Consulta
          </Button>
        </div>
      </section>
    </body>
  );
};

export default PageAtendimento;
