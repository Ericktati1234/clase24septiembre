module.exports = (sequelize,type) => {
    const Director = sequelize.define('directors',{
        //Para definir los tipos podemos revisar los Data types dentro de la documentacion de sequelize
        id: {type: type.INTEGER, primaryKey:true,autoIncrement:true} , //id es un objeto, ya que es una llave primaria, es incrementable por 1 y es entero
        name:type.STRING, 
        lastName: type.STRING //es importante definir esto con cammelCase, aunque en la base este definido con _ 
        // EN los diagramas entidad relacion se usa el _
    }); //Ayuda a estructurar la relacion entre la tabla y el objeto

    return Director;
};