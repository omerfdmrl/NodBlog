const GoogleDriveService = require('./drive.service');
const AwsService = require('./aws.service')
const fs = require('fs');
const Settings = require('../models/settings.model')

const file = async (File,fileName,folderName = null,fileExtensions = ['png','jpg','jpeg','gif'], fileSize = 150) => {

    if(!File){
        return {status:0, message: 'image_cant_upload'}
    }

    fileSize = 1024 * fileSize

    if(File.size > fileSize){
        return {status : 0, message : 'invalid_image_size'}
    }

    let fileExtension = File.originalFilename.substring(File.originalFilename.lastIndexOf('.')+1, File.originalFilename.length)

    if(!fileExtensions.includes(fileExtension)){
        return {status : 0 , message : 'invalid_image_extension'}
    }

    var filePath = __basedir + '/public/'
    if(folderName) filePath += folderName + '/'
    if(!fs.existsSync(filePath)){
        fs.mkdirSync(filePath)
    }
    fileExtensions.forEach(element => {
        if(fileExtension !== element){
            if(fs.existsSync(filePath + fileName + '.' + element)){
                fs.unlinkSync(filePath + fileName + '.' + element)
            }
        }
    });
    fileName = fileName + '.' + fileExtension
    filePath +=  fileName;
    var fileMimeType = File.type
    await fs.promises.copyFile(File.path,filePath)

    const settings = await Settings.findOne({},{'url':1, 'api':1})

    if(settings.api.aws.display){
        const location = (folderName ? folderName + '/' : '') + fileName
        const upload = await AwsService.upload(location,filePath)
        fs.unlinkSync(filePath)
        return {url : process.env.CDN_URL ? process.env.CDN_URL + location : upload.Location, id : null} 
    }else if(settings.api.drive.display){
        if(folderName){
            var folder = await GoogleDriveService.searchFolder(folderName)
            if (!folder) {
                folder = await GoogleDriveService.createFolder(folderName)
            }
        }else {
            var folder = null
        }
        const response = await GoogleDriveService.saveFile(fileName,filePath,fileMimeType,folder ? folder.id : null)
        const fileId = response.data.id
        fs.unlinkSync(filePath)
        return {url : "https://drive.google.com/uc?export=view&id=" + fileId, id : fileId}
    }else {
        return {url : settings.url.backend + "public/" + (folderName ? folderName + '/' : '') + fileName, id : null}
    }
    
}

module.exports = {
    file
}