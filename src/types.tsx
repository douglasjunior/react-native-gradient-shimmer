import { Animated, StyleProp, ViewStyle } from 'react-native/types';

type NativeLinearGradientPoint = [number, number];

type LinearGradientPoint = {
  x: number | Animated.Value;
  y: number | Animated.Value;
} | NativeLinearGradientPoint;

export type LinearGradientPropsType = {
  colors: string[];
  style?: StyleProp<ViewStyle>;
  start?: LinearGradientPoint | null;
  end?: LinearGradientPoint | null;
};
