const Sequelize = require('sequelize')
const db = require('../db')

const Assignments = db.define('assignments', {
    category: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    grade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            max: 100,
            min: 0,
            notEmpty: true
        }
    }
})

module.exports = Assignments