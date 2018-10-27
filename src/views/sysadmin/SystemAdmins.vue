<template>
  <v-container>
    <h1 class="pg-header">System Administrators</h1>
    <BaseDataTable
      :headers="headers"
      :items="items"
      :editedItem="editedItem"
      searchLabel="Search System Administrators"
      tableTitle="System Administrators"
      btnTitle="+"
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
          // value: false,
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          // value: false,
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          // value: false,
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          // value: false,
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          value: false,
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          value: false,
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          value: false,
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          value: false,
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          value: false,
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          value: false,
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
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
      editedItem: [
        { name: '', cellType: 'dd', cellLabel: 'name' },
        { calories: 0, cellType: 'tb', cellLabel: 'calories' },
        { fat: 0, cellType: 'dd', cellLabel: 'fat' },
        { carbs: 0, cellType: 'dd', cellLabel: 'carbs' },
        { protein: 0, cellType: 'dd', cellLabel: 'protein' }
      ]
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
