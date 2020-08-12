module.exports = (sequelize, dataTypes) => {
    let alias = "Ropas";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        } ,
        name:{
            type: dataTypes.CHAR
        } ,
        price:{
            type: dataTypes.SMALLINT
        } ,
        discount:{
            type: dataTypes.TINYINT
        } ,
        category:{
            type: dataTypes.CHAR
        } ,
        description:{
            type: dataTypes.TEXT
        } ,
        image:{
            type: dataTypes.BLOB
        } ,
        talle:{
            type: dataTypes.CHAR
        },
        tag:{
            type: dataTypes.CHAR
        }
    };
    let config = {
        tablename: "lodetito",
        timestamps: false,
        freezeTableName: true,
        tableName: 'ropa'
    }

    const Ropa = sequelize.define(alias, cols, config);

    return Ropa;
}