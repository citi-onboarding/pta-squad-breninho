import { View, Image, Text } from "react-native";
import { Cat, Cow, Dog, Horse, Pig, Sheep, AlarmIcon } from "@assets";

// Color codes
const cardColors = {
    "": "#F0F0F0",
    "Primeira Consulta": "#BFB5FF",
    "Check-up": "#9CFF95",
    "Retorno": "#FF641999",
    "Vacinação": "#AAE1FF"
}

// Animal Images
const animalImages = {
    "Cat": Cat,
    "Cow": Cow,
    "Dog": Dog,
    "Horse": Horse,
    "Pig": Pig,
    "Sheep": Sheep,
}

// Cards Properties
interface CardProps{
    animal: "Cat" | "Cow" | "Dog" | "Horse" | "Pig" | "Sheep",
    date: string,
    time: string,
    nameOwner: string,
    namePet: string,
    nameDoctor: string,
    status: "Primeira Consulta" | "Check-up" | "Retorno" | "Vacinação" | ""
}

export default function CardConsultaMobile({animal, date, time, nameOwner, namePet, nameDoctor, status}: CardProps) {
    let thisCardColor = cardColors[status];
    let thisAnimalImage = animalImages[animal];
    return (
        <View className="w-[358px] h-[122px] rounded-[16px] px-[16px] py-[24px] bg-[thisCardColor] flex flex-row items-center justify-between font-[SF Pro Display]"
                style={{ backgroundColor: thisCardColor }}>

            <View className="flex flex-col items-center justify-center h-[90px] w-[51px] rounded-[4px] py[12px] px-[6px] gap-[8px] bg-[#FFFFFFCC]">
                <Image source={AlarmIcon} className="w-[20px] h-[20px]" />
                <Text className="text-center font-bold">{date}</Text>
                <Text className="text-center font-bold">{time}</Text>
            </View>

            <View className="flex flex-col justify-center items-center gap-[12px] ">
                <Text className="text-[14px] leading-[110.00000000000001%]">
                    <Text className="font-bold">{namePet}</Text>
                    {" / "}{nameOwner}
                </Text>
                <Text className="text-[14px] leading-[110.00000000000001%]">{nameDoctor}</Text>
            </View>

            <View className="flex flex-col items-center justify-center h-[90px] gap-[8px]">
            
                <Image source={thisAnimalImage} style={{ width: 57, height: 57, resizeMode: "contain" }}/>
                <View className="h-[25px] w-[101px] rounded-[4px] bg-[#FFFFFFCC] flex items-center justify-center">
                    <Text className="text-center text-[12px] text-[#292929] leading-[110.00000000000001%]">{status}</Text>
                </View>
            
            </View>
        </View>
    )
}