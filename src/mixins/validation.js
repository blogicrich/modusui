export default {
  data () {
    return {
      alphabeticalRegEx: /^[A-z ]{0,}$/,
      alphaNumericRegEx: /^[A-z0-9 ]{0,}$/,
      numericalRegEx: /^[0-9]+$/,
      litersRegEx: /[0-9 .,]/g,
      timeRegEx: /(2[0-3]|[01]?[0-9]):([0-5]?[0-9])/,
      percentRegEx: /^[1-9][0-9]?$|^100$/,
      phoneRegEx: /[0-9]/,
      requiredRegEx: /(.|\s)*\S(.|\s)*/,
      emailRegEx: /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/,
      macAddressRegEx: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
      numericDpRegEx: /^\d*[0-9](|.\d*[0-9]|,\d*[0-9])?$/
    }
  },
  methods: {
    // Validate typeof
    validateUndefined: payload => typeof payload === 'undefined',
    validateNull: payload => typeof payload === 'object',
    validateBoolean: payload => typeof payload === 'boolean',
    validateNumber: payload => typeof payload === 'number',
    validateString: payload => typeof payload === 'string',
    validateSymbol: payload => typeof payload === 'symbol',
    validateFunction: payload => typeof payload === 'function',
    validateObject: payload => typeof payload === 'object',

    // Validate RegEx
    validateAlphabetical: function (payload) {
      if (!this.validateUndefined(payload) && this.validateString(payload) && this.alphabeticalRegEx.test(payload)) {
        return !!payload
      } else {
        return 'The value should only contain alphabetical characters'
      }
    },
    validateAlphanumeric: function (payload) {
      if (this.validateString(payload)) {
        return this.alphaNumericRegEx.test(payload)
      } else {
        return false
      }
    },
    validateMaxChars: function (payload, maxChars) {
      if (this.validateUndefined(payload) || this.validateNull(payload) || !this.validateString(payload)) {
        return false
      } else {
        return payload.length <= maxChars
      }
    },
    validateDp: function (payload) {
      if (this.validateNumber(payload)) {
        return this.twoDpRegEx.test(payload)
      } else {
        return 'Provide number to two max of 2 decimal places'
      }
    },
    validateLiters: function (payload) {
      if (this.validateNumber(payload)) {
        return this.litersRegEx.test(payload)
      } else {
        return false
      }
    },
    validateTime: function (payload) {
      return this.timeRegEx.test(payload)
    },
    validatePhone: function (payload) {
      if (this.validateString(payload)) {
        payload = payload.replace(/[-_ =]/g, '')
        payload = payload.replace(/[+]/g, '00')
        return this.phoneRegEx.test(payload)
      } else {
        return false
      }
    },
    validateEmail: function (payload) {
      if (this.validateString(payload)) {
        return this.emailRegEx.test(payload)
      } else {
        return false
      }
    },
    validateRequired: function (payload) {
      if (payload !== '' || this.validateUndefined(payload)) {
        return !!payload
      } else {
        return 'This field is required.'
      }
    }
  }
}
