const Router = require('koa-router')
const mongoose = require('mongoose')
const mongodbConnect = require('../utils/mongodb_utils')
const newMongoDb = new mongodbConnect({
    user: 'smileVue',
    password: "123456",
    dbName: 'smile-vue'
})

let router = new Router()
router.get('/', async(ctx) => {
    ctx.body = "这是用户操作首页"
})

router.post('/register', async(ctx) => {
    try {
        await newMongoDb.connect()
        const User = await newMongoDb.insert('user', ctx.request.body)
        console.log(ctx.request.body)
        ctx.body = { code: 200, message: '注册成功' }
    } catch (error) {
        ctx.body = { code: 500, message: error }
    }

    // let newUser = new User(ctx.request.body)

    // await newUser.save().then(()=>{
    //     ctx.body={
    //         code:200,
    //         message:'注册成功'
    //     }
    // }).catch(error=>{
    //     ctx.body={
    //         code:500,
    //         message:error
    //     }
    // })
})

router.post('/login', async(ctx) => {
    let loginUser = ctx.request.body
    console.log(loginUser)
    let { userName, password } = loginUser
    //引入User的model
    // const User = mongoose.model('User')
    // await User.findOne({ userName: userName }).exec().then(async(result) => {
    //     console.log(result)
    //     if (result) {
    //         let newUser = new User()
    //         await newUser.comparePassword(password, result.password)
    //             .then(isMatch => {
    //                 ctx.body = { code: 200, message: isMatch }
    //             })
    //             .catch(error => {
    //                 console.log(error)
    //                 ctx.body = { code: 500, message: error }
    //             })
    //     } else {
    //         ctx.body = { code: 200, message: '用户名不存在' }
    //     }
    // }).catch(error => {
    //     console.log(error)
    //     ctx.body = { code: 500, message: error }
    // })
    try {
        await newMongoDb.connect()
        console.log(userName, 123123123)
        const logins = await newMongoDb.search('user', { userName: userName })
        console.log(logins, 12345678)
        if (logins) {
            // await comparePassword(password, logins[0].password).then(isMatch => {
            //     ctx.body = { code: 200, message: '登录成功！' }
            // }).catch(error => {
            //     ctx.body = { code: 500, message: error }
            // })
            if (password === logins[0].password) {
                ctx.body = { code: 200, message: '登录成功！' }
            } else {
                ctx.body = { code: 500, message: "error" }

            }
        } else {
            ctx.body = { code: 200, message: '用户名不存在' }
        }
    } catch (error) {
        ctx.body = { code: 500, message: error }
    }

})

comparePassword = (_password, password) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(_password, password, (err, isMatch) => {
            if (!err) resolve(isMatch)
            else reject(err)
        })
    })
}

module.exports = router