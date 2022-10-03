const AWS = require('aws-sdk')
const fs = require('fs')
const Settings = require('../models/settings.model')

const init = async () => {
    const settings = await Settings.findOne({},{'api.aws': 1})
    if(!settings.api.aws.display) {
        return { s3: false }
    }
    const s3 = await new AWS.S3({
        accessKeyId: settings.api.aws.access,
        secretAccessKey: settings.api.aws.secret,
        region : settings.api.aws.region
    })
    return {s3,settings};
}

const upload = async (Filename,Filepath) => {
    const { s3, settings } = await init()
    if(!s3){
        return false;
    }
    const fileStream = fs.createReadStream(Filepath)
    const upload = await s3.upload({
        Bucket : settings.api.aws.bucket,
        Body : fileStream,
        Key : Filename,
        ACL:'public-read'
    }).promise()
    return upload;
}

const remove = async (File) => {
    const { s3, settings } = await init()
    if(!s3){
        return false;
    }
    const upload = await s3.deleteObject({
        Bucket : settings.api.aws.bucket,
        Key : File
    }).promise()
    return upload;
}

module.exports = {
    upload,
    remove
}