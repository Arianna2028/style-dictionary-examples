# Customized Style Dictionary TypeScript Generation

This directory is an example setup for converting design tokens to TypeScript variables.

It uses a custom, extended version of Style Dictionary's [JS transform group](https://amzn.github.io/style-dictionary/#/transform_groups?id=js) to do the conversion to handle light + dark mode as well as a custom transformation for RGBA colors.

To generate CSS, run:
```bash
npm install && npm run build
```

This should create files at `build`-- `build/dark` for dark mode and `build/light` for light mode. These contain TypeScript variables + corresponding types in `index.ts` and `index.d.ts` respectively.
