import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, Text, View } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon({
  label,
  name,
  ...props
}: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  focused: boolean;
  label?: string;
}) {
  const fontWeight = props.focused ? "font-bold" : "font-thin";
  return (
    <View className="flex justify-around items-center">
      <FontAwesome
        size={28}
        name={name}
        style={{ marginBottom: -3 }}
        {...props}
      />
      <Text
        className={`text-xs ${fontWeight} my-1`}
        style={{ color: props.color }}
      >
        {label?.normalize()}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, false),
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="home"
              label="Home"
              color={color}
              focused={focused}
            />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
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
          title: "Create",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="code" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="user"
              label="Profile"
              focused={focused}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
