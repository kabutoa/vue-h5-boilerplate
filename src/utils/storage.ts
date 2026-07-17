export interface StorageAdapter {
  clear(): boolean
  get<T>(key: string): null | T
  get<T>(key: string, defaultValue: T): T
  has(key: string): boolean
  remove(key: string): boolean
  set<T>(key: string, value: T): boolean
}

export type StorageType = 'local' | 'session'

export function createStorage(type: StorageType): StorageAdapter {
  function get<T>(key: string): null | T
  function get<T>(key: string, defaultValue: T): T
  function get<T>(key: string, defaultValue: null | T = null): null | T {
    const storage = getBrowserStorage(type)
    if (!storage) {
      return defaultValue
    }

    try {
      const value = storage.getItem(key)
      return value === null ? defaultValue : (JSON.parse(value) as T)
    } catch {
      return defaultValue
    }
  }

  return {
    clear() {
      const storage = getBrowserStorage(type)
      if (!storage) {
        return false
      }

      try {
        storage.clear()
        return true
      } catch {
        return false
      }
    },
    get,
    has(key: string) {
      const storage = getBrowserStorage(type)
      if (!storage) {
        return false
      }

      try {
        return storage.getItem(key) !== null
      } catch {
        return false
      }
    },
    remove(key: string) {
      const storage = getBrowserStorage(type)
      if (!storage) {
        return false
      }

      try {
        storage.removeItem(key)
        return true
      } catch {
        return false
      }
    },
    set<T>(key: string, value: T) {
      const storage = getBrowserStorage(type)
      if (!storage) {
        return false
      }

      try {
        storage.setItem(key, JSON.stringify(value))
        return true
      } catch {
        return false
      }
    },
  }
}

function getBrowserStorage(type: StorageType): null | Storage {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    return type === 'local' ? window.localStorage : window.sessionStorage
  } catch {
    return null
  }
}

export const localStorage = createStorage('local')
export const sessionStorage = createStorage('session')
