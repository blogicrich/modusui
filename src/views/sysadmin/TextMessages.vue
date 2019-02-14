<!-- <template lang="html">
  <baseTab
    :items= "items"
    dialogTitle= "You are about to lose unsaved data."
    dialogText= "Do you wish to proceed?"
    cardEmailHeader= "Email Message Template"
    cardSmsHeader= "SMS Message Template"
  ></baseTab>
</template>

<script>

import baseTab from '@/components/base/BaseTabbedSelectorComponent.vue'
import { getData, postData } from '@/mixins/apiRequests'
import { crudOperations } from '@/mixins/CRUD'

export default {
  name: 'TextMessages',
  components: {
    baseTab
  },
  mixins: [crudOperations, getData, postData],
  data () {
    return {
      items: [],
      readUrl: 'textmessageget'
    }
  },
  mounted () {
    this.getItems(this.readUrl)
    console.log(this.items)
  },
  beforeRouteLeave (to, from, next) {
    const answer = window.confirm('Do you really want to leave? You will lose all unsaved changes!')
    if (answer) {
      next()
    } else {
      next(false)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style> -->
