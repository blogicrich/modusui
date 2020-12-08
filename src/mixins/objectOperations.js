export default {
  methods: {
    simpleDataDeepCopy (object) {
      return JSON.parse(JSON.stringify(object))
    },
    simpleDataDeepCompare (objectA, objectB) {
      if (!objectA || !objectB || typeof objectA !== 'object') {
        if (!objectA === objectB) {
          console.log(`${objectA} does not equal ${objectB}`)
        }
        return objectA === objectB
      }

      if (Array.isArray(objectA)) {
        if (!Array.isArray(objectB)) {
          return false
        }

        if (objectA.length !== objectB.length) {
          return false
        }

        for (let i = 0; objectA.length > i; i++) {
          if (!this.simpleDataDeepCompare(objectA[i], objectB[i])) {
            return false
          }
        }
      }

      for (const key of Object.keys(objectA)) {
        if (!this.simpleDataDeepCompare(objectA[key], objectB[key])) {
          return false
        }
      }

      return true
    }
  }
}
