module.exports = (function() {
    'use strict';

    return (sequelize, DataTypes) => {
        const Message = sequelize.define('Message', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            mess: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: sequelize.models.user,
                    key: 'id'
                }
            }
        });

        return Message;
    };

}).bind(null)();
