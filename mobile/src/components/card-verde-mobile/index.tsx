import { View, Image } from "react-native";
import { HomeIndicator } from "@assets";

export default function CardVerdeMobile() {
  return (
    <View className="w-[414px] h-[75px] bg-[#50E678] rounded-tl-[24px] rounded-tr-[24px] justify-center items-center" >
        <Image source={HomeIndicator} className="w-[134px] h-[5px] inset-y-[15px]" />
    </View>
  );
}