<template>
  <div>
    <v-select
      v-model="usersToAssign"
      :items="allUserItems"
      multiple
      label="Users assigned to carer"
      chips
      @change="change"
    />
    <h3>Edit notification settings</h3>
    <v-container fluid class="pa-0 ma-0">
      <v-layout row wrap justify-space-between>
        <v-flex md5>
          <v-combobox
            v-model="selectedUser"
            :items="assignedUserItems"
            label="User"
          />
        </v-flex>
        <v-flex md5>
          <v-combobox
            v-model="selectedCommunicationMethod"
            label="Communication Method"
            :items="communicationMethodItems"
          />
        </v-flex>
        <v-flex md12>
          <v-select
            v-model="carerUserMessageMethodMap[carerUserMessageMethodKey]"
            label="Enabled Alerts"
            chips
            :disabled="carerUserMessageMethodKey === '__no_key'"
            :items="notificationItems"
            multiple
            @change="change"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    users: Array,
    value: Object,
    communicationMethods: Array,
    alertTypes: Array
  },
  computed: {
    allUserItems () {
      return this.usersToComboboxItems(this.users)
    },
    assignedUserItems () {
      return this.usersToComboboxItems(this.users.filter(user => this.usersToAssign.includes(user.userId)))
    },
    communicationMethodItems () {
      return this.communicationMethods.map(item => {
        return {
          text: item.description,
          value: item.communicationMethodId
        }
      })
    },
    notificationItems () {
      if (!this.selectedUser || !this.selectedCommunicationMethod) {
        return null
      }

      return this.alertTypes.map((alertType) => {
        return {
          text: alertType.description,
          value: `${this.selectedCommunicationMethod.value}-${alertType.alertTypeId}-${this.selectedUser.value}`
        }
      })
    },
    carerUserMessageMethodKey () {
      if (!this.notificationItems) {
        return '__no_key'
      }

      return `${this.selectedUser.value}-${this.selectedCommunicationMethod.value}`
    }
  },
  methods: {
    usersToComboboxItems (users) {
      return users.map(user => {
        return {
          text: user.deptPerson.person.salutation,
          value: user.userId
        }
      })
    },
    change () {
      this.$emit('input', {
        deptPersonId: this.deptPersonId,
        usersToAssign: this.usersToAssign,
        carerUserMessageMethods: this.flattenCarerUserMessageMethodMap(this.carerUserMessageMethodMap)
      })
    },
    carerUserMessageMethodToMap (carerUserMessageMethods) {
      const result = {
        __no_key: []
      }

      for (const item of carerUserMessageMethods) {
        const key = `${item.userId}-${item.communicationMethodId}`
        if (!result[key]) {
          result[key] = []
        }

        result[key].push(`${item.communicationMethodId}-${item.alertTypeId}-${item.userId}`)

        console.log(result)
      }
      return result
    },
    flattenCarerUserMessageMethodMap (map) {
      let result = []
      for (const key in map) {
        if (key === '__no_key') {
          continue
        }

        result = result.concat(map[key])
      }

      return result.map(item => {
        const [communicationMethodIdString, alertTypeIdString, userIdString] = item.split('-')
        return {
          communicationMethodId: parseInt(communicationMethodIdString),
          alertTypeId: parseInt(alertTypeIdString),
          userId: parseInt(userIdString)
        }
      })
    }
  },
  data () {
    return {
      deptPersonId: this.value.deptPersonId,
      usersToAssign: this.value.usersToAssign || [],
      selectedUser: null,
      selectedCommunicationMethod: null,

      carerUserMessageMethodMap: this.carerUserMessageMethodToMap(this.value.carerUserMessageMethods || [])
    }
  },
  watch: {
    value (newValue) {
      this.deptPersonId = newValue.deptPersonId
      this.usersToAssign = newValue.usersToAssign
      this.carerUserMessageMethods = newValue.carerUserMessageMethods
    }
  }
}
</script>
