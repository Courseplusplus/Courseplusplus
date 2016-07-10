/**
 * Created by 13211008 on 16-7-9.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('term', {
        term_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        start_date:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        end_date:{
            type: DataTypes.DATE,
            allowNull: false
        },
        total_week:{
            type:DataTypes.INTEGER,
            allowNull:false,
            defaultValue: 17
        }
    }, {
        underscored: true
    });
};