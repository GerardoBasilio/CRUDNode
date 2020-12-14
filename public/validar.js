function valideKey(evt) {
    var code = evt.which ? evt.which : evt.keyCode;
    if (code == 8) {
        return true;
    } else if ((code >= 48 && code <= 57)) {
        //codigo ascii numeros
        return true;
    } else {
        return false;
    }
}

function valideKey2(evt) {
    var code = evt.which ? evt.which : evt.keyCode;
    if (code == 8) {

        return true;
    } else if (code >= 97 && code <= 122) {
        //codigo ascii letras
        return true;
    } else if (code == 32) {
        //codigo ascii espacio
        return true;
        //console.log("si hay espacio ");
    } else {
        return false;
    }
}