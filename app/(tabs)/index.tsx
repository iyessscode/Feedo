import * as React from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants/icons";

import { offers } from "@/lib/data";
import { cn } from "@/lib/utils";

import { CartButton } from "@/components/cart-button";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={offers}
        keyExtractor={(item, index) => `${item.id || index}`}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-28 px-5"
        ListHeaderComponent={() => (
          <View className="flex-between my-5 w-full flex-row">
            <View className="flex-start">
              <Text className="small-bold text-primary">DELIVER TO</Text>
              <TouchableOpacity className="flex-center mt-0.5 flex-row gap-x-1">
                <Text className="paragraph-bold text-dark-100">
                  Yogyakarta, Indonesia
                </Text>
                <Image
                  source={icons.arrowDown}
                  className="size-3"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <CartButton />
          </View>
        )}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;

          return (
            <Pressable
              className={cn(
                "offer-card",
                isEven ? "flex-row-reverse" : "flex-row",
              )}
              style={{ backgroundColor: item.color }}
              android_ripple={{ color: "#fffff22" }}
            >
              {({ pressed }) => (
                <React.Fragment>
                  <View className={"h-full w-1/2"}>
                    <Image
                      source={item.image}
                      className={"size-full"}
                      resizeMode={"contain"}
                    />
                  </View>

                  <View
                    className={cn("offer-card__info", isEven ? "pl-6" : "pr-6")}
                  >
                    <Text className="h1-bold leading-tight text-white">
                      {item.title}
                    </Text>
                    <Image
                      source={icons.arrowRight}
                      className="size-10"
                      resizeMode="contain"
                      tintColor="#ffffff"
                    />
                  </View>
                </React.Fragment>
              )}
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}
