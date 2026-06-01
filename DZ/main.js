const readline = require('readline');

function concatenate(array, separator) {
    return array.join(separator);
}

function erase(array) {
    return array.filter(item => Boolean(item));
}

function removeValues(array, ...valuesToRemove) {
    return array.filter(item => !valuesToRemove.includes(item));
}

function rle(str) {
    let result = "";
    let count = 1;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i + 1]) {
            count++;
        } else {
            result += str[i] + (count > 1 ? count : "");
            count = 1;
        }
    }
    return result;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Введите массив через запятую: ", (input) => {
    const arr = input.split(',').map(x => {
        let val = x.trim();
        if (val === 'false') return false;
        if (val === 'null') return null;
        if (val === 'undefined') return undefined;
        if (val === "''" || val === "") return "";
        return isNaN(val) ? val : Number(val);
    });

    console.log("1.1 Concatenate", concatenate(arr, ' '));
    console.log("1.10 Erase:", erase(arr));
    console.log("2.13 Remove Values", removeValues(arr, 1, 2));

    let str = arr.join('');
    console.log("3.6 RLE сжатие строки:", rle(str));

    rl.close();
});
