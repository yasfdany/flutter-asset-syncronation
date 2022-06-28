# asset-syncronation README

## Features

Flutter asset syncronation is an extension to generate static variable that contain path of your assets file, so you don't have to remember the path when you need them.

## Usage

Sort your assets files according to the file types by using folder like this

<p float="left">
  <img src="https://raw.githubusercontent.com/yasfdany/flutter-asset-syncronation/master/assets/screenshots/folder_path.jpg" width="160px">
</p>

List your asset folders in assets section on `pubspec.yaml` file, don't forget to save the `pubspec.yaml` for automatically update the project or do it manually by run `flutter pub get` on the terminal.

⚠️⚠️⚠️ In the previous version you need to add comment tag in the first and the end of the assets section but now it's not required, you will just do it like this

```yaml
assets:
   - assets/images/
   - assets/fonts/
   - assets/icons/
   - assets/audios/
```

everytime you add or delete files/folders in `assets` folder it will automatically generate `r.dart` file contains classes according to the name of the sub folder in assets, the class will look like this

```dart
class AssetImages {
	static const String onboarding1 = 'assets/images/onboarding1.png';
	static const String onboarding2 = 'assets/images/onboarding2.png';
	static const String onboarding3 = 'assets/images/onboarding3.png';
	static const String onboarding4 = 'assets/images/onboarding4.png';
}

class AssetFonts {
	static const String nunito = 'assets/fonts/nunito.ttf';
}
```

After that you just need to import `r.dart` file, and access the static variable like usual.

## Release Notes

### 1.0.0

- Stable Release
- Generate `r.dart` file automatically everytime there's file added/removed/updated
- Update instruction in README.MD

### 1.0.1

- Automatically find asset folders without comment tagging