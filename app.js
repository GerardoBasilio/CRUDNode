const express = require('express');
const mysql = require('mysql');

var app = express();

var bodyParser = require('body-parser');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',
    database: 'mybase'
});

con.connect();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));


app.post('/setUsuario', (req, res) => {
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let disiplina = req.body.disiplina;
    let turno = req.body.turno;
    let socio = req.body.socio;

    let dnum = 0;
    let dso = 0;

    if (disiplina == "Funcional") {
        dnum = 1;
    } else if (disiplina == "GYM") {
        dnum = 2;
    } else if (disiplina == "Box") {
        dnum = 3;
    } else if (disiplina == "Muay Thai") {
        dnum = 4;
    } else if (disiplina == "Jiu Jitsu") {
        dnum = 5;
    }
    // else {
    // dnum = 1;
    // }
    if (socio == "Cliente") {
        dso = 4;
    } else if (socio == "Coach") {
        dso = 3;
    } else if (socio == "Empleado") {
        dso = 2;
    } else if (socio == "Gerente") {
        dso = 1;
    } else {
        dso = 1;
    }

    con.query('insert into Socio (nombre,appat,tipoDisiplina,turno,tipoSocio) values("' + nombre + '","' + apellido + '",' + dnum + ', "' + turno + '",' + dso + ')', (err, respuesta, fields) => {
        if (err) return console.log('Error', err);
        return res.send('<style>body{ display:flex; background-color:black;justify-content: center; color:white;}</style> <h1>El usuario ' + nombre + ' fue registrado con exito</h1> <a style="font-size:20px;" href="index.html">REGRESAR</a>');
    });
});

app.post('/getUsuario', (req, res) => {
    con.query('select IdSocio,nombre,appat,turno,socio,sueldo,horas, disiplina from Socio as a join cSocios as b join cDisiplinas as c on a.tipoSocio = b.tipoSocio and a.tipoDisiplina = c.tipoDisiplina', (err, respuesta, fields) => {

        if (err) return console.log('ERROR', err);

        var userHtml = ``;
        // var i = 0;

        respuesta.forEach(user => {
            // i++;
            userHtml += `<tr><td style="border:1px solid white;">${user.IdSocio}</td><td style="border:1px solid white;">${user.nombre}</td><td style="border:1px solid white;">${user.appat}</td><td style="border:1px solid white;">${user.turno}</td><td style="border:1px solid white;">${user.socio}</td><td style="border:1px solid white;">${user.sueldo}</td><td style="border:1px solid white;">${user.horas}</td><td style="border:1px solid white;">${user.disiplina}</td></tr>`;
        });
        return res.send(`
        <body style="background-color: black; color: white; display:flex; justify-content: center; ">
        <div style="display:flex; justify-content: center; flex-wrap:wrap;">
            <table style="display:flex; width:80%; justify-content:center; ">
                <tr>
                    <th style="border:1px solid white;"> id </th>
                    <th style="border:1px solid white;"> Nombre </th>
                    <th style="border:1px solid white;"> Apellido </th>
                    <th style="border:1px solid white;"> Horario </th>
                    <th style="border:1px solid white;"> Tipo de socio </th>
                    <th style="border:1px solid white;"> Sueldo </th>
                    <th style="border:1px solid white;"> Horas </th>
                    <th style="border:1px solid white;"> Disiplina </th>
                </tr>
                ${userHtml}
            </table>
            <p style="font-size:20px; display:flex; justify-content: center; margin-top:40px; width:100%; height:50px;">Estos son los Usuarios registrados</p>

            <a style="text-decoration:none; font-size:30px; " href=index.html>Regresar</a>
        </div>
        
                </body>
                `);
    });
});

app.post('/deleteUsuario', (req, res) => {
    let idD = req.body.idborrar;

    con.query('select * from socio where idSocio = ' + idD, (err, respuesta, fields) => {
        if (err) return console.log('ERROR', err);
        var name = ``;
        respuesta.forEach(user => {
            name += `${user.nombre}`;
        });
        if (name != ``) {
            con.query('delete from Socio where IdSocio = ' + idD, (err, respuesta, fields) => {
                if (err) return console.log('Error', err);
                return res.send('<h1>El usuario con el id: </h1>' + idD + '<h1> fue borrado de las fas de la tierra</h1><a href = "index.html"> Regresar </a>');
            });
        } else {
            return res.send(`<body style="display:flex; justify-content: center; background-color:black; color:white; font-size:40px;">
            <div style="display:flex; justify-content: center;">Lo sentimos <br>El id del usuario que ingresaste no existe<br> <a style="display:flex;" href="getUsuarios.html">Consultar</a></div></body>`);
        }
    });

});

app.post('/updateUsuario', (req, res) => {
    let id = req.body.id;
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let disiplina = req.body.disiplina;
    let turno = req.body.turno;
    let socio = req.body.socio;

    let dnum = 0;
    let dso = 0;

    if (disiplina == "Funcional") {
        dnum = 1;
    } else if (disiplina == "GYM") {
        dnum = 2;
    } else if (disiplina == "Box") {
        dnum = 3;
    } else if (disiplina == "Muay Thai") {
        dnum = 4;
    } else if (disiplina == "Jiu Jitsu") {
        dnum = 5;
    } else {
        dnum = 1;
    }
    if (socio == "Cliente") {
        dso = 4;
    } else if (socio == "Coach") {
        dso = 3;
    } else if (socio == "Empleado") {
        dso = 2;
    } else if (socio == "Gerente") {
        dso = 1;
    } else {
        dso = 1;
    }
    let name = "";
    con.query('select * from socio where idSocio = ' + id, (err, respuesta, fields) => {
        if (err) return console.log('ERROR', err);
        var name = ``;
        respuesta.forEach(user => {
            name += `${user.nombre}`;

        });
        if (name != ``) {
            con.query('update Socio set nombre="' + nombre + '",appat="' + apellido + '",tipoDisiplina=' + dnum + ',turno="' + turno + '",tipoSocio=' + dso + ' where idSocio=' + id, (err, respuesta, fields) => {
                if (err) return console.log('Error', err);
                return res.send('<body style="display:flex; justify-content: center; background-color:black; color:white;"><h1>El usuario ' + nombre + ' fue actualizado con exito</h1> <a style="font-size:20px;" href="index.html">REGRESAR</a></body>');
            });
        } else {
            return res.send(`<body style="display:flex; justify-content: center; background-color:black; color:white; font-size:40px;">
            <div style="display:flex; align-items:center; justify-content:center;">Lo sentimos <br>El id del usuario que ingresaste no existe<br> <a style="display:flex; font-size:20px;" href="getUsuarios.html">Consultar</a></div></body>`);
        }
    });

});



app.listen(8081, () => {
    console.log('Servidor escuchando el puerto 8080');
});