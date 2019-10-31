//Importa a conexão Sequelize com o DB
const sequelize = require('../config/sequelize-connection');

//Deps de Associations
const User = require('./User');

//Biblioteca de Data types do Sequelize
const Sequelize = sequelize.Sequelize;

//Definição do Sequelize Model
const Project = sequelize.define('project', {
    name: {
        type: Sequelize.STRING
    },
    desc: {
        type: Sequelize.TEXT
    }
});

//Associations
Project.belongsTo(User);

module.exports = Project;