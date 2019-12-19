<template>
  <div>
    <v-text-field
      label="Username"
      hint="A nickname, your real name or something made up"
      v-model="username"
      :rules="usernameRules"
      @change="change"
    ></v-text-field>
    <v-text-field
      label="Password"
      type="password"
      hint="Something no one can guess!"
      v-model="password"
      :rules="passwordRules"
      @change="change"
    ></v-text-field>
    <v-text-field
      label="Repeat your password"
      type="password"
      v-model="passwordRepeat"
      :rules="passwordRepeatRules"
      @change="change"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    value: Object,
    duplicateToFix: String
  },
  data () {
    return {
      username: '',
      password: '',
      passwordRepeat: '',

      usernameRules: [
        v => v !== '' || 'Username is required',
        v => v.length <= 128 || 'Username too long',
        v => v !== this.duplicateToFix || 'Username already in use'
      ],
      passwordRules: [
        v => v !== '' || 'A password is required',
        v => v.length >= 8 || 'This password is too short',
        v => v.length <= 72 || 'This password is too long'
      ],
      passwordRepeatRules: [
        v => v !== '' || 'Please repeat your password',
        v => v === this.password || 'Passwords do not match'
      ]
    }
  },
  methods: {
    change () {
      this.$emit('input', {
        username: this.username,
        password: this.password
      })
    }
  },
  watch: {
    value (newValue) {
      this.username = newValue.username
      this.password = newValue.password
    },
    duplicateToFix (newValue) {
      this.username = ''

      this.$nextTick(() => {
        // Abuse nextTick and the fact that we changed the username on the model to force vuetify to re-evaluate the rules.
        this.username = this.duplicateToFix
      })
    }
  }
}
</script>
