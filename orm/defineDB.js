/*
 * defineDB.js
 */
module.exports = (async function() {
    'use strict';

    const debug = require('debug')('defineDB');
    const Sequelize = require('sequelize');

    const sequelize = await connectSequelize();
    importModels(sequelize);

    async function connectSequelize() {
        const sequelize = new Sequelize('database', 'username', 'password', {
            host: 'localhost',
            dialect: 'sqlite',
            pool: {
                max: 5,
                min: 0,
                acquire: 30 * 1000,
                idle: 10 * 1000
            },
            storage: './database.sqlite',
            isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });
        await sequelize.authenticate();
        debug('Connection has been established successfully.');
        return sequelize;
    }

    function importModels(sequelize) {
        const User = sequelize.import('./models/user.js');
        const Message = sequelize.import('./models/message.js');

        User.hasOne(Message, {
            as: 'Message',
            foreignKey: 'userId',
            sourceKey: 'id'
        });

        Message.belongsTo(User, {
            as: 'User',
            foreignKey: 'userId',
            targetKey: 'id'
        });
        sequelize.sync();

    }

    return {
        sequelize: sequelize,
    };

}).bind(null)();
