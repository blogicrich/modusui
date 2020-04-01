<template>
  <div>
    <v-select v-model="communicationMethodId" :items="communicationMethodOptions" label="Preferred communcation method" @change="change"/>
    <v-select v-model="alertTypeIds" :items="alertTypeOptions" label="Enabled Alerts" attach chips deletable-chips multiple @change="change"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      communicationMethodId: null,
      communicationMethodRules: [
        v => v !== null || 'Please pick your preffered communication method'
      ],
      alertTypeIds: null
    }
  },
  watch: {
    value (newValue) {
      this.communicationMethod = newValue.communicationMethodId
      this.selectedAlertTypes = newValue.alertTypeIds
    },
    alertTypes (newValue) {
      // Enable all alert types by default
      this.selectedAlertTypes = newValue
    }
  },
  methods: {
    change () {
      this.$emit('input', {
        communicationMethodId: this.communicationMethodId,
        alertTypeIds: this.alertTypeIds
      })
    }
  },
  props: {
    value: Object,
    communicationMethods: Array,
    alertTypes: Array
  },
  computed: {
    communicationMethodOptions () {
      return this.communicationMethods
        .map(communicationMethod => {
          return { value: communicationMethod.communicationMethodId, text: communicationMethod.description }
        })
    },
    alertTypeOptions () {
      return this.alertTypes.map(alertType => { return { value: alertType.alertTypeId, text: alertType.description } })
    }
  }
}
</script>
