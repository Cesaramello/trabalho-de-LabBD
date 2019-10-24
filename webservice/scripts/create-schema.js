//Script para a execução do método Sync Force do Sequelize.
//Sendo este método destrutivo para dados o script faz um backup
//do arquivo sqlite no dir configurado

//Node.js File File System
const fs = require('fs');

//Driver SQLite
const sqlite = require('sqlite3').verbose();

//Importa a conexão Sequelize com o DB
const sequelize = require('../config/sequelize-connection');

//Importa o Façade (index.js) de todos os arquivos no diretório model
const model = require('../model');

const dbDir = './db/';
const dbBackupDirName = 'backups/';
const dbFilename = 'database.sqlite';
const dbFilePath = dbDir + dbFilename;
const dbBackupDir = dbDir + dbBackupDirName;

const checkDirectory = (dirPath) => new Promise((resolve, reject) => {
    fs.access(dirPath, (err) => {
        if (err) {
            console.log('Não foi possível encontrar o diretório ' + dirPath + ' . Criando...');
            fs.mkdir(dirPath, (err) => {
                if (err) {
                    reject('Não foi possível criar o diretório ' + dirPath + '\n' + err);
                } else {
                    console.log(dirPath + ' Criado com sucesso');
                    resolve();
                }
            });
        } else {
            console.log(dirPath + ' foi encontrado.');
            resolve();
        }
    });
});

const checkDatabase = (databasePath) => new Promise((resolve, reject) => {
    fs.access(databasePath, (err) => {
        if (err) {
            console.log('Não foi possível encontrar o DB ' + databasePath + ' . Criando...');
            new sqlite.Database(databasePath, (err) => {
                if (err) {
                    reject('Não foi possível criar o DB \n' + err);
                } else {
                    console.log(databasePath + ' Criado com sucesso');
                    resolve();
                }
            })
        } else {
            console.log(databasePath + ' foi encontrado.');
            resolve();
        }
    });
});

const createDatabaseBackup = () => new Promise((resolve, reject) => {

    const dateNow = Math.floor(Date.now() / 1000);
    const newDbFilename = `${dateNow}.sqlite`;
    const newDbFilePath = dbBackupDir + newDbFilename;

    const backupStream = fs.createReadStream(dbFilePath)
        .pipe(fs.createWriteStream(newDbFilePath));

    backupStream.on('error', err => {
        reject('Impossível fazer backup do DB: \n' + err);
    });

    backupStream.on('close', function() {
        console.log('Backup do dabase criado em ' + newDbFilePath)
        resolve();
    });

});

const forceModelSync = () => new Promise((resolve, reject) => {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Conectado ao DB com sucesso');
            sequelize.sync({
                    force: true
                }).then(() => {
                    console.log('Sincronização de models concluída com sucesso.');
                    resolve();
                })
                .catch(err => {
                    reject('Não foi possível executar a sincronização dos models: \n ' + err);
                });
        })
        .catch(err => {
            reject('Não foi possível se conectar ao DB: \n' + err);
        });
});

checkDirectory(dbDir)
    .then(checkDatabase(dbFilePath))
    .then(checkDirectory(dbBackupDir))
    .then(createDatabaseBackup)
    .then(forceModelSync)
    .catch(err => {
        console.log(err);
    });
