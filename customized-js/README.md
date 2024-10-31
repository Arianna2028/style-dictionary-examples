# Customized Style Dictionary TypeScript Generation

This directory is an example setup for converting design tokens to TypeScript variables.

It uses a custom, extended version of Style Dictionary's [JS transform group](https://amzn.github.io/style-dictionary/#/transform_groups?id=js) to do the conversion to handle light + dark mode as well as a custom transformation for RGBA colors.

To generate TS, run:
```bash
npm install && npm run build
```

This should create files at `build`-- `build/dark` for dark mode and `build/light` for light mode. These contain TypeScript variables + corresponding types in `index.ts` and `index.d.ts` respectively.

## Realistic usage

The way I've used this in the past is to:
1. Run the build in CI/CD (e.g. GitHub Actions)
2. Publish it as an npm package (public or private-- it's easy to do privately using GitHub Packages)
3. Import it the same as any other package in a TypeScript project

This makes the design tokens available in a package in a safe, versioned, and automated way.
