export const validation = {
  methods: {
    // Error
    error (payload, type) {
      console.error('Error:', payload, 'is not of type', type + '. It is of type', typeof payload)
    },
    // Validate typeof
    validateUndefined: payload => (typeof payload === 'undefined' ? payload : validation.methods.error(payload, 'undefined')),
    validateNull: payload => (typeof payload === 'object' ? payload : validation.methods.error(payload, 'object')),
    validateBoolean: payload => (typeof payload === 'boolean' ? payload : validation.methods.error(payload, 'boolean')),
    validateNumber: payload => (typeof payload === 'number' ? payload : validation.methods.error(payload, 'number')),
    validateString: payload => (typeof payload === 'string' ? payload : validation.methods.error(payload, 'string')),
    validateSymbol: payload => (typeof payload === 'symbol' ? payload : validation.methods.error(payload, 'symbol')),
    validateFunction: payload => (typeof payload === 'function' ? payload : validation.methods.error(payload, 'function')),
    validateObject: payload => (typeof payload === 'object' ? payload : validation.methods.error(payload, 'object'))

    // Validate specific fields
  }
}
