const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
    category: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    gradeWeight: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        validate: {
            max: 1.0,
            min: 0.0,
            notEmpty: true
        }
    },
    totalQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 0.0,
            notEmpty: true
        }
    }
})

module.exports = Category