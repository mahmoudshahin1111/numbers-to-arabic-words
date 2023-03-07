import { arabicWord, toArabicWord } from "./index";
import "jest";
import { Config } from "./types";

describe("Testing To Arabic Word Module", () => {
  test("should translate numbers to arabic", () => {
    const newArabicWordObject = arabicWord.create();
    const mockNumbers = [
      {
        num: 0,
        translated: "صفر",
      },
      {
        num: 0.12,
        translated: "صفر فاصل إثنا عشر",
      },
      {
        num: 10.11,
        translated: "عشرة فاصل إحدى عشر",
      },
      {
        num: 10,
        translated: "عشرة",
      },
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
        num: 2.1,
        translated: "أثنان فاصل واحد",
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
        translated: "مائة بليون",
      },
      {
        num: 100000000000000000,
        translated: "مائة تريليون",
      },
      {
        num: 999999999999999,
        translated: "تسعمائة و تسع و تسعون بليون و تسعمائة و تسع و تسعون مليار و تسعمائة و تسع و تسعون مليون و تسعمائة و تسع و تسعون ألف و تسعمائة و تسع و تسعون",
      },
      {
        num: 100000000000000000000,
        translated: "مائة كوادرليون",
      },
    ];

    for (const mockNumber of mockNumbers) {
      expect(newArabicWordObject.process(mockNumber.num)).toBe(mockNumber.translated);
    }
  });

  it("should be able to change the delimiter", () => {
    const newArabicWordObject = arabicWord.create();
    const config: Config = {
      delimiter: "/",
    };
    newArabicWordObject.setConfig(config);
    const units = [
      {
        num: 100,
        result: "مائة",
      },
      {
        num: 100.11,
        result: "مائة / إحدى عشر",
      },
    ];
    for (const unit of units) {
      const result = newArabicWordObject.process(unit.num);
      expect(result).toBe(unit.result);
    }
  });
  it("should be able to got the result in json type", () => {
    const newArabicWordObject = arabicWord.create();
    newArabicWordObject.setConfig({
      strict: true,
    });
    const units = [
      {
        num: 100.50,
        result: {
          base: "مائة",
          delimiter: "فاصل",
          reminder: "خمس",
        },
      },
    ];
    for (const unit of units) {
      expect(unit.result).toEqual(newArabicWordObject.process(unit.num));
    }
  });

});
