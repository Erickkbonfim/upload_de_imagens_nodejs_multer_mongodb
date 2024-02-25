//middleware nas rotas
const express = require('express')
const router = express.Router()

const { imageUpload } = require('../helpers/image-upload')
router.patch('/edit/:id', imageUpload.single("image"), userController.editUser)
/*
o imageUpload é importado do helper isoladamente para ficar na rota antes do controller e leva como parametro o tipo de arquivo que recebe no caso .single("image")
*/
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//middleware para indicar que os arquivos estáticos ficarão na pasta public do servidor (colocado no index da aplicação ou pasta central antes dos middlewares das rotas)
app.use(express.static('public'))
