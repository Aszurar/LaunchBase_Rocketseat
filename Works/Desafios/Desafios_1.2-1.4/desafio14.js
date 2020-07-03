const user = {
    name: 'Mariana',
    transactions: [],
    balance: 0
};

const operations = [

    {
        type: 'credit',
        value: 50
    },
    {
        type: 'debit',
        value: 20
    },

    {
        type: 'credit',
        value: 70
    },
    {
        type: 'debit',
        value: 30
    },
    {
        type: 'credit',
        value: 130  
    }
];

//utilizando somente uma transação
function createTransaction(transaction) {
    user.transactions.push(transaction);

    if (transaction.type == 'credit') {
        user.balance += transaction.value;
    } else {
        user.balance -= transaction.value;
    }
}


//utilizando um array de várias transações
function createOperations(operations) {
    operations.forEach(element => {
        user.transactions.push(element);

        if (element.type == 'credit') {
            user.balance += element.value;
        } else {
            user.balance -= element.value;
        }
    });
}

// function 

function getHigherTransactionByType(type) {
    let assist = 0;
    let returnCheck = {}
    
    user.transactions.forEach(transaction => {
        if ((transaction.type == type) && (transaction.value > assist)) {
            assist = transaction.value;
            returnCheck = transaction;
        }
    });
    return returnCheck;
}

function getAverageTransactionValue() {
    let sum = 0;

    user.transactions.forEach(transaction => {
            sum += transaction.value;
    });
    return (sum / user.transactions.length);
}

function getTransactionsCount() { // { credit: 5, debit: 3 }
    let operation = {
        credit: 0,
        debit: 0
    }  

    user.transactions.forEach(transaction => {
        if(transaction.type == 'credit'){
            operation.credit++;
        } else {
            operation.debit++;
        }
    });
    return operation;
}; 


createOperations(operations);

// createTransaction({ type: 'credit', value: 50.5});
console.table(user);
console.table(user.transactions);

console.log(getHigherTransactionByType('credit'));
console.log(getHigherTransactionByType('debit'));

console.log(`Média: ${getAverageTransactionValue().toFixed(2)}`);
console.log(getTransactionsCount());

