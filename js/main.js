let startButton = document.getElementById('start');

//budget value
let budgetValue = document.querySelector('.budget-value'),
    daybudgetValue = document.querySelector('.daybudget-value'),
    levelValue = document.querySelector('.level-value'),
    expensesValue = document.querySelector('.expenses-value'),
    optionalexpensesValue = document.querySelector('.optionalexpenses-value'),
    incomeValue = document.querySelector('.income-value'),
    monthSavingsValue = document.querySelector('.monthsavings-value'),
    yearSavingsValue = document.querySelector('.yearsavings-value'),
    sumValue = document.getElementById('sum'),
    percentValue = document.getElementById('percent');

//time value
let yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

//inputs 
let expencesItem = document.getElementsByClassName('expenses-item'),
    expensesItemBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    optionalExpensesItems = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.getElementById('income'),
    savingsCheck = document.getElementById('savings'),
    countBudgetBtn = document.querySelector('.count-budget-btn');

let money,
    time,
    appData;

expensesItemBtn.disabled = true;
expensesItemBtn.style.opacity = '0.5';
optionalExpensesBtn.disabled = true;
optionalExpensesBtn.style.opacity = '0.5';
countBudgetBtn.disabled = true;
countBudgetBtn.style.opacity = '0.5';

//Событие при клике на кнопку "Начать расчет"
startButton.addEventListener('click', function(){
    expensesItemBtn.disabled = false;
    expensesItemBtn.style.opacity = '1';
    optionalExpensesBtn.disabled = false;
    optionalExpensesBtn.style.opacity = '1';
    countBudgetBtn.disabled = false;
    countBudgetBtn.style.opacity = '1';

    time = prompt("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt("Ваш бюджет на месяц?", "");

    while(isNaN(money) || money == '' || money == null){
        money = +prompt("Ваш бюджет на месяц?", "");
    }
    
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();

    //Выводим введенную дату на странице
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});

//Событие при клике на кнопку "Утвердить" обязательные расходы
expensesItemBtn.addEventListener('click', function(){
    let sum = 0;

    for(let i=0; i < expencesItem.length; i++){
        let a = expencesItem[i].value,
            b = expencesItem[++i].value;

        if((typeof(a)) === 'string' && (typeof(a)) !=null && (typeof(b)) !=null && a != '' && b != '' 
        && a.length < 50){
            console.log("done");
            appData.expenses[a] = b;
            sum += +b;
            
        }else{
            i--;
        }
    }

    expensesValue.textContent = sum;
});

//Событие при клике на кнопку "Утвердить" необязательные расходы
optionalExpensesBtn.addEventListener('click', function(){
    for(let i = 0; i < optionalExpensesItems.length; i++){
        let opt = optionalExpensesItems[i].value;
        appData.optionalExpenses[i] = opt;
        optionalexpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }   
});

//Клик по кнопке "Рассчитать" дневной бюджет
countBudgetBtn.addEventListener('click', function(){
    if(appData.budget != undefined){
        appData.moneyPerDay = ((appData.budget - +expensesValue.textContent)/30).toFixed(); 
        daybudgetValue.textContent = appData.moneyPerDay;

        if(appData.moneyPerDay < 100){
            levelValue.textContent = 'Минимальный уровень достатка';
        }else if(appData.moneyPerDay > 100 && appData.moneyPerDay < 2000){
            levelValue.textContent = 'Средний уровень достатка';
        }else if(appData.moneyPerDay > 2000){
            levelValue.textContent = 'Высокий уровень достатка';
        }else{
            levelValue.textContent = 'Произошла ошибка';
        }
    } else {
        daybudgetValue.textContent = 'Произошла ошибка';
    }
});

//Вводим возможный доход
chooseIncome.addEventListener('input', function(){
    let val = chooseIncome.value;
        appData.income = val.split(', ');
        incomeValue.textContent = val;    
});

//Чекбокс с накоплениями
savingsCheck.addEventListener('click', function(){
    if(appData.savings == true){
        appData.savings = false;
    }else{
        appData.savings = true;
    }
});

//Расчет доходов от депозита на месяц и на год
sumValue.addEventListener('input', function(){
    if(appData.savings == true){
        let save = +sumValue.value,
            persent = +percentValue.value;

        appData.monseIncome = save/100/12*persent;
        appData.yearIncome = save/100*persent;
        
        monthSavingsValue.textContent = appData.monseIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener('input', function(){
    if(appData.savings == true){
        let save = +sumValue.value,
            persent = +percentValue.value;

        appData.monseIncome = save/100/12*persent;
        appData.yearIncome = save/100*persent;
        
        monthSavingsValue.textContent = appData.monseIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    saving: false
}
