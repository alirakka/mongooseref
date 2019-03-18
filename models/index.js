const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myapp')
.then(()=>console.log("db Connected!"))

const Schema = mongoose.Schema;

const personSchema = Schema({
//   _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

const storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String
});

const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);

module.exports.Story = Story;
module.exports.Person = Person;