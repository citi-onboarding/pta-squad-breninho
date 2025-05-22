import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogoCITiPet } from "@/assets";
import { Cross2Icon } from "@radix-ui/react-icons"

function Modalcadastro(){
    return(
        // Container do Modal
        <div>
            {/* Container das infos do card */}
            <div 
            className="flex flex-col h-[423px] w-[408px] bg-[#FFFFFF] rounded-[24px] p-[48px] gap-[29px] items-center font-[SF Pro Display]">
                {/* Conteúdo do Modal de Fim de Cadastro flex flex-row justify-between*/}
                <div className="w-full flex flex-row justify-between">
                    {/* Image */}
                    <Image className="ml-[20%]" src={LogoCITiPet} alt="logo"/>
                    {/* Botão Fechar */}
                    <Button className="h-[24px] w-[24px]" size="icon" variant="ghost">
                        <Cross2Icon></Cross2Icon>
                    </Button>
                </div>
                <div className="flex flex-col items-center">
                    <p><b>Cadastro finalizado!</b> Envie o</p>
                    <p>comprovante para o <b>tutor</b></p>
                </div>
                <div className="flex flex-col gap-[12px] text-[16px]">
                    <p>
                        <b>E-mail</b>
                    </p>
                    <div>
                        {/* Input de email */}
                        <input type="text" placeholder="Digite Aqui..." className="h-[50px] w-[312px] border border-[#101010] rounded-[8px] p-[16px]"/>
                    </div>
                </div>
                {/* Botão de Envio */}
                <Button 
                className="h-[42px] w-[312px] bg-[#50E678] rounded-[24px] shadow-[0 4px 4px #0000001A]">Enviar</Button>
            </div>
        </div>
    )
}

export default Modalcadastro;

