import * as fs from "fs-extra";

const numbersWords = [
    "صفر",
    "احد",
    "اثن",
    "ثلاث",
    "اريع",
    "خمس",
    "ست",
    "سبع",
    "ثمان",
    "تسع",
    "عشر",
];
const delimiter = "و";

fs.writeFileSync("output.txt", "");
const testCase = [
    1059,
    2059,
    14,
    15,
    16,
    13,
    18,
    102,
    100,
    50,
    68,
    92,
    91,
    985,
    850,
    640,
    599,
    513,
    25,
    631,
    10,
    8,
    5,
    3,
    1,
    2,
    0,
    54,
    168896555,
    569875156987,
    569875156987856,
];
testCase.forEach((number) => {
    const word = toArabicWord(number);
    fs.appendFileSync("output.txt", word + "\n");
});

const TRANSFORM_LAYERS = [
    // DivideToParts
];


class LibInput {
    public parts: number[][] = [];
    public words:string[] = [];
    constructor(public input: number) {

    }
    getInputLength() {
        return this.input.toString().length;
    }
    getCharAt(i: number) {
        return this.input.toString().charAt(i);
    }

}
type TransformNextFunc = (input: LibInput) => LibInput;
interface ITransformLayer {
    execute: TransformNextFunc;
}
class TransformLayer implements ITransformLayer {
    protected nextLayer: TransformLayer = new TransformLayer();
    setNext(layer: TransformLayer): void {
        throw new Error("Method not implemented.");
    }
    protected next(input: LibInput): LibInput {
        throw new Error("Method not implemented.");
    }

    public execute(
        input: LibInput,
    ): LibInput {
        throw "No Execution Function";
    }

}

class DivideToParts extends TransformLayer {
    public execute(input: LibInput): LibInput {
        for (let i = input.getInputLength() - 1; i >= 0; i -= 3) {
            const part: number[] = [];
            for (let c = i; c > i - 3; c--) {
                part.push(Number(input.getCharAt(c)));
            }
            input.parts.push(part);
        }
        return this.next(input);
    }
}
class ConvertPartsToWords extends TransformLayer {
    public execute(input: LibInput): LibInput {
        for (let pI = 0; pI < input.parts.length; pI++) {
            input.words.push(convertPartToWord(input.parts[pI], pI));
        }
        return this.next(input);
    }

}
class JonPartWithPrefixed extends TransformLayer {
    public execute(input: LibInput): LibInput {
        return this.next(input);
    }

}

function toArabicWord(number: number) {
    // get number
    // split number every 3 places
    // convert every part to words
    // print all number
    let divideToParts = new DivideToParts();
    let convertPartsToWords = new ConvertPartsToWords();
    let joinPartWithPrefixed = new JonPartWithPrefixed();
    divideToParts.setNext(convertPartsToWords);
    convertPartsToWords.setNext(joinPartWithPrefixed);
    divideToParts.execute(new LibInput(number));
    // const partsAsWords = convertPartsToWords(parts);
    // const phase = joinPartsWithPrefixes(partsAsWords);
    return joinPartWithPrefixed;
}
// function getNumberParts(num: number): number[][] {
//   // convert numbers array to parts every part has 3 numbers

//   const parts: number[][] = [];
//   for (let i = num.toString().length - 1; i >= 0; i -= 3) {
//     const part: number[] = [];
//     for (let c = i; c > i - 3; c--) {
//       part.push(Number(num.toString().charAt(c)));
//     }
//     parts.push(part);
//   }
//   return parts;
// }

function convertPartToWord(part: number[], partPosition: number): string {
    // translate every number based on position in the part (singular|tens|hundreds)

    if (partPosition === 1) {
        return convertThousandsPartToWord(part);
    } else if (partPosition === 2) {
        return convertMillionsPartToWord(part);
    } else if (partPosition === 3) {
        return convertBillionsPartToWord(part);
    } else {
        return convertHundredsPartToWord(part);
    }
}
function convertThousandsPartToWord(part: number[]) {
    //TODO:: Code is repeated this not good practice
    let phase = "";
    if (!part[2] && !part[1]) {
        if (part[0] == 1) {
            phase = "الف";
        } else if (part[0] == 2) {
            phase = "الفان";
        }
    } else {
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
function convertHundredsPartToWord(part: number[]) {
    let phase = "";

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
function convertMillionsPartToWord(part: number[]) {
    let phase = "";
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
function convertBillionsPartToWord(part: number[]) {
    let phase = "";
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
function convertNumberToWord(number: number, numberPosition: number): string {
    let word = "";
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
function convertNumberToHundredsWord(number: number): string {
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
function convertNumberWordToTensWord(number: number): string {
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
function convertNumberWordToSingularWord(number: number): string {
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
function joinPartsWithPrefixes(parts: string[]) {
    return parts.reverse().join(` ${delimiter} `);
}
