import React from 'react';
import { finalTopBar } from '@/assets';
import { LogoCITiPet } from '@/assets';
import Image from 'next/image';

function TopBar() {
    return (
        <div 
            className = "w-full bg-white flex items-center justify-center border-b border-[#D9D9D9] h-[114px] pl-[48px] pr-[48px] pt-[20px] pb-[20px]">
            <div className = "flex flex-1 justify-center items-center gap-20">
                <button className = "text-lg text-black hover:underline decoration-[#50E678] decoration-2 w-[86px] h-[42px] flex items-center justify-center"> Atendimento </button>
                
                <Image className = "w-[189px] h-[74px]"
                    src={LogoCITiPet}
                    alt="Logo CITiPet"
                />
                
                <button className = "text-lg text-black hover:underline decoration-[#50E678] decoration-2 w-[62px] h-[42px] flex items-center justify-center"> Cadastro </button>
            </div>
            
            <div className = "absolute right-0 px-[48px]">
                <Image className = "w-[220px] h-[24px]"
                    src={finalTopBar}
                    alt="Final Top Bar"
                />
            </div>
        </div>
    );
}

export default TopBar;