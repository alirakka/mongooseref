var express = require('express');
var router = express.Router();
var db = require('../models');

/* GET users listing. */
router.get('/addPerson', (req, res)=>{
  res.render('addPerson');
});

router.get('/person/:id', (req, res)=>{
  db.Person.findById(req.params.id)
  .then((person)=>res.send(person))
  .catch((err)=>{
    console.log(err); 
    res.send(err)
  })
})

router.post('/addPerson', (req, res)=>{
  db.Person.create({name: req.body.name, age: req.body.age})
  .then((person)=>{
    res.send(person) 
  })
  .catch((err)=>{
    console.log(err); 
    res.send(err)
  })
});

router.get('/addStory', (req, res)=>{
  res.render('addStory')
})

router.get('/story/:id', (req, res)=>{
  db.Story.findById(req.params.id)
  .then((story)=>res.send(story))
  .catch((err)=>{
    console.log(err); 
    res.send(err)
  })
})


router.post('/addStory', (req, res)=>{
  db.Story.create({author: req.body.author, title: req.body.title})
  .then((story)=>{
    db.Person.findByIdAndUpdate(story.author, {$push: {stories: story._id}})
    .then(()=>res.send(story))
  })
  .catch((err)=>{
    console.log(err); 
    res.send(err)
  })
})

module.exports = router;
