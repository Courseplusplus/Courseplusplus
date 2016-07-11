/**
 * Created by 13211008 on 16-7-9.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('term', {
        term_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            validate:{
                notEmpty:true,
                is:/^\d{4}年(春|夏|秋|冬)季学期$/i
            }
        },
        start_date:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        end_date:{
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        underscored: true
    });
};