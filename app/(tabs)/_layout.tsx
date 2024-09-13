import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Href, Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { Text, View } from "@/components/Themed";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        // headerShown: useClientOnlyValue(false, false),
        headerShown: false,
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Coins",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="home" color={color} size={20} />
          ),
          headerShown: true,
          headerStyle: { borderBottomColor: "green" },
          headerRight: () => (
            <Link href={"/search" as Href} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome5
                    name="search"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="create-outline" color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="user" color={color} size={20} />
          ),
        }}
      />
      {/* <Tabs.Screen name="search" options={{ title: "Auth" }} /> */}
    </Tabs>
  );
}
