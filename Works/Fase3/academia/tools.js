module.exports = {
    age: function (timestamp) {

        const today = new Date();
        const birthday = new Date(timestamp);

        let age = today.getFullYear() - birthday.getFullYear();
        const month = today.getMonth() - birthday.getMonth();

        if (month < 0 || month == 0 && (today.getDate() <= birthday.getDate())) {
            age = age - 1;
        }

        return age;
    },

    date: function (timestamp) {
        const date = new Date(timestamp);

        //UTC - configuração para que ao pegar o ano, o mês e o dia da data timestamp seja a data universal e não seja 
        //interferida pela data local

        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);

        return `${year}-${month}-${day}`;
    },

    service: function (classes) {
       if (Array.isArray(classes)) {
           return classes
       }
       
        let subjects;

        console.log(classes);


        
        let re = /\b,|\be/;
        subjects = classes.split(re);

        console.log(subjects);

        // if (!Array.isArray(classes)) {
        //     subjects = Array(classes);

        //     console.log(subjects);
        // }

        return subjects;
    },

}