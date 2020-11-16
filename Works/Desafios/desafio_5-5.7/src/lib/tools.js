module.exports = {
    age(timestamp) {
        const today = new Date();
        const birthday = new Date(timestamp);

        let age = today.getFullYear() - birthday.getFullYear();
        const month = today.getMonth() - birthday.getMonth();

        if (month < 0 || (month == 0 && today.getDate() <= birthday.getDate())) {
            --age;
        }

        return age;
    },

    graduation(level) {
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

    type(type) {
        let status;

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

    classesArray(classes) {

        if(Array.isArray(classes)){
            return classes
        }
        let subjects;

        let re = /\b,|\be/;
        subjects = classes.split(re);

        return subjects;
    },

    typeEdit(type) { 
        // console.log(`TIPOS DE AULA: ${type}\nTipo: ${ typeof type }`);
        if (type == '{"on","off"}') {
            return "double"
        }
        
        return type;
    },
    
    date(timestamp){
        // console.log(`Valor do Timestamp: ${timestamp}`);

        const date = new Date(timestamp);
        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay:`${day}/${month}`,
            format: `${day}/${month}/${year}`
            }
    },

    grade(grades){
        let grade; 

        console.log(`grade: ${grades}`);
        if (grades >= 5) {
            grade = grades + "º ano"
        } else {
            grade = grades + "º ano do Ensino Médio"
        }
       
        return grade;
    }
}