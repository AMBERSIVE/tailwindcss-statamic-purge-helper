# Statamic Tailwindcss Purger Helper

## Installation

```bash
npm install npm i tailwindcss-statamic-purge-helper --save
```

## How-to

This package provides some methods for a faster streamlined way to setup the purgecss part in a statamic application.

### createPurgePaths:

This method provides a basis list of paths in a statamic application.


### extractFromMarkdown:

This method will create a extractor for markdown files.  It will search for fields in each files and will extract the content as a list which will not be removed from the purged file.


### createWhitelist:

Creates a list of items based on the settings object.
### Example:

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
              purgeHelper.createWhitelist({
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