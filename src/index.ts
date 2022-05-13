import _ from "lodash";

interface Config {
  sectionDelimiter?: {
    value?: string;
    asHtml?: boolean;
    customClass?: string;
  };
  asHtml?: boolean;
  customClass?: string;
}

class ArabicWordConfig {
  private config: Config = {
    sectionDelimiter: {
      value: "فاصل",
    },
  };
  overrideConfig(config: Config): void {
    this.config = Object.assign(config);
  }
  getAll() {
    return this.config;
  }
}

class Phase {
  sections: string[] = [];
  constructor(private arabicWordConfig: ArabicWordConfig) {}
  join() {
    let connectedPhase: string = "";
    this.sections.forEach((section, i) => {
      connectedPhase += section;
      if (i !== this.sections.length - 1) {
        connectedPhase += this.arabicWordConfig.getAll().sectionDelimiter.asHtml
          ? ` ${this.convertToHtml(
              this.arabicWordConfig.getAll().sectionDelimiter.value,
              this.arabicWordConfig.getAll().sectionDelimiter.customClass
            )} `
          : ` ${this.arabicWordConfig.getAll().sectionDelimiter.value} `;
      }
    });

    return this.arabicWordConfig.getAll().asHtml
      ? this.convertToHtml(
          connectedPhase,
          this.arabicWordConfig.getAll().customClass
        )
      : connectedPhase;
  }
  convertToHtml(section: string, customClass?: string): string {
    let result = "";
    const elAttribute: { [key: string]: string } = {};
    customClass ? elAttribute.class = customClass : null;
    result = `<span ${Object.keys(elAttribute).map(
      (elAKey) => ` ${elAKey}="${elAttribute[elAKey]}" `
    )}>${section}`;
    result += "</span>";
    return result;
  }
  reset() {
    this.sections = [];
  }
}

class ArabicWord {
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
  };
  tensPrefix = "ون";
  delimiter = " و ";
  private config: ArabicWordConfig = new ArabicWordConfig();
  private phase: Phase;
  constructor(config?: Config) {
    if (config) {
      this.setConfig(config);
    }
    this.phase = new Phase(this.config);
  }
  setConfig(config: Config) {
    this.config.overrideConfig(config);
    return this;
  }
  processing(num: string): string {
    // split word parts by dots to 2 sections
    // process every section without dependant on each other.
    const sections: string[] = this.splitIntoSections(num);
    let sectionBeforePoint: string[] = [];
    let sectionAfterPoint: string[] = [];
    this.phase.reset();
    if (sections[0] != null && sections[0] != undefined) {
      sectionBeforePoint = this.processSection(sections[0]);
      if (sectionBeforePoint.length > 0) {
        this.phase.sections.push(
          sectionBeforePoint.reverse().join(this.delimiter)
        );
      }
    }
    if (sections[1] != null && sections[1] != undefined) {
      sectionAfterPoint = this.processSection(sections[1]);
      if (sectionAfterPoint.length > 0) {
        this.phase.sections.push(
          sectionAfterPoint.reverse().join(this.delimiter)
        );
      }
    }
    return this.phase.join();
  }

  private processSection(section: string) {
    const parts = this.splitIntoParts(section);
    let partsAsWords: string[] = [];
    parts.forEach((p, i) => {
      let wordForPart = null;
      if (i === 0) {
        wordForPart = this.getWordForHundredsPart(p);
      } else if (i === 1) {
        wordForPart = this.getWordForThousandsPart(p);
      } else if (i === 2) {
        wordForPart = this.getWordForMillionsPart(p);
      } else if (i === 3) {
        wordForPart = this.getWordForBillionsPart(p);
      } else if (i === 4) {
        wordForPart = this.getWordForTrillionsPart(p);
      }
      if (wordForPart) {
        partsAsWords.push(wordForPart);
      }
    });
    return partsAsWords;
  }
  private splitIntoSections(num: string): string[] {
    return num.split(".", 2);
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
  private getWordForThousandsPart(part: string): string | null {
    const partAsNumber = Number(part);
    let word = null;
    if (partAsNumber == 0) {
      word = null;
    } else if (partAsNumber == 1) {
      word = this.getWordForThousand();
    } else if (partAsNumber == 2) {
      word = this.getWordForTwoThousand();
    } else {
      word = this.getWordForPart(part) + " ";
      if (partAsNumber >= 3 && partAsNumber <= 10) {
        word += this.getWordFromThreeToTenThousands();
      } else if (partAsNumber >= 11) {
        word += this.getWordForGreaterThanTenThousands();
      }
    }
    return word;
  }
  private getWordForThousand() {
    return "ألف";
  }
  private getWordForTwoThousand() {
    return "ألفين";
  }
  private getWordFromThreeToTenThousands() {
    return "آلاف";
  }
  private getWordForGreaterThanTenThousands() {
    return "ألف";
  }

  // Millions

  private getWordForMillionsPart(part: string): string | null {
    const partAsNumber = Number(part);
    let word = null;
    if (partAsNumber == 0) {
      word = null;
    } else if (partAsNumber == 1) {
      word = this.getWordForMillion();
    } else if (partAsNumber == 2) {
      word = this.getWordForTwoMillion();
    } else {
      let partWord = this.getWordForPart(part) + " ";
      if (partAsNumber >= 3 && partAsNumber <= 10) {
        word = partWord += this.getWordFromThreeToTenMillions();
      } else if (partAsNumber >= 11) {
        word = partWord += this.getWordForGreaterThanTenMillions();
      }
    }
    return word;
  }
  private getWordForMillion() {
    return "مليون";
  }
  private getWordForTwoMillion() {
    return "مليونان";
  }
  private getWordFromThreeToTenMillions() {
    return "ملاين";
  }
  private getWordForGreaterThanTenMillions() {
    return "مليون";
  }
  //

  // Billions

  private getWordForBillionsPart(part: string): string | null {
    const partAsNumber = Number(part);
    let word = null;
    if (partAsNumber == 0) {
      word = null;
    } else if (partAsNumber == 1) {
      word = this.getWordForBillion();
    } else if (partAsNumber == 2) {
      word = this.getWordForTwoBillion();
    } else {
      let partWord = this.getWordForPart(part) + " ";
      if (partAsNumber >= 3 && partAsNumber <= 10) {
        word = partWord += this.getWordFromThreeToTenBillions();
      } else if (partAsNumber >= 11) {
        word = partWord += this.getWordForGreaterThanTenBillions();
      }
    }
    return word;
  }
  private getWordForBillion() {
    return "مليار";
  }
  private getWordForTwoBillion() {
    return "ملياران";
  }
  private getWordFromThreeToTenBillions() {
    return "مليارات";
  }
  private getWordForGreaterThanTenBillions() {
    return "مليار";
  }
  //

  // Trillions

  private getWordForTrillionsPart(part: string): string | null {
    const partAsNumber = Number(part);
    let word = null;
    if (partAsNumber == 0) {
      word = null;
    } else if (partAsNumber == 1) {
      word = this.getWordForTrillion();
    } else if (partAsNumber == 2) {
      word = this.getWordForTwoTrillion();
    } else {
      let partWord = this.getWordForPart(part) + " ";
      if (partAsNumber >= 3 && partAsNumber <= 10) {
        word = partWord += this.getWordFromThreeToTenTrillions();
      } else if (partAsNumber >= 11) {
        word = partWord += this.getWordForGreaterThanTenTrillions();
      }
    }
    return word;
  }
  private getWordForTrillion() {
    return "تليار";
  }
  private getWordForTwoTrillion() {
    return "تلياران";
  }
  private getWordFromThreeToTenTrillions() {
    return "تليارات";
  }
  private getWordForGreaterThanTenTrillions() {
    return "تليار";
  }
  //
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
      return n_0Word + this.delimiter + n_1Word;
    }
    return n_1Word;
  }
  private getWordForHundreds(char: string): string | null {
    const charNum = Number(char);
    let word = null;
    if (charNum == 1) {
      word = this.getWordForOneHundred();
    } else if (charNum == 2) {
      word = this.getWordForTwoHundred();
    } else if (charNum >= 3 && charNum <= 9) {
      word = this.getWordFromThreeHundredToNineHundred(char);
    }
    return word;
  }

  private getWordFromThreeHundredToNineHundred(char: string) {
    return this.getWordFromThreeToNine(char) + this.getWordForOneHundred();
  }
  private getWordForTens(tensGroup: string): string | null {
    const tensNum = Number(tensGroup);
    const n0 = tensGroup[0];
    const n1 = tensGroup[1];
    if (tensNum == 0) {
      return this.numbers[0];
    } else if (tensNum >= 1 && tensNum <= 2) {
      return this.getWordFromOneToTwo(n1);
    } else if (tensNum >= 3 && tensNum <= 9) {
      return this.getWordFromThreeToNine(n1);
    } else if (tensNum === 10) {
      return this.getWordForTen();
    } else if (tensNum >= 11 && tensNum <= 12) {
      return this.getWordFromElevenToTwelve(tensGroup);
    } else if (tensNum >= 13 && tensNum <= 19) {
      return this.getWordFromThirteenToNineTeen(tensGroup);
    } else if (tensNum >= 20 && tensNum <= 99) {
      return this.getWordFromTwentyToNinetyNine(tensGroup);
    }
    return null;
  }
  private getWordFromOneToTwo(char: string): string {
    return this.numbers[char];
  }
  private getWordFromThreeToNine(char: string) {
    return this.numbers[char];
  }

  private getWordFromThirteenToNineTeen(numGroup: string) {
    const prefix = this.getWordForTen();
    const n1Word = this.getWordFromThreeToNine(numGroup[1]);
    return n1Word + " " + prefix;
  }
  private getWordFromTwentyToNinetyNine(tensGroup: string) {
    const tensChar = tensGroup[0];
    const singularChar = tensGroup[1];
    const tensNum = Number(tensChar);
    const singularNum = Number(singularChar);
    let tensWord = null;
    let singularWord = null;
    if (tensNum == 2) {
      tensWord = this.getWordForTwenty();
    } else if (tensNum >= 3 && tensNum <= 9) {
      tensWord = this.getWordFromThreeToNine(tensChar) + this.tensPrefix;
    }
    if (singularNum == 0) {
      return tensWord;
    } else if (tensNum >= 1 && tensNum <= 2) {
      singularWord = this.getWordFromOneToTwo(singularChar);
    } else if (tensNum >= 3 && tensNum <= 9) {
      singularWord = this.getWordFromThreeToNine(singularChar);
    } else if (tensNum === 10) {
      singularWord = this.getWordForTen();
    } else if (tensNum >= 11 && tensNum <= 12) {
      singularWord = this.getWordFromElevenToTwelve(tensGroup);
    } else if (tensNum >= 13 && tensNum <= 19) {
      singularWord = this.getWordFromThirteenToNineTeen(tensGroup);
    }
    return singularWord + this.delimiter + tensWord;
  }
  private getWordFromElevenToTwelve(char: string): string | null {
    if (char === "11") {
      return this.getWordForEleven();
    } else if (char === "12") {
      return this.getWordForTwelve();
    }
    return null;
  }
  private getWordForTwoHundred() {
    return "مائتان";
  }
  private getWordForOneHundred() {
    return "مائة";
  }
  private getWordForTen() {
    return "عشر";
  }
  private getWordForEleven() {
    return "إحدى عشر";
  }
  private getWordForTwelve() {
    return "إثنا عشر";
  }
  private getWordForTwenty() {
    return "عشرون";
  }
}

export const arabicWord = new ArabicWord();
export function toArabicWord(number: Number): string {
  return arabicWord.processing(number.toString());
}
