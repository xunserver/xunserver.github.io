function isValid (str: string): boolean {
    var stack = [];
    var marks = {
        '(': 1,
        ')': -1,
        '{': 1,
        '}': -1,
        '[': 1,
        ']': -1
    }
    for(var i = 0 ; i < str.length; i++) {
        if(marks[str[i]] > 0) {   // undefined > 0 是 false  < 0 也是false
            stack.push(str[i])
        }
        if(marks[str[i]] < 0) {
            var lastStr = stack.pop();
            if(str[i] !== lastStr) {
                return false
            }
            
        }
    }
    if(stack.length!==0) {
        return false
    }
    return true
}