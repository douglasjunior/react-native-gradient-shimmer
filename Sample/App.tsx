import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {
  SafeAreaView,
  useWindowDimensions,
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';

// import LinearGradient from 'react-native-linear-gradient';
import {LinearGradient} from 'expo-linear-gradient';

import GradientShimmer, {
  ShimmerLayout,
  ShimmerLayoutContainerType,
  createGradientShimmer,
  GradientShimmerPropsType,
} from 'react-native-gradient-shimmer';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
  },
  scrollViewContainer: {
    paddingBottom: 16,
  },
});

/**
 * https://easings.net/#easeInOutCirc
 */
function easeInOutCirc(value: number): number {
  return value < 0.5
    ? (1 - Math.sqrt(1 - Math.pow(2 * value, 2))) / 2
    : (Math.sqrt(1 - Math.pow(-2 * value + 2, 2)) + 1) / 2;
}

const CreatedGradientShimmer = createGradientShimmer({
  LinearGradientComponent: LinearGradient,
  easing: easeInOutCirc,
});

const AvatarShimmer = () => {
  const {width} = useWindowDimensions();
  const avatarWidth = 114;
  const horizontalMargin = 16;
  const distanceBetween = 8;
  return (
    <View
      style={{
        marginHorizontal: horizontalMargin,
      }}>
      <Text style={styles.label}>Avatar</Text>
      <View style={{flexDirection: 'row', marginVertical: 16}}>
        <CreatedGradientShimmer
          height={avatarWidth}
          width={avatarWidth}
          style={{
            borderRadius: avatarWidth / 2,
            marginRight: distanceBetween,
          }}
        />
        <View>
          <CreatedGradientShimmer
            height={30}
            width={width - horizontalMargin * 2 - avatarWidth - distanceBetween}
            style={{marginBottom: 8, borderRadius: 2}}
          />
          <CreatedGradientShimmer
            height={30}
            width={width - horizontalMargin * 2 - avatarWidth - distanceBetween}
            style={{marginBottom: 8, borderRadius: 2}}
          />
          <CreatedGradientShimmer
            height={30}
            width={width - horizontalMargin * 2 - avatarWidth - distanceBetween}
            style={{marginBottom: 8, borderRadius: 2}}
          />
        </View>
      </View>
    </View>
  );
};

const CardShimmer = ({
  label,
  width,
  ...others
}: {
  label: string;
  width?: GradientShimmerPropsType['width'];
  highlightWidth?: GradientShimmerPropsType['highlightWidth'];
  duration?: GradientShimmerPropsType['duration'];
  backgroundColor?: GradientShimmerPropsType['backgroundColor'];
  highlightColor?: GradientShimmerPropsType['highlightColor'];
}) => {
  const {width: windowWidth} = useWindowDimensions();
  const horizontalMargin = 16;
  const shimmerWidth = width ?? windowWidth - horizontalMargin * 2;
  return (
    <View
      style={{
        marginHorizontal: horizontalMargin,
      }}>
      <Text style={styles.label}>{label}</Text>
      <CreatedGradientShimmer
        height={120}
        width={shimmerWidth}
        style={{
          borderRadius: 8,
        }}
        {...others}
      />
    </View>
  );
};

const CardHorizontalShimmer = () => {
  const horizontalMargin = 16;

  return (
    <View
      style={{
        marginHorizontal: horizontalMargin,
      }}>
      <Text style={styles.label}>Horizontal cards</Text>
      <View
        style={{
          flexDirection: 'row',
        }}>
        {Array.from(new Array(5))
          .fill(null)
          .map((_, index) => (
            <CreatedGradientShimmer
              key={index}
              height={120}
              width={120}
              style={{
                borderRadius: 8,
                marginRight: 8,
              }}
            />
          ))}
      </View>
    </View>
  );
};

const layoutExample: ShimmerLayoutContainerType = {
  content: [
    {
      flexDirection: 'row',
      content: [
        {
          height: 150,
          width: 100,
          marginRight: 16,
        },
        {
          justifyContent: 'space-between',
          content: [
            {
              height: 40,
              width: 250,
            },
            {
              height: 40,
              width: 250,
            },
            {
              height: 40,
              width: 120,
            },
          ],
        },
      ],
    },
    {
      marginTop: 16,
      flexDirection: 'row',
      columnGap: 16,
      content: [
        {
          width: 100,
          height: 100,
        },
        {
          width: 100,
          height: 100,
        },
        {
          width: 100,
          height: 100,
        },
        {
          width: 100,
          height: 100,
        },
        {
          width: 100,
          height: 100,
        },
      ],
    },
  ],
};

const ShimmerLayoutExample = () => {
  const horizontalMargin = 16;

  return (
    <View
      style={{
        marginHorizontal: horizontalMargin,
      }}>
      <Text style={styles.label}>Shimmer layout</Text>
      <ShimmerLayout
        LinearGradientComponent={LinearGradient}
        layout={layoutExample}
        defaultShimmerProps={{
          style: {
            borderRadius: 8,
          },
        }}
      />
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" translucent={false} />

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={{padding: 16}}>
          <Text style={styles.label}>Basic</Text>
          <GradientShimmer
            width={200}
            height={100}
            LinearGradientComponent={LinearGradient}
          />
        </View>

        <AvatarShimmer />

        <CardHorizontalShimmer />

        <CardShimmer label="Card full size" />

        <CardShimmer label="Custom highlight width" highlightWidth={50} />

        <CardShimmer label="Custom duration" duration={500} />

        <CardShimmer
          label="Custom colors"
          backgroundColor="red"
          highlightColor="blue"
        />

        <CardShimmer label="Custom width (5000px)" width={5000} />

        <ShimmerLayoutExample />
      </ScrollView>
    </SafeAreaView>
  );
}
