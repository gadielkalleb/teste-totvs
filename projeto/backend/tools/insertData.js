const Posts = require('../api/posts/models/posts')

const data = require('../data_json/MOCK_DATA.json')

data.forEach(d => {
  Posts.create(d).then(() => {
    console.log('salvo')
  }).catch(err => {
    console.log(err)
  })
})
console.log('finalizado')

