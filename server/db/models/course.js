const Sequelize = require('sequelize')
const db = require('../db')

const Course = db.define('course', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    goalGPA: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        validate: {
            max: 4.0,
            min: 0.0,
            notEmpty: true
        }
    }
})

module.exports = Course