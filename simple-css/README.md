# Basic Style Dictionary CSS Generation

This directory is an example setup for converting design tokens to CSS variables.

It uses Style Dictionary's [CSS transform group](https://amzn.github.io/style-dictionary/#/transform_groups?id=css) to do the conversion, but could easily be switched to any other transform group to convert to things like SCSS or TypeScript.

To generate CSS, run:
```bash
npm install && npm run build
```

This should create a file at `build/css/_variables.css` that contains CSS variables generated from the tokens in `tokens/colors.json` and `tokens/dimensions.json`.
