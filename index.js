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
const numbersWords = [
    'صفر',
    'احد',
    'اثن',
    'ثلاث',
    'اريع',
    'خمس',
    'ست',
    'سبع',
    'ثمان',
    'تسع',
    'عشر',
];
const delimiter = 'و';
fs.writeFileSync('output.txt', '');
const testCase = [1059, 2059, 14, 15, 16, 13, 18, 102, 100, 50, 68, 92, 91, 985, 850, 640, 599, 513, 25, 631, 10, 8, 5, 3, 1, 2, 0, 54, 168896555, 569875156987, 569875156987856];
testCase.forEach(number => {
    const word = toArabicWord(number);
    fs.appendFileSync('output.txt', word + '\n');
});
function toArabicWord(number) {
    // get number 
    // split number every 3 places
    // convert every part to words
    // print all number
    const parts = getNumberParts(number);
    const partsAsWords = convertPartsToWords(parts);
    const phase = joinPartsWithPrefixes(partsAsWords);
    return phase;
}
function getNumberParts(num) {
    // convert numbers array to parts every part has 3 numbers
    const parts = [];
    for (let i = num.toString().length - 1; i >= 0; i -= 3) {
        const part = [];
        for (let c = i; c > i - 3; c--) {
            part.push(Number(num.toString().charAt(c)));
        }
        parts.push(part);
    }
    return parts;
}
function convertPartsToWords(parts) {
    const words = [];
    for (let pI = 0; pI < parts.length; pI++) {
        words.push(convertPartToWord(parts[pI], pI));
    }
    return words;
}
function convertPartToWord(part, partPosition) {
    // translate every number based on position in the part (singular|tens|hundreds)
    if (partPosition === 1) {
        return convertThousandsPartToWord(part);
    }
    else if (partPosition === 2) {
        return convertMillionsPartToWord(part);
    }
    else if (partPosition === 3) {
        return convertBillionsPartToWord(part);
    }
    else {
        return convertHundredsPartToWord(part);
    }
}
function convertThousandsPartToWord(part) {
    let phase = '';
    if (!part[2] && !part[1]) {
        if (part[0] == 1) {
            phase = 'الف';
        }
        else if (part[0] == 2) {
            phase = 'الفان';
        }
    }
    else {
        if (part[2] > 0) {
            phase = `${convertNumberToWord(part[2], 2)}`;
            if (part[1] || part[0]) {
                phase += ` ${delimiter} `;
            }
        }
        if (part[0]) {
            phase += `${convertNumberToWord(part[0], 0)}`;
            if (part[1] > 1) {
                phase += ` ${delimiter} `;
            }
        }
        if (part[1]) {
            phase += `${convertNumberToWord(part[1], 1)}`;
        }
        phase = `${phase} الف`;
    }
    return phase;
}
function convertHundredsPartToWord(part) {
    let phase = '';
    if (part[2] > 0) {
        phase = `${convertNumberToWord(part[2], 2)}`;
        if (part[1] || part[0]) {
            phase += ` ${delimiter} `;
        }
    }
    if (part[0]) {
        phase += `${convertNumberToWord(part[0], 0)}`;
        if (part[1] > 1) {
            phase += ` ${delimiter} `;
        }
    }
    if (part[1]) {
        phase += `${convertNumberToWord(part[1], 1)}`;
    }
    return `${phase}`;
}
function convertMillionsPartToWord(part) {
    let phase = '';
    if (part[2] > 0) {
        phase = `${convertNumberToWord(part[2], 2)}`;
        if (part[1] || part[0]) {
            phase += ` ${delimiter} `;
        }
    }
    if (part[0]) {
        phase += `${convertNumberToWord(part[0], 0)}`;
        if (part[1] > 1) {
            phase += ` ${delimiter} `;
        }
    }
    if (part[1]) {
        phase += `${convertNumberToWord(part[1], 1)}`;
    }
    return `${phase} مليون`;
}
function convertBillionsPartToWord(part) {
    let phase = '';
    if (part[2] > 0) {
        phase = `${convertNumberToWord(part[2], 2)}`;
        if (part[1] || part[0]) {
            phase += ` ${delimiter} `;
        }
    }
    if (part[0]) {
        phase += `${convertNumberToWord(part[0], 0)}`;
        if (part[1] > 1) {
            phase += ` ${delimiter} `;
        }
    }
    if (part[1]) {
        phase += `${convertNumberToWord(part[1], 1)}`;
    }
    return `${phase} مليار`;
}
function convertNumberToWord(number, numberPosition) {
    let word = '';
    switch (numberPosition) {
        case 0:
            word = `${convertNumberWordToSingularWord(number)}`;
            break;
        case 1:
            word = `${convertNumberWordToTensWord(number)}`;
            break;
        case 2:
            word = `${convertNumberToHundredsWord(number)}`;
            break;
    }
    return word;
}
function convertNumberToHundredsWord(number) {
    // get number word and return new format based on position as in hundred position
    let word = numbersWords[number];
    switch (number) {
        case 0:
            word = ``;
            break;
        case 1:
            word = `مائه`;
            break;
        case 2:
            word = `مائتان`;
            break;
        default:
            word += `مائه`;
            break;
    }
    return word;
}
function convertNumberWordToTensWord(number) {
    let word = numbersWords[number];
    switch (number) {
        case 0:
            word = ``;
            break;
        case 1:
            word = ` عشر`;
            break;
        case 2:
            word = ` عشرون`;
            break;
        default:
            word += `ون`;
            break;
    }
    return word;
}
function convertNumberWordToSingularWord(number) {
    let word = numbersWords[number];
    switch (number) {
        case 0:
            word = ``;
            break;
        case 1:
            word = `و${word}`;
            break;
        case 2:
            word += `ان`;
            break;
    }
    return word;
}
function joinPartsWithPrefixes(parts) {
    return parts.reverse().join(` ${delimiter} `);
}
