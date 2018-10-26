<template>
  <div>
    <v-toolbar class="my-1" flat color="white">
      <h2 class="table-dialog-header">{{ tableTitle }}</h2>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="primary" dark class="mb-2">{{ btnTitle }}</v-btn>
      <v-card>
        <v-card-title>
          <span class="table-dialog-header">{{ dialogTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-layout row wrap>
              <v-flex v-for="(item, key) in editedItem" :key="key" xs12 md4>
                <v-text-field class="ma-1" :label="key" v-model="editedItem[key]"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="primary darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="items"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left" v-for="header in headers" :key="header.text">{{ props.item[header.value] }}</td>
        <td class="justify-center layout px-0">
            <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
          </td>
        </template>
        <template slot="no-data">
          <!-- <v-btn color="primary" @click="initialize">Reset</v-btn> -->
        </template>
    </v-data-table>
  </div>
</template>

<script>

export default {
  name: 'BaseDataTable',
  data () {
    return {
      dialog: false
    }
  },
  props: {
    items: Array,
    headers: Array,
    btnTitle: String,
    dialogTitle: String,
    tableTitle: String,
    editedItem: Object
  },
  // created () {
  //   this.initialize()
  // },
  mounted () {
    console.log(this.items)
  },
  // computed: {
  // formTitle () {
  //   return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
  //   }
  // },
  // watch: {
  //   dialog (val) {
  //     val || this.close()
  //   }
  // },
  methods: {
    // editItem (item) {
    //   this.editedIndex = this.desserts.indexOf(item)
    //   this.editedItem = Object.assign({}, item)
    //   this.dialog = true
    // },
    // deleteItem (item) {
    //   const index = this.desserts.indexOf(item)
    //   confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
    // },
    //
    close () {
      this.dialog = false
      // setTimeout(() => {
      console.log('hgjhgghh')
      this.$emit('newItem', 'true')
      // this.editedItem = Object.assign({}, this.defaultItem)
      // this.editedIndex = -1
      // }, 300)
    }
    //
    // save () {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.desserts[this.editedIndex], this.editedItem)
    //   } else {
    //     this.desserts.push(this.editedItem)
    //   }
    //   this.close()
    // }
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
