## Start Metro

`npx react-native start`

## Start on android

`npx react-native run-android`

## Build - Android

`npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/`

## Debug - Android

`cd android && ./gradlew assembleDebug`

## Build - Release

`react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/`

## Release - Android

`cd android && ./gradlew assembleRelease`

## Settings pending for Ios

1. https://github.com/michalchudziak/react-native-geolocation

## Android KeyStore Info

1.  Keystore is available in the root directory or inside android/app folder (name - my-upload-key.keystore)
2.  Keystore alias - release-key-misalon
3.  keystore password - Misalon@123
