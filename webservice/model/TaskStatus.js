//Importa a conexão Sequelize com o DB
const sequelize = require('../config/sequelize-connection');

//Biblioteca de Data types do Sequelize
const Sequelize = sequelize.Sequelize;

//Deps de Associations
const Project = require('./TaskStatus');

//Definição do Sequelize Model
const TaskStatus = sequelize.define('taskStatus', {
    not_started: {
        type: Sequelize.INTEGER
    },
    started: {
        type: Sequelize.INTEGER
    },
    done: {
        type: Sequelize.INTEGER
    }
});

//Associations
TaskStatus.hasOne(Task);

module.exports = TaskStatus;
