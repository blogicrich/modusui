<template>
  <div>
    <v-text-field
      label="Username"
      hint="A nickname, real name or something made up"
      v-model="username"
      :rules="usernameRules"
      @change="change"
    />
    <v-text-field
      label="Email Address"
      v-model="email"
      :rules="emailRules"
      @change="change"
    />
    <v-text-field
      label="Phone number (Optional)"
      v-model="mobileNo"
      placeholder="+44 121 ..."
      :rules="mobileNoRules"
      @change="change"
    />
    <v-text-field
      :label="editMode ? 'Override Password' : 'Password'"
      type="password"
      hint="Something hard to guess"
      :placeholder="editMode ? '●●●●●●●●●●●●●●●●●●' : ''"
      v-model="password"
      :rules="passwordRules"
      @change="change"
    />
    <v-text-field
      label="Repeat password"
      type="password"
      v-model="passwordRepeat"
      :placeholder="editMode ? '●●●●●●●●●●●●●●●●●●' : ''"
      :rules="passwordRepeatRules"
      @change="change"
    />
  </div>
</template>

<script>
import validation from '../../mixins/validation'

export default {
  props: {
    editMode: Boolean,
    value: Object,
    duplicateToFix: String
  },
  mixins: [
    validation
  ],
  data () {
    return {
      username: this.value.username,
      email: this.value.email,
      mobileNo: this.value.mobileNo || '',
      password: this.value.password || '',
      passwordRepeat: this.value.password || '',

      usernameRules: [
        v => v !== '' || 'Username is required',
        v => v.length <= 128 || 'Username too long',
        v => v !== this.duplicateToFix || 'Username already in use'
      ],
      emailRules: [
        v => v !== '' || 'Email is required',
        v => this.emailRegEx.test(v) || 'Enter a valid email address'
      ],
      mobileNoRules: [
        v => v.length <= 45 || 'Phone number too long',
        v => v.length === 0 || this.phoneRegEx.test(v) || 'Enter a valid phone number'
      ],
      passwordRules: [
        v => this.editMode || (v !== '' || 'A password is required'),
        v => (this.editMode && v.length === 0) || (v.length >= 8 || 'This password is too short'),
        v => v.length <= 72 || 'This password is too long'
      ],
      passwordRepeatRules: [
        v => (this.editMode && v.length === 0) || (v !== '' || 'Please repeat your password'),
        v => v === this.password || 'Passwords do not match'
      ]
    }
  },
  methods: {
    change () {
      this.$emit('input', {
        username: this.username,
        password: this.password,
        email: this.email,
        mobileNo: this.mobileNo
      })
    }
  },
  watch: {
    value (newValue) {
      this.username = newValue.username
      this.password = newValue.password
      this.email = newValue.email
      this.mobileNo = newValue.mobileNo || ''
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
