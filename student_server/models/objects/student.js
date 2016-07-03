/**
 * Created by wangzhaoyi on 16/7/3.
 */
module.exports = function (sequelize, DataTypes) {
    function head_values() {
        return ["head_1", "head_2", "head_3"];
    }

    function default_head_values() {
        return head_values()[0];
    }

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
        head_id: {
            type: DataTypes.ENUM,
            values: head_values(),
            allowNull: false,
            defaultValue: default_head_values(),
            validate: {
                withinEnum: function (value) {
                    if (head_values().indexOf(value) == -1) {
                        throw new Error('头像编号不合法');
                    }
                }
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
            }
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
