const bcrypt = require("bcrypt")

module.exports = (sequelize, dataTypes) => {
    let alias = "Users";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        } ,
        nombre:{
            type: dataTypes.CHAR,
            allowNull: false,
            isAlpha: true
        } ,
        apellido:{
            type: dataTypes.CHAR,
            allowNull: false,
            isAlpha: true
        } ,
        sexo:{
            type: dataTypes.CHAR,
            allowNull: false
        } ,
        email:{
            type: dataTypes.CHAR,
            allowNull: false,
            unique: "email",
            unique: true,
            isEmail: true
        } ,
        celular:{
            type: dataTypes.CHAR,
            allowNull: false
        } ,
        password1:{
            type: dataTypes.CHAR,
            allowNull: false,
            min: 6
        } ,
        password2:{
            type: dataTypes.CHAR,
            allowNull: false,
            min: 6
        },
    };
    let config = {
        tablename: "lodetito",
        timestamps: false,
        freezeTableName: true,
        tableName: 'users'
    }

    const Users = sequelize.define(alias, cols, config);

    return Users;
}