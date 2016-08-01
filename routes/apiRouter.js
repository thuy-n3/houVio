let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

let User = require('../db/schema.js').User

  
  apiRouter
    .get('/users', function(req, res){
      User.find(req.query , "-password", function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      })
    })

  apiRouter
    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      })
    })
    .put('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password",function(err, record){
        if(err || !record) return res.json(err)
        let recordWithUpdates = helpers.updateFields(record, req.body)
        recordWithUpdates.save(function(err){
          if(err) return res.json(err) 
          res.json(recordWithUpdates)
        })
      })
    })
    .delete('/users/:_id', function(req, res){
      User.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })  
    })

   
    // Routes for a Model(resource) should have this structure

//3. establish server-side api router: query for 'home' from server

//api router list :
//  /home (current)
//  /viewAll
//  /currentMonth
//  /year
//  /hallofshame


    //home - at the moment: get all records 
    //  apiRouter.get('/home', function(request,response){
    //   console.log("getting records home")
    //   Coh_HV.find({}, function(error,records){
    //     response.send(records)
    //   })
    // })

    //get all 
    apiRouter.get('/viewAll', function(request, response){
      console.log('getting all records')
      Coh_HV.find(request.query, function(error, records){
        if(error){
          response.send(error)
        }
        else{
          response.json(records)
        }
      })
    })


module.exports = apiRouter
















