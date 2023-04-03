import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {
  SafeAreaView,
  useWindowDimensions,
  StyleSheet,
  View,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
// import LinearGradient from 'react-native-linear-gradient';
import GradientShimmer, {
  createGradientShimmer,
} from 'react-native-gradient-shimmer';

const BACKGROUND_COLOR = 'rgb(255,255,255)';
const HIGHLIGHT_COLOR = 'rgb(200,200,200)';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  container: {
    flex: 1,
    padding: 16,
  },
});

const CreatedGradientShimmer = createGradientShimmer({
  backgroundColor: 'red',
  highlightColor: 'blue',
  LinearGradientComponent: LinearGradient,
});

export default function App() {
  const {width} = useWindowDimensions();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" translucent={false} />

      <View style={styles.container}>
        <View style={{flexDirection: 'row', marginVertical: 16}}>
          <GradientShimmer
            LinearGradientComponent={LinearGradient}
            backgroundColor={BACKGROUND_COLOR}
            highlightColor={HIGHLIGHT_COLOR}
            height={114}
            width={114}
            style={{
              borderRadius: 57,
              overflow: 'hidden',
              marginRight: 8,
            }}
          />
          <View>
            <CreatedGradientShimmer
              height={30}
              width={width - 32 - 114 - 8}
              style={{marginBottom: 8, borderRadius: 2}}
            />
            <CreatedGradientShimmer
              height={30}
              width={width - 32 - 114 - 8}
              style={{marginBottom: 8, borderRadius: 2}}
            />
            <CreatedGradientShimmer
              height={30}
              width={width - 32 - 114 - 8}
              style={{marginBottom: 8, borderRadius: 2}}
            />
          </View>
        </View>

        <CreatedGradientShimmer
          height={114}
          width={width - 32}
          style={{
            borderRadius: 8,
          }}
        />
      </View>
    </SafeAreaView>
  );
}
