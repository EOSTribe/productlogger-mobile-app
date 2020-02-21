# productlogger-mobile-app
Mobile Application for Product Logger

## Running the app

### Yarn install
```
$ yarn
```

### Install pod
```
$ cd ios/ & pod install
```

### Start packager
```
$ npx react-native start
```

### Run on iOS emulator
```
$ npx react-native run-ios
```

### Run on Android device or emulator
```
$ npx react-native run-android
```

### Run android release build

#### Copy release keystore

Copy `release.keystore` file to `android/app`


#### Generating the release APK
```
$ cd android
$ ./gradlew bundleRelease
```


#### Testing the release build
```
$ npx react-native run-android --variant=release
```

