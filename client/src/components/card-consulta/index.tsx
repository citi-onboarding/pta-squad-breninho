import * as React from "react";
import Image from "next/image";
import { Cat, Dog, Cow, Pig, Horse, Sheep, Alarm } from "@/assets";
import { Button } from "../ui/button";
import { cn } from "@/utils";

// Cores padrão para status
const cardColors = {
  "": "bg-[#F0F0F0] hover:bg-[#F0F0F0]",
  "Primeira Consulta": "bg-[#BFB5FF] hover:bg-[#BFB5FF]",
  "Check-up": "bg-[#9CFF95] hover:bg-[#9CFF95]",
  "Retorno": "bg-[#FF641999] hover:bg-[#FF641999]",
  "Vacinação": "bg-[#AAE1FF] hover:bg-[#AAE1FF]"
};

// Imagens dos animais
const cardAnimals: any = {
  "Cat": Cat,
  "Dog": Dog,
  "Cow": Cow,
  "Pig": Pig,
  "Horse": Horse,
  "Sheep": Sheep,
};

// Tipagem do componente
interface CardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  date: string,
  time: string,
  nameOwner: string,
  namePet: string,
  nameDoctor: string,
  imageAnimal: string,
  status: "Primeira Consulta" | "Check-up" | "Retorno" | "Vacinação" | "",
  isHistorico?: boolean
}

const CardConsulta = ({
  date,
  time,
  nameOwner,
  namePet,
  nameDoctor,
  imageAnimal,
  status,
  isHistorico = false,
  ...props
}: CardProps) => {
  // COR DO CARD: se for histórico, ignora o status e usa cinza
  const thisCardColor = isHistorico
    ? "bg-[#D9D9D9] hover:bg-[#D9D9D9]"
    : cardColors[status];

  const thisCardAnimal = cardAnimals[imageAnimal];

  return (
    <Button
      className={cn(
        "flex flex-row items-center justify-between text-[14px] text-[#101010] h-[135px] w-[494.67px] rounded-[16px] py-[16px] px-[24px] gap-[10px] font-[SF Pro Display]",
        thisCardColor
      )}
      {...props}
    >
      {/* Bloco com a data e hora */}
      <div className="flex flex-col justify-center items-center h-[90px] w-[51px] rounded-[4px] pt-[12px] pb-[12px] px-[6px] gap-[8px] bg-[#FFFFFFCC] hover:bg-[#FFFFFFCC]">
        <Image src={Alarm} alt="alarm-icon" />
        <p className="leading-[110.00000000000001%]"><b>{date}</b></p>
        <p className="leading-[110.00000000000001%]"><b>{time}</b></p>
      </div>

      {/* Nome do pet e do tutor */}
      <p className="text-[14px]"><b>{namePet}</b>/ {nameOwner}</p>
      <p className="text-[14px]">{nameDoctor}</p>

      {/* Animal e tipo da consulta */}
      <div className="flex flex-col items-center justify-center h-[103px] w-[101px] gap-[8px]">
        <Image className="h-[70px] w-[69px]" src={thisCardAnimal} alt="Pet Image" />
        <div className="flex flex-row items-center justify-center h-[25px] w-[101px] rounded-[4px] gap-[8px] bg-[#FFFFFFCC]">
          <p className="text-center leading-[110.00000000000001%] tracking-[0%] text-[12px]">{status}</p>
        </div>
      </div>
    </Button>
  );
};

export default CardConsulta;
