import React, {ComponentType, memo, useEffect, useMemo, useRef} from 'react';
import {
  Animated,
  Easing,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import BaseLinearGradient from './BaseLinearGradient';
import {LinearGradientPropsType} from './types';

export type GradientShimmerPropsType = {
  /**
   * Linear gradient component from `expo-linear-gradient` or `react-native-linear-gradient`
   */
  LinearGradientComponent: ComponentType<LinearGradientPropsType>;
  /**
   * Component `width` in DPI
   */
  width?: number;
  /**
   * Component `height` in DPI
   */
  height?: number;
  /**
   * Styles passed to the LinearGradient component
   */
  style: StyleProp<ViewStyle>;
  /**
   * Background color in HEX or RGB
   */
  backgroundColor: string;
  /**
   * Highlight color in HEX or RGB
   */
  highlightColor: string;
  /**
   * The size of the highlight effect in DPI
   */
  highlightWidth: number;
  /**
   * Duration of the animation in milliseconds
   */
  duration: number;
  /**
   * Start or stop de animation
   */
  animating: boolean;
};

const isRealPositiveNumber = (value: unknown): value is number => {
  return Boolean(
    value && Number.isFinite(value) && typeof value === 'number' && value > 0,
  );
};

const GradientShimmer = ({
  duration,
  height,
  width,
  style,
  LinearGradientComponent,
  backgroundColor,
  highlightColor,
  highlightWidth,
  animating,
}: GradientShimmerPropsType): JSX.Element => {
  const startPosition = 0 - highlightWidth;

  const position = useRef(new Animated.Value(startPosition));

  const containerStyles = useMemo(() => {
    const styles: StyleProp<ViewStyle>[] = [
      style,
      {
        overflow: 'hidden',
        backgroundColor,
      },
    ];
    if (typeof height === 'number') {
      styles.push({height});
    }
    if (typeof width === 'number') {
      styles.push({width});
    }
    return styles;
  }, [height, style, width, backgroundColor]);

  const linearLayoutStyles = useMemo(() => {
    const styles: StyleProp<ViewStyle>[] = [
      {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: highlightWidth,
        transform: [
          {
            translateX: position.current as unknown as number,
          },
        ],
      },
    ];
    return styles;
  }, [highlightWidth]);

  const calculatedWidth = useMemo(() => {
    const {width: flatWidth} = StyleSheet.flatten(containerStyles);

    if (!isRealPositiveNumber(flatWidth)) {
      console.error(
        'GradientShimmer requires `width` to be real positive numbers. You can pass `width` by prop or inside `style`',
      );
      return 100;
    }

    return flatWidth;
  }, [containerStyles]);

  const endPosition = calculatedWidth + highlightWidth;

  useEffect(() => {
    position.current.setValue(startPosition);

    if (!animating) {
      return undefined;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(position.current, {
          toValue: endPosition,
          duration: duration,
          easing: Easing.sin,
          useNativeDriver: true,
        }),
        Animated.timing(position.current, {
          toValue: startPosition,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [animating, duration, startPosition, endPosition]);

  return (
    <View style={containerStyles}>
      <BaseLinearGradient
        LinearGradient={LinearGradientComponent}
        style={linearLayoutStyles}
        highlightColor={highlightColor}
        backgroundColor={backgroundColor}
      />
    </View>
  );
};

export const gradientShimmerDefaultProps: Partial<GradientShimmerPropsType> = {
  duration: 1500,
  highlightWidth: 200,
  highlightColor: 'rgb(210,210,210)',
  backgroundColor: 'rgb(200,200,200)',
  animating: true,
};

GradientShimmer.defaultProps = gradientShimmerDefaultProps;

export default memo(GradientShimmer);
