'use client'

import Image from "next/image";
import TopBar from "@/components/top-bar"
import CardConsulta from "@/components/card-consulta";
import { Button } from "@/components/ui/button";
import { ArrowBack, CalendarMonth, PlusCircled } from "@/assets";
import { useRouter } from "next/navigation";


// Para construir um roteamento lógico e funcional: 
// 1º -> Passar o id do animal no card
// [
//      [ A, B, C],
//      [ D, E, F],
//      [ G, H, I],
// ]
// 2º -> O id será captado e processado
// 3º -> Renderização das informações da página de consulta

// ---------------
interface interfProps {
    id: number,
    date: string,
    time: string,
    nameOwner: string,
    namePet: string,
    nameDoctor: string,
    imageAnimal: string,
    status: "Primeira Consulta" | "Check-up" | "Retorno" | "Vacinação" | ""
}
const cardsConsultas: interfProps[] = [
    {id: 1, date: "18/02", time: "13:00", nameOwner: "João Alves", namePet: "Luna", nameDoctor: "Dr. José Carlos", imageAnimal: "gato", status: "Primeira Consulta" },
    {id: 2, date: "18/02", time: "13:00", nameOwner: "João Alves", namePet: "Luna", nameDoctor: "Dr. José Carlos", imageAnimal: "gato", status: "Retorno" },
    {id: 3, date: "18/02", time: "13:00", nameOwner: "João Alves", namePet: "Luna", nameDoctor: "Dr. José Carlos", imageAnimal: "gato", status: "Check-up" },
    {id: 4, date: "18/02", time: "13:00", nameOwner: "João Alves", namePet: "Luna", nameDoctor: "Dr. José Carlos", imageAnimal: "gato", status: "Vacinação" },
    {id: 5, date: "18/02", time: "13:00", nameOwner: "João Alves", namePet: "Luna", nameDoctor: "Dr. José Carlos", imageAnimal: "gato", status: "Vacinação" },
    {id: 6, date: "18/02", time: "13:00", nameOwner: "João Alves", namePet: "Luna", nameDoctor: "Dr. José Carlos", imageAnimal: "gato", status: "Primeira Consulta" },
];
// Organizar os Ids nos cards

const PageAtendimento = () => {
    // Instace of AppRouter
    const router = useRouter();
    // Create a automatic row card creator 
    const consultId = (posArray: number) => {
        return cardsConsultas.slice(posArray, posArray+3);
    };
    const renderCards = (objCards: interfProps[]) => {
        return(
            objCards.map((consulta: interfProps) => 
                (
                    <CardConsulta key={consulta.id} date={consulta.date} time={consulta.time} nameOwner={consulta.nameOwner} namePet={consulta.namePet} nameDoctor={consulta.nameDoctor} imageAnimal={consulta.imageAnimal} status={consulta.status} onClick={() => router.push(`/page-detalhes-consulta/${consulta.id}`)}></CardConsulta>
                )
            )
        )
    }
    const consultRows = cardsConsultas.map((consulta, index) =>{
        if ((index % 3) === 0 ){
            const cards = consultId(index);
            return(
                <div key={consulta.id} className="flex flex-row gap-[24px]">{renderCards(cards)}</div>
            )
        }
    });
    // ----------------------------------------------
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
                        <Button variant="link" className="flex items-center justify-center h-[42px] w-[92px] rounded-[8px] bg-white text-[#101010] text-[16px] font-normal hover:no-underline hover:bg-[#D9D9D9]" ><p>Histórico</p></Button>
                        <Button variant="link" className="flex items-center justify-center h-[42px] w-[127px] text-[#101010] text-[16px] font-normal hover:no-underline hover:bg-[#D9D9D9]"><p>Agendamento</p></Button>
                    </div>
                    <div className="flex flex-row h-[56px] w-[268px] gap-[16px]">
                        <Button className="flex flex-row items-center justify-center h-[56px] w-[126px] bg-white border-[1px] border-[#D9D9D9] gap-[8px] py-[16px] px-[12px] rounded-[8px] text-[#101010] text-[16px] font-normal hover:bg-[#D9D9D9]">
                            <p>{"dd/mm/aa"}</p>
                            <Image src={CalendarMonth} alt="Calendar Month"></Image>
                        </Button>
                        <Button className="flex flex-row items-center justify-center h-[56px] w-[126px] bg-white border-[1px] border-[#D9D9D9] gap-[8px] py-[16px] px-[12px] rounded-[8px] text-[#101010] text-[16px] font-normal hover:bg-[#D9D9D9]">
                            <p>{"dd/mm/aa"}</p>
                            <Image src={CalendarMonth} alt="Calendar Month"></Image>
                        </Button>
                    </div>
                </div>
                {/* Status Pet cards */}
                <div className="flex flex-col gap-[24px]">
                    {consultRows}
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