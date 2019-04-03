export const validation = {
  methods: {
    // Error
    typeError (payload, type) {
      console.error('typeError:', payload, 'is not of type', type + '. It is of type', typeof payload)
    },
    // Validate typeof
    validateUndefined: payload => (typeof payload === 'undefined' ? payload : validation.methods.typeError(payload, 'undefined')),
    validateNull: payload => (typeof payload === 'object' ? payload : validation.methods.typeError(payload, 'object')),
    validateBoolean: payload => (typeof payload === 'boolean' ? payload : validation.methods.typeError(payload, 'boolean')),
    validateNumber: payload => (typeof payload === 'number' ? payload : validation.methods.typeError(payload, 'number')),
    validateString: payload => (typeof payload === 'string' ? payload : validation.methods.typeError(payload, 'string')),
    validateSymbol: payload => (typeof payload === 'symbol' ? payload : validation.methods.typeError(payload, 'symbol')),
    validateFunction: payload => (typeof payload === 'function' ? payload : validation.methods.typeError(payload, 'function')),
    validateObject: payload => (typeof payload === 'object' ? payload : validation.methods.typeError(payload, 'object'))

    // Validate specific fields
  }
}
