// src/components/card-consulta-mobile/index.tsx

import React, { FC } from "react";
import { View, Image, Text } from "react-native";
import {
  Cat,
  Cow,
  Dog,
  Horse,
  Pig,
  Sheep,
  AlarmIcon,
} from "../../assets"; // usando o alias que definimos em src/assets/index.ts

interface CardProps {
  animal: "Cat" | "Cow" | "Dog" | "Horse" | "Pig" | "Sheep";
  date: string; // ex: "18/02"
  time: string; // ex: "13:00"
  nameOwner: string; // ex: "João Alves"
  namePet: string;   // ex: "Luna"
  nameDoctor: string; // ex: "Dr. José Carlos"
  status: "Primeira Consulta" | "Check-up" | "Retorno" | "Vacinação" | "";
}

const cardColors: Record<CardProps["status"], string> = {
  "": "#F0F0F0",
  "Primeira Consulta": "#BFB5FF",
  "Check-up": "#9CFF95",
  "Retorno": "#FF641999",
  "Vacinação": "#AAE1FF",
};

const animalImages: Record<CardProps["animal"], any> = {
  Cat,
  Cow,
  Dog,
  Horse,
  Pig,
  Sheep,
};

const CardConsultaMobile: FC<CardProps> = ({
  animal,
  date,
  time,
  nameOwner,
  namePet,
  nameDoctor,
  status,
}) => {
  const thisCardColor = cardColors[status];
  const thisAnimalImage = animalImages[animal];

  return (
    <View
      testID="card-root"                                       // usado no teste Jest
      className="w-[358px] h-[122px] rounded-[16px] px-[16px] py-[24px] flex flex-row items-center justify-between"
      style={{ backgroundColor: thisCardColor }}
    >
      {/* Lado esquerdo: ícone de alarme + data + hora */}
      <View className="flex flex-col items-center justify-center h-[90px] w-[51px] rounded-[4px] bg-white/80 py-[12px] px-[6px] gap-[8px]">
        <Image source={AlarmIcon} className="w-[20px] h-[20px]" />
        <Text className="text-center font-bold text-[12px]">{date}</Text>
        <Text className="text-center font-bold text-[12px]">{time}</Text>
      </View>

      {/* Coluna do meio: nome do pet / tutor + nome do médico */}
      <View className="flex flex-col justify-center items-center gap-[12px]">
        <Text className="text-[14px] leading-[110%]">
          <Text className="font-bold">{namePet}</Text>
          {" / "}
          {nameOwner}
        </Text>
        <Text className="text-[14px] leading-[110%]">{nameDoctor}</Text>
      </View>

      {/* Lado direito: imagem do animal + tag de status */}
      <View className="flex flex-col items-center justify-center h-[90px] gap-[8px]">
        <Image
          source={thisAnimalImage}
          style={{ width: 57, height: 57, resizeMode: "contain" }}
        />
        <View className="h-[25px] w-[101px] rounded-[4px] bg-white/80 flex items-center justify-center">
          <Text className="text-center text-[12px] text-[#292929] leading-[110%]">
            {status}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CardConsultaMobile;
