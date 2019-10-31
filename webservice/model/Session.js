//Importa a conexão Sequelize com o DB
const sequelize = require('../config/sequelize-connection');

//Biblioteca de Data types do Sequelize
const Sequelize = sequelize.Sequelize;

//Deps de Associations
const Session = require('./Session');

//Definição do Sequelize Model
const Session = sequelize.define('session', {
    token: {
        type: Sequelize.STRING
    },
    created: {
        type: Sequelize.DATE
    },
    expire: {
        type: Sequelize.DATE
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Session;
