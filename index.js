/**
 * Helper method to search and find the tailwind classes
 * @param {*} regElement 
 * @param {*} content 
 * @returns 
 */
 function extractFromMarkdownByRegexElement(regElement, content) {

    const data = [];
    const searchResult = content.match(regElement.search);

    if (searchResult === null) {
        return data;
    }

    for(let i = 0; i < searchResult.length; i++) {

        const classNames = searchResult[i].replace(regElement.replacement, "").split(" ").filter(item => {
            if (item !== "" && item !== " " && item !== "null"){
                return item;
            }
        });

        for(let j = 0; j < classNames.length; j++) {
            if (classNames[j] !== "" && classNames[j].length > 0 && classNames[j] !== '\'' && data.indexOf(classNames[j]) === -1) {
                data.push(classNames[j]);
            }
        }

    }

    return data;

}


/**
 * This method will extract the tailwind classes based on the passed list of field names
 * @param {*} fields 
 * @returns 
 */
exports.extractFromMarkdown = function(fields) {

    if (Array.isArray(fields) === false) {
        fields = [fields];
    }

    return {
        extensions: ['md'],
        extractor: (content) => {

            const list = [];

            const regList = fields.map (item => {
                return {
                    search: new RegExp(`${item}\\:.*`,'gmi'),
                    replacement: new RegExp(`${item}[\\s]{0,}\\:|[']{1}`,'gmi')
                }
            });   

            for (let i = 0; i < regList.length; i++) {

                const data = extractFromMarkdownByRegexElement(regList[i], content);

                for (let j = 0; j < data.length; j++) {
                    if (list.indexOf(data[j]) === -1) {
                        list.push(data[j]);
                    }
                }

            }
            
            return list;

        }
    };

}

/**
 * Create a whitelist of tailwind classes for the purge mechanism
 * @param {*} settings 
 * @returns 
 */
exports.createWhitelist = function(settings) {

    return {
        extensions: ['md'],
        extractor: (content) => {

            const list = [];

            const breakpoints = settings.breakpoints && settings.breakpoints.length > 0 ? settings.breakpoints : [""];
            const listOfKeepableItems = settings.keep && settings.keep.length > 0 ? settings.keep : [];

            const gridCols = settings.gridCols ? settings.gridCols : -1;
            const paddingList = settings.paddingList & settings.paddingList.length > 0 ? settings.paddingList : [];

            /**
             * Grid list 
             */
            for (let i = 1; i < gridCols + 1; i++) {
                listOfKeepableItems.push(`grid-cols-${i}`);
                listOfKeepableItems.push(`col-span-${i}`);
                listOfKeepableItems.push(`gap-${i}`);
                listOfKeepableItems.push(`gap-x-${i}`);
                listOfKeepableItems.push(`gap-y-${i}`);
                listOfKeepableItems.push(`w-1/${i}`);
            }

            /**
             * Default paddings
             */
            for (let i = 0; i < paddingList.length; i++) {
                let item = paddingList[i]
                keep.push(`pt-${item}`);
                keep.push(`pr-${item}`);
                keep.push(`pl-${item}`);
                keep.push(`pm-${item}`);
                keep.push(`px-${item}`);
                keep.push(`py-${item}`);
                keep.push(`mt-${item}`);
                keep.push(`mr-${item}`);
                keep.push(`ml-${item}`);
                keep.push(`mm-${item}`);
                keep.push(`mx-${item}`);
                keep.push(`my-${item}`);
        
            }

            for (let i = 0; i < breakpoints.length; i++) {

                for (let j = 0; j < listOfKeepableItems.length; j++) {

                    if (breakpoints[i] === '') {
                        list.push(listOfKeepableItems[j]);
                    }
                    else {
                        list.push(breakpoints[i] + ':' + listOfKeepableItems[j]);
                    }

                }

            }

            return list;

        }
    };

}

/**
 * Create the purge paths
 * @param {*} paths 
 * @returns 
 */
exports.createPurgePaths =  function(paths) {

    return ['./resources/views/**/*.antlers.html','./resources/views/**/*.{html,php}', './resources/views/**/**/*.{html,php}', './resources/views/**/*.{html,php}', './content/collections/**/*.md', './resources/css/*.css', ...paths];

}