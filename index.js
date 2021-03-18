"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs-extra"));
fs.writeFileSync("output.txt", "");
const testCase = [123, 200, 851, 502, 569, 214, 300, 501, 991];
testCase.forEach((number) => {
    const word = toArabicWord(number);
    fs.appendFileSync("output.txt", word + "\n");
});
function toArabicWord(num) {
    return getPartAsWord(num);
}
function getPartAsWord(num, delimiter = "و") {
    if (num >= 0 && num < 10) {
        return getSingularWord(num);
    }
    else if (num >= 10 && num < 99) {
        return getTensWord(num);
    }
    else if (num >= 100 && num < 1000) {
        let hundreds = Number(num.toString()[0]);
        let tens = Number(num % 100);
        let word = "";
        if (hundreds > 0) {
            word = ` ${getHundredsWord(hundreds)} `;
        }
        if (tens > 0) {
            word += `${delimiter} ${getTensWord(tens)} `;
        }
        return word;
    }
}
function getTensWord(num, delimiter = "و") {
    if (num >= 1 && num < 10) {
        return getSingularWord(num);
    }
    else if (num >= 10 && num < 12) {
        switch (num) {
            case 10:
                return "عشر";
            case 11:
                return "احدي عشر";
            case 12:
                return "اثنا عشر";
        }
    }
    else if (num >= 13 && num < 19) {
        const secondDigit = Number(num.toString()[1]);
        return `${getSingularWord(secondDigit)} عشر`;
    }
    else if (num >= 13 && num < 99) {
        let word = "";
        const firstDigit = Number(num.toString()[1]);
        const secondDigit = Number(num.toString()[0]);
        word = `${getSingularWord(firstDigit)} ${delimiter}`;
        switch (secondDigit) {
            case 2:
                word += "عشرون";
                break;
            default:
                word += `${getSingularWord(secondDigit)}ون`;
        }
        return word;
    }
    return "";
}
function getSingularWord(num) {
    let singularWord = "";
    switch (Number(num)) {
        case 0:
            singularWord = "صفر";
            break;
        case 1:
            singularWord = "واحد";
            break;
        case 2:
            singularWord = "اثنان";
            break;
        case 3:
            singularWord = "ثلاث";
            break;
        case 4:
            singularWord = "اربع";
            break;
        case 5:
            singularWord = "خمس";
            break;
        case 6:
            singularWord = "ست";
            break;
        case 7:
            singularWord = "سبع";
            break;
        case 8:
            singularWord = "ثمان";
            break;
        case 9:
            singularWord = "تسع";
            break;
    }
    return singularWord;
}
function getHundredsWord(num) {
    let hundredsWord = "";
    switch (Number(num)) {
        case 0:
            hundredsWord = "";
            break;
        case 1:
            hundredsWord = "مائه";
            break;
        case 2:
            hundredsWord = "مائتان";
            break;
        case 3:
            hundredsWord = "ثلاثمائه";
            break;
        case 4:
            hundredsWord = "اربعمائه";
            break;
        case 5:
            hundredsWord = "خمسمائه";
            break;
        case 6:
            hundredsWord = "ستمائه";
            break;
        case 7:
            hundredsWord = "سبعمائه";
            break;
        case 8:
            hundredsWord = "ثمانمائه";
            break;
        case 9:
            hundredsWord = "تسعمائه";
            break;
    }
    return hundredsWord;
}
