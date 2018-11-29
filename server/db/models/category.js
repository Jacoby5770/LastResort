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
            max: 100,
            min: 0,
            notEmpty: true
        }
    }
})

module.exports = Category