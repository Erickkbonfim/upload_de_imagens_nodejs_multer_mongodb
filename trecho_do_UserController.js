const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//helpers de jsonwebtoken para validação autenticação de usuários pela api
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController{
  static async editUser(req,res){
        const id = req.params.id

        const token = getToken(req)
        const user = await getUserByToken(token)

        const {name, email, phone, password, confirmPassword } = req.body
        
        if(req.file){
            user.imagem = req.file.filename;
        }


        user.id = id;

        if (!user) {
            res.status(422).json({ 
                message: 'Usuário não encontrado!' 
            })
            return
        }

        if(!name){
            res.status(422).json({message: "o nome é obrigatório!"})
            return
        }
        user.name = name;
        if(!email){
            res.status(422).json({message: "o email é obrigatório!"})
            return
        }
        const userExist = await User.findOne({email: email})
        if(user.email !== email && userExist){
            res.status(422).json({
                message: "Por favor, utilize outro email!"
            })
            return
        }
        user.email = email;
        if(!phone){
            res.status(422).json({
                message: "o número de celular é obrigatório!"
            })
            return
        }
        user.phone = phone;
        
        if(password != confirmPassword){
            return res.status(422).json({  
                message: "As senhas não conferem!"
            })
        } else if(password == confirmPassword && password != null){
            const salt = await bcrypt.genSalt(15)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash
        }
        try{

            const updatedUser = await User.findOneAndUpdate(
                { _id: user.id },
                { $set: user },
                { new: true }
            )
            res.status(200).json({
                message: "usuário atualizado com sucesso!",
            })
        }
        catch(error){
            res.status(500).json({
                message: "Errro ao atualizar o usuário, internal server error",
                error
            })
            return
        }

        console.log(user)
    } 

  
}


//este é apenas um trecho do arquivo UserController.js que segue a arquitetura MVC, esse trecho recebe as strings name, email, phone, password e confirmPassword 
