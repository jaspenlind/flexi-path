module.exports = {
  out: "./docs",
  readme: "none",
  name: "flexi-path",
  theme: "default",
  exclude: ["test/**/*"], // , "src/lib/*"
  mode: "file",
  // entryPoint: "Flexi",
  excludeExternals: true,
  // excludeNotExported: true,
  // excludePrivate: true,
  "external-aliases": ["external", "internalapi"]
};
