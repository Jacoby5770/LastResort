const User = require('./user')
const Course = require('./course')
const Category = require('./category')
const Assignment= require('./assignment')
const CategoryLineItem= require('./categoryLineItem')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Assignment.belongsToMany(Category, {through: CategoryLineItem})
Category.belongsToMany(Assignment, {through: CategoryLineItem})

User.hasMany(Course)
Course.belongsTo(User)

module.exports = {
  User,
  Course,
  Category,
  Assignment,
  CategoryLineItem
}
