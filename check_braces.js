const fs = require('fs');
const content = fs.readFileSync('/Users/mdfaizan/Downloads/diamondexchange backup/site/local/local-bootstrap.js', 'utf8');
let stack = [];
let lines = content.split('\n');
lines.forEach((line, i) => {
    let chars = line.split('');
    chars.forEach(c => {
        if (c === '{') stack.push(i + 1);
        if (c === '}') {
            if (stack.length === 0) console.log(`Extra close at line ${i + 1}: ${line}`);
            else stack.pop();
        }
    });
});
if (stack.length > 0) {
    console.log('Unclosed braces opened at lines:');
    console.log(stack.join(', '));
}
console.log(`Final stack size: ${stack.length}`);
