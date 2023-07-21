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

import React, {memo} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

import AnimationProvider from './AnimationProvider';
import GradientShimmer, {
  GradientShimmerPropsType,
  gradientShimmerDefaultProps,
} from './GradientShimmer';

type CommonLayoutType = {
  /**
   * Styles passed to the internal component
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Margin left applied to style
   */
  marginLeft?: ViewStyle['marginLeft'];
  /**
   * Margin right applied to style
   */
  marginRight?: ViewStyle['marginRight'];
  /**
   * Margin top applied to style
   */
  marginTop?: ViewStyle['marginTop'];
  /**
   * Margin bottom applied to style
   */
  marginBottom?: ViewStyle['marginBottom'];
};

export type ShimmerLayoutItemType = CommonLayoutType & {
  /**
   * Component `width` in DPI
   */
  width: number;
  /**
   * Component `height` in DPI
   */
  height: number;
};

export type ShimmerLayoutContainerType = CommonLayoutType & {
  /**
   * FlexBox flexDirection
   */
  flexDirection?: ViewStyle['flexDirection'];
  /**
   * FlexBox alignItems
   */
  alignItems?: ViewStyle['alignItems'];
  /**
   * FlexBox justifyContent
   */
  justifyContent?: ViewStyle['justifyContent'];
  /**
   * Set the gaps (gutters) between rows and columns
   */
  gap?: ViewStyle['gap'];
  /**
   * Set the size of the gap (gutter) between an element's rows
   */
  rowGap?: ViewStyle['rowGap'];
  /**
   * Set the size of the gap (gutter) between an element's columns.
   */
  columnGap?: ViewStyle['columnGap'];
  /**
   * Children content layout
   */
  content: Array<ShimmerLayoutItemType | ShimmerLayoutContainerType>;
};

export type ShimmerLayoutPropsType = Omit<
  GradientShimmerPropsType,
  'width' | 'height' | 'style'
> & {
  /**
   * Layout config tree
   */
  layout: ShimmerLayoutContainerType;
  defaultShimmerProps?: Omit<
    Partial<GradientShimmerPropsType>,
    'LinearGradientComponent'
  >;
};

const isShimmerContainer = (
  item: ShimmerLayoutItemType | ShimmerLayoutContainerType,
): item is ShimmerLayoutContainerType => {
  return 'content' in item;
};

const ShimmerLayout = ({
  testID,
  layout,
  defaultShimmerProps,
  ...shimmerProps
}: ShimmerLayoutPropsType) => {
  const renderShimmerItem = (
    item: ShimmerLayoutItemType | ShimmerLayoutContainerType,
    index: number,
  ) => {
    if (isShimmerContainer(item)) {
      return (
        <ShimmerLayout
          {...shimmerProps}
          defaultShimmerProps={defaultShimmerProps}
          key={index}
          layout={item}
        />
      );
    }

    return (
      <GradientShimmer
        {...shimmerProps}
        {...defaultShimmerProps}
        key={index}
        width={item.width || defaultShimmerProps?.width}
        height={item.height || defaultShimmerProps?.height}
        style={[
          defaultShimmerProps?.style,
          typeof item.marginTop === 'number'
            ? {marginTop: item.marginTop}
            : null,
          typeof item.marginLeft === 'number'
            ? {marginLeft: item.marginLeft}
            : null,
          typeof item.marginRight === 'number'
            ? {marginRight: item.marginRight}
            : null,
          typeof item.marginBottom === 'number'
            ? {marginBottom: item.marginBottom}
            : null,
          item.style,
        ]}
      />
    );
  };

  return (
    <View
      testID={testID}
      style={[
        {
          flexDirection: layout.flexDirection,
          alignItems: layout.alignItems,
          justifyContent: layout.justifyContent,
          marginTop: layout.marginTop,
          marginBottom: layout.marginBottom,
          marginLeft: layout.marginLeft,
          marginRight: layout.marginRight,
          gap: layout.gap,
          columnGap: layout.columnGap,
          rowGap: layout.rowGap,
        },
        layout.style,
      ]}>
      {layout.content.map(renderShimmerItem)}
    </View>
  );
};

const ShimmerLayoutWithProvider = (props: ShimmerLayoutPropsType) => {
  return (
    <AnimationProvider animating={props.animating}>
      <ShimmerLayout {...props} />
    </AnimationProvider>
  );
};

ShimmerLayoutWithProvider.defaultProps = {
  visible: true,
  duration: gradientShimmerDefaultProps.duration,
  highlightWidth: gradientShimmerDefaultProps.highlightWidth,
  highlightColor: gradientShimmerDefaultProps.highlightColor,
  backgroundColor: gradientShimmerDefaultProps.backgroundColor,
  animating: gradientShimmerDefaultProps.animating,
  easing: gradientShimmerDefaultProps.easing,
};

export default memo(ShimmerLayoutWithProvider);
