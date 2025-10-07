import { cn } from "@/lib/utils";
import { Text, TouchableOpacity, View } from "react-native";

type ButtonProps = {
  label?: string;
  className?: string;
  labelClassName?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  isLoading?: boolean;
};

export const Button = ({
  label = "Button",
  className,
  labelClassName,
  onPress,
  icon,
  isLoading,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      className={cn("custom-btn", className)}
    >
      {icon}
      <View className="flex-center flex-row">
        {isLoading}
        <Text
          className={cn(
            "text-primary-foreground paragraph-semibold",
            labelClassName,
          )}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
