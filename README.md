# flexi-path

## Work with paths in a more flexible way

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
