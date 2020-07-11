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
    category_sub.forEach(async(item) => {
        await newMongoDb.insert(
            "categorysubs", item
        )
    })

    console.log('new', newMongoDb)
})();