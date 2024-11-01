# Contributing

We welcome contributions! Whether it's bug fixes, feature improvements, or documentation updates, your help is appreciated.

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/) Code of Conduct. By participating, you are expected to uphold this code.

## Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/) for clear communication and automated versioning. Please format your commit messages as follows:

```
type(scope): description

[optional body]
[optional footer]
```

Where `type` is one of:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `chore:` Maintenance tasks
- `test:` Adding or updating tests
- `refactor:` Code changes that neither fix bugs nor add features

## Development

This library is built with [Nitro](https://mrousavy.github.io/nitro). After making changes to native code, you must run:

```bash
npm run codegen
```

This regenerates the necessary bindings between JavaScript and native code.

## Working on the Example App

Install dependencies:
```bash
npm install
```

Then, follow these steps to run the app on iOS:
```bash
cd ./example && npm run ios
```

or on Android:
```bash
cd example && npm run android
```

You can also open the example project directly in Xcode (`example/ios/NitroPlayground.xcworkspace`) or Android Studio (`example/android`) for native development.

