import React, {ComponentType, memo, useEffect, useMemo, useRef} from 'react';
import {Animated, Easing, StyleProp, ViewStyle} from 'react-native';
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
  width: number;
  /**
   * Component `height` in DPI
   */
  height: number;
  /**
   * Styles passed to the LinearGradient component
   */
  style: Omit<StyleProp<ViewStyle>, 'width' | 'height'>;
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
  const overflowWidth = width / 2;
  const startPosition = width - overflowWidth;
  const endPosition = width + overflowWidth;

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
  }, [duration, width, width, startPosition, endPosition]);

  const startEndPositions = useMemo(() => {
    const widthReference = 200;
    const overflow = 0.2;
    const delta = overflow * (widthReference / width) * scale;
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
  }, [endPosition, scale, startPosition, width]);

  const linearGradientStyles = useMemo(
    () => [
      style,
      {
        height: height,
        width: width,
      },
    ],
    [height, style, width],
  );

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

GradientShimmer.defaultProps = {
  duration: 1500,
  scale: 20,
  backgroundColor: 'rgb(255,255,255)',
  highlightColor: 'rgb(200,200,200)',
};

/**
 * Create your own GradientShimmer instance with default props
 */
export const createGradientShimmer = <
  FixedProps extends Partial<GradientShimmerPropsType>,
>(
  fixedProps: FixedProps,
) => {
  const GradientShimmerWrapper = (
    props: GradientShimmerPropsType,
  ): JSX.Element => {
    return <GradientShimmer {...props} />;
  };

  GradientShimmerWrapper.defaultProps = {
    ...GradientShimmer.defaultProps,
    ...fixedProps,
  };

  return memo(GradientShimmerWrapper);
};

export default memo(GradientShimmer);
