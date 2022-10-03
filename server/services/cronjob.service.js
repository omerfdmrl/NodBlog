const database = require('../configs/database.config')
database.connect()
const Blog = require('../models/blog.model')
const Tag = require('../models/tag.model')

const tag = async () => {
    var tags = {}
    const blogs = await Blog.find({})
    for await(const blog of blogs){
        blog.tag.forEach(tag => {
            if(tags[tag]){
                tags[tag].count++
            }else{
                tags[tag] = {key: tag, count: 1}
            }
        });
    }
    Tag.deleteMany({},(err) => { if(err) { return err } })
    Tag.create(Object.values(tags),(err) => {if(err) { return err }})
}

tag()