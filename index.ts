import * as fs from "fs-extra";

fs.writeFileSync("output.txt", "");
const testCase = [123, 200, 851, 502, 569, 214, 300, 501, 991];
testCase.forEach((number) => {
  const word = toArabicWord(number);
  fs.appendFileSync("output.txt", word + "\n");
});

function toArabicWord(num: number) {
  //TODO: split number parts every part has 3 numbers
  //TODO: parse every part.
  //TODO:  join parts with delimiter
  //TODO: set part title as ألف and stuff like that.
  return getPartAsWord(num);
}
function getPartAsWord(num: number, delimiter: string = "و") {
  if (num >= 0 && num < 10) {
    return getSingularWord(num);
  } else if (num >= 10 && num < 99) {
    return getTensWord(num);
  } else if (num >= 100 && num < 1000) {
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
function getTensWord(num: number, delimiter: string = "و"): string {
  if (num >= 1 && num < 10) {
    return getSingularWord(num);
  } else if (num >= 10 && num < 12) {
    switch (num) {
      case 10:
        return "عشر";
      case 11:
        return "احدي عشر";
      case 12:
        return "اثنا عشر";
    }
  } else if (num >= 13 && num < 19) {
    const secondDigit = Number(num.toString()[1]);
    return `${getSingularWord(secondDigit)} عشر`;
  } else if (num >= 13 && num < 99) {
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
function getSingularWord(num: number): string {
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

function getHundredsWord(num: number): string {
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
