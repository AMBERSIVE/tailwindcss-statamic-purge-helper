# Statamic Tailwindcss Purger Helper

Helper methods to extract classes from markdown files. This methods will extract from the markdown files.

```js

module.exports = {
    purge: {
        mode: 'all',
        preserveHtmlElements: true,
        content: purgeHelper.createPurgePaths([]),
        options: {
            extractors: [
              purgeHelper.extractFromMarkdown([
                  'button_color', 
                  'background', 
                  'color', 
                  'row_color', 
                  'row',
                  'align',
                  'spacing',
                  'columns_per_row',
                  'headline_color'
              ]),
              purgeHelper.extractFromMarkdown({
                 gridCols: 10,
                 keep: [
                    'w-1/5',
                    'w-2/5',
                    'w-3/5',
                    'w-4/5',
                    'w-5/5',
                    'bg-gradient-to-t',
                    'from-landmarx-green-900',
                    'to-landmarx-green-100'
                 ],
                 paddingList: [
                    '0',
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '10',
                    '12',
                    '16',
                    '20',
                    '32',
                 ]
              }),
            ],
        },
    },
    ....
```