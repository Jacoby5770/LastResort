const Sequelize = require('sequelize')
const db = require('../db')

const Assignment = db.define('assignment', {
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

module.exports = Assignment