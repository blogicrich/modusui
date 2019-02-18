<template>
  <div>
  <!-- Table Header: Title and '+' button -->
    <v-toolbar class="pa-1 my-1 elevation-1" flat color="white">
      <h2 class="table-header">{{ tableTitle }}</h2>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
  <!-- Edit or New item: Title and '+' button -->
      <v-dialog v-model="editDialog" max-width="500px">
        <v-btn slot="activator" color="green" fab small dark class="ma-1">
          <v-icon dark>add</v-icon>
        </v-btn>
        <v-card>
          <v-card-title>
            <span class="table-header">{{ dialogTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-layout row wrap justify-space-around>
                <v-flex v-for="(item, key) in newItem" :key="item.name" xs12 md6>
                  <v-text-field
                    v-if="item.cellType === 'tb'"
                    class="ma-1"
                    :label="item.cellLabel"
                    v-model="newItem[key].sync"
                    color="primary"
                    outline
                    required
                  ></v-text-field>
                  <v-select
                    v-else-if="item.cellType === 'md'"
                    class="ma-1"
                    v-model="newItem[key].sync"
                    :items="menuItems"
                    :label="newItem[key].cellLabel"
                    color="primary"
                    outline
                    required
                  ></v-select>
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

    <v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
      >
      <v-btn
        slot="activator"
        v-model="fab"
        color="blue darken-2"
        dark
        fab
      >
        <v-icon>account_circle</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <!-- <v-btn
        fab
        dark
        small
        color="green"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
      >
        <v-icon>add</v-icon>
      </v-btn>
        <v-btn
          fab
          dark
          small
          color="red"
        >
          <v-icon>delete</v-icon>
        </v-btn> -->
      </v-speed-dial>
  <!-- New item: Search bar -->
    <v-card>
      <v-fade-transition>
        <v-card-title v-if="!searchBarHidden">
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            :label="searchLabel"
            single-line
            hide-details
          ></v-text-field>
          <v-btn class="mx-3" fab dark small color="error" @click="search = null">
            <v-icon dark>close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-title>
      </v-fade-transition>
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
      :total.items="this.items.length"
      class="elevation-1"
    >
  <!-- Table: Headers -->
    <template slot="headerCell" slot-scope="props">
      <v-tooltip bottom>
        <span class="cell-header" slot="activator">
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
       <td
         class="text-xs-left"
         v-for="header in headers"
         :key="header.text"
       >
         <v-edit-dialog
            :return-value.sync="props.item[header.value]"
            lazy
            large
            permanent
            persistent
            @save="msgSave"
            @cancel="msgCancel"
            @close="msgClose"
          >
          <div>{{ props.item[header.value] }}</div>
          <div slot="input" class="my-3 title">{{ header.text }}</div>
            <v-text-field
              v-if="header.cellType == 'tb'"
              slot="input"
              v-model="props.item[header.value]"
              label="Edit"
              single-line
              counter
              required
            ></v-text-field>
            <v-select
              v-else-if="header.cellType === 'md'"
              slot="input"
              class="ma-1"
              v-model="props.item[header.value]"
              :items="menuItems"
              :label="header.text"
              color="primary"
              large
              outline
              required
            ></v-select>
        </v-edit-dialog>
      </td>
      </template>
    </v-data-table>
  <!-- Table: Footer Pagination function buttons-->
    <v-card>
      <v-container class="my-1">
        <v-layout row wrap>
            <v-flex xs1 md1>
              <v-select
                class="ma-1"
                v-model="pagination.rowsPerPage"
                :items="rows"
                label="rows"
                color="primary"
              ></v-select>
            </v-flex>
          <v-flex>
            <v-layout align-end justify-end>
              <v-btn fab dark small color="primary" @click="searchDisplay">
                <v-icon dark>search</v-icon>
              </v-btn>
  <!-- Delete confirmation dialog -->
              <v-dialog v-model="delDialog" persistent max-width="500">
                <v-btn slot="activator" fab dark small color="error" @click="delDialog = true">
                  <v-icon dark>delete</v-icon>
                </v-btn>
                <v-card v-if="selected.length > 0">
                  <v-card-title class="table-header">{{ titleDel }}</v-card-title>
                  <v-card-text class="ma-2">{{ msgDel }}</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat @click.native="delDialog = false">Cancel</v-btn>
                    <v-btn color="primary" flat @click.native="deleteItem">Delete</v-btn>
                  </v-card-actions>
                </v-card>
                <v-card v-else-if="selected.length === 0">
                  <v-card-title class="table-header">No items have been selected for delete</v-card-title>
                  <!-- <v-card-text class="ma-2">{{ msgDel }}</v-card-text> -->
                  <v-card-actions v-if="selected.length < 1">
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat @click.native="delDialog = false">Okay</v-btn>
                    <!-- <v-btn color="primary" flat @click.native="deleteItem">Delete</v-btn> -->
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
          </v-flex>
          <v-layout row align-start justify-start>
            <v-pagination
              class="ma-1"
              v-model="pagination.page"
              :length="pages"
              >
            </v-pagination>
          </v-layout>
        </v-layout>
      </v-container>
    </v-card>
  <!-- Snakcbar -->
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn flat @click="snack = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>

export default {
  name: 'BaseDataTable',
  data () {
    return {
      rows: [ 5, 10, 15, 20, 25, 50, 100 ],
      editDialog: false,
      search: '',
      selected: [],
      searchBarHidden: true,
      pagination: {},
      snackColor: 'primary',
      snackText: '',
      rowDisplayNo: 5,
      snack: false,
      delDialog: false,
      direction: 'top',
      fab: true,
      fling: true,
      hover: true,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition'
    }
  },
  props: {
    items: Array,
    headers: Array,
    menuItems: Array,
    btnTitle: String,
    dialogTitle: String,
    tableTitle: String,
    newItem: Array,
    itemKey: String,
    searchLabel: String,
    msgDel: String,
    titleDel: String
  },
  computed: {

    pages () {
      if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) {
        return 0
      } else {
        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    }
  },
  methods: {
    deleteItem () {
      this.$emit('deleteSelected', this.selected)
      this.selected = []
      this.delDialog = false
    },
    close () {
      this.editDialog = false
      console.log('Dialog Closing')
    },
    searchDisplay () {
      this.searchBarHidden = !this.searchBarHidden
      this.search = null
      return this.searchBarHidden
    },
    save () {
      console.log('Fired')
      this.$emit('newItem', this.newItem)
      this.close()
    },
    msgSave () {
      this.snack = true
      this.snackColor = 'success'
      this.snackText = 'Data saved'
    },
    msgCancel () {
      this.snack = true
      this.snackColor = 'error'
      this.snackText = 'Canceled'
    },
    msgOpen () {
      this.snack = true
      this.snackColor = 'info'
      this.snackText = 'Dialog opened'
    },
    msgClose () {
      console.log('Snackbar closed')
    }
  },
  mounted () {
    console.log(this.items)
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
