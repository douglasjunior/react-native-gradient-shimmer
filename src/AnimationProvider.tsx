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
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Animated} from 'react-native';

type AnimationContextType = {
  registerAnimation: (
    animationId: string,
    animation?: Animated.CompositeAnimation,
  ) => void;
};

export const AnimationContext = React.createContext<
  AnimationContextType | undefined
>(undefined);

type AnimationProviderPropsType = PropsWithChildren<{
  animating: boolean;
}>;

const AnimationProvider = ({
  children,
  animating = true,
}: AnimationProviderPropsType) => {
  const [animations, setAnimations] = useState<
    Record<string, Animated.CompositeAnimation>
  >({});

  const registerAnimation = useCallback(
    (animationId: string, animation?: Animated.CompositeAnimation) => {
      setAnimations(prev => {
        const copy = {...prev};
        if (animation) {
          copy[animationId] = animation;
        } else {
          delete copy[animationId];
        }
        return copy;
      });
    },
    [],
  );

  useEffect(() => {
    if (!animating) {
      return undefined;
    }

    const animationValues = Object.values(animations);

    if (!animationValues.length) {
      return undefined;
    }

    const animation = Animated.loop(
      Animated.parallel(animationValues, {
        stopTogether: true,
      }),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [animations, animating]);

  const animatedValue = useMemo(
    () => ({
      registerAnimation,
    }),
    [registerAnimation],
  );

  return (
    <AnimationContext.Provider value={animatedValue}>
      {children}
    </AnimationContext.Provider>
  );
};

export default AnimationProvider;
