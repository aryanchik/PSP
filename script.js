window.onload = function(){
    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    let decimalValue = null;
    let currentBaseIndex = -1;
    const bases = [2, 8, 10, 16];
    const baseNames = ["bin", "oct", "dec", "hex"];
    const systemLabel = document.getElementById("systemLabel");



    const outputElement = document.getElementById("result")

    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                a += digit;
            }
            outputElement.innerHTML = a;
        }
        else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                b += digit;
                outputElement.innerHTML = b;
            }
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    document.getElementById("btn_op_mult").onclick = function() {
        if (a === '') return;
        selectedOperation = 'x';
    }
    document.getElementById("btn_op_plus").onclick = function() {
        if (a === '') return;
        selectedOperation = '+';
    }
    document.getElementById("btn_op_minus").onclick = function() {
        if (a === '') return;
        selectedOperation = '-';
    }
    document.getElementById("btn_op_div").onclick = function() {
        if (a === '' ) return;
        selectedOperation = '/';
    }

    document.getElementById("btn_op_clear").onclick = function() {
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0

    }

    document.getElementById("btn_op_sign").onclick = function() {
        if (a === '') return;
        expressionResult = (+a) * (-1)
        a = expressionResult.toString()

        outputElement.innerHTML = a

    }

    document.getElementById("btn_op_percent").onclick = function() {
        if (a === '') return;
        expressionResult = (+a) / (100)
        a = expressionResult.toString()

        outputElement.innerHTML = a

    }

    document.getElementById("btn_op_fact").onclick = function() {
        if (a === '') return;
        let fact = 1;
        for (let i = 1; i<=a; ++i) {
            fact = fact*i
        }
        expressionResult = fact
        a = expressionResult.toString()

        outputElement.innerHTML = a

    }

    document.getElementById("btn_op_sqrt").onclick = function() {
        if (a === '') return;
        expressionResult = (+a)**0.5
        a = expressionResult.toString()

        outputElement.innerHTML = a

    }

    document.getElementById("btn_op_backspace").onclick = function() {
        if (a === '') return;
        expressionResult = a.slice(0, -1)
        a = expressionResult.toString()
        outputElement.innerHTML = a

    }

    document.getElementById("btn_op_000").onclick = function() {
        if (a === '') return;

        if (decimalValue === null) {
            decimalValue = parseInt(a, 10);
            if (isNaN(decimalValue)) return;
        }

        currentBaseIndex = (currentBaseIndex + 1) % bases.length;
        let base = bases[currentBaseIndex];
        let baseName = baseNames[currentBaseIndex];

        let result = decimalValue.toString(base);

        if (base === 16) {
            result = result.toUpperCase();
        }

        a = result;
        outputElement.innerHTML = a;


        systemLabel.innerHTML = baseName;
    }


    document.getElementById("btn_op_equal").onclick = function() {
        if (a === '' || b === '' || !selectedOperation)
            return

        switch(selectedOperation) {
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
            case "+/-":
                expressionResult = (+a)*(-1)
                break;
            default:
                break;
        }

        a = expressionResult.toString()
        b = ''
        selectedOperation = null

        outputElement.innerHTML = a
    }
};
