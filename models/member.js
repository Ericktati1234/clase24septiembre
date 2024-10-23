module.exports = (sequelize,type) => {
    const Member = sequelize.define('members',{
        //Para definir los tipos podemos revisar los Data types dentro de la documentacion de sequelize
        id: {type: type.INTEGER, primaryKey:true,autoIncrement:true} , //id es un objeto, ya que es una llave primaria, es incrementable por 1 y es entero
        name:type.STRING, 
        lastName: type.STRING,
        address: type.STRING,
        phone: type.CHAR(10),
        status: type.TINYINT
        
    }); 

    return Member;
};