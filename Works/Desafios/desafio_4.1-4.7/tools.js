module.exports = {
    age: function(timestamp) {
        const today = new Date();
        const birthday = new Date(timestamp);

        let age = today.getFullYear() - birthday.getFullYear();
        const month = today.getMonth() - birthday.getMonth();

        if (month < 0 || (month == 0 && today.getDate() <= birthday.getDate())) {
            --age;
        }

        return age;
    },

    graduation: function(level) {
        let graduation;

        switch (level) {
            case "hischool":
                graduation = "Ensino Médio Completo"
                break;
            case "univers":
                graduation = "Ensino Superior Completo"
                break;
            case "masters":
                graduation = "Mestre"
                break;
            case "doctorate":
                graduation = "Doutor"
                break;
            default:
                break;
        }
        return graduation;
    },

    type: function(type) {
        let status;
        // método necessário para a página show, de acordo com o svalores salvaos(on, off ou on, off nós imprimos)
        switch (type) {
            case "on":
                status = ["Online"]
                break;
            case "off":
                status = ["Presencial"]
                break;
            default:
                status = ["Online", "Presencial"]
                break;
        }

        return status;
    },

    classesArray: function(classes) {
        let subjects;

        if(Array.isArray(classes)){
            return classes
        }

        let re = /\b,|\be/;
        subjects = classes.split(re);

        return subjects;
    },

    typeEdit: function(type) { 
        // apenas para a pagina de edição, necessário para poder marcar os 2 botões(online e ppresencial)
        if (Array.isArray(type)) {
            return "double"
        }
        
        return type;
    },
    
    date: function(timestamp){
        const date = new Date(timestamp);
        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);

        return {
            day: day,
            month: month,
            year: year,
            iso:`${year}-${month}-${day}`,
            birthDay:`${day}/${month}`
            }
    },

    grade: function(grades){
        let grade; 

        if (grades >= 5) {
            grade = grades + "º ano"
        } else {
            grade = grades + "º ano do Ensino Médio"
        }
       
        return grade;
    }
}