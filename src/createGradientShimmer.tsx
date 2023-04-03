import React, {memo} from 'react';
import GradientShimmer, {
  GradientShimmerPropsType,
  gradientShimmerDefaultProps,
} from './GradientShimmer';

/**
 * Create your own GradientShimmer instance with default props
 */
const createGradientShimmer = <
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
    ...gradientShimmerDefaultProps,
    ...fixedProps,
  };

  return memo(GradientShimmerWrapper);
};

export default createGradientShimmer;
