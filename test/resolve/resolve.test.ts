// import { join, ParsedPath } from "path";

it("should move to different test", () => {
  test.todo("todo");
});
// import flexi, { NavigationState, ResolveOptions } from "../../src";
// import testData from "../jest/createTestData";

// describe("resolve", () => {
//   it("can resolve with predicate", () => {
//     const path = flexi.path("/fictional/path/with/file.js");
//     const expected = flexi.path("/fictional/path/");

//     const result = flexi.resolve(path, { predicate: x => x.name === "path" });

//     expect(result).toHaveMatchingMembersOf(expected);
//   });

//   it("should be empty when predicate does not match", () => {
//     const path = flexi.path("dummy");

//     const result = flexi.resolve(path, {
//       predicate: x => x.root === "invalid"
//     });

//     expect(result).toBe(flexi.empty());
//   });

//   it("can resolve with navigate skip override", () => {
//     const path = flexi.path("/fictional/path/with/file.js");
//     const expected = flexi.path("/fictional/");

//     const predicate = (x: ParsedPath) => x.name === "path";
//     const onNavigate = (x: ParsedPath) => ({
//       state:
//         x.name === "fictional" ? NavigationState.Found : NavigationState.Skip
//     });

//     const result = flexi.resolve(path, { onNavigate, predicate });

//     expect(result).toHaveMatchingMembersOf(expected);
//   });

//   it("can abort", () => {
//     const path = flexi.path("/fictional/path/with/file.js");

//     const result = flexi.resolve(path, {
//       onNavigate: () => ({
//         state: NavigationState.Abort
//       }),
//       predicate: () => false
//     });

//     expect(result).toBe(flexi.empty());
//   });

//   it("can return directory with predicate", () => {
//     const subFolderName = "resolve-subFolder-predicate";
//     const subOfSubName = join(subFolderName, "subOfSubFolder");
//     testData.createDirectory(subFolderName);
//     testData.createFile("resolve.t", subFolderName);
//     testData.createDirectory(subOfSubName);

//     const path = flexi.path(join(testData.testDir, subOfSubName));
//     const expected = flexi.path(join(testData.testDir, subFolderName, "/"));

//     const options: ResolveOptions = {
//       predicate: current => {
//         return (
//           current.name === subFolderName &&
//           flexi
//             .path(current.path)
//             .files()
//             .find(x => x.base === "resolve.t") !== undefined
//         );
//       }
//     };

//     expect(flexi.resolve(path, options)).toHaveMatchingMembersOf(expected);
//   });

//   it("can report all levels in a path", () => {
//     const path = flexi.path("one/two/three");

//     const onNavigate = jest.fn(() => ({
//       state: NavigationState.Default
//     }));

//     flexi.resolve(path, {
//       onNavigate,
//       predicate: () => false
//     });

//     expect(onNavigate.mock.calls).toHaveLength(3);
//   });
// });
