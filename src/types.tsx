import {Animated, StyleProp, ViewStyle} from 'react-native/types';

export type LinearGradientPropsType = {
  colors: string[];
  style: StyleProp<ViewStyle>;
  start: {
    x: Animated.Value | number;
    y: Animated.Value | number;
  };
  end: {
    x: Animated.Value | number;
    y: Animated.Value | number;
  };
};
