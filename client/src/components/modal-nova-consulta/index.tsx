import * as React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LogoCITiPet, alarmIcon, calendarIcon, BotaoClose, downArrowIcon } from "@/assets";

function ModalNovaConsulta() {
    return (
        // Container do Modal
        <div>
            {/* Container das infos do card */}
            <div className="flex flex-col h-[493px] w-[824px] bg-[#FFFFFF] rounded-[24px] p-[48px] gap-[29px] items-center font-[SF Pro Display]">

                {/* Conteúdo*/}

                {/* Header - Logo e botão de fechar*/}
                <div className="w-full flex flex-row justify-between">
                    <Image className="mx-auto" src={LogoCITiPet} alt="logo" />
                    <Button className="h-[24px] w-[24px]" size="icon" variant="ghost">
                        <Image src={BotaoClose} alt="Close Icon"/>
                    </Button>
                </div>

                <div className="flex flex-col items-center">
                    <p><b>O pet já está cadastrado no sistema!</b> Preencha os dados da <b>consulta</b></p>
                </div>

                {/* Inputs de dados da consulta em grid */}
                <div className="grid grid-cols-2 text-[16px] gap-[12px]">
                    {/*Linha 1 = Elem 1 - Tipo de consulta - Relativo*/}
                    <div className="flex flex-col gap-[12px]">
                        <p>
                            <b>Tipo de consulta</b>
                        </p>

                        <div className="relative">
                            <select required defaultValue={""} className=" appearance-none h-[50px] w-[358px] border border-[#101010] rounded-[8px] px-[16px] text-[16px] text-black invalid:text-[#D9D9D9] bg-white ">
                                <option value="" disabled hidden>Selecione aqui</option>
                                <option value="0">Consulta</option>
                                <option value="1">Exame</option>    
                                <option value="2">Vacina</option>
                            </select>
                            <div className="absolute right-[16px] top-1/2 -translate-y-1/2 pointer-events-none">
                                <Image src={downArrowIcon} alt="Down Arrow Icon"/>
                            </div>
                        </div>
                    </div>
                    
                    {/*Linha 1 = Elem 2 - Médico Responsável - Texto */}
                    <div className="flex flex-col gap-[12px]">
                        <p>
                            <b>Médico Responsável</b>
                        </p>
                        
                        {/* Input de nome - texto */}
                        <input type="text" placeholder="Digite aqui..." className="h-[50px] w-[358px] border border-[#101010] rounded-[8px] p-[16px] placeholder:text-[#D9D9D9]" />
                    </div>

                    {/*Linha 2 = Elem 1 - Data do atendimento */}
                    <div className="flex flex-col gap-[12px]">
                        <p>
                            <b>Data do atendimento</b>
                        </p>

                        {/* Input de data - Calendário - Relativo */}
                        <div className="relative">
                            <input type="text" placeholder="dd/mm/aa" className="appearance-none h-[50px] w-[358px] border border-[#101010] rounded-[8px] p-[16px] placeholder:text-[#D9D9D9]" />
                            <div className="absolute right-[16px] top-1/2 -translate-y-1/2 pointer-events-none">
                                <Image src={calendarIcon} alt="Calendar Icon"/>
                            </div>
                        </div>

                    </div>

                    {/*Linha 2 = Elem 2 - Horário do atendimento */}
                    <div className="flex flex-col gap-[12px]">
                        <p>
                            <b>Horário do atendimento</b>
                        </p>

                        {/* Input de horário - Seleção de horário - Relativo */}
                        <div className="relative">
                            <input type="text" placeholder="00:00" className="appearance-none h-[50px] w-[358px] border border-[#101010] rounded-[8px] p-[16px] placeholder:text-[#D9D9D9]" />
                            <div className="absolute right-[16px] top-1/2 -translate-y-1/2 pointer-events-none">
                                <Image src={alarmIcon} alt="Clock Icon"/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Botão para finalizar consulta */}
                <Button className="h-[42px] w-[728px] bg-[#50E678] rounded-[24px] shadow-[0 4px 4px #0000001A] px-[32px] py-[12px] gap-[10px] text-[16px]">
                    Finalizar Cadastro
                </Button>
            </div>
        </div>
    );
}

export default ModalNovaConsulta;