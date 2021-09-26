import flexi from "../../src";
import testData from "../jest/createTestData";

describe("path", () => {
  describe("write", () => {
    const root = flexi.path(testData.testDir);

    it("should exist after write", () => {
      const path = root.append("path-write/");

      path.write();

      expect(path.exists()).toBe(true);
    });

    it("should throw when path is invalid", () => {
      expect(() => {
        flexi.path("invalid").write();
      }).toThrow();
    });

    it("should write directory when path looks like a directory", () => {
      const path = root.append("writedir/");
      path.write();
      expect(path.exists()).toBeTrue();
    });

    it("should write file when path looks like a file", () => {
      const path = root.append("write-file.js").write();

      expect(path.exists()).toBeTrue();
    });

    it("should write file and a directory when path is new", () => {
      const path = root.append("write-new-path/write-new-file.jsx");
      path.write();

      expect(path.exists()).toBeTrue();
    });

    it("should write all nested directories in the path", () => {
      const deepPath = root.append("/a/litter/deeper/").append("path");
      deepPath.write();

      expect(deepPath.exists()).toBeTrue();
    });

    it("should write content to file", () => {
      const content =
        // eslint-disable-next-line max-len
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempor dictum tempus. Nullam eget consectetur nisi, vitae facilisis lacus. Donec vitae faucibus est. Nunc eu nisl elementum, vehicula tellus vitae, efficitur augue. Cras vehicula velit vitae enim dapibus posuere. Pellentesque ac molestie lectus. Pellentesque magna lectus, porttitor ut interdum id, vestibulum eget urna. Mauris magna velit, sodales a laoreet sed, hendrerit sed lectus. Vivamus vitae arcu in enim luctus dapibus quis aliquet mi. Sed aliquam sed sem a pharetra. Pellentesque eu mauris convallis, rutrum arcu in, tempor purus. Curabitur porta non sem a imperdiet. Aliquam erat volutpat.";

      const file = root.append("write-with-content.txt").write(content);

      expect(file.read()).not.toBeEmpty();
    });

    it("can overwrite existing file", () => {
      const file = root.append("write-overwrite-existing.js").write("first");

      const updatedFile = file.write("second", { overwrite: true });

      expect(updatedFile.read()).toBe("second");
    });

    it("should throw when file already exist", () => {
      const file = root.append("write-thow-when-exist.js").write("first");

      expect(() => {
        file.write("second");
      }).toThrow();
    });
  });
});
