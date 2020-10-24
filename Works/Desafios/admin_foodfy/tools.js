module.exports = {

    editInfo: function(info) {
        const whiteline = "\r\n\r\n"
        const re = "\r\n"
       

        while (info.includes("\r\n\r\n") || info.includes("\r\n")) {
             info = info.replace(whiteline, "<br><br>")
             info = info.replace(re, "<br>")     
        }

        return info
    }   
}