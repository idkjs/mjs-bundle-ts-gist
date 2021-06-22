# The easiest way to bundle a simple TypeScript web application via [@danieldietrich](https://twitter.com/danieldietrich)

## [gist](https://gist.github.com/danieldietrich/999abe1aaee11dcdf91d182807f7ee3f)

Packaging JavaScript applications can be a bit overwhelming. The popular project [uglifyjs](https://github.com/mishoo/UglifyJS) does not support ES6, it is cumbersome to configure the allmighty [Webpack](https://webpack.js.org), bundlers like [Parcel](https://parceljs.org) and [Microbundle](https://www.npmjs.com/package/microbundle) still have [bugs](https://github.com/parcel-bundler/parcel/issues/2820) or do not compile to ESM bundles that work in a browser. It is hard to figure out the best way to bundle an application.

Here I give a small example, how we achieve the goal using the

* [x] [TypeScript](https://www.typescriptlang.org) compiler
* [x] [rollup.js](https://rollupjs.org/) bundler
* [x] [terser](https://terser.org) mangler

**☕️ Prerequisites: Install [Node.js](https://nodejs.org/en/download/)**

## ✨ Feature overview

* [x] Zero configuration bundling (esm, umd)
* [x] Proper entry point hints for npm, unpkg and when used as module
* [x] Runs with `<script type='module'>` in a web page

## 🚀 Initialize Node.js project

Go to a new directory **say-hello/**

```zsh
npm init -y
```

Install dependencies

```zsh
npm i -D typescript rollup terser
```

Replace **package.json** "scripts" (umd name _sayHello_ is app specific)

```json
"scripts": {
  "clean": "rm -fr dist",
    "build": "npm run clean && npm run lint && tsc --project tsconfig.build.json && npm run bundle:esm && npm run bundle:esm:min && npm run bundle:umd && npm run bundle:umd:min && npm run build:stats",
    "build:stats": "(echo '\\033[35;3m' ; cd dist && ls -lh index*js index*gz | tail -n +2 | awk '{print $5,$9}')",
    "bundle:esm": "rollup dist/index.js --file dist/index.mjs --format esm",
    "bundle:esm:min": "terser --ecma 6 --compress --mangle --module -o dist/index.min.mjs -- dist/index.mjs && gzip -9 -c dist/index.min.mjs > dist/index.min.mjs.gz",
    "bundle:umd": "rollup dist/index.js --file dist/index.umd.js --format umd --name sayHello",
    "bundle:umd:min": "terser --ecma 6 --compress --mangle -o dist/index.umd.min.js -- dist/index.umd.js && gzip -9 -c dist/index.umd.min.js > dist/index.umd.min.js.gz",
},
```

Replace "main" in **package.json**

```diff
- "main": "index.js"
+ "main": "dist/index.js",
+ "module": "dist/index.min.mjs",
+ "unpkg": "dist/index.umd.min.js",
+ "types": "dist/index.d.ts",
+ "files": [
+   "dist"
+ ],
```

Create TypeScript configuration **tsconfig.json**

```json
{
  "compilerOptions": {
    "declaration": true,
    "lib": ["es6", "dom", "dom.iterable"],
    "module": "es6",
    "moduleResolution": "node",
    "removeComments": true,
    "sourceMap": true,
    "strict": true,
    "target": "es6",
    "outDir": "./dist"
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "dist",
    "node_modules"
  ]
}
```

Create test application **src/index.ts**

```ts
export function sayHello() {
    return "Hi ya all!";
}
```

Create a file **example/index.html**

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Say Hello</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="author" content="Daniel Dietrich">
    </head>
    <body>
        <noscript>
            You need to enable JavaScript to run this app.
        </noscript>
        <div id="app">
            Loading...
        </div>
        <script type="module">
            import { sayHello } from '../dist/index.mjs';
            document.getElementById('app').innerHTML = sayHello();
        </script>
    </body>
</html>
```

## 📦 Build the project

```
npm run build
```

![Bundle](https://user-images.githubusercontent.com/743833/66786641-63be9f00-eee1-11e9-9aa8-99b03789e1a2.gif)

## 🥰 Directly using an ESM bundle in a web page

Loading our example web page **example/index.html** (might require to [Disable Local File Restrictions](https://stackoverflow.com/questions/37001567/safari-does-not-have-disable-local-file-restrictions-option/37001883#37001883) in the browser)

<img width="616" alt="Example" src="https://user-images.githubusercontent.com/743833/66787271-54405580-eee3-11e9-97d1-763b3f281360.png">

The interesting part

```html
<script type="module">
    import { sayHello } from '../dist/index.mjs';
    document.getElementById('app').innerHTML = sayHello();
</script>
```

When published to [npmjs.com](https://www.npmjs.com), we can use the [unpkg.com](https://unpkg.com) CDN to include our module in a web page

```diff
<script type="module">
-   import { sayHello } from '../dist/index.mjs';
+   import { sayHello } from 'https://unpkg.com/say-hello?module';
    document.getElementById('app').innerHTML = sayHello();
</script>
```

[Written by [@danieldietrich](https://twitter.com/danieldietrich)]

# Builder.ts

[gist](https://gist.github.com/danieldietrich/dd352b89b00f4a8e77be01ab1ae22385) by [@danieldietrich](https://twitter.com/danieldietrich)

```sh
tsc src/example.ts && node src/example.js
```
