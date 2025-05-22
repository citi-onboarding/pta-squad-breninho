import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface ButtonProp {
  title: string;
  icon?: StaticImageData;
}

const NewButton: React.FC<ButtonProp> = ({ icon, title }) => {
  return (
    <button
      type="button"
      className="w-[205px] h-[48px] rounded-[24px] bg-[#50E678] flex items-center justify-center gap-2 px-4 py-2 hover:bg-[#41C965]"
    >
      {icon && (
      <div>
        <Image src={icon} alt="icone" className="w-[24px] h-[24px]" />
      </div>
      )}
      <div className="text-[#FFFFFF] pb-[2px] font-semibold">{title}</div>
    </button>
  );
};

export default NewButton;