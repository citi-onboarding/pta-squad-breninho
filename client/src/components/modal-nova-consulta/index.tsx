// src/components/ModalNovaConsulta.tsx
import * as React from "react";
import { Appointment } from "@/services/Appointments";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
    LogoCITiPet,
    alarmIcon,
    calendarIcon,
    BotaoClose,
    downArrowIcon,
} from "@/assets";

interface ModalNovaConsultaProps {
    onClose: () => void;
    onSubmit: (dados: {
        appointmentType: string;
        doctor: string;
        date: string;
        time: string;
        description: string;
    }) => void;
}

function ModalNovaConsulta({ onClose, onSubmit }: ModalNovaConsultaProps) {
    const [tipoConsulta, setTipoConsulta] = React.useState("");
    const [nomeMedico, setNomeMedico] = React.useState("");
    const [dataAtendimento, setDataAtendimento] = React.useState(""); // YYYY-MM-DD
    const [horaAtendimento, setHoraAtendimento] = React.useState(""); // HH:MM
    const [erro, setErro] = React.useState("");

    const dataInputRef = React.useRef<HTMLInputElement>(null);
    const timeInputRef = React.useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        setErro("");
        if (!tipoConsulta || !nomeMedico || !dataAtendimento || !horaAtendimento) {
            setErro("Por favor, preencha todos os campos.");
            return;
        }

    const dados = {
        appointmentType: tipoConsulta, // "primeiraConsulta" | "retorno" | "checkUp" | "vacinacao"
        doctor: nomeMedico,
        date: new Date(dataAtendimento).toISOString(),
        time: horaAtendimento,
        description: "Consulta Agendada", // Campo opcional, pode ser adicionado se necessário
    };

    onSubmit(dados);
    onClose();
};

return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="flex flex-col h-[530px] w-[824px] bg-white rounded-[24px] p-[48px] gap-[12px]">
        {/* Header: logo + close button */}
        <div className="w-full flex flex-row justify-between items-center mb-[4px]">
            <Image src={LogoCITiPet} alt="Logo CITI Pet" />
            <Button
            className="h-[24px] w-[24px] p-0"
            size="icon"
            variant="ghost"
            onClick={onClose}
            >
            <Image src={BotaoClose} alt="Ícone de fechar" />
            </Button>
        </div>

        <div className="flex flex-col items-center mb-[4px]">
            <p>
            <b>O pet já está cadastrado no sistema!</b> Preencha os dados da{" "}
            <b>consulta</b>
            </p>
        </div>

        {/* Error message (fixed height to avoid layout shift) */}
        <div className="h-[20px]">
            {erro && <p className="text-red-600 text-center text-sm">{erro}</p>}
        </div>

        {/* Form fields (two columns) */}
        <div className="grid grid-cols-2 text-[16px] gap-[12px]">
          {/* Tipo de consulta */}
            <div className="flex flex-col gap-[6px]">
            <p>
                <b>Tipo de consulta</b>
            </p>
            <div className="relative">
                <select
                required
                value={tipoConsulta}
                onChange={(e) => setTipoConsulta(e.target.value)}
                className="appearance-none h-[50px] w-[358px] border border-[#101010] rounded-[8px] px-[16px] text-[16px] text-black bg-white invalid:text-[#D9D9D9]"
                >
                <option value="" disabled hidden style={{ color: "#D9D9D9" }}>
                    Selecione aqui
                </option>
                <option value="firstappointment" style={{ color: "black" }}>
                    Primeira Consulta
                </option>
                <option value="return" style={{ color: "black" }}>
                    Retorno
                </option>
                <option value="checkup" style={{ color: "black" }}>
                    Check-up
                </option>
                <option value="vaccination" style={{ color: "black" }}>
                    Vacinação
                </option>
                </select>
                <div className="absolute right-[16px] top-1/2 -translate-y-1/2 pointer-events-none">
                <Image src={downArrowIcon} alt="Down Arrow Icon" />
                </div>
            </div>
            </div>

          {/* Médico Responsável */}
            <div className="flex flex-col gap-[6px]">
            <p>
                <b>Médico Responsável</b>
            </p>
            <input
                type="text"
                placeholder="Digite aqui..."
                value={nomeMedico}
                onChange={(e) => setNomeMedico(e.target.value)}
                className="h-[50px] w-[358px] border border-[#101010] rounded-[8px] p-[16px] placeholder:text-[#D9D9D9]"
            />
            </div>

          {/* Data do atendimento */}
            <div className="flex flex-col gap-[6px]">
            <p>
                <b>Data do atendimento</b>
            </p>
            <div className="relative">
              {/* Invisible native date input */}
                <input
                ref={dataInputRef}
                type="date"
                value={dataAtendimento}
                onChange={(e) => setDataAtendimento(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              {/* Visible custom box */}
                <div className="flex items-center h-[50px] w-[358px] border border-[#101010] rounded-[8px] pl-[16px] pr-[36px] text-[16px]">
                {dataAtendimento
                ? `${String(new Date(dataAtendimento).getDate()).padStart(2, "0")}/${
                    String(new Date(dataAtendimento).getMonth() + 1).padStart(2, "0")
                    }/${new Date(dataAtendimento).getFullYear()}`
                : "dd/mm/aaaa"}
                </div>
                    <div
                        className="absolute right-[16px] top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => dataInputRef.current?.showPicker()}
                        >
                        <Image src={calendarIcon} alt="Ícone de calendário" />
                    </div>
                </div>
            </div>

          {/* Horário do atendimento */}
            <div className="flex flex-col gap-[6px]">
            <p>
                <b>Horário do atendimento</b>
            </p>
            <div className="relative">
              {/* Invisible native time input */}
                <input
                ref={timeInputRef}
                type="time"
                value={horaAtendimento}
                onChange={(e) => setHoraAtendimento(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {/* Visible custom box */}
                <div className="flex items-center h-[50px] w-[358px] border border-[#101010] rounded-[8px] pl-[16px] pr-[36px] text-[16px]">
                {horaAtendimento ? horaAtendimento : "--:--"}
                </div>
                <div
                className="absolute right-[16px] top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => timeInputRef.current?.showPicker()}
                >
                <Image src={alarmIcon} alt="Ícone de relógio" />
                </div>
                </div>
            </div>
        </div>

        {/* Botão Finalizar Cadastro */}
        <div className="flex justify-center mt-auto">
            <Button
            className="
                h-[42px] w-[728px] rounded-[24px]
                px-[32px] py-[12px] gap-[10px] text-[16px]
                !bg-[#50E678] !text-white shadow-[0_4px_4px_#0000001A]
                hover:!bg-[#50E678] active:!bg-[#50E678] focus:!bg-[#50E678]
                focus:outline-none focus:ring-0
                focus:shadow-lg active:shadow-lg
            "
            onClick={handleSubmit}
            >
            Finalizar Cadastro
            </Button>
            </div>
        </div>
    </div>
    );
}

export default ModalNovaConsulta;