<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <v-container grid-list-xl fluid>
      <v-switch
        color="primary"
        v-model="isUser"
        :label="`This Personel ${isUser ? '' : 'NOT'} is an eDroplet User`"
      />
      <v-flex v-if="isUser">
        <v-layout row wrap>
          <v-flex d-flex xs12 sm12 md5 lg5 xl5>
            <v-menu
              class="manu"
              color="primary"
              ref="menuStartUp"
              v-model="menuStartUp"
              :close-on-content-click="false"
              @input="validate()"
              :return-value.sync="timeStartUp"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="timeStartUp"
                  label="Sleep Start Up Time"
                  append-icon="access_time"
                  readonly
                  v-on="on"
                  :rules="ruleRequired"
                />
              </template>
              <v-time-picker
                v-if="menuStartUp"
                v-model="timeStartUp"
                full-width
                @click:minute="$refs.menuStartUp.save(timeStartUp)"
                @input="validate()"
                :rules="ruleRequired"
                required
              />
            </v-menu>
          </v-flex>
          <v-flex d-flex xs12 sm12 md5 lg5 xl5>
            <v-menu
              class="manu"
              color="primary"
              ref="menuWakeUp"
              v-model="menuWakeUp"
              :close-on-content-click="false"
              :return-value.sync="timeWakeUp"
              @input="validate()"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="timeWakeUp"
                  label="Wakeup Time"
                  append-icon="access_time"
                  readonly
                  v-on="on"
                  :rules="ruleRequired"
                />
              </template>
              <v-time-picker
                v-if="menuWakeUp"
                v-model="timeWakeUp"
                full-width
                @click:minute="$refs.menuWakeUp.save(timeWakeUp)"
                required
                @input="validate()"
                :rules="ruleRequired"
              />
            </v-menu>
          </v-flex>
          <v-flex d-flex xs12 sm12 md2 lg2 xl2 v-if="eDroplets.length >= 1">
            <v-select
              :items="eDroplets"
              label="Link eDroplets"
              v-model="selectedEDroplet"
              item-text="macAddress"
              item-value="baseId"
            />
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex d-flex xs12 sm12 md5 lg5 xl5>
            <v-text-field
              label="Daily Other Hydration (Optional)"
              v-model="otherHydration"
              mask="#.##"
              append-icon="L"
            />
          </v-flex>
          <v-flex d-flex xs12 sm12 md7 lg7 xl7>
            <v-text-field
              label="Comments"
              :rules="ruleRequired"
              v-model="comments"
              required
              @input="validate()"
            />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data () {
    return {
      comments: '',
      isUser: true,
      timeStartUp: '',
      timeWakeUp: '',
      menuStartUp: false,
      menuWakeUp: false,
      otherHydration: '',
      selectedEDroplet: '',
      valid: true,
      ruleRequired: [
        v => !!v || 'This field is required'
      ]
    }
  },
  computed: {
    eDroplets () {
      console.log(this.$store.getters.getterEdroplets)
      return this.$store.getters.getterEdroplets
    }
  },
  watch: {
    isUser: function () {
      this.$emit('onvalidation', !this.isUser)
    }
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.$emit(
          'onvalidation',
          true,
          this.isUser,
          this.timeStartUp,
          this.timeWakeUp,
          this.otherHydration,
          this.selectedEDroplet,
          this.comments
        )
      } else {
        this.$emit('onvalidation', false)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";
.manu {
  display: none;
}
</style>
