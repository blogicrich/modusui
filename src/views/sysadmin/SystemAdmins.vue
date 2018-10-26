<template>
  <v-container>
    <h1 class="pg-header">System Administrators</h1>
    <BaseDataTable
      :headers="headers"
      :items="items"
      :editedItem="editedItem"
      tableTitle="System Administrators"
      btnTitle="New Administrator"
      dialogTitle="Add New Administrator"
      itemKey="name"
      @newItem="logItem"
    />
  </v-container>
</template>

<script>
import BaseDataTable from '@/components/base/BaseDataTableComponent.vue'
export default {
  name: 'SystemAdmins',
  components: {
    BaseDataTable
  },
  data () {
    return {
      items: [
        {
          name: 'Frozen Yogurt',
          calories: 359,
          fat: 6.0,
          carbs: 24,
          protein: 4.0
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3
        }
      ],
      headers: [
        {
          text: 'Dessert',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' }
      ],
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    }
  },
  methods: {
    logItem: function (newItem) {
      console.log(newItem)
    }
  }
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
