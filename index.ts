import * as fs from 'fs-extra';


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
const testCase = [1059,14, 15, 16, 13, 18, 102, 100, 50, 68, 92, 91, 985, 850, 640, 599, 513, 25, 631, 10, 8, 5, 3, 1, 2, 0, 54, 168896555, 569875156987, 569875156987856];
testCase.forEach(number => {
    const word = toArabicWord(number);
    fs.appendFileSync('output.txt', word + '\n');
});



function toArabicWord(number: number) {
    // get number 
    // split number every 3 places
    // convert every part to words
    // print all number
    const parts = getNumberParts(number);
    const partsAsWords = convertPartsToWords(parts);
    const phase = joinPartsWithPrefixes(partsAsWords);
    return phase;
}
function getNumberParts(num: number): number[][] {
    // convert numbers array to parts every part has 3 numbers

    const parts: number[][] = [];
    for (let i = num.toString().length - 1; i >= 0; i -= 3) {
        const part: number[] = [];
        for (let c = i; c > i - 3; c--) {
            part.push(Number(num.toString().charAt(c)));
        }
        parts.push(part);
    }
    return parts;
}



function convertPartsToWords(parts: number[][]): string[] {
    const words: string[] = [];
    for (let pI = 0; pI < parts.length; pI++) {
        words.push(convertPartToWord(parts[pI], pI));
    }
    return words;
}
function convertPartToWord(part: number[], partPosition: number): string {
    // translate every number based on position in the part (singular|tens|hundreds)
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

    return phase;
}
function convertNumberToWord(number: number, numberPosition: number): string {

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
    let phase = ''
    if (parts[4]) {
        phase += `${parts[4]} دشيليون ${delimiter}`;
    }
    if (parts[3]) {
        phase += `${parts[3]} مليار ${delimiter}`;
    }
    if (parts[2]) {
        phase += `${parts[2]} مليون ${delimiter}`;
    }
    if (parts[1]) {
        phase += `${parts[1]} الف ${delimiter}`;
    }
    phase += `${parts[0]}`;
    return phase;

}