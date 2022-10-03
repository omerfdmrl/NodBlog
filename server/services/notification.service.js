const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')
const Setting = require('../models/settings.model.js')
const nodemailer = require('nodemailer')

require('dotenv').config({path : '../.env'})

module.exports.sendMail = async({type, to, data, subject}) => {
    const settings = await Setting.findOne()
    const transport = nodemailer.createTransport({
        host: settings.smtp.host,
        port: settings.smtp.port,
        auth: {
            user: settings.smtp.user,
            pass: settings.smtp.password
        },
        pool: true,
        maxConnections: 1,
        rateDelta: 20000,
        rateLimit: 5,
    });
    const filePath = path.join(global.__basedir, `/templates/${type}.html`);
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    data.title = settings.email.title
    data.favicon = settings.email.favicon
    data.logo = settings.email.logo
    data.url = settings.email.url
    const replacements = data;
    const htmlToSend = template(replacements);
    return await transport.sendMail({
        from: `"${data.title}" ${settings.smtp.user}`,
        to: to,
        subject: subject,
        html: htmlToSend
    });
}