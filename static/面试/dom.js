const domToObject = (element) => {
    const obj = {
        name: element.tagName,
        children: element.childNodes.map(item => ({
            name: item.tagName,
            children: item.childNodes.map(item_ => ({
                name: item_.tagName,
                children: item.childNodes.map(item__ => ({
                    name: item__.tagName,
                }))
            }))
        }))
    }
    return obj
}

const test = {
    tagName: 'body',
    childNodes: [
        {
            tagName: 'a',
            childNodes: [
                {
                    tagName: 'i',
                }
            ]
        }
    ]
}

// {
//     name: 'xxx',
//     children: []
// }

console.log(JSON.stringify(domToObject(test), 2, 2))