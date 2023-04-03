import React, {ComponentType, PureComponent} from 'react';
import {Animated, StyleProp, ViewStyle} from 'react-native';
import {LinearGradientPropsType} from './types';

export type BaseLinearGradientPropsType = {
  LinearGradient: ComponentType<LinearGradientPropsType>;
  style: StyleProp<ViewStyle>;
  start: Animated.Value | number;
  end: Animated.Value | number;
  backgroundColor: string;
  highlightColor: string;
};

class BaseLinearGradient extends PureComponent<BaseLinearGradientPropsType> {
  render() {
    const {style, start, end, LinearGradient, backgroundColor, highlightColor} =
      this.props;

    return (
      <LinearGradient
        colors={[backgroundColor, highlightColor, backgroundColor]}
        start={{
          x: start,
          y: 0,
        }}
        end={{
          x: end,
          y: 0,
        }}
        style={style}
      />
    );
  }
}

export default Animated.createAnimatedComponent(BaseLinearGradient);
