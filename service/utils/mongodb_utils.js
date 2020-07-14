//mongodb 数据库连接中间层（包含连接配置插入查询等等）
// 引入官方连接工具
const mongodb = require("mongodb");
class mongodbConnect {
    /**  
     * @param config object
     * @param config.user string
     * @param config.password string
     * @param config.ip string
     * @param config.port number
     * @param config.admin string
     */

    constructor(config) {
        if (!config.dbName) {
            throw '请输入dbname!'
        }
        const { user = '', password = '', ip = 'localhost', port = 27017, admin = 'admin', dbName } = config
        this.config = `mongodb://${user}:${password}@${ip}:${port}/${admin}`;
        this.dbName = config.dbName
    }
    connect() {
            return new Promise((resolve, reject) => {
                mongodb.connect(this.config, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }, (err, db) => {
                    if (err) {
                        throw err
                        reject()
                    }
                    console.log('数据库连接成功！')
                    this.connection = db.db(this.dbName)
                    resolve()
                });
            })
        }
        // 插入操作
    insert(name, obj) {
            return new Promise((resolve, reject) => {
                this.connection.collection(name).insertOne(obj, function(err, res) {
                    if (err) {
                        throw err
                        reject()
                    };
                    resolve(res);
                });
            })
        }
        // 查询操作
    search(name, option) {
        return new Promise((resolve, reject) => {
            const result = this.connection.collection(name).find(option)
            result.toArray((err, data) => {
                if (err) {
                    throw err;
                    reject()
                }
                console.log(333)
                resolve(data)
            })
        })
    }
}
module.exports = mongodbConnect