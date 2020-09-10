const { on } = require("nodemon");

module.exports = {
    age: function (timestamp) {
        const today = new Date();
        const birthday = new Date(timestamp);

        let age = today.getFullYear() - birthday.getFullYear();
        const month = today.getMonth() - birthday.getMonth();

        if (month < 0 || (month == 0 && today.getDate() <= birthday.getDate())) {
            --age;
        }

        return age;
    },

    graduation: function (level) {
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

    type: function (type) {
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

    classes: function (classes) {
        let subjects;

        let re = /\b,|\be/;
        subjects = classes.split(re);

        return subjects;
    },

    typeEdit: function (type) { 
        
        if (Array.isArray(type)) {
            return "double"
        }
        
        return type;
    }

}