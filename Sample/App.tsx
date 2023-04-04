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
import {createGradientShimmer} from 'react-native-gradient-shimmer';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  container: {
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
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

const CardFullSizeShimmer = () => {
  const {width} = useWindowDimensions();
  const horizontalMargin = 16;

  return (
    <View
      style={{
        marginHorizontal: horizontalMargin,
      }}>
      <Text style={styles.label}>Card Full Size</Text>
      <CreatedGradientShimmer
        height={120}
        width={width - horizontalMargin * 2}
        style={{
          borderRadius: 8,
        }}
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
      <Text style={styles.label}>Horizontal Cards</Text>
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

const CustomColorsShimmer = () => {
  const {width} = useWindowDimensions();
  const horizontalMargin = 16;

  return (
    <View
      style={{
        marginHorizontal: horizontalMargin,
      }}>
      <Text style={styles.label}>Custom Colors</Text>
      <CreatedGradientShimmer
        height={120}
        width={width - horizontalMargin * 2}
        style={{
          borderRadius: 8,
        }}
        backgroundColor="#f00"
        highlightColor="#00f"
      />
    </View>
  );
};

const CustomScaleShimmer = () => {
  const {width} = useWindowDimensions();
  const horizontalMargin = 16;

  return (
    <View
      style={{
        marginHorizontal: horizontalMargin,
      }}>
      <Text style={styles.label}>Custom Scale</Text>
      <CreatedGradientShimmer
        height={120}
        width={width - horizontalMargin * 2}
        style={{
          borderRadius: 8,
        }}
        scale={1}
      />
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" translucent={false} />

      <ScrollView>
        <AvatarShimmer />

        <CardFullSizeShimmer />

        <CardHorizontalShimmer />

        <CustomScaleShimmer />

        <CustomColorsShimmer />
      </ScrollView>
    </SafeAreaView>
  );
}
