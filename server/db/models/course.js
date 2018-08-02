const Sequelize = require('sequelize')
const db = require('../db')

const Course = db.define('course', {
    goalGPA: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        validate: {
            max: 4.0,
            min: 0.0,
            notEmpty: true
        }
    },
    currentGPA: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        validate: {
            max: 4.0,
            min: 0.0,
            notEmpty: true
        }
    },
    finalexamNum: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 0.0,
            notEmpty: true
        }
    },
    finalexamPercentage: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        validate: {
            min: 0.0,
            max: 1.0,
            notEmpty: true
        }
    }
})

module.exports = Course