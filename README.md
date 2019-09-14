# flexi-path

## Flexible path builder and walker

[![Build Status](https://travis-ci.com/jaspenlind/flexi-path.svg?branch=master)](https://travis-ci.com/jaspenlind/flexi-path)
![GitHub top language](https://img.shields.io/github/languages/top/jaspenlind/flexi-path)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Coverage Status](https://coveralls.io/repos/jaspenlind/flexi-path/badge.svg?branch=master)](https://coveralls.io/r/jaspenlind/flexi-path?branch=master)
![David](https://img.shields.io/david/dev/jaspenlind/flexi-path)
[![GitHub Pages](https://img.shields.io/badge/api-docs-blue)](https://jaspenlind.github.io/flexi-path/)
![GitHub](https://img.shields.io/github/license/jaspenlind/flexi-path)
[![npm](https://img.shields.io/npm/v/flexi-path)](https://www.npmjs.com/package/flexi-path)

## Installation

`npm install "flexi-path"`

## Test

`npm test`

## Example

### Build paths

```ts
import flexi from "flexi-path";

const path = flexi.path("path").append("other");

const prependedPath = path.prepend("prepended");

const finalPath = prependedPath.prepend(__dirName).append("someFile.js");

finalPath.write();

//==> {cur dir}/prepended/path/other/someFile.js
```

### Walk paths

```ts
import flexi from "flexi-path";

const path = flexi.path("path/to/existing/file.js");

flexi.walk.forward(path);

//==> ["path", "to", "existing", "file.js"]

const existingPath = flexi.path("existing/path");
const completePath = existingPath.append("some/non/existing/parts");

const result = flexi.walk.back(restOfPath, { until: until.exists() });

//==> existing/path
```

### Compare paths

```ts
import flexi from "flexi-path";

const common = flexi.path("/common/root");
const first = flexi.path("first/path");
const second = flexi.path("second/path");

const diff = common.append(first).diff(common.append(second));

//==> [
first
second
]

const intersect = first.intersect(second);

//==> path

const except = first.except(second);

//==> first/second

const equals = flexi.path("path").equals("path");

//==> true

flexi.path("").isEmpty()

//==> true
```

### Manipulate paths

```ts
const path = flexi.path("one/two/three/four/five/six");

const reversed = path.reverse();

//==> six/five/four/three/two/one

const cut = reversed.cut(4);

//==> six/five

const flat = cut.flatten();

//==> [
	six
	five
]
```
