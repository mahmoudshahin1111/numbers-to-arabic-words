"use strict";
// import * as fs from "fs-extra";
// fs.writeFileSync("output.txt", "");
// const testCase = [
//   123,
//   1123,
//   1000000,
//   999,
//   5689492285,
//   999999999999999,
//   200,
//   851,
//   8011,
//   8012,
//   8013,
//   8020,
//   1053,
//   502,
//   569,
//   214,
//   300,
//   501,
//   991,
//   989,
//   1000,
//   998,
//   999,
// ];
// testCase.forEach((number) => {
//   const word = toArabicWord(number);
//   fs.appendFileSync("output.txt", word + "\n");
// });
function toArabicWord(num, delimiter = " و ") {
    try {
        if (num >= 1000) {
            let numChars = num.toString().split("").reverse();
            let parts = [];
            for (let i = 0; i < numChars.length; i += 3) {
                let part = [];
                for (let j = i; j < i + 3; j++) {
                    part.push(numChars[j]);
                }
                parts.push(Number(part.reverse().join("")));
            }
            let word = "";
            // make possibilities for larger numbers
            if (parts[4] != null) {
                const numWord = `${getTrillionPartAsWord(parts[4])}`;
                if (word != "" && numWord != "") {
                    word += `${delimiter}${numWord}`;
                }
                else {
                    word += numWord;
                }
            }
            if (parts[3] != null) {
                const numWord = `${getBillionsPartAsWord(parts[3])}`;
                if (word != "" && numWord != "") {
                    word += `${delimiter}${numWord}`;
                }
                else {
                    word += numWord;
                }
            }
            if (parts[2] != null) {
                const numWord = `${getMillionsPartAsWord(parts[2])}`;
                if (word != "" && numWord != "") {
                    word += `${delimiter}${numWord}`;
                }
                else {
                    word += numWord;
                }
            }
            if (parts[1] != null) {
                const numWord = `${getThousandPartAsWord(parts[1])}`;
                if (word != "" && numWord != "") {
                    word += `${delimiter}${numWord}`;
                }
                else {
                    word += numWord;
                }
            }
            if (parts[0] != null) {
                const numWord = `${getHundredsPartAsWord(parts[0])}`;
                if (word != "" && numWord != "") {
                    word += `${delimiter}${numWord}`;
                }
                else {
                    word += numWord;
                }
            }
            return word.trim();
        }
        else {
            return getPartAsWord(num);
        }
    }
    catch (err) {
        console.log("number is not correct format", err);
    }
}
function getTrillionPartAsWord(num) {
    if (num === 0) {
        return "";
    }
    else if (num === 1) {
        return "بليون";
    }
    else if (num === 2) {
        return "بليونان";
    }
    else {
        return `${getPartAsWord(num)} بليون`;
    }
}
function getBillionsPartAsWord(num) {
    if (num === 0) {
        return "";
    }
    else if (num === 1) {
        return "مليار";
    }
    else if (num === 2) {
        return "ملياران";
    }
    else {
        return `${getPartAsWord(num)} مليار`;
    }
}
function getMillionsPartAsWord(num) {
    if (num === 0) {
        return "";
    }
    else if (num === 1) {
        return "مليون";
    }
    else if (num === 2) {
        return "مليونان";
    }
    else {
        return `${getPartAsWord(num)} مليون`;
    }
}
function getThousandPartAsWord(num) {
    if (num === 0) {
        return "";
    }
    else if (num === 1) {
        return "الف";
    }
    else if (num === 2) {
        return "الفان";
    }
    else {
        return `${getPartAsWord(num)} ألاف`;
    }
}
function getHundredsPartAsWord(num) {
    if (num === 0) {
        return "";
    }
    else {
        return getPartAsWord(num);
    }
}
function getPartAsWord(num, delimiter = " و ") {
    if (num >= 0 && num < 10) {
        return getSingularWord(num);
    }
    else if (num >= 10 && num < 99) {
        return getTensWord(num);
    }
    else if (num >= 100 && num < 1000) {
        let hundreds = Number(num.toString()[0]);
        let tens = Number(num.toString().slice(1, 3));
        console.log(tens);
        let word = "";
        if (hundreds > 0) {
            word = `${getHundredsWord(hundreds)}`;
        }
        if (tens > 0) {
            word += `${delimiter}${getTensWord(tens)}`;
        }
        return word;
    }
    return "";
}
function getTensWord(num, delimiter = " و ") {
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
    else if (num >= 13 && num < 20) {
        const secondDigit = Number(num.toString()[1]);
        return `${getSingularWord(secondDigit)} عشر`;
    }
    else if (num >= 20 && num < 100) {
        let word = "";
        const firstDigit = Number(num.toString()[1]);
        const secondDigit = Number(num.toString()[0]);
        if (firstDigit != 0) {
            word = `${getSingularWord(firstDigit)}${delimiter}`;
        }
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
    switch (num) {
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
    switch (num) {
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
