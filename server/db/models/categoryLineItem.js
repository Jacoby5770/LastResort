const Sequelize = require('sequelize')
const db = require('../db')

const CategoryLineItem = db.define('categorylineitem', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

module.exports = CategoryLineItem