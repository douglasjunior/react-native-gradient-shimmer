# React-Native Gradient Shimmer

[![License MIT](https://img.shields.io/badge/licence-MIT-blue.svg)](https://github.com/douglasjunior/react-native-gradient-shimmer/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/react-native-gradient-shimmer.svg)](https://www.npmjs.com/package/react-native-gradient-shimmer?activeTab=versions)
[![npm downloads](https://img.shields.io/npm/dt/react-native-gradient-shimmer.svg)](https://www.npmjs.com/package/react-native-gradient-shimmer)

⚛ A pure JavaScript, performant, typed shimmer component for Android, iOS and Web.

It uses React Native [Animated](https://reactnative.dev/docs/animated) API for animation, and [expo-linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/) or [react-native-linear-gradient](https://github.com/react-native-linear-gradient/react-native-linear-gradient) for the gradient effect.

Take a look at the [Online demo](https://snack.expo.dev/@douglasjunior/react-native-gradient-shimmer).

|Android|iOS|Web|
|-|-|-|
|<img src="https://github.com/douglasjunior/react-native-gradient-shimmer/raw/main/screenshots/android.gif" width="240"/>|<img src="https://github.com/douglasjunior/react-native-gradient-shimmer/raw/main/screenshots/ios.gif" width="240"/>|<img src="https://github.com/douglasjunior/react-native-gradient-shimmer/raw/main/screenshots/web.gif" width="240"/>

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
         <GradientShimmer
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
import {createGradientShimmer} from 'react-native-gradient-shimmer';

const CustomGradientShimmer = createGradientShimmer({
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

See more in the [Sample project](https://github.com/douglasjunior/react-native-gradient-shimmer/blob/main/Sample/App.tsx).

## GradientShimmer props

|Name|Value|Default|Description|
|-|-|-|-|
|LinearGradientComponent|`ComponentType`||Linear gradient component from [expo-linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/) or [react-native-linear-gradient](https://github.com/react-native-linear-gradient/react-native-linear-gradient)|
|width|`number`||Component `width` in DPI|
|height|`number`||Component `height` in DPI|
|backgroundColor|`string`|`'rgb(200,200,200)'`|Background color in HEX or RGB|
|highlightColor|`string`|`'rgb(210,210,210)'`|Highlight color in HEX or RGB|
|highlightWidth|`number`|`200`|The size of the highlight effect in DPI|
|duration|`number`|`1500`|Duration of the animation in milliseconds|
|animating|`boolean`|`true`|Start or stop the animation|
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
