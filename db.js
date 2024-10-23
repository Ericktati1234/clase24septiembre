const Sequelize = require('sequelize');
//Es importante que como es una clase lo definimos con una mayuscula
const directorModel = require('./models/director');
const genreModel = require('./models/genre');
const movieModel = require('./models/movie');
const actorModel = require('./models/actor');
const movieActorModel = require('./models/movieActor');
const member = require('./models/member');
const copy = require('./models/copy');
const booking = require('./models/booking');




/*
Elementos que van a existir dentro de nuestra base de datos

    1) Nombre de la base de datos
    2) Usuario.
    3) Password
    4) Objeto de configuracion <<ORM>>
3
*/ 

const sequelize = new Sequelize('video-club','root','abcd1234',{
    host: '127.0.0.1', //Puede cambiar, solo que nos lo debe de brindar dicha BD
    dialect: 'mysql'
});

const Director = directorModel(sequelize,Sequelize);
const Genre = genreModel(sequelize,Sequelize);
const Movie = movieModel(sequelize,Sequelize);
const Actor = actorModel(sequelize,Sequelize);
const MovieActor = movieActorModel(sequelize,Sequelize);
const Member = member(sequelize,Sequelize);
const Copy = copy(sequelize,Sequelize);
const Booking = booking(sequelize,Sequelize);





// Un genero puede tener muchas peliculas
Genre.hasMany(Movie,{as:'movies' }); //A genre le va a hacer una lista de peliculas llamado movies y a movie le va a generar un genre

//Una pelicula tiene un genero
Movie.belongsTo(Genre, {as:'genre'});

//Un director participa en muchas peliculas
Director.hasMany(Movie,{as:'movies'});

//Una pelicula tiene un director
Movie.belongsTo(Director,{as:'director'}); //ATENCION, es el singular del modelo


//RELACION MUCHOS A MUCHOS

//Un actor participa en muchas peliculas
MovieActor.belongsTo(Movie,{foreignKey:'movieId'});

//EN una pelicula participan muchos actores
MovieActor.belongsTo(Actor,{foreignKey:'actorId'});


Booking.belongsTo(Member,{foreignKey:'memberId'});

Booking.belongsTo(Copy,{foreignKey:'copyId'});

//movieActor -> Movie
Movie.belongsToMany(Actor,{
    foreignKey:'movieId', //Es dicha clave foranea
    as:'actors',
    through:'movies_Actors'
});

//movieActor -> Actor
Actor.belongsToMany(Movie,{
    foreignKey:'actorId', //Es dicha clave foranea
    as:'movies',
    through:'movies_Actors'
});


Member.belongsToMany(Copy,{
    foreignKey:'memberId', //Es dicha clave foranea
    as:'copies',
    through:'bookings'
});

Copy.belongsToMany(Member,{
    foreignKey:'copyId', //Es dicha clave foranea
    as:'members',
    through:'bookings'
});


//Los ORM pueden construirnos las tablas y esquemas que nosotros necesitamos

sequelize.sync({
    force: true //tumba todo y lo vuelve a hacer
    //como sync es una promesa por fuerza debe de retornar algo, lo que definimos con then
}).then(()=>{
    console.log("Base de datos sincronizados correctamente");
}); //solo se utiliza una vez y se debe de apagar


module.exports = {Director,Genre,Movie,Actor,MovieActor,Member,Copy,Booking}
//realiza los esquemas, tablas, cuando lo programamos

//Gracias al supervisor este comando cada vez que realizamos un cambio crea el esquema y todas las tablas
//RESETEA TODA LA BASE DE DATOS


//PASOS PARA DEFINIR SEQUELIZE
    //siempre definimos las entidades de los esquemas por las puntas