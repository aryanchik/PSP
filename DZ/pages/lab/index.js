export class LabPage {
    constructor(parent) {
        this.parent = parent;
    }

    concatenate(array, separator) {
        return array.join(separator);
    }

    erase(array) {
        return array.filter(item => Boolean(item));
    }

    removeValues(array, ...valuesToRemove) {
        return array.filter(item => !valuesToRemove.includes(item));
    }

    rle(str) {
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

    getHTML() {
        return `
            <div class="container mt-4">
                <h1 class="calculator-title">Лабораторная работа: Уровни 1-3</h1>
                <div id="lab-root" class="d-flex flex-column gap-4"></div>
            </div>
        `;
    }

    renderTask(title, input, result) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'card mb-3';
        taskDiv.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text"><strong>Входные данные:</strong> ${input}</p>
                <p class="card-text"><strong>Результат:</strong> ${result}</p>
            </div>
        `;
        return taskDiv;
    }

    render() {
        this.parent.innerHTML = this.getHTML();
        const root = document.getElementById('lab-root');

        const tasks = [
            {
                title: "Задание 1.1 (Level 1): Concatenate",
                input: "['Я', 'Учусь', 'на', 'лучшей', 'кафедре'], разделитель: ' '",
                result: this.concatenate(['Я', 'Учусь', 'на', 'лучшей', 'кафедре'], ' ')
            },
            {
                title: "Задание 1.10 (Level 1): Erase",
                input: "[0, 1, false, 2, undefined, '', 3, null]",
                result: JSON.stringify(this.erase([0, 1, false, 2, undefined, '', 3, null]))
            },
            {
                title: "Задание 2.13 (Level 2): Remove Values",
                input: "[1, 2, 3, 1, 2] без 1, 2",
                result: JSON.stringify(this.removeValues([1, 2, 3, 1, 2], 1, 2))
            },
            {
                title: "Задание 3.6 (Level 3): RLE Сжатие",
                input: "'AAABBCDDD'",
                result: this.rle("AAABBCDDD")
            }
        ];

        tasks.forEach(task => {
            const taskElement = this.renderTask(task.title, task.input, task.result);
            root.appendChild(taskElement);
        });
    }
}

// Автоматический запуск при загрузке
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const app = new LabPage(document.body);
        app.render();
    });
}


if (typeof process !== 'undefined' && process.argv.includes('--console')) {
    const lab = new LabPage();




    console.log(`   Вход: ['Я', 'Учусь', 'на', 'лучшей', 'кафедре'], разделитель: ' '`);
    console.log(`   Результат: ${lab.concatenate(['Я', 'Учусь', 'на', 'лучшей', 'кафедре'], ' ')}\n`);


    console.log(`   Вход: [0, 1, false, 2, undefined, '', 3, null]`);
    console.log(`   Результат: ${JSON.stringify(lab.erase([0, 1, false, 2, undefined, '', 3, null]))}\n`);

    console.log(`   Вход: [1, 2, 3, 1, 2] без 1, 2`);
    console.log(`   Результат: ${JSON.stringify(lab.removeValues([1, 2, 3, 1, 2], 1, 2))}\n`);

    console.log(`   Вход: 'AAABBCDDD'`);
    console.log(`   Результат: ${lab.rle("AAABBCDDD")}\n`);
}
