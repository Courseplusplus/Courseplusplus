/**
 * Created by jiyang on 16/7/3.
 */
module.export = function(sequelize, DataTypes) {
    return sequelize.define('eduadmin', {
        eduadmin_id: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 10]
            }
        },
        password: {
            type: DataTypes.STRING(45),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    },{
        underscored: true
    });
};
