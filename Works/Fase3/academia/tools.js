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

        return{ 
                day,
                month,
                year,
                iso:`${year}-${month}-${day}`,
                birthDay: `${day}/${month}`  
              };
    },

    service: function (classes) {
        if (Array.isArray(classes)) {
            return classes
        }

        let subjects;

        let re = /\b,|\be/;
        subjects = classes.split(re);
        
        return subjects;
    },

    bloods: function (blood) {
        let typeBlood;

        switch (blood) {

            case "A0":
                typeBlood = "A"
                break;

            case "A1":
                typeBlood = "A+"
                break;
            case "B0":
                typeBlood = "B"
                break;
            case "B1":
                typeBlood = "B+"
                break;
            case "AB0":
                typeBlood = "AB"
                break;
            case "AB1":
                typeBlood = "AB+"
                break;
            case "O0":
                typeBlood = "O"
                break;
            case "O1":
                typeBlood = "O+"
                break;
            default:
                break;
        }

        return typeBlood;
    }
}