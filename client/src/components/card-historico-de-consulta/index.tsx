import React from "react";
import { ArrowRight } from "lucide-react";

interface tiposInformacoes {
  date: string;
  time: string;
  typeOfConsultation: string;
  doctor: string;
}

const CardHistoricoConsulta: React.FC <tiposInformacoes> = ({ date, time, typeOfConsultation, doctor }) => {
    return (
    <div className="flex items-center justify-between bg-[#F0F0F0] rounded-xl w-[510px] h-[82px] gap-[61px] py-[16px] px-[24px] text-[14px]">
        <div className="bg-white p-4 rounded-md text-center w-[51px] h-[50px] shadow-sm flex flex-col items-center justify-center">
            <div className="font-bold">{date}</div>
            <div className="font-bold">{time}</div>
        </div>

        <div className="font-bold w-[115px] whitespace-nowrap">{typeOfConsultation} </div>
        <div className="w-[90px] whitespace-nowrap">{doctor}</div>
        
        <button className="w-[24px] h-[24px] flex items-center justify-center">
            <ArrowRight/>
        </button>
    </div>
  );
};

export default CardHistoricoConsulta;
