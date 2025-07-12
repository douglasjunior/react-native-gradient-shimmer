// MIT License
//
// Copyright (c) 2023 Douglas Nassif Roma Junior
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import React, {
  ComponentType,
  memo,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
} from 'react';
import {
  Animated,
  Easing,
  EasingFunction,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import {AnimationContext} from './AnimationProvider';
import BaseLinearGradient from './BaseLinearGradient';
import {LinearGradientPropsType} from './types';

export type GradientShimmerPropsType = {
  testID?: string;
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
  style?: StyleProp<ViewStyle>;
  /**
   * Background color in HEX or RGB
   */
  backgroundColor?: string;
  /**
   * Highlight color in HEX or RGB
   */
  highlightColor?: string;
  /**
   * The size of the highlight effect in DPI
   */
  highlightWidth?: number;
  /**
   * Duration of the animation in milliseconds
   */
  duration?: number;
  /**
   * Start or stop de animation
   */
  animating?: boolean;
  /**
   * Easing function used by `Animated.timing()` to convey physically believable motion in animations. Read more at https://reactnative.dev/docs/easing
   */
  easing?: EasingFunction;
};

const isRealPositiveNumber = (value: unknown): value is number => {
  return Boolean(
    typeof value === 'number' && Number.isFinite(value) && value > 0,
  );
};

export const gradientShimmerDefaultProps = {
  duration: 1500,
  highlightWidth: 200,
  highlightColor: 'rgb(210,210,210)',
  backgroundColor: 'rgb(200,200,200)',
  animating: true,
  easing: Easing.linear,
};

const GradientShimmer = ({
  duration = gradientShimmerDefaultProps.duration,
  highlightWidth = gradientShimmerDefaultProps.highlightWidth,
  highlightColor = gradientShimmerDefaultProps.highlightColor,
  backgroundColor = gradientShimmerDefaultProps.backgroundColor,
  animating = gradientShimmerDefaultProps.animating,
  easing = gradientShimmerDefaultProps.easing,
  testID = undefined,
  style = undefined,
  height,
  width,
  LinearGradientComponent,
}: GradientShimmerPropsType) => {
  const {registerAnimation} = useContext(AnimationContext) || {};
  const componentId = useId();

  const startPosition = 0 - highlightWidth;

  const position = useRef(new Animated.Value(startPosition));

  const containerStyles = useMemo(() => {
    const styles: StyleProp<ViewStyle>[] = [
      style,
      {
        overflow: 'hidden',
        backgroundColor,
        height,
        width,
      },
    ];
    return StyleSheet.flatten(styles);
  }, [height, style, width, backgroundColor]);

  const linearLayoutStyles: Animated.AnimatedProps<StyleProp<ViewStyle>> =
    useMemo(
      () => ({
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: highlightWidth,
        transform: [
          {
            translateX: position.current,
          },
        ],
      }),
      [highlightWidth],
    );

  const calculatedWidth = useMemo(() => {
    const {width: flatWidth} = containerStyles;

    if (!isRealPositiveNumber(flatWidth)) {
      console.error(
        'GradientShimmer requires `width` to be real positive numbers.',
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

    const animation = Animated.sequence([
      Animated.timing(position.current, {
        toValue: endPosition,
        duration: duration,
        easing,
        useNativeDriver: true,
      }),
      Animated.timing(position.current, {
        toValue: startPosition,
        duration: 0,
        useNativeDriver: true,
      }),
    ]);

    if (registerAnimation) {
      registerAnimation?.(componentId, animation);

      return () => {
        registerAnimation?.(componentId, undefined);
      };
    }

    const loop = Animated.loop(animation);

    loop.start();

    return () => {
      loop.stop();
    };
  }, [
    animating,
    duration,
    startPosition,
    endPosition,
    easing,
    registerAnimation,
    componentId,
  ]);

  return (
    <View testID={testID} style={containerStyles}>
      <BaseLinearGradient
        LinearGradient={LinearGradientComponent}
        style={linearLayoutStyles}
        highlightColor={highlightColor}
        backgroundColor={backgroundColor}
      />
    </View>
  );
};

export default memo(GradientShimmer);
