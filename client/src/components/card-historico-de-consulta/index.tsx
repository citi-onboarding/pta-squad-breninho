import React from "react";
import { ArrowRight } from "lucide-react";

interface tipos_das_informacoes {
  date: string;
  time: string;
  type_of_consultation: string;
  doctor: string;
}

const Card_Historico_de_Consulta: React.FC <tipos_das_informacoes> = ({ date, time, type_of_consultation, doctor }) => {
    return (
    <div className = "flex items-center justify-between bg-[#F0F0F0] rounded-xl w-[510px] h-[82px] gap-[61px] p-[16px] text-[14px]">
        <div className = "bg-white p-4 rounded-md text-center w-[51px] h-[50px] shadow-sm flex flex-col items-center justify-center">
            <div className = "font-bold">{date}</div>
            <div className = "font-bold">{time}</div>
        </div>

        <div className = "text-sm font-bold">{type_of_consultation} </div>
        <div className = "text-sm">{doctor}</div>
        
        <button className = "w-[24px] h-[24px] flex items-center justify-center border-b-2 border-transparent hover:border-[#50E678]">
            <ArrowRight/>
        </button>
    </div>
  );
};

export default Card_Historico_de_Consulta;
