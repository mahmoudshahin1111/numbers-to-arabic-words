class ArabicWord {
  numbers: { [key: string]: string } = {
    "0": "صفر",
    "1": "واحد",
    "2": "اثنان",
    "3": "ثلاث",
    "4": "اربع",
    "5": "خمس",
    "6": "ست",
    "7": "سبع",
    "8": "ثمان",
    "9": "تسع",
    "10": "عشر",
    "11": "احد عشر",
    "12": "اثنا عشر",
    "20": "عشرون",
    "100": "مئه",
    "1000": "الف",
    "1000000": "مليون",
    "1000000000": "مليار",
    "1000000000000": "بليون",
    "1000000000000000": "دشليون",
  };
  tensPrefix = "ون";
  nounPrefix = "ان";
  delimiter = " و ";
  constructor() {}

  processing(num: string): string {
    const parts = this.splitIntoParts(num);
    let partsAsWords: string[] = [];
    parts.forEach((p) => {
      const wP = this.getWordForPart(p);
      if (wP) {
        partsAsWords.push(wP);
      }
    });
    return partsAsWords.join(this.delimiter);
  }
  private splitIntoParts(word: string): string[] {
    console.log(word);

    return [word];
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
    return n_0Word + this.delimiter + n_1Word;
  }
  private getWordForHundreds(char: string) {
    const charNum = Number(char);
    if (charNum == 1) {
      return this.getWordForOneHundred();
    } else if (charNum == 2) {
      return this.getWordForTwoHundred();
    } else {
      return this.getWordFromThreeHundredToNineHundred(char);
    }
  }
  private getWordForTwoHundred() {
    const prefix = "ت" + this.nounPrefix;
    return this.getWordForOneHundred() + prefix;
  }
  private getWordForOneHundred() {
    return this.numbers[100];
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
      return this.getWordForTen(tensGroup);
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
  private getWordForTen(char: string) {
    return this.numbers[char];
  }
  private getWordFromElevenToTwelve(char: string) {
    return this.numbers[char];
  }
  private getWordFromThirteenToNineTeen(numGroup: string) {
    const n0 = numGroup[0];
    const n1 = numGroup[1];
    const prefix = this.getWordForTen(numGroup);
    const n1Word = this.getWordFromThreeToNine(n1);
    return n1Word + this.delimiter + prefix;
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
      singularWord = this.getWordForTen(singularChar);
    } else if (tensNum >= 11 && tensNum <= 12) {
      singularWord = this.getWordFromElevenToTwelve(tensGroup);
    } else if (tensNum >= 13 && tensNum <= 19) {
      singularWord = this.getWordFromThirteenToNineTeen(tensGroup);
    }
    return singularWord + this.delimiter + tensWord;
  }
  private getWordForTwenty() {
    return this.numbers[20];
  }
}

const arabicWord = new ArabicWord();
let word = arabicWord.processing("869");
console.log(word);
word = arabicWord.processing("100");
console.log(word);
word = arabicWord.processing("200");
console.log(word);
word = arabicWord.processing("102");
console.log(word);
