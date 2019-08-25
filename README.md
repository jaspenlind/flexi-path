# flexi-path

## Work with paths in a more flexible way

[![Build Status](https://travis-ci.com/jaspenlind/flexi-path.svg?branch=master)](https://travis-ci.com/jaspenlind/flexi-path)
![GitHub top language](https://img.shields.io/github/languages/top/jaspenlind/flexi-path)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![GitHub](https://img.shields.io/github/license/jaspenlind/flexi-path)

### Usage

```js
const path = FlexiPath("/Rootdir/Level1/Level2")

const root = path.parent().parent()

const index = root.files.find(x => x.base === "index.js")

//==> /Rootdir/index.js
```

```js
const path = FlexiPath("/Rootdir/Level1/file/some/invalid/path/segments")

const navigator = closestValidPath({ ignoreFileExtensions: true })

const validPath = navigator.navigate(path)

//==> /Rootdir/Level1/file.js
```
