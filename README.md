# asset-syncronation README

## Features

Flutter asset syncronation is an extension to generate static variable that contain path of your assets file, so you don't have to remember the path when you need them.

## Usage

add `assets-generator-begin` comment in the begining of assets section and `assets-generator-end` in the end of section

assets:
   \# assets-generator-begin
   - assets/audios/
   - assets/fonts/
   - assets/icons/
   - assets/images/
   \# assets-generator-end

## Release Notes

### 0.0.1

Initial release

### 0.0.2

Fix code style

### 0.0.3

Add icon for visibility