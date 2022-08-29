[![npm version](https://badge.fury.io/js/number-to-arabic-words.svg)](https://badge.fury.io/js/number-to-arabic-words)
![example workflow](https://github.com/mahmoudshahin1111/numbers-to-arabic-words/actions/workflows/.github/workflows/test.yml/badge.svg)

# Numbers To Arabic Words
is a library to transform the numbers into Arabic words without any external dependencies and it's so fast and stable because it's build in typescript.

# Why do you Need to use it ?

-   Supporting Browser and NodeJs .
-   Easy installation .
-   Unlimited Updates and Support .
-   Made by 💖 to be Free forever .
-   Based on Arabic number rules [Arabic Numbers Rules](https://www.fluentarabic.net/numbers-in-arabic/) المعجم
-   Support points like that 100.52
-   Customizable 🎒💻
-   Support unlimited number length more than 100000000000000000000 "كوادرليون" 😲
-   Just only one function `toArabicWord(1000)` do this magic 👌

## How To Install ?
### Browser
```html
<script src="https://cdn.jsdelivr.net/npm/number-to-arabic-words@latest/dist/index.js"></script>
<script>
    toArabicWord(1000)
</script>
```
### Npm
```bash
    npm i number-to-arabic-words
```
### Yarn
```bash
    yarn add number-to-arabic-words
```
### NodeJs

```javascript
const NumbersToArabicWords = require('dist/index-node.js')
NumbersToArabicWords.toArabicWord(1000)
```

### Examples

| Number                   | Result                                     |
| ------------------------ | ------------------------------------------ |
| `toArabicWord(1000)`     | ألف                                        |
| `toArabicWord(100000)`   | مائه ألف                                   |
| `toArabicWord(2000000)`  | مليونان                                    |
| `toArabicWord(102030)`   | مائه و أثنان ألف و ثلاثون                  |
| `toArabicWord(5000.65)`  | خمس آلاف فاصل خمس و ستون                   |
| `toArabicWord(200.23)`   | مائتان فاصل ثلاث و عشرون                   |
| `toArabicWord(1.00)`     | مائة فاصل تسع آلاف و خمسمائة و ثمان و ستون |
| `toArabicWord(100.9568)` | مائة فاصل تسع آلاف و خمسمائة و ثمان و ستون |
| `toArabicWord(100.52)`   | مائه فاصل أثنان و خمسون                    |

## Advanced

-   You can change the config by using the global object `arabicWord` as example ..

```javascript
arabicWord.setConfig({
    delimiter: '/',
    strict: true,
})
```

#### All the options

|     | Option                  | Type    | Description                                          |
| --- | ----------------------- | ------- | ---------------------------------------------------- |
| 1   | delimiter               | string  | you can change instead of "فاصل" to be anything else |
| 2   | strict                  | boolean | get the result as Json                               |
| 3   | numberSectionsDelimiter | string  | change "و" to be anything else                       |

## More

[Docs](https://mahmoudshahin1111.github.io/numbers-to-arabic-words/)

Please Let me know about any bug or feature and consider it done.
Thank you 😍🚀💖 ..
