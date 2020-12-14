create database mybase;
use mybase;
create table Usuario(
id int auto_increment not null key,
nombre varchar(50) 
);
insert into Usuario(nombre)values('Angela');
select * from Usuario;
delete from Usuario where id=5;
select*from Usuario where nombre="Karen";
delete from Usuario where nombre="Karen";
update Usuario set nombre="Laura" where id=4;


drop table Socio;
create table Socio(
IdSocio int not null auto_increment key,
nombre varchar(50) not null,
appat varchar(50) not null,
tipoDisiplina int(2) not null,
turno varchar(50) not null,
tipoSocio int (2) not null
);
select*from Socio;

drop table csocios;
create table cSocios(
tipoSocio int not null primary key auto_increment,
socio varchar(50) not null,
sueldo int not null,
horas int not null
);
select*from cSocios;

drop table cDisiplinas;
create table cDisiplinas(	
tipoDisiplina int auto_increment not null primary key,
disiplina varchar(50) 
);
select*from cDisiplinas;

insert into Socio (nombre,appat,tipoDisiplina,turno,tipoSocio) values("Karen","Sotelo",4,"Vespertino",4);
insert into Socio (nombre,appat,tipoDisiplina,turno,tipoSocio) values("Vania","Arconada",2,"Matutino",2);
insert into Socio (nombre,appat,tipoDisiplina,turno,tipoSocio) values("Prscila","Martinez",1,"Matutino",3);
insert into Socio (nombre,appat,tipoDisiplina,turno,tipoSocio) values("Julian","Gomez",1,"Vespertino",3);

insert into cSocios (socio,sueldo,horas) values("Gerente",15000,8);
insert into cSocios (socio,sueldo,horas) values("Empleado",3000,10);
insert into cSocios (socio,sueldo,horas) values("Coach",2000,6);
insert into cSocios (socio,sueldo,horas) values("Cliente",0,15);

insert into cDisiplinas (disiplina) values("Funcional");
insert into cDisiplinas (disiplina) values("GYM");
insert into cDisiplinas (disiplina) values("Box");
insert into cDisiplinas (disiplina) values("Muay Thai");
insert into cDisiplinas (disiplina) values("Jiu Jitsu");


select IdSocio,nombre,appat,turno,Socio,Sueldo,horas, disiplina from Socio as a
join cSocios as b join cDisiplinas as c on a.tipoSocio = b.tipoSocio	
and a.tipoDisiplina=c.tipoDisiplina;
drop table Socio;
select*from Socio;

select*from socio where idSocio=1;

update Socio set nombre="Cosmo",appat="Garcia",tipoDisiplina=3,turno="Matutino",tipoSocio=1 where idSocio=1;

delete from Socio where IdSocio=18;