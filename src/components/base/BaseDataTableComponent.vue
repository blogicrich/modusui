<template>
  <div>
  <!-- Table Header: Title and '+' button -->
    <v-toolbar class="pa-1 elevation-1" flat color="white">
      <h2 class="table-header">{{ tableTitle }}</h2>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
  <!-- Edit or New item: Title and '+' button -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="green" fab small dark class="ma-1">
          <v-icon dark>add</v-icon>
        </v-btn>
        <v-card>
          <v-card-title>
            <span class="table-header">{{ dialogTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-layout row wrap>
                <v-flex v-for="(item, key) in editedItem" xs12 md4>
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
  <!-- Edit or New item: Search bar -->
    <v-card>
      <v-card-title v-if="!searchBarHidden">
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          :label="searchLabel"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
    </v-card>
    <!-- Data table -->
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      v-model="selected"
      :item-key="itemKey"
      select-all
      hide-actions
      :pagination.sync="pagination"
      class="elevation-1"
    >
    <!-- Table: Headers -->
    <template slot="headerCell" slot-scope="props">
      <v-tooltip bottom>
        <span slot="activator">
          {{ props.header.text }}
        </span>
        <span>
          {{ props.header.text }}
        </span>
      </v-tooltip>
    </template>
    <!-- Table: Row data-->
    <template slot="items" slot-scope="props">
      <td>
        <v-checkbox
          v-model="props.selected"
          primary
        ></v-checkbox>
      </td>
      <td class="text-xs-left" v-for="header in headers">{{ props.item[header.value] }}</td>
      </template>
    </v-data-table>
    <!-- Table: Footer Pagination CRUD function buttons-->
  <v-card>
    <v-container>
      <v-layout row>
        <v-flex>
          <v-layout align-end justify-end>
            <v-btn fab dark small color="green">
              <v-icon dark>edit</v-icon>
            </v-btn>
            <v-btn fab dark small color="primary">
              <v-icon dark>search</v-icon>
            </v-btn>
            <v-btn fab dark small color="error">
              <v-icon dark>delete</v-icon>
            </v-btn>
          </v-layout>
        </v-flex>
        <v-layout row align-start justify-start>
          <v-pagination class="ma-2" v-model="pagination.page" :length="pages"></v-pagination>
        </v-layout>
      </v-layout>
    </v-container>
    <!-- </v-layout> -->
  </v-card>
  </div>
</template>

<script>

export default {
  name: 'BaseDataTable',
  data () {
    return {
      dialog: false,
      search: '',
      selected: [],
      searchBarHidden: true,
      pagination: {}
    }
  },
  props: {
    items: Array,
    headers: Array,
    btnTitle: String,
    dialogTitle: String,
    tableTitle: String,
    editedItem: Object,
    itemKey: String,
    searchLabel: String
  },
  // created () {
  //   this.initialize()
  // },
  mounted () {
    console.log(this.items)
  },
  computed: {
    pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    },
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
  .tfoot {
    width: 100vw;
  }
</style>
