const pagination = require('./pagination')
class Crud {
  constructor() {
    this.Model = null;
  }

  getAll (req, res) {
    pagination(this.Model, {}, req.query)
      .then(results => res.send({ results }))
      .catch(err => {
        console.log(err)
        res.status(500).send(`Internal server error - ${req.path}`);
    })
  }

  getOne (req, res) {
    this.Model.find({ _id: req.params.id })
      .then(result => res.send({ result }))
      .catch(err => {
        console.log(err)
        res.status(500).send(`Internal server error - ${req.path}`);
    })
  }
  
  createOne (req, res) {
    if (!req.body) {
      return res.status(400).send('wrong request');
    }
    this.Model.create(req.body)
      .then(() => res.status(200).send('success'))
      .catch(e => {
        console.log(e)
        res.status(500).send(`Internal server error - ${req.path}`);
      })
  }
  
  deleteOne (req, res) {
    this.Model.remove({ _id: req.params.id })
      .then(() => res.status(200).send('success delete'))
      .catch(e => {
        console.log(e)
        res.status(500).send(`Internal server error - ${req.path}`)
      })
  }
  
  editOne (req, res) {
   this.Model.updateOne({ _id: req.params.id }, { $set: req.body })
    .then(() => res.status(200).send('success'))
    .catch (e => {
      console.log(e)
      res.status(500).send(`Internal server error - ${req.path}`)
    })
  }
}

module.exports = Crud
