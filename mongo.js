const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
} else if (process.argv.length === 4) {
  console.log('Please provide both a name and number as arguments: node mongo.js <password> <name> <number>')
  process.exit(1)
} else if (process.argv.length > 5) {
  console.log('Please only provide password, name, and number as arguments: node mongo.js <password> <name> <number>. If name contains whitespace, enclose in quotes.')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.wvr15.mongodb.net/myPhonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (name && number) {
  const person = new Person({name, number})

  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('phonebook:')
  Person.find({}).then(people => {
    people.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}
