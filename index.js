"use strict";
var exports = {};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toArabicWord = void 0;
class ArabicWord {
    constructor() {
        this.numbers = {
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
        };
        this.tensPrefix = "ون";
        this.delimiter = " و ";
        this.sectionsDelimiter = " فاصل ";
    }
    processing(num) {
        // split word parts by dots to 2 sections
        // process every section without dependant on each other.
        const sections = this.splitIntoSections(num);
        let sectionBeforePoint = [];
        let sectionAfterPoint = [];
        let phases = [];
        if (sections[0] != null && sections[0] != undefined) {
            sectionBeforePoint = this.processSection(sections[0]);
            if (sectionBeforePoint.length > 0) {
                phases.push(sectionBeforePoint.reverse().join(this.delimiter));
            }
        }
        if (sections[1] != null && sections[1] != undefined) {
            sectionAfterPoint = this.processSection(sections[1]);
            if (sectionAfterPoint.length > 0) {
                phases.push(sectionAfterPoint.reverse().join(this.delimiter));
            }
        }
        return phases.join(this.sectionsDelimiter);
    }
    processSection(section) {
        const parts = this.splitIntoParts(section);
        let partsAsWords = [];
        parts.forEach((p, i) => {
            let wordForPart = null;
            if (i === 0) {
                wordForPart = this.getWordForHundredsPart(p);
            }
            else if (i === 1) {
                wordForPart = this.getWordForThousandsPart(p);
            }
            else if (i === 2) {
                wordForPart = this.getWordForMillionsPart(p);
            }
            else if (i === 3) {
                wordForPart = this.getWordForBillionsPart(p);
            }
            else if (i === 4) {
                wordForPart = this.getWordForTrillionsPart(p);
            }
            if (wordForPart) {
                partsAsWords.push(wordForPart);
            }
        });
        return partsAsWords;
    }
    splitIntoSections(num) {
        return num.split(".", 2);
    }
    splitIntoParts(word) {
        const parts = [];
        let counter = word.length - 1;
        while (true) {
            let part = (word[counter - 2] != null ? word[counter - 2] : "0") +
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
    getWordForHundredsPart(part) {
        let partWord = this.getWordForPart(part);
        return partWord;
    }
    getWordForThousandsPart(part) {
        const partAsNumber = Number(part);
        let word = null;
        if (partAsNumber == 0) {
            word = null;
        }
        else if (partAsNumber == 1) {
            word = this.getWordForThousand();
        }
        else if (partAsNumber == 2) {
            word = this.getWordForTwoThousand();
        }
        else {
            word = this.getWordForPart(part) + " ";
            if (partAsNumber >= 3 && partAsNumber <= 10) {
                word += this.getWordFromThreeToTenThousands();
            }
            else if (partAsNumber >= 11) {
                word += this.getWordForGreaterThanTenThousands();
            }
        }
        return word;
    }
    getWordForThousand() {
        return "ألف";
    }
    getWordForTwoThousand() {
        return "ألفين";
    }
    getWordFromThreeToTenThousands() {
        return "آلاف";
    }
    getWordForGreaterThanTenThousands() {
        return "ألف";
    }
    // Millions
    getWordForMillionsPart(part) {
        const partAsNumber = Number(part);
        let word = null;
        if (partAsNumber == 0) {
            word = null;
        }
        else if (partAsNumber == 1) {
            word = this.getWordForMillion();
        }
        else if (partAsNumber == 2) {
            word = this.getWordForTwoMillion();
        }
        else {
            let partWord = this.getWordForPart(part) + " ";
            if (partAsNumber >= 3 && partAsNumber <= 10) {
                word = partWord += this.getWordFromThreeToTenMillions();
            }
            else if (partAsNumber >= 11) {
                word = partWord += this.getWordForGreaterThanTenMillions();
            }
        }
        return word;
    }
    getWordForMillion() {
        return "مليون";
    }
    getWordForTwoMillion() {
        return "مليونان";
    }
    getWordFromThreeToTenMillions() {
        return "ملاين";
    }
    getWordForGreaterThanTenMillions() {
        return "مليون";
    }
    //
    // Billions
    getWordForBillionsPart(part) {
        const partAsNumber = Number(part);
        let word = null;
        if (partAsNumber == 0) {
            word = null;
        }
        else if (partAsNumber == 1) {
            word = this.getWordForBillion();
        }
        else if (partAsNumber == 2) {
            word = this.getWordForTwoBillion();
        }
        else {
            let partWord = this.getWordForPart(part) + " ";
            if (partAsNumber >= 3 && partAsNumber <= 10) {
                word = partWord += this.getWordFromThreeToTenBillions();
            }
            else if (partAsNumber >= 11) {
                word = partWord += this.getWordForGreaterThanTenBillions();
            }
        }
        return word;
    }
    getWordForBillion() {
        return "مليار";
    }
    getWordForTwoBillion() {
        return "ملياران";
    }
    getWordFromThreeToTenBillions() {
        return "مليارات";
    }
    getWordForGreaterThanTenBillions() {
        return "مليار";
    }
    //
    // Trillions
    getWordForTrillionsPart(part) {
        const partAsNumber = Number(part);
        let word = null;
        if (partAsNumber == 0) {
            word = null;
        }
        else if (partAsNumber == 1) {
            word = this.getWordForTrillion();
        }
        else if (partAsNumber == 2) {
            word = this.getWordForTwoTrillion();
        }
        else {
            let partWord = this.getWordForPart(part) + " ";
            if (partAsNumber >= 3 && partAsNumber <= 10) {
                word = partWord += this.getWordFromThreeToTenTrillions();
            }
            else if (partAsNumber >= 11) {
                word = partWord += this.getWordForGreaterThanTenTrillions();
            }
        }
        return word;
    }
    getWordForTrillion() {
        return "تليار";
    }
    getWordForTwoTrillion() {
        return "تلياران";
    }
    getWordFromThreeToTenTrillions() {
        return "تليارات";
    }
    getWordForGreaterThanTenTrillions() {
        return "تليار";
    }
    //
    getWordForPart(part) {
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
    getWordForHundreds(char) {
        const charNum = Number(char);
        let word = null;
        if (charNum == 1) {
            word = this.getWordForOneHundred();
        }
        else if (charNum == 2) {
            word = this.getWordForTwoHundred();
        }
        else if (charNum >= 3 && charNum <= 9) {
            word = this.getWordFromThreeHundredToNineHundred(char);
        }
        return word;
    }
    getWordFromThreeHundredToNineHundred(char) {
        return this.getWordFromThreeToNine(char) + this.getWordForOneHundred();
    }
    getWordForTens(tensGroup) {
        const tensNum = Number(tensGroup);
        const n0 = tensGroup[0];
        const n1 = tensGroup[1];
        if (tensNum == 0) {
            return this.numbers[0];
        }
        else if (tensNum >= 1 && tensNum <= 2) {
            return this.getWordFromOneToTwo(n1);
        }
        else if (tensNum >= 3 && tensNum <= 9) {
            return this.getWordFromThreeToNine(n1);
        }
        else if (tensNum === 10) {
            return this.getWordForTen();
        }
        else if (tensNum >= 11 && tensNum <= 12) {
            return this.getWordFromElevenToTwelve(tensGroup);
        }
        else if (tensNum >= 13 && tensNum <= 19) {
            return this.getWordFromThirteenToNineTeen(tensGroup);
        }
        else if (tensNum >= 20 && tensNum <= 99) {
            return this.getWordFromTwentyToNinetyNine(tensGroup);
        }
        return null;
    }
    getWordFromOneToTwo(char) {
        return this.numbers[char];
    }
    getWordFromThreeToNine(char) {
        return this.numbers[char];
    }
    getWordFromThirteenToNineTeen(numGroup) {
        const prefix = this.getWordForTen();
        const n1Word = this.getWordFromThreeToNine(numGroup[1]);
        return n1Word + " " + prefix;
    }
    getWordFromTwentyToNinetyNine(tensGroup) {
        const tensChar = tensGroup[0];
        const singularChar = tensGroup[1];
        const tensNum = Number(tensChar);
        const singularNum = Number(singularChar);
        let tensWord = null;
        let singularWord = null;
        if (tensNum == 2) {
            tensWord = this.getWordForTwenty();
        }
        else if (tensNum >= 3 && tensNum <= 9) {
            tensWord = this.getWordFromThreeToNine(tensChar) + this.tensPrefix;
        }
        if (singularNum == 0) {
            return tensWord;
        }
        else if (tensNum >= 1 && tensNum <= 2) {
            singularWord = this.getWordFromOneToTwo(singularChar);
        }
        else if (tensNum >= 3 && tensNum <= 9) {
            singularWord = this.getWordFromThreeToNine(singularChar);
        }
        else if (tensNum === 10) {
            singularWord = this.getWordForTen();
        }
        else if (tensNum >= 11 && tensNum <= 12) {
            singularWord = this.getWordFromElevenToTwelve(tensGroup);
        }
        else if (tensNum >= 13 && tensNum <= 19) {
            singularWord = this.getWordFromThirteenToNineTeen(tensGroup);
        }
        return singularWord + this.delimiter + tensWord;
    }
    getWordFromElevenToTwelve(char) {
        if (char === "11") {
            return this.getWordForEleven();
        }
        else if (char === "12") {
            return this.getWordForTwelve();
        }
        return null;
    }
    getWordForTwoHundred() {
        return "مائتان";
    }
    getWordForOneHundred() {
        return "مائة";
    }
    getWordForTen() {
        return "عشر";
    }
    getWordForEleven() {
        return "إحدى عشر";
    }
    getWordForTwelve() {
        return "إثنا عشر";
    }
    getWordForTwenty() {
        return "عشرون";
    }
}
const arabicWord = new ArabicWord();
const toArabicWord = function (number) {
    return arabicWord.processing(number.toString());
};
exports.toArabicWord = toArabicWord;
