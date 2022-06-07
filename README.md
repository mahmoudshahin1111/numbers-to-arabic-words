# Numbers To Arabic Words

[![npm version](https://badge.fury.io/js/number-to-arabic-words.svg)](https://badge.fury.io/js/number-to-arabic-words)
![example workflow](https://github.com/mahmoudshahin1111/numbers-to-arabic-words/actions/workflows/.github/workflows/test.yml/badge.svg)

---

![Like That 👌](https://lh3.googleusercontent.com/pw/ACtC-3csUySSi5X3aOZ3cjYuwuDX1oUrxYUEJij3Bh-1AmMm2jlZBsu5tGoDjlvsTyubMJZHTZAKjK8iNBQm-UQacJef8GEcCDRtfLF0C5DRty8iLfhVKY7oAzCAoNZ4jqpcf88nG6KmNhkj-hrEqMLiiw2K=w1670-h693-no?authuser=0)

## Why do you Need to use it ?

- Easy installation

```html
<script src="https://cdn.jsdelivr.net/npm/number-to-arabic-words@latest/dist/index.js"></script>
```

- Based on Arabic number rules [Arabic Numbers Rules](https://www.fluentarabic.net/numbers-in-arabic/) المعجم
- Support points like that 100.52
- Can customized 🎒💻
- Support unlimited number length more than 100000000000000000000 "كوادرليون" 😲
- Passed all the unit tests
- Just only one function `toArabicWord(1000)` do this magic 👌

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

- You can change the config by using the global object `arabicWord` as example ..

```javascript
arabicWord.setConfig({
  delimiter: "/",
  strict: true,
});
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
