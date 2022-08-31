# Pixbay API consumer app

Project based on [react-native-template-typescript](https://github.com/react-native-community/react-native-template-typescript)

## Project decisions

- Use thunk over saga for simplicity
- Use redux-toolkit to reduce boilerplate
- Don't use RTK Query to leave some challenge :)

## Prerequisites

- [Node.js > 12](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
- [Watchman](https://facebook.github.io/watchman)
- [Xcode 12](https://developer.apple.com/xcode)
- [Cocoapods 1.10.1](https://cocoapods.org)
- [JDK > 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Android Studio and Android SDK](https://developer.android.com/studio)

## Base dependencies

- [react-navigation](https://reactnavigation.org/) navigation library.
- [redux](https://redux.js.org/) for state management.
- [redux-persist](https://github.com/rt2zz/redux-persist) as persistance layer.
- [redux-thunk](https://github.com/gaearon/redux-thunk) to dispatch asynchronous actions.
- [fontawesome](https://fontawesome.com/) svg icon (error screen, potentially more)
- [redux-toolkit](https://redux-toolkit.js.org/) Helper library for redux

## Usage

- Go to your project's root folder and run `npm install`.
- If you are using Xcode 12.5 or higher got to /ios and execute `pod install --`repo-update`
- Run `yarn ios` or `yarn android` to start application!

## Folder structure

This template follows a very simple project structure:

- `index.js`: Entry point
- `src`: Source folder
  - `Root.tsx`: top level providers
  - `store.tsx`: top level redux config
  - `navigation.tsx`: navigation typechecking
  - `api`: util functions for API integrations
  - `components`: shared components
  - `pages`: screen components
  - `reducers`: redux logic
