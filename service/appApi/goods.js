const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')
const fs = require('fs')
const mongodbConnect = require('../utils/mongodb_utils')

const newMongoDb = new mongodbConnect({
    user: 'smileVue',
    password: "123456",
    dbName: 'smile-vue'
})

router.get('/insertAllGoodsInfo', async(ctx) => {
    fs.readFile('./newGoods.json', 'utf8', async(err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
            // const Goods = await newMongoDb.search('Goods')
        const Goods = mongoose.model('Goods')
        data.map((value, index) => {
            console.log('value', value)
            let newGoods = new Goods(value)
            console.log('newGoods', newGoods)
            newGoods.save().then(() => {
                saveCount++
                console.log('成功' + saveCount)
            }).catch(error => {
                console.log(MediaStreamErrorEvent)
            })
        })
    })
    ctx.body = "开始导入数据"
})

router.get('/insertAllCategory', async(ctx) => {
    fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const Category = mongoose.model('Category')
        data.RECORDS.map((value, index) => {
            //console.log(value)
            let newCategory = new Category(value)
            newCategory.save().then(() => {
                saveCount++
                console.log('插入成功:' + saveCount)
            }).catch(error => {
                console.log('插入失败:' + error)
            })
        })

    })
    ctx.body = "开始导入数据....."
})

router.get('/insertAllCategorySub', async(ctx) => {
    fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const CategorySub = mongoose.model('CategorySub')
        data.RECORDS.map((value, index) => {
            console.log(value)
            let newCategorySub = new CategorySub(value)
            newCategorySub.save().then(() => {
                saveCount++
                console.log('插入成功:' + saveCount)
            }).catch(error => {
                console.log('插入失败:' + error)
            })
        })

    })
    ctx.body = "开始导入数据....."
})


//**获取商品详情信息的接口
router.post('/getDetailGoodsInfo', async(ctx) => {
    try {
        await newMongoDb.connect()
        let goodsId = ctx.request.body.goodsId
        let result = await newMongoDb.search('goods', { ID: goodsId.toString() })
        console.log(goodsId)
            // let result = await Goods.findOne(}).exec()
        ctx.body = { code: 200, message: result }
    } catch (error) {
        ctx.body = { code: 500, message: error }
    }
})

//**读取大类数据的接口 */

router.get('/getCategoryList', async(ctx) => {
    try {
        await newMongoDb.connect()
        let result = await newMongoDb.search('categories')
        ctx.body = { code: 200, message: result }
    } catch (error) {
        ctx.body = { code: 500, message: error }
    }
})

/**读取小类的数据 */


router.post('/getCategorySubList', async(ctx) => {
    try {
        await newMongoDb.connect()
        let cateoryId = ctx.request.body.categoryId
            //let cateoryId=1
        let result = await newMongoDb.search('categorysubs', { MALL_CATEGORY_ID: cateoryId.toString() })
        ctx.body = { code: 200, message: result }
    } catch (error) {
        ctx.body = { code: 500, message: error }
    }

})

/**根据类别获取商品列表 */

router.post('/getGoodsListByCategorySubID', async(ctx) => {
    try {
        console.log(123456789)
        await newMongoDb.connect()
        let categorySubId = ctx.request.body.categorySubId //子类别ID
        let page = ctx.request.body.page //当前页数
        let num = 10 //每页显示数量
        let start = (page - 1) * num //开始位置
        console.log('categorySubId', categorySubId)
            // const Goods = await Category.search('Goods')
        let result = await newMongoDb.search('goods', { SUB_ID: categorySubId.toString() })
            // .skip(start).limit(num)
        ctx.body = { code: 200, message: result }
    } catch (error) {
        ctx.body = { code: 500, message: error }
    }

})

module.exports = router