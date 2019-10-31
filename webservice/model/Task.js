//Importa a conexão Sequelize com o DB
const sequelize = require('../config/sequelize-connection');

//Biblioteca de Data types do Sequelize
const Sequelize = sequelize.Sequelize;

//Deps de Associations
const User = require('./User');
const Project = require('./Project');

//Definição do Sequelize Model
const Task = sequelize.define('task', {
    title: {
        type: Sequelize.STRING
    },
    desc: {
        type: Sequelize.TEXT
    },
    start_date: {
        type: Sequelize.DATE
    },
    done_date: {
        type: Sequelize.DATE
    },
    deadline:{
        type: Sequelize.DATE
    },
    task_status: {
        type: Sequelize.ENUM,
        values: ['not_started', 'started', 'done']
    }
});

//Associations
Task.belongsTo(User);
Task.belongsTo(Project);

module.exports = Task;
