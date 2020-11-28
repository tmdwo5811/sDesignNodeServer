const fileService = require("../services/file.service");

fileService.getSoundList = jest.fn();

const getSoundList = fileService.getSoundList;

beforeEach(() => {
  getSoundList.mockClear();
});

const next = "sadnvjlasdovoasndcaweiogpavpmkoasd";

test("getSoundList TEST", () => {
  expect(1).toEqual(1);
});
