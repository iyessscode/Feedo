import { icons } from "@/constants/icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const CartButton = () => {
  return (
    <TouchableOpacity className="bg-dark-100 relative rounded-full p-3">
      <View className="bg-primary absolute -right-1 -top-2 flex size-6 items-center justify-center rounded-full">
        <Text className="font-quicksand-bold text-white">2</Text>
      </View>
      <Image
        source={icons.bag}
        className="size-5"
        resizeMode="contain"
        tintColor="#FFFFFF"
      />
    </TouchableOpacity>
  );
};
