const { createClient }  = require('redis');
const Setting = require('../models/settings.model')

const init = async () => {
    const settings = await Setting.findOne({},{_id:0, 'api.redis': 1})
    const client = createClient({
        url: settings.api.redis.url
    });
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    return client;
}

const set = async (key,value,ttl = false) => {
    const client = await init()
    if(ttl){
        client.setEx(key, ttl * 60, value)
    }else {
        client.set(key, value);
    }
    return true;
}

const get = async (key,defaultValue = null) => {
    const client = await init()
    const value = await client.get(key);
    return value ?? defaultValue;
}

module.exports = {
    init,
    set,
    get
}