module.exports = (sequelize,type) => {
    const Copy = sequelize.define('copies',{
        id: {type: type.INTEGER, primaryKey:true,autoIncrement:true} , 
        number:type.INTEGER, 
        format: type.ENUM('VHS','DVD','BLURAY'),
        movieId: type.INTEGER,
        status: type.ENUM('NO AVAILABLE','AVAILABLE','LOST')
    }); 
    return Copy;
};