"use strict";
const exports = {};
exports.toArabicWord = void 0;
var ArabicWord = /** @class */ (function () {
    function ArabicWord() {
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
    }
    ArabicWord.prototype.processing = function (num) {
        var _this = this;
        var parts = this.splitIntoParts(num);
        var partsAsWords = [];
        parts.forEach(function (p, i) {
            var wordForPart = null;
            if (i === 0) {
                wordForPart = _this.getWordForHundredsPart(p);
            }
            else if (i === 1) {
                wordForPart = _this.getWordForThousandsPart(p);
            }
            else if (i === 2) {
                wordForPart = _this.getWordForMillionsPart(p);
            }
            else if (i === 3) {
                wordForPart = _this.getWordForBillionsPart(p);
            }
            else if (i === 4) {
                wordForPart = _this.getWordForTrillionsPart(p);
            }
            if (wordForPart) {
                partsAsWords.push(wordForPart);
            }
        });
        return partsAsWords.reverse().join(this.delimiter);
    };
    ArabicWord.prototype.splitIntoParts = function (word) {
        var parts = [];
        var counter = word.length - 1;
        while (true) {
            var part = (word[counter - 2] != null ? word[counter - 2] : "0") +
                (word[counter - 1] != null ? word[counter - 1] : "0") +
                (word[counter] != null ? word[counter] : "0");
            parts.push(part);
            if (counter < 0) {
                break;
            }
            counter -= 3;
        }
        return parts;
    };
    ArabicWord.prototype.getWordForHundredsPart = function (part) {
        var partWord = this.getWordForPart(part);
        return partWord;
    };
    ArabicWord.prototype.getWordForThousandsPart = function (part) {
        var partAsNumber = Number(part);
        var word = null;
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
    };
    ArabicWord.prototype.getWordForThousand = function () {
        return "ألف";
    };
    ArabicWord.prototype.getWordForTwoThousand = function () {
        return "ألفين";
    };
    ArabicWord.prototype.getWordFromThreeToTenThousands = function () {
        return "آلاف";
    };
    ArabicWord.prototype.getWordForGreaterThanTenThousands = function () {
        return "ألف";
    };
    // Millions
    ArabicWord.prototype.getWordForMillionsPart = function (part) {
        var partAsNumber = Number(part);
        var word = null;
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
            var partWord = this.getWordForPart(part) + " ";
            if (partAsNumber >= 3 && partAsNumber <= 10) {
                word = partWord += this.getWordFromThreeToTenMillions();
            }
            else if (partAsNumber >= 11) {
                word = partWord += this.getWordForGreaterThanTenMillions();
            }
        }
        return word;
    };
    ArabicWord.prototype.getWordForMillion = function () {
        return "مليون";
    };
    ArabicWord.prototype.getWordForTwoMillion = function () {
        return "مليونان";
    };
    ArabicWord.prototype.getWordFromThreeToTenMillions = function () {
        return "ملاين";
    };
    ArabicWord.prototype.getWordForGreaterThanTenMillions = function () {
        return "مليون";
    };
    //
    // Billions
    ArabicWord.prototype.getWordForBillionsPart = function (part) {
        var partAsNumber = Number(part);
        var word = null;
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
            var partWord = this.getWordForPart(part) + " ";
            if (partAsNumber >= 3 && partAsNumber <= 10) {
                word = partWord += this.getWordFromThreeToTenBillions();
            }
            else if (partAsNumber >= 11) {
                word = partWord += this.getWordForGreaterThanTenBillions();
            }
        }
        return word;
    };
    ArabicWord.prototype.getWordForBillion = function () {
        return "مليار";
    };
    ArabicWord.prototype.getWordForTwoBillion = function () {
        return "ملياران";
    };
    ArabicWord.prototype.getWordFromThreeToTenBillions = function () {
        return "مليارات";
    };
    ArabicWord.prototype.getWordForGreaterThanTenBillions = function () {
        return "مليار";
    };
    //
    // Trillions
    ArabicWord.prototype.getWordForTrillionsPart = function (part) {
        var partAsNumber = Number(part);
        var word = null;
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
            var partWord = this.getWordForPart(part) + " ";
            if (partAsNumber >= 3 && partAsNumber <= 10) {
                word = partWord += this.getWordFromThreeToTenTrillions();
            }
            else if (partAsNumber >= 11) {
                word = partWord += this.getWordForGreaterThanTenTrillions();
            }
        }
        return word;
    };
    ArabicWord.prototype.getWordForTrillion = function () {
        return "تليار";
    };
    ArabicWord.prototype.getWordForTwoTrillion = function () {
        return "تلياران";
    };
    ArabicWord.prototype.getWordFromThreeToTenTrillions = function () {
        return "تليارات";
    };
    ArabicWord.prototype.getWordForGreaterThanTenTrillions = function () {
        return "تليار";
    };
    //
    ArabicWord.prototype.getWordForPart = function (part) {
        var n_0 = part[0];
        var n_1 = part[1];
        var n_2 = part[2];
        var n_1Word = null;
        var n_0Word = null;
        var nGroup_0 = null;
        var nGroupNum = null;
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
    };
    ArabicWord.prototype.getWordForHundreds = function (char) {
        var charNum = Number(char);
        var word = null;
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
    };
    ArabicWord.prototype.getWordFromThreeHundredToNineHundred = function (char) {
        return this.getWordFromThreeToNine(char) + this.getWordForOneHundred();
    };
    ArabicWord.prototype.getWordForTens = function (tensGroup) {
        var tensNum = Number(tensGroup);
        var n0 = tensGroup[0];
        var n1 = tensGroup[1];
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
    };
    ArabicWord.prototype.getWordFromOneToTwo = function (char) {
        return this.numbers[char];
    };
    ArabicWord.prototype.getWordFromThreeToNine = function (char) {
        return this.numbers[char];
    };
    ArabicWord.prototype.getWordFromThirteenToNineTeen = function (numGroup) {
        var prefix = this.getWordForTen();
        var n1Word = this.getWordFromThreeToNine(numGroup[1]);
        return n1Word + " " + prefix;
    };
    ArabicWord.prototype.getWordFromTwentyToNinetyNine = function (tensGroup) {
        var tensChar = tensGroup[0];
        var singularChar = tensGroup[1];
        var tensNum = Number(tensChar);
        var singularNum = Number(singularChar);
        var tensWord = null;
        var singularWord = null;
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
    };
    ArabicWord.prototype.getWordFromElevenToTwelve = function (char) {
        if (char === "11") {
            return this.getWordForEleven();
        }
        else if (char === "12") {
            return this.getWordForTwelve();
        }
        return null;
    };
    ArabicWord.prototype.getWordForTwoHundred = function () {
        return "مائتان";
    };
    ArabicWord.prototype.getWordForOneHundred = function () {
        return "مائة";
    };
    ArabicWord.prototype.getWordForTen = function () {
        return "عشر";
    };
    ArabicWord.prototype.getWordForEleven = function () {
        return "إحدى عشر";
    };
    ArabicWord.prototype.getWordForTwelve = function () {
        return "إثنا عشر";
    };
    ArabicWord.prototype.getWordForTwenty = function () {
        return "عشرون";
    };
    return ArabicWord;
}());
var arabicWord = new ArabicWord();
var toArabicWord = function (number) {
    return arabicWord.processing(number.toString());
};
exports.toArabicWord = toArabicWord;
