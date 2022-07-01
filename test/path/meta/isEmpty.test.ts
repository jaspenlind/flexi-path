import { isEmpty } from "../../../src/lib/path/meta";
import flexi from "../../../src";
import { constants } from "../../../src/lib/path";

describe("path", () => {
  describe("meta", () => {
    describe("isEmpty", () => {
      const emptyPath = "";
      it("should be true when path is empty", () => {
        expect(isEmpty(emptyPath)).toBeTrue();
      });

      it("should be true when path is empty FlexiPath", () => {
        expect(isEmpty(flexi.path(emptyPath))).toBeTrue();
      });

      it("should be true when basePath is empty FlexiPath and path is empty FlexiPath", () => {
        expect(
          isEmpty({
            basePath: flexi.path(emptyPath),
            path: flexi.path(emptyPath)
          })
        ).toBeTrue();
      });

      it("should be true when basePath is empty FlexiPath and path is empty", () => {
        expect(
          isEmpty({
            basePath: flexi.path(emptyPath),
            path: emptyPath
          })
        ).toBeTrue();
      });

      it("should be true when basePath is empty and path is empty FlexiPath", () => {
        const payload = {
          basePath: emptyPath,
          path: flexi.path(emptyPath)
        };

        expect(isEmpty(payload)).toBeTrue();
      });

      it("should be true when basePath is empty and path is empty", () => {
        expect(isEmpty({ basePath: emptyPath, path: emptyPath })).toBeTrue();
      });

      it("should be true when path is empty()", () => {
        expect(isEmpty(constants.empty)).toBeTrue();
      });

      it("should be false when path is not empty", () => {
        expect(isEmpty(flexi.path("notempty"))).toBeFalse();
      });
    });
  });
});
