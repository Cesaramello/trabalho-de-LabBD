//Importa a conexão Sequelize com o DB
const sequelize = require('../config/sequelize-connection');

//Biblioteca de Data types do Sequelize
const Sequelize = sequelize.Sequelize;

//Deps de Associations
const Project = require('./Project');

//Definição do Sequelize Model
const User = sequelize.define('user', {
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
});

//Associations
User.hasMany(Project);

module.exports = User;
