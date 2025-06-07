// src/components/card-horario-mobile/index.tsx

import React, { FC } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { morningIcon, eveningIcon, nightIcon } from "../../assets";

interface Props {
  onSelectPeriod: (period: "morning" | "afternoon" | "night" | "") => void;
  selectedPeriod: "morning" | "afternoon" | "night" | "";
}

const CardHorarioMobile: FC<Props> = ({ onSelectPeriod, selectedPeriod }) => {
  return (
    <View className="w-[252px] h-[70px] bg-white justify-center items-center rounded-[32px] p-[24px] gap-[10px] shadow-[0px_1px_4px_rgba(0,0,0,0.3)]">
      <View className="w-[204px] h-[20px] flex-row justify-between items-center">
        <TouchableOpacity
          className={`w-[35px] h-[35px] rounded-full justify-center items-center ${
            selectedPeriod === "morning" ? "bg-[#EAE6FF]" : ""
          }`}
          onPress={() => onSelectPeriod("morning")}
        >
          <Image source={morningIcon} className="w-[20px] h-[20px]" />
        </TouchableOpacity>

        <TouchableOpacity
          className={`w-[35px] h-[35px] rounded-full justify-center items-center ${
            selectedPeriod === "afternoon" ? "bg-[#E0FFE0]" : ""
          }`}
          onPress={() => onSelectPeriod("afternoon")}
        >
          <Image source={eveningIcon} className="w-[20px] h-[20px]" />
        </TouchableOpacity>

        <TouchableOpacity
          className={`w-[35px] h-[35px] rounded-full justify-center items-center ${
            selectedPeriod === "night" ? "bg-[#FFF1E0]" : ""
          }`}
          onPress={() => onSelectPeriod("night")}
        >
          <Image source={nightIcon} className="w-[20px] h-[20px]" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardHorarioMobile;
