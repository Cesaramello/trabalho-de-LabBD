const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', null, null, {
    dialect: "sqlite",
    storage: './db/database.sqlite',
    //Desativa por padrão timestamps para os models
    define: {
        timestamps: false
    }
});

module.exports = sequelize;
