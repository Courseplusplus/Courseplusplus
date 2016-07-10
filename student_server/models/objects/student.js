/**
 * Created by wangzhaoyi on 16/7/3.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('student', {
        student_id: {
            type: DataTypes.STRING,
            autoIncrement: false,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                len: [6, 30]
            }
        },
        telephone: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                is: /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i
            }
        },
        password: {
            type: DataTypes.STRING(45),
            allowNull: false,
            validate: {
                notEmpty: true
            },
            defaultValue:"md5$11188111$5f5b3be22cd087acccdd9d2a081e2f1a"
        },
        refresh_token: {
            type: DataTypes.STRING(128),
            allowNull: true,
            defaultValue: null
        }
    }, {
        underscored: true
    });
};
