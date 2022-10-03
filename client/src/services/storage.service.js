function isJsonString(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

const set = async (key, value) => {
    try {
      if(typeof value === 'object') value = JSON.stringify(value)
      return localStorage.setItem(key,value)
    } catch (error) {
      return error
    }
}

const get = async (key) => {
    try {
      var value = localStorage.getItem(key)
      if(isJsonString(value)) value = JSON.parse(value)
      return value
    } catch (error) {
      return error
    }
}

const push = async (key,value,multiple = false,upsert = true) => {
    try {
      var data = await get(key)
      if(!data){
        data = {}
      }
      if(typeof value === 'object') value = JSON.stringify(value)
      if(Object.values(data).indexOf(value) > -1 && !multiple) {
        if(!upsert) return false;
        data[Object.values(data).indexOf(value)] = value
      }else {
        data[Object.keys(data).length] = value
      }
      return set(key,data)
    } catch (error) {
      return error
    }
}

const check = async (key) => {
  try {
    return localStorage.getItem(key) !== null
  } catch (error) {
    return error
  }
}

const remove = async (key) => {
  try {
    return localStorage.removeItem(key)
  } catch (error) {
    return error
  }
}

const clear = async () => {
  try {
    return localStorage.clear()
  } catch (error) {
    return error
  }
}

export default {
    set,
    get,
    push,
    check,
    remove,
    clear
}