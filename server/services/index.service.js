var request = require("request");
var { google } = require("googleapis");
const Setting = require('../models/settings.model')

const init = async () => {
    const settings = await Setting.findOne({},{_id:0, index: 1, url: 1})
    if(!settings.api.index.display || !settings.api.index.email || !settings.api.index.key) {
        return false;
    }
    const client = new google.auth.JWT(
        settings.api.index.email,
        null,
        settings.api.index.key,
        ["https://www.googleapis.com/auth/indexing"],
        null
    );
    client.authorize(function(err, tokens) {
        if (err) {
          console.log(err);
          return;
        }
        return { settings, token: tokens.access_token }
    });
    if(!client){
        return false;
    }
}

const updated = async (url) => {
    const client = await init()
    if(!client || !url){
        return false;
    }
    let options = {
        url: "https://indexing.googleapis.com/v3/urlNotifications:publish",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        auth: { "bearer": client.token },
        json: {
          "url": client.settings.url.site + url,
          "type": "URL_UPDATED"
        }
    };
    request(options, function (error, response, body) {
        if(error){
            console.log(error);
            return;
        }
    });
    return true;
}

const deleted = async (url) => {
    const client = await init()
    if(!client || !url){
        return false;
    }
    let options = {
        url: "https://indexing.googleapis.com/v3/urlNotifications:publish",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        auth: { "bearer": client.token },
        json: {
          "url": client.settings.url.site + url,
          "type": "URL_DELETED"
        }
    };
    request(options, function (error, response, body) {
        if(error){
            console.log(error);
            return;
        }
    });
    return true;
}

module.exports = {
    init,
    updated,
    deleted
}