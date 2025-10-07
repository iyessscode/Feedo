import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import { icons } from "@/constants/icons";

import { cn } from "@/lib/utils";

import useAuthStore from "@/store/auth.store";

export default function TabsLayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Redirect href="/sign-in" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderRadius: 50,
          marginHorizontal: 10,
          height: 60,
          position: "absolute",
          bottom: 20,
          backgroundColor: "white",
          shadowColor: "#1A1A1A",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Home" icon={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Search" icon={icons.search} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Cart" icon={icons.bag} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Profile" icon={icons.user} />
          ),
        }}
      />
    </Tabs>
  );
}

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: any;
  title: string;
}) => {
  return (
    <View className="tab-icon">
      <Image
        source={icon}
        className="size-6"
        resizeMode="contain"
        tintColor={focused ? "#FE8C00" : "#5D5F6D"}
      />
      <Text
        className={cn(
          "text-xs font-bold",
          focused ? "text-primary" : "text-muted-foreground",
        )}
      >
        {title}
      </Text>
    </View>
  );
};
