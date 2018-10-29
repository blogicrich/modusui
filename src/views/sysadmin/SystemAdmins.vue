<template>
  <v-container>
    <h1 class="pg-header">System Administrators</h1>
    <BaseDataTable
      :headers="headers"
      :items="items"
      :newItem="newItem"
      :menuItems="menuItems"
      searchLabel="Search System Administrators"
      tableTitle="System Administrators"
      btnTitle="+"
      dialogTitle="Add New Administrator"
      itemKey="name"
      @newItem="addItem"
      @deleteSelected="deleteItem"
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
          // value: false,
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          // value: false,
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          // value: false,
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          // value: false,
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          // value: false,
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          // value: false,
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
          value: 'name',
          cellType: 'tb'
        },
        { text: 'Calories', value: 'calories', cellType: 'md' },
        { text: 'Fat (g)', value: 'fat', cellType: 'md' },
        { text: 'Carbs (g)', value: 'carbs', cellType: 'md' },
        { text: 'Protein (g)', value: 'protein', cellType: 'md' }
      ],
      newItem: [
        { name: '', cellType: 'tb', cellLabel: 'name' },
        { calories: 0, cellType: 'md', cellLabel: 'calories' },
        { fat: 0, cellType: 'md', cellLabel: 'fat' },
        { carbs: 0, cellType: 'md', cellLabel: 'carbs' },
        { protein: 0, cellType: 'md', cellLabel: 'protein' }
      ],
      defaultItem: [
        { name: '', calories: 0, fat: 0, carbs: 0, protein: 0 }
      ],
      menuItems: [
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' }
      ]
    }
  },
  methods: {
    addItem (item) {
      for (var i = 0; i < item.length; i++) {
        if (item[i].hasOwnProperty('sync')) {
          this.defaultItem[item[i].cellLabel] = item[i].sync
          console.log(item[i].cellLabel, item[i].sync)
        }
      }
      this.items.push(this.defaultItem)
      console.log('item: ', item)
      this.resetItem()
    },
    deleteItem (items) {
      console.log(items)
      var index = 0
      for (var i = 0; i < items.length; i++) {
        index = this.items.indexOf(items[i])
        console.log(items[i].name)
        confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
      }
      console.log(this.items)
    },
    resetItem () {
      this.newItem = [
        { name: '', cellType: 'tb', cellLabel: 'name' },
        { calories: 0, cellType: 'md', cellLabel: 'calories' },
        { fat: 0, cellType: 'md', cellLabel: 'fat' },
        { carbs: 0, cellType: 'md', cellLabel: 'carbs' },
        { protein: 0, cellType: 'md', cellLabel: 'protein' }
      ]
      this.defaultItem = [
        { name: '', calories: 0, fat: 0, carbs: 0, protein: 0 }
      ]
    }
  }
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
