import _ from "lodash";
import { Config, ProcessResult } from "./types";

export class ArabicWordConfig {
  private config: Config = {
    delimiter: "فاصل",
    numberSectionsDelimiter: "و",
    tensPrefix: "ون",
  };
  overrideConfig(config: Config): void {
    this.config = Object.assign(this.config, config);
  }
  getAll() {
    return this.config;
  }
}

export class NumberSection {
  numbers: { [key: string]: string } = {
    "0": "صفر",
    "1": "واحد",
    "2": "أثنان",
    "3": "ثلاث",
    "4": "أربع",
    "5": "خمس",
    "6": "ست",
    "7": "سبع",
    "8": "ثمان",
    "9": "تسع",
    "10": "عشر",
    "11": "إحدى عشر",
    "12": "إثنا عشر",
    "20": "عشرون",
    "100": "مائة",
    "200": "مائتان",
    "1e3": "ألف",
    "2e3": "ألفين",
    "3e3-1e4": "آلاف",
    "1e4+": "ألف",
    "1e6": "مليون",
    "2e6": "مليونان",
    "3e6-1e7": "ملاين",
    "1e7+": "مليون",
    "1e9": "مليار",
    "2e9": "ملياران",
    "3e9-1e10": "مليارات",
    "1e10+": "مليار",
    "1e12": "تليار",
    "2e12": "تلياران",
    "3e12-1e13": "تليارات",
    "1e13+": "تليار",
  };
  constructor(private arabicWordConfig: ArabicWordConfig) {}
  process(num: string) {
    return this.processSection(num).reverse();
  }
  private processSection(section: string) {
    const parts = this.splitIntoParts(section);
    let partsAsWords: string[] = [];
    parts.forEach((p, i) => {
      let wordForPart = null;
      if (i === 0) {
        wordForPart = this.getWordForHundredsPart(p);
      } else {
        wordForPart = this.getWordByNumberSectionIndex(p, i);
      }
      if (wordForPart) {
        partsAsWords.push(wordForPart);
      }
    });
    return partsAsWords;
  }
  private splitIntoParts(word: string): string[] {
    const parts: string[] = [];
    let counter = word.length - 1;
    while (true) {
      let part =
        (word[counter - 2] != null ? word[counter - 2] : "0") +
        (word[counter - 1] != null ? word[counter - 1] : "0") +
        (word[counter] != null ? word[counter] : "0");
      parts.push(part);
      if (counter < 0) {
        break;
      }
      counter -= 3;
    }

    return parts;
  }
  private getWordForHundredsPart(part: string): string | null {
    let partWord = this.getWordForPart(part);
    return partWord;
  }
  private getWordByNumberSectionIndex(
    part: string,
    numberSectionIndex: number
  ): string | null {
    const partAsNumber = Number(part);
    let word = null;
    if (partAsNumber == 0) {
      word = null;
    } else if (partAsNumber == 1) {
      word = this.numbers[`1e${numberSectionIndex * 3}`];
    } else if (partAsNumber == 2) {
      word = this.numbers[`2e${numberSectionIndex * 3}`];
    } else {
      let partWord = this.getWordForPart(part) + " ";
      if (partAsNumber >= 3 && partAsNumber <= 10) {
        word = partWord +=
          this.numbers[
            `3e${numberSectionIndex * 3}-1e${numberSectionIndex * 3 + 1}`
          ];
      } else if (partAsNumber >= 11) {
        word = partWord += this.numbers[`1e${numberSectionIndex * 3 + 1}+`];
      }
    }
    return word;
  }

  private getWordForPart(part: string): string | null {
    const n_0 = part[0];
    const n_1 = part[1];
    const n_2 = part[2];
    let n_1Word = null;
    let n_0Word = null;
    let nGroup_0 = null;
    let nGroupNum = null;
    nGroup_0 = n_1 + n_2;
    nGroupNum = Number(nGroup_0);
    n_0Word = this.getWordForHundreds(n_0);
    if (nGroupNum == 0) {
      return n_0Word;
    }
    n_1Word = this.getWordForTens(nGroup_0);
    if (n_0Word) {
      return (
        n_0Word +
        (" " + this.arabicWordConfig.getAll().numberSectionsDelimiter + " ") +
        n_1Word
      );
    }
    return n_1Word;
  }
  private getWordForHundreds(char: string): string | null {
    const charNum = Number(char);
    let word = null;
    if (charNum == 1) {
      word = this.numbers[100];
    } else if (charNum == 2) {
      word = this.numbers[200];
    } else if (charNum >= 3 && charNum <= 9) {
      word = this.getWordFromThreeHundredToNineHundred(char);
    }
    return word;
  }

  private getWordFromThreeHundredToNineHundred(char: string) {
    return this.numbers[char] + this.numbers[100];
  }
  private getWordForTens(tensGroup: string): string | null {
    const tensNum = Number(tensGroup);
    if (tensNum == 0) {
      return this.numbers[0];
    } else if (tensNum >= 1 && tensNum <= 12) {
      return this.numbers[tensNum];
    } else if (tensNum >= 13 && tensNum <= 19) {
      return this.getWordFromThirteenToNineTeen(tensGroup);
    } else if (tensNum >= 20 && tensNum <= 99) {
      return this.getWordFromTwentyToNinetyNine(tensGroup);
    }
    return null;
  }

  private getWordFromThirteenToNineTeen(numGroup: string) {
    return this.numbers[numGroup[1]] + " " + this.numbers[10];
  }
  private getWordFromTwentyToNinetyNine(tensGroup: string) {
    const tensChar = tensGroup[0];
    const singularChar = tensGroup[1];
    const tensNum = Number(tensChar);
    const singularNum = Number(singularChar);
    let tensWord = null;
    let singularWord = null;
    if (tensNum == 2) {
      tensWord = this.numbers[20];
    } else if (tensNum >= 3 && tensNum <= 9) {
      tensWord =
        this.numbers[tensChar] + this.arabicWordConfig.getAll().tensPrefix;
    }
    if (singularNum == 0) {
      return tensWord;
    } else if (tensNum >= 1 && tensNum <= 2) {
      singularWord = this.numbers[singularChar];
    } else if (tensNum >= 3 && tensNum <= 9) {
      singularWord = this.numbers[singularChar];
    } else if (tensNum === 10) {
      singularWord = this.numbers[tensNum];
    } else if (tensNum >= 11 && tensNum <= 12) {
      singularWord = this.numbers[tensGroup];
    } else if (tensNum >= 13 && tensNum <= 19) {
      singularWord = this.getWordFromThirteenToNineTeen(tensGroup);
    }
    return (
      singularWord +
      (singularWord
        ? " " + this.arabicWordConfig.getAll().numberSectionsDelimiter + " "
        : "") +
      tensWord
    );
  }
}

export class ArabicWord {
  private config: ArabicWordConfig = new ArabicWordConfig();
  private numberSection: NumberSection = new NumberSection(this.config);
  private delimiter = "و";
  constructor(config?: Config) {
    if (config) {
      this.setConfig(config);
    }
  }
  /**
   * override the library config for example the delimiter and the result type
   * @param config {Config}
   * @returns
   */
  setConfig(config: Config) {
    this.config.overrideConfig(config);
    return this;
  }
  /**
   *
   * @param num {number} transform the number to arabic words
   * @returns
   */
  process(num: number): string | ProcessResult {
    const sections: string[] = this.splitIntoSections(num);
    if (this.config.getAll().strict) {
      const result: ProcessResult = {} as any;

      if (!!sections[0]) {
        result.base = this.numberSection
          .process(sections[0])
          .join(` ${this.delimiter} `);
      }
      if (!!sections[1]) {
        result.delimiter = this.config.getAll().delimiter;
        result.reminder = this.numberSection
          .process(sections[1])
          .join(` ${this.delimiter} `);
      }
      return result;
    } else {
      const resultInStringSections = [];
      if (!!sections[0]) {
        const leftSide = this.numberSection.process(sections[0]);
        resultInStringSections.push(leftSide.join(` ${this.delimiter} `));
      }
      if (!!sections[1]) {
        const rightSide = this.numberSection.process(sections[1]);
        resultInStringSections.push(rightSide.join(` ${this.delimiter} `));
      }
      return resultInStringSections.join(` ${this.config.getAll().delimiter} `);
    }
  }
  create() {
    return new ArabicWord();
  }
  private splitIntoSections(num: number): string[] {
    return num.toString().split(".");
  }
}

export const arabicWord = new ArabicWord();
export function toArabicWord(number: number): string | ProcessResult {
  return arabicWord.process(number);
}
