import { openDB } from 'idb'
const dbPromise = () => {
  if (!('indexedDB' in window)) {
    throw new Error('Browser does not support IndexedDB')
  }
  return openDB('OfflineDb', 1, upgradeDb => {
    if (!upgradeDb.objectStoreNames.contains('blogs')) {
      upgradeDb.createObjectStore('blogs')
    }
  })
}

const saveToStorage = async (storeName, datas) => {
    try {
      const db = await dbPromise()
      const tx = db.transaction(storeName, 'readwrite')
      const store = tx.objectStore(storeName)
      store.put(datas, storeName)
      return tx.complete
    } catch (error) {
      return error
    }
}

const checkStorage = async storeName => {
    try {
      const db = await dbPromise()
      const tx = db.transaction(storeName, 'readonly')
      const store = tx.objectStore(storeName)
      return store.get(storeName)
    } catch (error) {
      return error
    }
}

export default {
    checkStorage,
    saveToStorage
}