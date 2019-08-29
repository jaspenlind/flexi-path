# flexi-path

## Work with paths in a more flexible way

[![Build Status](https://travis-ci.com/jaspenlind/flexi-path.svg?branch=master)](https://travis-ci.com/jaspenlind/flexi-path)
![GitHub top language](https://img.shields.io/github/languages/top/jaspenlind/flexi-path)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Coverage Status](https://coveralls.io/repos/jaspenlind/flexi-path/badge.svg?branch=master)](https://coveralls.io/r/jaspenlind/flexi-path?branch=master)
![David](https://img.shields.io/david/dev/jaspenlind/flexi-path)
![GitHub](https://img.shields.io/github/license/jaspenlind/flexi-path)

### Usage

#### Get files in currect directory
```ts
import flexi from "flexi";

const currentPath = flexi.path(__dirname);

const files = currentPath.files();

//==> [...]
```

#### Build dynamic path
```ts
import flexi from "flexi";

const path = flexi.path("root");

const deeperPath = path.subDirectories("deeper").subDirectories("path");

//=> root/deeper/path

```

#### Get directory with conditions
```ts
import flexi from "flexi";

const path = flexi.path("/Rootdir/Level1/Level2");

const root = path.parent().parent();

const index = root.files.find(x => x.base === "index.js");

//==> /Rootdir/index.js
```

#### Find first valid path
```ts
import flexi, { pathExists } from "flexi";

const invalidPath = flexi,path("/Rootdir/Level1/file/some/invalid/path/segments")

const validPath = flexi.resolve(invalidPath, pathExists());

//==> /Rootdir/Level1/file

const exists = validPath.exists();
```
