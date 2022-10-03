const isEmail = (email) => {
    if(isEmpty(email)) return false;

    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

const isTel = (tel) => {
    return !isEmpty(tel) && tel.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
}

const isCart = (number) => {
    return !isEmpty(number) && number.match(/\b(?:\d{4}[ -]?){3}(?=\d{4}\b)/im)
}

const isWebsite = (url) => {
    try {
        url = new URL(url);
    } catch (_) {
        return false;  
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

const isDate = (date) => {
    return date && Object.prototype.toString.call(date) === '[object Date]'
}

const isBoolean = (variable) => {
    return typeof variable == 'boolean' || variable instanceof Boolean
}

const isDefined = (variable) => {
    return typeof variable !== 'undefined'
}

const isFunction = (closure) => {
    return closure instanceof Function
}

const isNumber = (number) => {
    return !isNaN(number)
}

const isInteger = (integer) => {
    return Number.isInteger(integer)
}

const isString = (string) => {
    return typeof string == 'string' || string instanceof String
}

const isStrong = (password, cases = ['special','uppercase','numbers','lowercase']) => {
    if(isEmpty(password)) return false;
    var matchedCase = new Array();
    if(cases.includes('special')){
        matchedCase.push("[$@$!%*#?&]");
    }
    if(cases.includes('uppercase')){
        matchedCase.push("[A-Z]");
    }
    if(cases.includes('numbers')){
        matchedCase.push("[0-9]");
    }
    if(cases.includes('lowercase')){
        matchedCase.push("[a-z]");
    }
    var ctr = 0;
    for (var i = 0; i < matchedCase.length; i++) {
        if (new RegExp(matchedCase[i]).test(password)) {
            ctr++;
        }
    }
    return ctr === cases.length
}

const isEqual = (data = []) => {
    return data.every( (value, i, arr) => value === arr[0] )
}

const isEmpty = (text) => {
    switch (typeof text) {
        case 'object':
            return  (!text || Object.keys(text).length === 0)
            break;
    
        default:
            return (!text || text.length === 0)
            break;
    }
}

const maxSize = (file,size) => {
    return (file.size > size * 1024)
}

const isImage = (file, extensions = ['png','jpg','jpeg','gif','webp','svg']) => {
    return extensions.includes(file.originalFilename.substr(file.originalFilename.lastIndexOf('.')+1, file.originalFilename.length))
}

const timeDiff = (time, type) => {
    var time1,
        time2
    if(typeof time == 'array'){
        time1 = time[0]
        time2 = time[1] ? time[1] : new Date()
    }else{
        time1 = time
        time2 = new Date()
    }
    time = Math.abs(time1 - time2)
    if(type){
        switch (type) {
            case 'year':
                return time / (365*24*60*60*1000)
                break;
            case 'week':
                return time / (7*24*60*60*1000)
                break;
            case 'day':
                return time / (24*60*60*1000)
                break;
            case 'hours':
                return time / (60*60*1000)
                break;
            case 'minute':
                return time / (60*1000)
                break;
            case 'second':
                return time / (1000)
                break;
        }
    }
    return time
}

module.exports = {
    isEmail,
    isTel,
    isCart,
    isWebsite,
    isDate,
    isBoolean,
    isDefined,
    isFunction,
    isNumber,
    isInteger,
    isString,
    isEmpty,
    isEqual,
    isStrong,
    maxSize,
    isImage,
    timeDiff
}