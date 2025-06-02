import { View, Image, TouchableOpacity } from "react-native";
import { morningIcon, eveningIcon, nightIcon } from "@assets";



export default function CardHorarioMobile() {
    return (
        <View className="w-[252px] h-[70px] bg-white justify-center items-center rounded-[32px] p-[24px] gap-[10px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.3)] ">
            <View className="w-[204px] h-[20px] justify-between items-center flex-row ">
                
                <TouchableOpacity className="w-[35px] h-[35px] rounded-full justify-center items-center">
                    <Image source={morningIcon} className="w-[20px] h-[20px]" />
                </TouchableOpacity>
                
                <TouchableOpacity className="w-[35px] h-[35px] rounded-full justify-center items-center">
                    <Image source={eveningIcon} className="w-[20px] h-[20px]" />
                </TouchableOpacity>
                
                <TouchableOpacity className="w-[35px] h-[35px] rounded-full justify-center items-center">
                    <Image source={nightIcon} className="w-[20px] h-[20px]" />
                </TouchableOpacity>
            
            </View>
        </View>
    )
}