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
};

const isShimmerContainer = (
  item: ShimmerLayoutItemType | ShimmerLayoutContainerType,
): item is ShimmerLayoutContainerType => {
  return 'content' in item;
};

const ShimmerLayout = ({layout, ...shimmerProps}: ShimmerLayoutPropsType) => {
  const renderShimmerItem = (
    item: ShimmerLayoutItemType | ShimmerLayoutContainerType,
    index: number,
  ) => {
    if (isShimmerContainer(item)) {
      return <ShimmerLayout {...shimmerProps} key={index} layout={item} />;
    }

    return (
      <GradientShimmer
        {...shimmerProps}
        key={index}
        width={item.width}
        height={item.height}
        style={[
          {
            marginTop: item.marginTop,
            marginBottom: item.marginBottom,
            marginLeft: item.marginLeft,
            marginRight: item.marginRight,
          },
          item.style,
        ]}
        animating={false}
      />
    );
  };

  return (
    <View
      style={[
        {
          flexDirection: layout.flexDirection,
          alignItems: layout.alignItems,
          justifyContent: layout.justifyContent,
          marginTop: layout.marginTop,
          marginBottom: layout.marginBottom,
          marginLeft: layout.marginLeft,
          marginRight: layout.marginRight,
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
  ...gradientShimmerDefaultProps,
  visible: true,
};

export default memo(ShimmerLayoutWithProvider);
