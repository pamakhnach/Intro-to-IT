
window.addEventListener('DOMContentLoaded', () => {
    const CC1 = 'Не заполнен вопрос.';
    const CC2 = 'Не заполнен ответ.';
    const CC3 = 'Не заполнен правильный ответ.';
    const main = document.querySelector('main');
    const createQuestionButton = document.querySelector('.create__question');
    const startTestButton = document.querySelector('.start__test');

    const Data = [
        {
            questionTitle: "Что из перечисленного не являеться языком программирования?",
            option: ["HTML", "Java", "Python", "DevOps"],
            rightOption: ["1", "4"]
        },
        {
            questionTitle: "Как звали паука из мультсериалы Лунтик?",
            option: ["Паша", "Рыцарь", "Шнюк", "Фук"],
            rightOption: ["3"]
        },
        {
            questionTitle: "Какие страны существуют?",
            option: ["Россия", "Атлантида", "Барселона", "Португалия"],
            rightOption: ["1", "4"]
        },
        {
            questionTitle: "Какого (каких) метода (методов) тестирования не существует?",
            option: ["Метод белого ящика", "Метода 'игры в ящик'", "Метод 'кротовой норы'", "Метод серого ящика"],
            rightOption: ["2", "3"]
        },
        {
            questionTitle: "Что из этого относится к программному обуспечению?",
            option: ["Клавиатура", "VS Code", "Мышка", "SublineText"],
            rightOption: ["2", "4"]
        }
    ];

    buttonsHandler();

    function buttonsHandler() {
        createQuestionButton.addEventListener('click', () => {
            let questionTitle = prompt('Введите текст вопроса:');
            if (questionTitle === null || questionTitle === '') {
                return alert(CC1);
            }

            let option = [];
            let optionItem = "";

            for (let i = 0; i < 4; i++) {
                let j = i;
                optionItem = prompt(`Введите текст ${++j} варианта ответа:`);

                option.push(optionItem);

                if (optionItem === null || optionItem === '') {
                    return alert(CC2);
                }
            }

            let currentRightOption = prompt('Введите верные ответы:');
            if (currentRightOption === null || currentRightOption === '') {
                return alert(CC3);
            }

            let rightOption = currentRightOption.split(',').sort();

            addQuestion(questionTitle, option, rightOption);
        });

        startTestButton.addEventListener('click', () => {
            startTestButton.setAttribute('disabled', 'disabled');
            createQuestionButton.setAttribute('disabled', 'disabled');

            createTest();
        });
    };

    function addQuestion(questionTitle, option, rightOption) {
        const question = {
            questionTitle: questionTitle,
            option: option,
            rightOption: rightOption
        };
        Data.push(question);
    };

    function createTest() {
        const questionList = document.createElement('ol');
        const submitTestButton = document.createElement('button');

        submitTestButton.innerHTML = 'Отправить';

        questionList.className = 'question__list';
        submitTestButton.className = 'submit__button';

        main.appendChild(questionList);
        main.appendChild(submitTestButton);

        Data.forEach((item, index) => {
            const question = document.createElement('li');
            const questionTitleTag = document.createElement('h2');
            const optionList = document.createElement('ul');

            question.className = 'question';
            optionList.className = 'option__list';

            questionList.appendChild(question);
            question.appendChild(questionTitleTag);
            question.appendChild(optionList);

            questionTitleTag.innerHTML = `${item.questionTitle}`;

            createOption(item, optionList);
        });

        submitTestButton.addEventListener('click', () => {
            validationTest();
        });
    };

    function createOption(item, optionList) {
        item.option.forEach((item, index) => {
            const optionItem = document.createElement('li');
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            const span = document.createElement('span');

            checkbox.setAttribute('type', 'checkbox');

            optionList.appendChild(optionItem);
            optionItem.appendChild(label);
            label.appendChild(checkbox);
            label.appendChild(span);
            span.innerHTML = item;
        });
    };

    function validationTest() {
        const questionArr = Array.from(document.querySelectorAll('.question'));
        const wrongAnswers = [];
        let isAllSelected = true;

        questionArr.forEach((item, index) => {
            const checkboxes = Array.from(item.querySelectorAll('input'));
            const selectedOptions = [];

            checkboxes.forEach((item, index) => {
                item.checked ? selectedOptions.push(index + 1 + "") : null;
            });

            if (JSON.stringify(selectedOptions) != JSON.stringify(Data[index].rightOption)) {
                wrongAnswers.push(index + 1);
            }
            if (selectedOptions.length = 0) {
                isAllSelected = false
            }
        });

        wrongAnswers.length == 0 ? successTest() : errorTest(wrongAnswers);
    };

    function successTest() {
        alert(`Ваш  результат ${Data.length} из ${Data.length}. Вы молодец!`);

        main.innerHTML = "";

        startTestButton.removeAttribute('disabled');
        createQuestionButton.removeAttribute('disabled');
    };

    function errorTest(wrongAnswers) {
        let errorMessage = "Вы неправильно ответили на вопросы:\r\n";

        wrongAnswers.forEach(item => {
            errorMessage = errorMessage + item + ". " + Data[item - 1].questionTitle + " \r\n";
        });

        errorMessage = errorMessage + ` \r\n Ваш результат: ${Data.length - wrongAnswers.length} из ${Data.length}`

        alert(errorMessage);
    };
});