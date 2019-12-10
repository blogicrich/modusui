<template>
  <div>
    <v-select
      v-model="titleId"
      :rules="titleIdRules"
      :items="titleOptions"
      label="Title"
      @change="formUpdate()"
    />
    <v-text-field
      v-model="givenName"
      label="Given Name"
      :rules="givenNameRules"
      @change="formUpdate()"
    ></v-text-field>
    <v-text-field
      v-model="familyName"
      label="Family Name"
      :rules="familyNameRules"
      @change="formUpdate()"
    ></v-text-field>
    <v-text-field
      v-model="salutation"
      label="Saluation (Optional)"
      :rules="salutationRules"
      :placeholder="`${givenName} ${familyName}`"
      @change="formUpdate()"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    value: Object,
    titles: Array
  },
  data () {
    return {
      titleId: this.value.titleId,
      givenName: this.value.givenName,
      familyName: this.value.familyName,
      salutation: this.value.salutation,

      titleIdRules: [
        v => v !== null || 'A title is required'
      ],

      givenNameRules: [
        v => v !== '' || 'Your given name is required',
        v => v.length <= 128 || 'Given name is too long'
      ],

      familyNameRules: [
        v => v !== '' || 'Your family name is required',
        v => v.length <= 128 || 'Family name is too long'
      ],

      salutationRules: [
        v => v.length <= 128 || 'Salutation is too long'
      ]
    }
  },
  methods: {
    formUpdate () {
      this.$emit('input', {
        titleId: this.titleId,
        givenName: this.givenName,
        familyName: this.familyName,
        salutation: this.salutation
      })
    }
  },
  computed: {
    titleOptions () {
      return this.titles.map(title => { return { text: title.longDescription, value: title.titleId } })
    }
  },
  watch: {
    value (newValue) {
      this.titleId = newValue.titleId
      this.givenName = newValue.givenName
      this.familyName = newValue.familyName
      this.salutation = newValue.salutation
    }
  }
}
</script>
