//Importa a conexão Sequelize com o DB
const sequelize = require('../config/sequelize-connection');

//Biblioteca de Data types do Sequelize
const Sequelize = sequelize.Sequelize;

//Deps de Associations
const Project = require('./Project');
const Task = require('./Task');
const Session = require('./Session');

//Definição do Sequelize Model
const User = sequelize.define('user', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        valodatr: {
            notNull: {
                msg: 'O email é obrigatório.'
            },
            isEmail: {
                msg: 'O email informado não é válido.'
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'A senha é obrigatório. '
            },
            len : {
                args: [5, 10],
                msg: 'A senha deve ter entre 5 e qo caracteres.'
            }
        }
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'O nome é obrigatório.'
            },
            len: {
                args: [4, 120],
                msg: 'O nome deve ter entre 5 e 120 caracteres.'
            }
        }
    },
    admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

//Associations
User.hasMany(Project);
User.hasMany(Task);
User.hasMany(Session);

module.exports = User;
