<template>
  <v-container>
    <h2 v-if="this.$vuetify.breakpoint.mdAndDown" class="pg-subheader text-center" text-xs-center>System Administrators</h2>
    <BaseDataTable
      :headers="headers"
      :items="items"
      :newItem="newItem"
      :menuItems="menuItems"
      searchLabel="Search Records..."
      tableTitle="System Administrator Records"
      btnTitle="+"
      newDialogTitle="Add a New Administrator Record"
      editDialogTitle="Edit Administrator Records"
      delDialogTitle="Confirm deletetion of selected items?"
      itemKey="name"
      msgDel="Are you sure you want to delete the selected items?"
      @newItem="addItem"
      @deleteSelected="deleteItem"
    />
  </v-container>
</template>

<script>
import { getMeta } from '@/mixins/apiRequests'
import BaseDataTable from '@/components/base/BaseDataTableComponent.vue'
export default {
  name: 'SystemAdmins',
  mixins: [getMeta],
  components: {
    BaseDataTable
  },
  data () {
    return {
      items: [],
      loading: true,
      headers: [
        {
          text: 'Title',
          align: 'left',
          sortable: false,
          value: 'titleId',
          cellType: 'md'
        },
        { text: 'Given Name', value: 'givenName', cellType: 'tb' },
        { text: 'Family Name', value: 'familyName', cellType: 'tb' },
        { text: 'Corporate Id', value: 'corporateIdentification', cellType: 'tb' },
        { text: 'User Name', value: 'username', cellType: 'tb' }
      ],
      newItem: [
        { titleId: '', cellType: 'tb', cellLabel: 'name' },
        { givenName: 0, cellType: 'tb', cellLabel: 'calories' },
        { familyName: 0, cellType: 'tb', cellLabel: 'fat' },
        { corporateIdentification: 0, cellType: 'tb', cellLabel: 'carbs' },
        { username: 0, cellType: 'tb', cellLabel: 'protein' }
      ],
      defaultItem: [
        { titleId: '', givenName: '', familyName: '', corporateIdentification: '', username: '' }
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
        this.items.splice(index, 1)
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
  },
  async beforeMount () {
    this.loading = true
    var values = await this.getMeta('sysadget')
    console.log(values)
    this.items = values
    this.loading = false
    // this.items.splice(values, 1)
  }
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
