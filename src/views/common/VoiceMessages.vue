<template lang="html">
  <selectComponent
    :users= "users"
    btnTitle= "Select Users"
    selectAll= "Select all"
    searchName= "Search user.."
  ></selectComponent>
</template>

<script>
import selectComponent from '../../components/base/BaseUserSelectComponent.vue'

export default {
  components: {
    selectComponent
  },
  data () {
    return {
      users: [
        { name: 'Elsa' },
        { name: 'Tamara' },
        { name: 'Daniek' },
        { name: 'Mitchell' },
        { name: 'Jasper' },
        { name: 'Bram' },
        { name: 'Kevin' },
        { name: 'Julian' },
        { name: 'Patricia' },
        { name: 'Marcel' },
        { name: 'Fred' },
        { name: 'Joke' },
        { name: 'Kaily' },
        { name: 'Bryan' },
        { name: 'Michelle' },
        { name: 'Lisa' },
        { name: 'Cheyenne' },
        { name: 'Shalina' },
        { name: 'Naomi' },
        { name: 'Leeroy' }
      ]
    }
  }
}
</script>

<style lang="css">
</style>
