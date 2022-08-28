/*!
 * NumberToArabicWords (https://mahmoudshahin1111.github.io/numbers-to-arabic-words/)
 * Copyright 2022 The NumberToArabicWords Authors (https://github.com/mahmoudshahin1111/numbers-to-arabic-words/contributors)
 * Licensed under MIT (https://github.com/mahmoudshahin1111/numbers-to-arabic-words/blob/master/LICENSE)
 */

!(function () {
    'use strict'
    var e = {}
    !(function (e, r) {
        Object.defineProperty(r, '__esModule', { value: !0 }),
            (r.toArabicWord =
                r.arabicWord =
                r.ArabicWord =
                r.NumberSection =
                r.ArabicWordConfig =
                    void 0)
        var i = (function () {
            function e() {
                ;(this.config = {
                    delimiter: 'فاصل',
                    numberSectionsDelimiter: 'و',
                    get tensPrefix() {
                        return 'ون'
                    },
                }),
                    (this.numbers = {
                        0: 'صفر',
                        1: 'واحد',
                        2: 'أثنان',
                        3: 'ثلاث',
                        4: 'أربع',
                        5: 'خمس',
                        6: 'ست',
                        7: 'سبع',
                        8: 'ثمان',
                        9: 'تسع',
                        10: 'عشر',
                        11: 'إحدى عشر',
                        12: 'إثنا عشر',
                        20: 'عشرون',
                        100: 'مائة',
                        200: 'مائتان',
                        '1e3': 'ألف',
                        '2e3': 'ألفين',
                        '3e3-1e4': 'آلاف',
                        '1e4+': 'ألف',
                        '1e6': 'مليون',
                        '2e6': 'مليونان',
                        '3e6-1e7': 'ملاين',
                        '1e7+': 'مليون',
                        '1e9': 'مليار',
                        '2e9': 'ملياران',
                        '3e9-1e10': 'مليارات',
                        '1e10+': 'مليار',
                        '1e12': 'بليون',
                        '2e12': 'بليونان',
                        '3e12-1e13': 'بلايين',
                        '1e13+': 'بليون',
                        '1e15': 'تريليون',
                        '2e15': 'تريليونان',
                        '2e15-1e16': 'تريليونات',
                        '1e16+': 'تريليون',
                        '1e18': 'كوادرليون',
                        '2e18': 'كوادرليونان',
                        '2e18-1e19': 'كوادرليونات',
                        '1e19+': 'كوادرليون',
                    })
            }
            return (
                (e.prototype.overrideConfig = function (e) {
                    delete e.tensPrefix,
                        e.delimiter &&
                            (e.delimiter = e.delimiter.replace(' ', '')),
                        e.numberSectionsDelimiter &&
                            (e.numberSectionsDelimiter =
                                e.numberSectionsDelimiter.replace(' ', '')),
                        (this.config = Object.assign(this.config, e))
                }),
                (e.prototype.getAll = function () {
                    return this.config
                }),
                e
            )
        })()
        r.ArabicWordConfig = i
        var t = (function () {
            function e(e) {
                this.arabicWordConfig = e
            }
            return (
                (e.prototype.process = function (e) {
                    return this.processSection(e).reverse()
                }),
                (e.prototype.processSection = function (e) {
                    var r = this,
                        i = this.splitIntoParts(e),
                        t = []
                    return (
                        i.forEach(function (e, i) {
                            var n = r.getWordByNumberSectionIndex(e, i)
                            n && t.push(n)
                        }),
                        t
                    )
                }),
                (e.prototype.splitIntoParts = function (e) {
                    for (var r = [], i = e.length - 1; ; ) {
                        var t =
                            (null != e[i - 2] ? e[i - 2] : '0') +
                            (null != e[i - 1] ? e[i - 1] : '0') +
                            (null != e[i] ? e[i] : '0')
                        if ((r.push(t), i < 0)) break
                        i -= 3
                    }
                    return r
                }),
                (e.prototype.getWordByNumberSectionIndex = function (e, r) {
                    var i = Number(e),
                        t = null
                    if (0 == r) t = this.getWordForPart(e)
                    else if (1 == i)
                        t = this.arabicWordConfig.numbers['1e'.concat(3 * r)]
                    else if (2 == i)
                        t = this.arabicWordConfig.numbers['2e'.concat(3 * r)]
                    else {
                        var n = this.getWordForPart(e) + ' '
                        i >= 3 && i <= 10
                            ? (t = n +=
                                  this.arabicWordConfig.numbers[
                                      '3e'
                                          .concat(3 * r, '-1e')
                                          .concat(3 * r + 1)
                                  ])
                            : i >= 11 &&
                              (t = n +=
                                  this.arabicWordConfig.numbers[
                                      '1e'.concat(3 * r + 1, '+')
                                  ])
                    }
                    return t
                }),
                (e.prototype.getWordForPart = function (e) {
                    var r = e[0],
                        i = e[1],
                        t = e[2],
                        n = this.getWordForHundreds(r),
                        o = i + t,
                        s = Number(o),
                        c = this.getWordForTens(o)
                    return 0 == s
                        ? n
                        : n
                        ? n +
                          ' ' +
                          this.arabicWordConfig.getAll()
                              .numberSectionsDelimiter +
                          ' ' +
                          c
                        : c
                }),
                (e.prototype.getWordForHundreds = function (e) {
                    var r = Number(e),
                        i = null
                    return (
                        1 == r
                            ? (i = this.arabicWordConfig.numbers[100])
                            : 2 == r
                            ? (i = this.arabicWordConfig.numbers[200])
                            : r >= 3 &&
                              r <= 9 &&
                              (i =
                                  this.getWordFromThreeHundredToNineHundred(e)),
                        i
                    )
                }),
                (e.prototype.getWordFromThreeHundredToNineHundred = function (
                    e
                ) {
                    return (
                        this.arabicWordConfig.numbers[e] +
                        this.arabicWordConfig.numbers[100]
                    )
                }),
                (e.prototype.getWordForTens = function (e) {
                    var r = Number(e)
                    return 0 == r
                        ? this.arabicWordConfig.numbers[0]
                        : r >= 1 && r <= 12
                        ? this.arabicWordConfig.numbers[r]
                        : r >= 13 && r <= 19
                        ? this.getWordFromThirteenToNineTeen(e)
                        : r >= 20 && r <= 99
                        ? this.getWordFromTwentyToNinetyNine(e)
                        : null
                }),
                (e.prototype.getWordFromThirteenToNineTeen = function (e) {
                    return (
                        this.arabicWordConfig.numbers[e[1]] +
                        ' ' +
                        this.arabicWordConfig.numbers[10]
                    )
                }),
                (e.prototype.getWordFromTwentyToNinetyNine = function (e) {
                    var r = e[0],
                        i = e[1],
                        t = Number(r),
                        n = Number(i),
                        o = null,
                        s = null
                    return (
                        2 == t
                            ? (o = this.arabicWordConfig.numbers[20])
                            : t >= 3 &&
                              t <= 9 &&
                              (o =
                                  this.arabicWordConfig.numbers[r] +
                                  this.arabicWordConfig.getAll().tensPrefix),
                        0 == n
                            ? o
                            : (t >= 1 && t <= 9
                                  ? (s = this.arabicWordConfig.numbers[i])
                                  : 10 === t
                                  ? (s = this.arabicWordConfig.numbers[t])
                                  : t >= 11 && t <= 12
                                  ? (s = this.arabicWordConfig.numbers[e])
                                  : t >= 13 &&
                                    t <= 19 &&
                                    (s = this.getWordFromThirteenToNineTeen(e)),
                              s +
                                  (s
                                      ? ' ' +
                                        this.arabicWordConfig.getAll()
                                            .numberSectionsDelimiter +
                                        ' '
                                      : '') +
                                  o)
                    )
                }),
                e
            )
        })()
        r.NumberSection = t
        var n = (function () {
            function e(e) {
                ;(this.config = new i()),
                    (this.numberSection = new t(this.config)),
                    (this.delimiter = 'و'),
                    e && this.setConfig(e)
            }
            return (
                (e.prototype.setConfig = function (e) {
                    return this.config.overrideConfig(e), this
                }),
                (e.prototype.process = function (e) {
                    var r = this.splitIntoSections(e)
                    if (this.config.getAll().strict) {
                        var i = {}
                        return (
                            r[0] &&
                                (i.base = this.numberSection
                                    .process(r[0])
                                    .join(' '.concat(this.delimiter, ' '))),
                            r[1] &&
                                ((i.delimiter = this.config.getAll().delimiter),
                                (i.reminder = this.numberSection
                                    .process(r[1])
                                    .join(' '.concat(this.delimiter, ' ')))),
                            i
                        )
                    }
                    var t = []
                    if (r[0]) {
                        var n = this.numberSection.process(r[0])
                        t.push(n.join(' '.concat(this.delimiter, ' ')))
                    }
                    if (r[1]) {
                        var o = this.numberSection.process(r[1])
                        t.push(o.join(' '.concat(this.delimiter, ' ')))
                    }
                    return t.join(
                        ' '.concat(this.config.getAll().delimiter, ' ')
                    )
                }),
                (e.prototype.create = function () {
                    return new e()
                }),
                (e.prototype.splitIntoSections = function (e) {
                    return e.toString().split('.')
                }),
                e
            )
        })()
        ;(r.ArabicWord = n),
            (r.arabicWord = new n()),
            (r.toArabicWord = function (e) {
                return r.arabicWord.process(e)
            })
    })(0, e)
    var r = window
    for (var i in e) r[i] = e[i]
    e.__esModule && Object.defineProperty(r, '__esModule', { value: !0 })
})()
//# sourceMappingURL=index.js.map
