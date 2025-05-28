import * as React from "react";
import Image from "next/image"; // Renderizing the Pet image
import { PetImage, Alarm } from "@/assets";
//--
import { cn } from "@/utils";

// Types of Cards
const cardColors = {
    "Primeira Consulta": "bg-[#BFB5FF]",
    "Check-up": "bg-[#9CFF95]",
    "Retorno": "bg-[#FF641999]",
    "Vacinação": "bg-[#AAE1FF]"
}

// Types of inputs
interface CardProps{
    date: string,
    time: string,
    nameOwner: string,
    namePet: string,
    nameDoctor: string,
    status: "Primeira Consulta" | "Check-up" | "Retorno" | "Vacinação"
}

const CardConsulta = ({date, time, nameOwner, namePet, nameDoctor, status}: CardProps) => {
    let thisCardColor = cardColors[status];
    return(
        // Card info container
        <div className={cn( "flex flex-row items-center justify-between text-[14px] h-[135px] w-[494.67px] rounded-[16px] py-[16px] px-[24px] gap-[33.36px] font-[SF Pro Display] bg-[#F0F0F0]", thisCardColor)}>
            {/* Entry time infos of the Pet in system*/}
            <div className="flex flex-col justify-center items-center h-[90px] w-[51px] rounded-[4px] pt-[12px] pb-[12px] px-[6px] gap-[8px] bg-[#FFFFFFCC]">
                <Image src={Alarm} alt="alarm-icon"></Image>
                <p className="leading-[110.00000000000001%]"><b>{date}</b></p>
                <p className="leading-[110.00000000000001%]"><b>{time}</b></p>
            </div>
            {/* Names of Owner and Pet*/}
            <p className="text-[14px]"><b>{namePet}</b>/ {nameOwner}</p>
            <p className="text-[14px]">{nameDoctor}</p>
            {/* Content of Pet status */}
            <div className="flex flex-col items-center justify-center h-[103px] w-[101px] gap-[8px]">
                <Image className="h-[70px] w-[69px]" src={PetImage} alt="Pet Image"></Image>
                <div className="flex flex-row items-center justify-center h-[25px] w-[101px] rounded-[4px] gap-[8px] bg-[#FFFFFFCC]">
                    <p className="text-center leading-[110.00000000000001%] tracking-[0%] text-[12px]">{status}</p>
                </div>
            </div>
        </div>
    )
};

export default CardConsulta;