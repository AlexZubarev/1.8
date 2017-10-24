mongodb = require('mongodb');
MongoClient = mongodb.MongoClient;
url = 'mongodb://localhost:27017/netologyMongo';
let user1 = { 'name': 'Maks' },
    user2 = { 'name': 'Valera' },
    user3 = { 'name': 'Vlad' },
    user4 = { 'name': 'Sergey' }

MongoClient.connect(url, (err, db) => {
    if (err) {
        console.log(err)
    }
    else {
        let collection = db.collection('users');
        collection.insert([user1, user2, user3, user4], (err, result) => {
            if (err) {
                console.log(err)
            }
            console.log('Были добавлены юзеры:')
            console.log(result.ops)
            collection.updateMany({ name: 'Vlad' }, { $set: { name: 'Yura' } }, (err, res) => {
                console.log('Имена заменены')
                collection.find({}).toArray((err, res) => {
                    if (err) console.log(err)
                    console.log('Финальный список:')
                    console.log(res)
                    collection.remove({ name: 'Maks' }, (err, res) => {
                        if (err) console.log(err)
                        console.log('Удалил Maks')
                        console.log(res.result)
                        console.log('rm -rf')
                        collection.remove()
                    })
                })
            })
        })
    }
})