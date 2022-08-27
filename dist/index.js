/*!
 * NumberToArabicWords (https://mahmoudshahin1111.github.io/numbers-to-arabic-words/)
 * Copyright 2022 The NumberToArabicWords Authors (https://github.com/mahmoudshahin1111/numbers-to-arabic-words/contributors)
 * Licensed under MIT (https://github.com/mahmoudshahin1111/numbers-to-arabic-words/blob/master/LICENSE)
 */

;(() => {
    'use strict'
    var e = {
            d: (r, i) => {
                for (var n in i)
                    e.o(i, n) &&
                        !e.o(r, n) &&
                        Object.defineProperty(r, n, {
                            enumerable: !0,
                            get: i[n],
                        })
            },
            o: (e, r) => Object.prototype.hasOwnProperty.call(e, r),
            r: (e) => {
                'undefined' != typeof Symbol &&
                    Symbol.toStringTag &&
                    Object.defineProperty(e, Symbol.toStringTag, {
                        value: 'Module',
                    }),
                    Object.defineProperty(e, '__esModule', { value: !0 })
            },
        },
        r = {}
    function i(e, r) {
        if (!(e instanceof r))
            throw new TypeError('Cannot call a class as a function')
    }
    function n(e, r) {
        for (var i = 0; i < r.length; i++) {
            var n = r[i]
            ;(n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                'value' in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
        }
    }
    function t(e, r, i) {
        return (
            r && n(e.prototype, r),
            i && n(e, i),
            Object.defineProperty(e, 'prototype', { writable: !1 }),
            e
        )
    }
    function o(e, r, i) {
        return (
            r in e
                ? Object.defineProperty(e, r, {
                      value: i,
                      enumerable: !0,
                      configurable: !0,
                      writable: !0,
                  })
                : (e[r] = i),
            e
        )
    }
    e.r(r),
        e.d(r, {
            ArabicWord: () => a,
            ArabicWordConfig: () => s,
            NumberSection: () => u,
            arabicWord: () => c,
            toArabicWord: () => l,
        })
    var s = (function () {
            function e() {
                i(this, e),
                    o(this, 'config', {
                        delimiter: 'فاصل',
                        numberSectionsDelimiter: 'و',
                        get tensPrefix() {
                            return 'ون'
                        },
                    }),
                    o(this, 'numbers', {
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
                t(e, [
                    {
                        key: 'overrideConfig',
                        value: function (e) {
                            delete e.tensPrefix,
                                e.delimiter &&
                                    (e.delimiter = e.delimiter.replace(
                                        ' ',
                                        ''
                                    )),
                                e.numberSectionsDelimiter &&
                                    (e.numberSectionsDelimiter =
                                        e.numberSectionsDelimiter.replace(
                                            ' ',
                                            ''
                                        )),
                                (this.config = Object.assign(this.config, e))
                        },
                    },
                    {
                        key: 'getAll',
                        value: function () {
                            return this.config
                        },
                    },
                ]),
                e
            )
        })(),
        u = (function () {
            function e(r) {
                i(this, e), (this.arabicWordConfig = r)
            }
            return (
                t(e, [
                    {
                        key: 'process',
                        value: function (e) {
                            return this.processSection(e).reverse()
                        },
                    },
                    {
                        key: 'processSection',
                        value: function (e) {
                            var r = this,
                                i = this.splitIntoParts(e),
                                n = []
                            return (
                                i.forEach(function (e, i) {
                                    var t = r.getWordByNumberSectionIndex(e, i)
                                    t && n.push(t)
                                }),
                                n
                            )
                        },
                    },
                    {
                        key: 'splitIntoParts',
                        value: function (e) {
                            for (var r = [], i = e.length - 1; ; ) {
                                var n =
                                    (null != e[i - 2] ? e[i - 2] : '0') +
                                    (null != e[i - 1] ? e[i - 1] : '0') +
                                    (null != e[i] ? e[i] : '0')
                                if ((r.push(n), i < 0)) break
                                i -= 3
                            }
                            return r
                        },
                    },
                    {
                        key: 'getWordByNumberSectionIndex',
                        value: function (e, r) {
                            var i = Number(e),
                                n = null
                            if (0 == r) n = this.getWordForPart(e)
                            else if (1 == i)
                                n =
                                    this.arabicWordConfig.numbers[
                                        '1e'.concat(3 * r)
                                    ]
                            else if (2 == i)
                                n =
                                    this.arabicWordConfig.numbers[
                                        '2e'.concat(3 * r)
                                    ]
                            else {
                                var t = this.getWordForPart(e) + ' '
                                i >= 3 && i <= 10
                                    ? (n = t +=
                                          this.arabicWordConfig.numbers[
                                              '3e'
                                                  .concat(3 * r, '-1e')
                                                  .concat(3 * r + 1)
                                          ])
                                    : i >= 11 &&
                                      (n = t +=
                                          this.arabicWordConfig.numbers[
                                              '1e'.concat(3 * r + 1, '+')
                                          ])
                            }
                            return n
                        },
                    },
                    {
                        key: 'getWordForPart',
                        value: function (e) {
                            var r = e[0],
                                i = e[1],
                                n = e[2],
                                t = this.getWordForHundreds(r),
                                o = i + n,
                                s = Number(o),
                                u = this.getWordForTens(o)
                            return 0 == s
                                ? t
                                : t
                                ? t +
                                  ' ' +
                                  this.arabicWordConfig.getAll()
                                      .numberSectionsDelimiter +
                                  ' ' +
                                  u
                                : u
                        },
                    },
                    {
                        key: 'getWordForHundreds',
                        value: function (e) {
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
                                          this.getWordFromThreeHundredToNineHundred(
                                              e
                                          )),
                                i
                            )
                        },
                    },
                    {
                        key: 'getWordFromThreeHundredToNineHundred',
                        value: function (e) {
                            return (
                                this.arabicWordConfig.numbers[e] +
                                this.arabicWordConfig.numbers[100]
                            )
                        },
                    },
                    {
                        key: 'getWordForTens',
                        value: function (e) {
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
                        },
                    },
                    {
                        key: 'getWordFromThirteenToNineTeen',
                        value: function (e) {
                            return (
                                this.arabicWordConfig.numbers[e[1]] +
                                ' ' +
                                this.arabicWordConfig.numbers[10]
                            )
                        },
                    },
                    {
                        key: 'getWordFromTwentyToNinetyNine',
                        value: function (e) {
                            var r = e[0],
                                i = e[1],
                                n = Number(r),
                                t = Number(i),
                                o = null,
                                s = null
                            return (
                                2 == n
                                    ? (o = this.arabicWordConfig.numbers[20])
                                    : n >= 3 &&
                                      n <= 9 &&
                                      (o =
                                          this.arabicWordConfig.numbers[r] +
                                          this.arabicWordConfig.getAll()
                                              .tensPrefix),
                                0 == t
                                    ? o
                                    : (n >= 1 && n <= 9
                                          ? (s =
                                                this.arabicWordConfig.numbers[
                                                    i
                                                ])
                                          : 10 === n
                                          ? (s =
                                                this.arabicWordConfig.numbers[
                                                    n
                                                ])
                                          : n >= 11 && n <= 12
                                          ? (s =
                                                this.arabicWordConfig.numbers[
                                                    e
                                                ])
                                          : n >= 13 &&
                                            n <= 19 &&
                                            (s =
                                                this.getWordFromThirteenToNineTeen(
                                                    e
                                                )),
                                      s +
                                          (s
                                              ? ' ' +
                                                this.arabicWordConfig.getAll()
                                                    .numberSectionsDelimiter +
                                                ' '
                                              : '') +
                                          o)
                            )
                        },
                    },
                ]),
                e
            )
        })(),
        a = (function () {
            function e(r) {
                i(this, e),
                    o(this, 'config', new s()),
                    o(this, 'numberSection', new u(this.config)),
                    o(this, 'delimiter', 'و'),
                    r && this.setConfig(r)
            }
            return (
                t(e, [
                    {
                        key: 'setConfig',
                        value: function (e) {
                            return this.config.overrideConfig(e), this
                        },
                    },
                    {
                        key: 'process',
                        value: function (e) {
                            var r = this.splitIntoSections(e)
                            if (this.config.getAll().strict) {
                                var i = {}
                                return (
                                    r[0] &&
                                        (i.base = this.numberSection
                                            .process(r[0])
                                            .join(
                                                ' '.concat(this.delimiter, ' ')
                                            )),
                                    r[1] &&
                                        ((i.delimiter =
                                            this.config.getAll().delimiter),
                                        (i.reminder = this.numberSection
                                            .process(r[1])
                                            .join(
                                                ' '.concat(this.delimiter, ' ')
                                            ))),
                                    i
                                )
                            }
                            var n = []
                            if (r[0]) {
                                var t = this.numberSection.process(r[0])
                                n.push(t.join(' '.concat(this.delimiter, ' ')))
                            }
                            if (r[1]) {
                                var o = this.numberSection.process(r[1])
                                n.push(o.join(' '.concat(this.delimiter, ' ')))
                            }
                            return n.join(
                                ' '.concat(this.config.getAll().delimiter, ' ')
                            )
                        },
                    },
                    {
                        key: 'create',
                        value: function () {
                            return new e()
                        },
                    },
                    {
                        key: 'splitIntoSections',
                        value: function (e) {
                            return e.toString().split('.')
                        },
                    },
                ]),
                e
            )
        })(),
        c = new a()
    function l(e) {
        return c.process(e)
    }
    var f = window
    for (var d in r) f[d] = r[d]
    r.__esModule && Object.defineProperty(f, '__esModule', { value: !0 })
})()
