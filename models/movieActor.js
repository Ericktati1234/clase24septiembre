module.exports = (sequelize,type) => {
    const MovieActor = sequelize.define('movies_Actors',{
        id:{type:type.INTEGER, primaryKey:true,autoIncrement:true},
        movieId: type.INTEGER,
        actorId: type.INTEGER
    });
    return MovieActor;
};
