module.exports = {
    module: {
      rules: [
        {
          // You can use `regexp`
          // test: /example\.js/$
          test: require.resolve('example.js'),
          use: [
            {
              loader: 'imports-loader',
              options: {
                imports: [
                  'default jquery $',
                  'default lib_2 lib_2_default',
                  'named lib_3 lib2_method_1',
                  'named lib_3 lib2_method_2 lib_2_method_2_short',
                  'namespace lib_4 my_namespace',
                  'side-effects lib_5',
                  {
                    syntax: 'default',
                    moduleName: 'angular',
                    name: 'angular',
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  };