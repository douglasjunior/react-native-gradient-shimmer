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
import {LinearGradient} from 'expo-linear-gradient';

// import LinearGradient from 'react-native-linear-gradient';
import {
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

const CreatedGradientShimmer = createGradientShimmer({
  LinearGradientComponent: LinearGradient,
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
  ...others
}: Partial<GradientShimmerPropsType> & {label: string}) => {
  const {width} = useWindowDimensions();
  const horizontalMargin = 16;

  return (
    <View
      style={{
        marginHorizontal: horizontalMargin,
      }}>
      <Text style={styles.label}>{label}</Text>
      <CreatedGradientShimmer
        height={120}
        width={width - horizontalMargin * 2}
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

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" translucent={false} />

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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
      </ScrollView>
    </SafeAreaView>
  );
}
