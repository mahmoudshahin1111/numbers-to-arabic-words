import {toArabicWord} from "./index";
import "jest";

describe("Testing To Arabic Word Module", () => {
  test("should translate numbers to arabic", () => {
    const mockNumbers = [
      {
        num: 100,
        translated: "مائة",
      },
      {
        num: 200,
        translated: "مائتان",
      },
      {
        num: 300,
        translated: "ثلاثمائة",
      },
      {
        num: 11000,
        translated: "إحدى عشر ألف",
      },
      {
        num: 2000000,
        translated: "مليونان",
      },
      {
        num: 102030,
        translated: "مائة و أثنان ألف و ثلاثون",
      },
      {
        num: 5000.65,
        translated: "خمس آلاف فاصل خمس و ستون",
      },
      {
        num: 200.23,
        translated: "مائتان فاصل ثلاث و عشرون",
      },
      {
        num: 1.0,
        translated: "واحد",
      },
      {
        num: 100.9568,
        translated: "مائة فاصل تسع آلاف و خمسمائة و ثمان و ستون",
      },
      {
        num: 100.52,
        translated: "مائة فاصل أثنان و خمسون",
      },
      {
        num: 99999999999,
        translated:
          "تسع و تسعون مليار و تسعمائة و تسع و تسعون مليون و تسعمائة و تسع و تسعون ألف و تسعمائة و تسع و تسعون",
      },
      {
        num: 100000000000000,
        translated: "مائة تليار",
      },
    ];

    for (const mockNumber of mockNumbers) {
      expect(toArabicWord(mockNumber.num)).toBe(mockNumber.translated);
    }
  });
});
