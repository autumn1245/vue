// 数据json推送到数据库
const mongodbConnect = require('../utils/mongodb_utils')
const categories = require('./category')
const good = require('./goods')
const category_sub = require('./category_sub')
    // console.log(good.length
const newMongoDb = new mongodbConnect({
    user: 'smileVue',
    password: "123456",
    dbName: 'smile-vue'
});
(async function() {
    await newMongoDb.connect()
        // categories.forEach(async(item) => {
        //     await newMongoDb.insert(
        //         "categories", item
        //     )
        // // })
        //    good.forEach(async(item) => {
        //     await newMongoDb.insert(
        //         "goods", item
        //     )
        // })

    // category_sub.forEach(async(item) => {
    //     await newMongoDb.insert(
    //         "categorysubs", item
    //     )
    // })

    //  const temp = await newMongoDb.search('categorysubs', { MALL_CATEGORY_ID: '4' })
    let temp = await newMongoDb.search('goods', { SUB_ID: "2c9f6c946016ea9b016016f79c8e0000" }).skip(start).limit(num)
    console.log('temp----------', temp)

    console.log('new', newMongoDb)
})();