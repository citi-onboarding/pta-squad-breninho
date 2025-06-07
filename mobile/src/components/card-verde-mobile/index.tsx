// src/components/card-verde-mobile/index.tsx

import React, { FC } from "react";
import { View, Image } from "react-native";
import { HomeIndicator } from "../../assets";

const CardVerdeMobile: FC = () => {
  return (
    <View className="w-full h-20 bg-[#50E678] rounded-t-[24px] justify-center items-center">
      <Image source={HomeIndicator} className="w-[134px] h-[5px]" />
    </View>
  );
};

export default CardVerdeMobile;
