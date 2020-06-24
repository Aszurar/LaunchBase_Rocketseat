//utilizando funções!
const turmaA = [
    {
        name: 'Lucas',
        grade: 9.8
    },

    {
        name: 'Matheus',
        grade: 10.0
    },
    {
        name: 'João',
        grade: 8.2
    },
    {
        name: 'Sebastião',
        grade: 10
    }
]

const turmaB = [
    {
        name: 'Thiago',
        grade: 5.6
    },

    {
        name: 'Bruno',
        grade: 9.8
    },

    {
        name: 'Felipe',
        grade: 2.6
    },

    {
        name: 'Luciano',
        grade: 8.4
    }
]

function calculateAvarage(students) {
    let sum = 0;
    let i = 0;

    while (i < students.length) {
        sum = sum + students[i].grade;
        i++;
    }
    const average = (sum / students.length);

    return average;
}

function sendMessage(average, turma) {
    if (average > 5) {
        console.log(`${turma} average ${average.toFixed(2)}, Congrats!.`);
    } else {
        console.log(`${turma} average ${average.toFixed(2)}, It's not good enough.`);
    }
}

function markAsFlunked(student) {
    student.flunked = false;

    if (student.grade < 5) {
        student.flunked = true;
    }
}

function sendMessageFlunked(student) {
    if (student.flunked) {
        console.log(`${student.name} flunked.`);
    } else {
        console.log(`${student.name} approved.`);
    }
}

function studentReprovado(students) {
    for (let student of students) {
        markAsFlunked(student);
        sendMessageFlunked(student);
    }
}

markAsFlunked(turmaA);
markAsFlunked(turmaB);


average1 = calculateAvarage(turmaA);
average2 = calculateAvarage(turmaB);

sendMessage(average1, 'Class A');
sendMessage(average2, 'Class B');

studentReprovado(turmaA);
studentReprovado(turmaB);

console.table(turmaA);
console.table(turmaB);


