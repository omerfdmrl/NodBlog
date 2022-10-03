const { google } = require('googleapis');
const Settings = require('../models/settings.model')

const init = async () => {
    const settings = await Settings.findOne({},{'api.drive': 1})
    if(!settings.api.drive.display) {
        return { drive: false }
    }
    const oauth2Client = await new google.auth.OAuth2(
        settings.api.drive.client,
        settings.api.drive.secret,
        settings.api.drive.redirect
    );
    
    await oauth2Client.setCredentials({ refresh_token: settings.api.drive.refresh });
    
    const drive = await google.drive({
        version: 'v3',
        auth: oauth2Client,
    });
    return {drive,settings};
}

const createFolder = async (folderName) => {
    const { drive } = await init()
    if(!drive){
        return false;
    }
    return await drive.files.create({
        resource: {
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder',
        },
        fields: 'id, name',
    });
}

const searchFolder = async (folderName) => {
    const { drive } = await init()
    if(!drive){
        return false;
    }
    return new Promise((resolve, reject) => {
        drive.files.list({
            q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}'`,
            fields: 'files(id, name)',
        }, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res.data.files ? res.data.files[0] : null);
        });
    });
}

const saveFile = async (fileName, filePath, fileMimeType, folderId = null) => {
    const { drive } = await init()
    if(!drive){
        return false;
    }
    return await drive.files.create({
        requestBody: {
            name: fileName,
            mimeType: fileMimeType,
            parents: folderId ? [folderId] : [],
            role: 'reader',
            type: 'anyone',
        },
        media: {
            mimeType: fileMimeType,
            body: fs.createReadStream(filePath),
        },
    });
}

const deleteFile = async (fileId) => {
    const { drive } = await init()
    if(!drive){
        return false;
    }
    return await drive.files.delete({
        fileId
    })
}

const getFile = async (fileId) => {
    const { drive } = await init()
    if(!drive){
        return false;
    }
    return await drive.files.get({fileId})
}

const getFileUrl = async (fileId) => {
    const { drive } = await init()
    if(!drive){
        return false;
    }
    const result = await drive.files.get({
        fileId: fileId,
        alt: 'media',
        fields : 'webViewLink'
    });
    var imageType = result.headers['content-type'];
    var base64 = Buffer.from(result.data, 'utf8').toString('base64');
    var dataURI = 'data:' + imageType + ';base64,' + base64;
    return dataURI;
}

module.exports = {
    searchFolder,
    createFolder,
    saveFile,
    getFileUrl,
    deleteFile,
    getFile
}