import { cn } from "@/lib/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { forwardRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

type InputProps = {
  label: string;
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  error?: string | null;
};

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      value,
      placeholder = "Enter text",
      onChangeText,
      label,
      secureTextEntry = false,
      keyboardType,
      error,
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [secure, setSecure] = useState(secureTextEntry);
    return (
      <View className="w-full">
        <Text className={cn("label", error ? "text-destructive" : "")}>
          {label}
        </Text>
        <View className="relative">
          <TextInput
            ref={ref}
            value={value}
            placeholder={placeholder}
            onChangeText={onChangeText}
            secureTextEntry={secure}
            keyboardType={keyboardType}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholderClassName="font-quicksand"
            placeholderTextColor={error ? "#F14141" : "#888888"}
            className={cn(
              "input flex-1",
              isFocused ? "border-primary" : "border-border",
              error ? "border-destructive" : "",
              secureTextEntry ? "pr-16" : "pr-0",
            )}
          />
          {secureTextEntry && (
            <TouchableOpacity
              onPress={() => setSecure((prev) => !prev)}
              className="absolute -top-1.5 right-5 translate-y-1/2  p-1"
            >
              <Ionicons
                name={secure ? "eye-off" : "eye"}
                size={18}
                color="#878787"
              />
            </TouchableOpacity>
          )}
        </View>

        {error ? (
          <Text className="font-quicksand text-destructive ml-4 mt-1 text-xs">
            {error}
          </Text>
        ) : null}
      </View>
    );
  },
);

Input.displayName = "Input";
