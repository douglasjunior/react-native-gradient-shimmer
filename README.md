# React-Native Gradient Shimmer

[![License MIT](https://img.shields.io/badge/licence-MIT-blue.svg)](https://github.com/douglasjunior/react-native-gradient-shimmer/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/react-native-gradient-shimmer.svg)](https://www.npmjs.com/package/react-native-gradient-shimmer?activeTab=versions)
[![npm downloads](https://img.shields.io/npm/dt/react-native-gradient-shimmer.svg)](https://www.npmjs.com/package/react-native-gradient-shimmer)

⚛ A pure JavaScript, performant, typed shimmer component for Android and iOS.

It uses React Native [Animated](https://reactnative.dev/docs/animated) API for animation, and [expo-linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/) or [react-native-linear-gradient](https://github.com/react-native-linear-gradient/react-native-linear-gradient) for the gradient effect.

|Android|iOS|
|-|-|
|<img src="https://github.com/douglasjunior/react-native-gradient-shimmer/raw/main/screenshots/android.gif" width="240"/>|<img src="https://github.com/douglasjunior/react-native-gradient-shimmer/raw/main/screenshots/ios.gif" width="240"/>

## Requirements

- React Native >= 0.60.0
- [expo-linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/) or [react-native-linear-gradient](https://github.com/react-native-linear-gradient/react-native-linear-gradient)

## Install

Install dependency package
```bash
yarn add react-native-gradient-shimmer
```

Or

```bash
npm i -S react-native-gradient-shimmer
```

## Basic usage

Render the `GradientShimmer` directly:

```jsx
import LinearGradient from 'react-native-linear-gradient'; // or 'expo-linear-gradient'
import GradientShimmer from 'react-native-gradient-shimmer';

const App = () => {
   return (
      <SafeAreaView style={{flex: 1}}>
         <PdfRendererView
            LinearGradientComponent={LinearGradient}
            backgroundColor="red"
            highlightColor="blue"
            height={120}
            width={120}
            style={{
              borderRadius: 60,
              margin: 8,
            }}
         />
      </SafeAreaView>
   );
}

export default App;
```

Or create your own `GradientShimmer` instance with default props:

```jsx
import LinearGradient from 'react-native-linear-gradient'; // or 'expo-linear-gradient'
import GradientShimmer from 'react-native-gradient-shimmer';

const CustomGradientShimmer = GradientShimmer.createGradientShimmer({
  backgroundColor: 'red',
  highlightColor: 'blue',
  LinearGradientComponent: LinearGradient,
})

const App = () => {
   return (
      <SafeAreaView style={{flex: 1}}>
         <CustomGradientShimmer
            height={120}
            width={120}
            style={{
              borderRadius: 60,
              margin: 8,
            }}
         />
      </SafeAreaView>
   );
}

export default App;
```

## GradientShimmer props

|Name|Value|Default|Description|
|-|-|-|-|
|LinearGradientComponent|`ComponentType`||Linear gradient component from [expo-linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/) or [react-native-linear-gradient](https://github.com/react-native-linear-gradient/react-native-linear-gradient)|
|width|`number`||Component `width` in DPI|
|height|`number`||Component `height` in DPI|
|backgroundColor|`string`|`'rgb(255,255,255)'`|Background color in HEX or RGB|
|highlightColor|`string`|`'rgb(200,200,200)'`|Highlight color in HEX or RGB|
|scale|`number`|`20`|Scale factor to customize the highlight size|
|duration|`number`|`1500`|Duration of the animation in milliseconds|
|style|[ViewStyle](https://reactnative.dev/docs/view-style-props)||Styles passed to the LinearGradient component|

## Contribute

New features, bug fixes and improvements are welcome! For questions and suggestions use the [issues](https://github.com/douglasjunior/react-native-gradient-shimmer/issues).

<a href="https://www.patreon.com/douglasjunior"><img src="http://i.imgur.com/xEO164Z.png" alt="Become a Patron!" width="200" /></a>
[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/douglasnassif)

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=douglasjunior/react-native-gradient-shimmer&type=Date)](https://star-history.com/#douglasjunior/react-native-gradient-shimmer)

## License

```
The MIT License (MIT)

Copyright (c) 2023 Douglas Nassif Roma Junior
```

See the full [license file](https://github.com/douglasjunior/react-native-gradient-shimmer/blob/master/LICENSE).
