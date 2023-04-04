import React, {ComponentType, memo, useEffect, useMemo, useRef} from 'react';
import {Animated, Easing, StyleProp, StyleSheet, ViewStyle} from 'react-native';
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
   * Scale factor to customize the highlight size
   */
  scale: number;
  /**
   * Duration of the animation in milliseconds
   */
  duration: number;
};

const GradientShimmer = ({
  duration,
  height,
  width,
  scale,
  style,
  LinearGradientComponent,
  backgroundColor,
  highlightColor,
}: GradientShimmerPropsType): JSX.Element => {
  const linearGradientStyles = useMemo(() => {
    const styles = [style];
    if (typeof height === 'number') {
      styles.push({height});
    }
    if (typeof width === 'number') {
      styles.push({width});
    }
    return styles;
  }, [height, style, width]);

  const calculatedWidth = useMemo(() => {
    const {width: flatWidth} = StyleSheet.flatten(linearGradientStyles);

    if (!flatWidth || !Number.isFinite(flatWidth)) {
      console.error(
        'GradientShimmer requires `width` to be real positive numbers. You can pass `width` by prop or inside `style`',
      );
      return 100;
    }

    return flatWidth;
  }, [linearGradientStyles]);

  const overflowWidth = calculatedWidth / 2;
  const startPosition = calculatedWidth - overflowWidth;
  const endPosition = calculatedWidth + overflowWidth;

  const position = useRef(new Animated.Value(startPosition));

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(position.current, {
          toValue: endPosition,
          duration: duration,
          easing: Easing.sin,
          useNativeDriver: false,
        }),
        Animated.timing(position.current, {
          toValue: startPosition,
          duration: 0,
          useNativeDriver: false,
        }),
      ]),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [duration, startPosition, endPosition]);

  const startEndPositions = useMemo(() => {
    const widthReference = 200;
    const overflow = 0.2;
    const delta = overflow * (widthReference / calculatedWidth) * scale;
    const start = 0 - delta;
    const end = 1 + delta;

    return [
      position.current.interpolate({
        inputRange: [startPosition, endPosition],
        outputRange: [start, end],
      }),
      position.current.interpolate({
        inputRange: [startPosition, endPosition],
        outputRange: [start + delta, end + delta],
      }),
    ];
  }, [calculatedWidth, endPosition, scale, startPosition]);

  return (
    <BaseLinearGradient
      LinearGradient={LinearGradientComponent}
      style={linearGradientStyles}
      start={startEndPositions[0]}
      end={startEndPositions[1]}
      backgroundColor={backgroundColor}
      highlightColor={highlightColor}
    />
  );
};

export const gradientShimmerDefaultProps: Partial<GradientShimmerPropsType> = {
  duration: 1500,
  scale: 20,
  backgroundColor: 'rgb(255,255,255)',
  highlightColor: 'rgb(200,200,200)',
};

GradientShimmer.defaultProps = gradientShimmerDefaultProps;

export default memo(GradientShimmer);
