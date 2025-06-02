'use client'

import Image from "next/image";
import TopBar from "@/components/top-bar"
import CardConsulta from "@/components/card-consulta";
import { Button } from "@/components/ui/button";
import { ArrowBack, CalendarMonth, PlusCircled } from "@/assets";
import { useRouter } from "next/navigation";

const PageAtendimento = () => {
    const router = useRouter();
    return(
        <body className="flex flex-col items-center">
            {/* Top bar */}
            <TopBar></TopBar>
            <section className="flex flex-col justify-center pt-[48px] pb-[76px] px-[194px] gap-[32px]">
                {/* Call back page Atendimento */}
                <div className="flex flex-row items-center h-[53px] w-[365px] gap-[16px]">
                    <button className="h-[32px] w-[32px] hover:skew-3" onClick={() => router.back()}>
                        <Image src={ArrowBack} alt="Arrow Back Icon"></Image>
                    </button>
                    <p className="text-[48px] font-bold">Atendimento</p>
                </div>
                {/* Search components */}
                <div className="flex flex-col gap-[24px]">
                    <p className="text-[24px] font-normal leading-[110.00000000000001%]">Qual é o médico?</p>
                    <div className="flex flex-row items-center h-[50x] w-[660px] gap-[24px]">
                        <input className="h-[50px] w-[520px] rounded-[8px] border-[#101010] border-[1px] p-[16px] gap-[16px]" type="text" placeholder="Pesquise aqui..."/>
                        <Button className="h-[42px] w-[116px] rounded-[24px] py-[12px] px-[32px] bg-[#7D1AD7] hover:bg-[#7D1AD7]">Buscar</Button>
                    </div>
                </div>
                {/* Organizer components */}
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row items-center justify-center h-[58px] w-[243px] rounded-[12px] p-[8px] gap-[8px] bg-[#F0F0F0] ">
                        <Button variant="link" className="flex items-center justify-center h-[42px] w-[92px] rounded-[8px] bg-white text-[#101010] text-[16px] font-normal hover:no-underline hover:bg-[#D9D9D9]" onClick={() => '/page-historico'}><p>Histórico</p></Button>
                        <Button variant="link" className="flex items-center justify-center h-[42px] w-[127px] text-[#101010] text-[16px] font-normal hover:no-underline hover:bg-[#D9D9D9]" onClick={() => '/page-agendamento'}><p>Agendamento</p></Button>
                    </div>
                    <div className="flex flex-row h-[56px] w-[268px] gap-[16px]">
                        <Button className="flex flex-row items-center justify-center h-[56px] w-[126px] bg-white border-[1px] border-[#D9D9D9] gap-[8px] py-[16px] px-[12px] rounded-[8px] text-[#101010] text-[16px] font-normal hover:bg-[#D9D9D9]">
                            <p>dd/mm/aa</p>
                            <Image src={CalendarMonth} alt="Calendar Month"></Image>
                        </Button>
                        <Button className="flex flex-row items-center justify-center h-[56px] w-[126px] bg-white border-[1px] border-[#D9D9D9] gap-[8px] py-[16px] px-[12px] rounded-[8px] text-[#101010] text-[16px] font-normal hover:bg-[#D9D9D9]">
                            <p>dd/mm/aa</p>
                            <Image src={CalendarMonth} alt="Calendar Month"></Image>
                        </Button>
                    </div>
                </div>
                {/* Status Pet cards */}
                <div className="flex flex-col gap-[24px]">
                    <div className="flex flex-row gap-[24px]">
                        <CardConsulta date="18/02" time="13:00" nameOwner="João Alves" namePet="Luna" nameDoctor="Dr. José Carlos" status="Primeira Consulta"></CardConsulta>
                        <CardConsulta date="18/02" time="13:00" nameOwner="João Alves" namePet="Luna" nameDoctor="Dr. José Carlos" status="Retorno"></CardConsulta>
                        <CardConsulta date="18/02" time="13:00" nameOwner="João Alves" namePet="Luna" nameDoctor="Dr. José Carlos" status="Check-up"></CardConsulta>
                    </div>
                    <div className="flex flex-row gap-[24px]">
                        <CardConsulta date="18/02" time="13:00" nameOwner="João Alves" namePet="Luna" nameDoctor="Dr. José Carlos" status="Vacinação"></CardConsulta>
                        <CardConsulta date="18/02" time="13:00" nameOwner="João Alves" namePet="Luna" nameDoctor="Dr. José Carlos" status="Vacinação"></CardConsulta>
                        <CardConsulta date="18/02" time="13:00" nameOwner="João Alves" namePet="Luna" nameDoctor="Dr. José Carlos" status="Primeira Consulta"></CardConsulta>
                    </div>
                </div>
                {/* New Consults Button */}
                <div className="flex justify-end w-full mt-[153px]">
                    <Button className="h-[48px] w-[205px] bg-[#50E678] rounded-[24px] py-[12px] px-[32px] gap-[10px] shadow-[0 4px 4px #0000001A] hover:bg-[#50E678]/80">
                        <Image src={PlusCircled} alt="Plus Circled Icon"></Image>
                        Nova Consulta
                    </Button>
                </div>
            </section>
            
        </body>
    )
};

export default PageAtendimento; 