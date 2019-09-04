# flexi-path

=======================

## Flexible path builder and walker

[![Build Status](https://travis-ci.com/jaspenlind/flexi-path.svg?branch=master)](https://travis-ci.com/jaspenlind/flexi-path)
![GitHub top language](https://img.shields.io/github/languages/top/jaspenlind/flexi-path)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Coverage Status](https://coveralls.io/repos/jaspenlind/flexi-path/badge.svg?branch=master)](https://coveralls.io/r/jaspenlind/flexi-path?branch=master)
![David](https://img.shields.io/david/dev/jaspenlind/flexi-path)
![GitHub](https://img.shields.io/github/license/jaspenlind/flexi-path)

## Installation

`npm install "flexi-path"`

## Test

`npm test`


## Example

### Get files in currect directory

```ts
import flexi from "flexi-path";

const currentPath = flexi.path(__dirname);

const files = currentPath.files();

//==> [...]
```

### Append paths to an existing path

```ts
import flexi from "flexi-path";

const path = flexi.path("root");

const otherPath = flexi.path("other");

const deeperPath = path
  .append(otherPath)
  .append("deeper")
  .append("path");

//=> root/deeper/path
```

#### Navigate with predicate

```ts
import flexi from "flexi-path";

const path = flexi
  .path("/Rootdir/Level1/Level2")
  .prepend("/another")
  .parent(x => x.name === "Level1");

//==> /another/Rootdir/Level1
```

#### Find first valid path

```ts
import flexi, { pathExists } from "flexi-path";

const invalidPath = flexi,path("/Rootdir/Level1/file/some/invalid/path/segments")

const validPath = flexi.resolve(invalidPath, unitilExists());

//==> /Rootdir/Level1/file

const exists = validPath.exists();
```
