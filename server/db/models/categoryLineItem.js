const Sequelize = require('sequelize')
const db = require('../db')

const CategoryLineItem = db.define('categoryLineItem', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

module.exports = CategoryLineItem