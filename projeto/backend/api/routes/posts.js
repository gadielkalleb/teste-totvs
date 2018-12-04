const express = require('express')
const postsController = require('../posts')


const router = express.Router()


router.get('/', postsController.getAll)
router.get('/nova', postsController.novaForm)
router.post('/nova', postsController.novaProcess)
router.delete('/excluir/:id', postsController.excluir)
router.get('/editar/:id', postsController.editarForm)
router.post('/editar/:id', postsController.editarProcess)
router.get('/info/:id', postsController.info)
router.post('/info/:id', postsController.addComentario)

module.exports = router