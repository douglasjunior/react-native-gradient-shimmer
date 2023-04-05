import React, {ComponentType, PureComponent} from 'react';
import {Animated, StyleProp, ViewStyle} from 'react-native';

import {LinearGradientPropsType} from './types';

export type BaseLinearGradientPropsType = {
  LinearGradient: ComponentType<LinearGradientPropsType>;
  style: StyleProp<ViewStyle>;
  backgroundColor: string;
  highlightColor: string;
};

class BaseLinearGradient extends PureComponent<BaseLinearGradientPropsType> {
  render() {
    const {style, LinearGradient, backgroundColor, highlightColor} = this.props;

    return (
      <LinearGradient
        colors={[
          backgroundColor,
          highlightColor,
          highlightColor,
          backgroundColor,
        ]}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 0,
        }}
        style={style}
      />
    );
  }
}

export default Animated.createAnimatedComponent(BaseLinearGradient);
