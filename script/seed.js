'use strict'

const db = require('../server/db')
const {User, Course, Category, CategoryLineItem, Assignment} = require('../server/db/models')
const courseData = require('./CourseData')
const categoryData = require('./CategoryData')
const categoryLineItemData = require('./CategoryLineItemData')
const assignmentData = require('./AssignmentData')
const userData = require('./UserData')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all(      
    userData.map(user => User.create(user))
)

    const courses = await Promise.all(
      courseData.map(course => Course.create(course))
    )

    const categories = await Promise.all(
      categoryData.map(category => Category.create(category))
    )

    const assignments = await Promise.all(
      assignmentData.map(assignment => Assignment.create(assignment))
    )
  
    const categoryLineItems = await Promise.all(
      categoryLineItemData.map(categoryLineItem => CategoryLineItem.create(categoryLineItem))
    )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${courses.length} course`)
  console.log(`seeded ${categories.length} category`)
  console.log(`seeded ${categoryLineItems.length} categoryLineItem`)
  console.log(`seeded ${assignments.length} assignment`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
