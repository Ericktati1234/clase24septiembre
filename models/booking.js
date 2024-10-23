module.exports = (sequelize,type) => {
    const Booking = sequelize.define('bookings',{
        //Para definir los tipos podemos revisar los Data types dentro de la documentacion de sequelize
        id: {type: type.INTEGER, primaryKey:true,autoIncrement:true} , //id es un objeto, ya que es una llave primaria, es incrementable por 1 y es entero
        date: type.DATE(2), 
        memberId: type.INTEGER,
        copyId: type.INTEGER
    }); //Ayuda a estructurar la relacion entre la tabla y el objeto

    return Booking;
};