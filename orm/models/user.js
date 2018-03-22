module.exports = (function() {
    'use strict';

    return (sequelize, DataTypes) => {
        const User = sequelize.define('user', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            uid: {
                type: DataTypes.STRING(8),
                allowNull: false,
                unique: true,
            },
            mail: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
        });

        return User;
    };

}).bind(null)();
