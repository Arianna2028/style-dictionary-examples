import StyleDictionaryPackage from "style-dictionary";

/**
 * Transform rgba({color}, {opacity}) to rgba({red}, {green}, {blue}, {opacity})
 */
function transformRgba(input) {
  // Regex to match the rgba input with hex color
  const rgbaHexRegex = /rgba\(\s*#([0-9a-fA-F]{6})\s*,\s*([0-9.]+)\s*\)/;

  // Execute regex on the input
  const match = rgbaHexRegex.exec(input);

  if (!match) {
    return input;
  }

  // Extract hex color and alpha value
  const hexColor = match[1];
  const alpha = match[2];

  // Convert hex color to RGB
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  // Return the transformed rgba string
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getStyleDictionaryConfig(mode) {
  return {
    source: [
      "tokens/brand/product.json",
      "tokens/core/**/*.json",
      `tokens/mode/${mode}.json`,
    ],
    platforms: {
      ts: {
        transformGroup: "custom/js",
        buildPath: `build/${mode}/`,
        options: {
          showFileHeader: false,
        },
        files: [
          {
            format: "javascript/es6",
            destination: "index.ts"
          },
          {
            format: "typescript/es6-declarations",
            destination: "index.d.ts"
          },
        ],
      },
    },
  };
}

console.log("Build started...");

StyleDictionaryPackage.registerTransform({
  name: "color/rgba",
  type: "value",
  transitive: true,
  matcher: function (token) {
    // Box shadow rgba values are nested.
    if (token.type === "boxShadow") return token.value?.color?.startsWith("rgba");

    // Main color rgba values are not nested.
    return token.type === "color" && token.value?.startsWith("rgba");
  },
  transformer: function (token) {
    if (token.type === "boxShadow") {
      return {
        ...token.value,
        color: transformRgba(token.value.color),
      }
    }

    return transformRgba(token.value);
  },
});

StyleDictionaryPackage.registerTransformGroup({
  name: "custom/js",
  transforms: [
    "attribute/cti",
    "name/cti/pascal",
    "size/rem",
    "color/hex",
    "color/rgba",
  ],
});

["light", "dark"].map(function (mode) {
  console.log("\n==============================================");
  console.log(`\nBuilding: [${mode}]`);

  const StyleDictionary = StyleDictionaryPackage.extend(
    getStyleDictionaryConfig(mode)
  );

  StyleDictionary.buildPlatform("ts");

  console.log(`\nFinished building [${mode}]`);
});

console.log("\n==============================================");
console.log("\nBuild completed!");
