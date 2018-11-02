<template>
  <div>
    <div v-if="this.$vuetify.breakpoint.lgAndUp" fluid>
      <v-toolbar class="pa-1 my-1 elevation-1" flat color="white">
        <h2 class="table-header">{{ tableTitle }}</h2>
        <v-divider
          class="mx-2"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-fade-transition>
          <v-card-title v-if="!searchBarHidden">
            <v-text-field
              v-model="search"
              append-icon="search"
              :label="searchLabel"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
        </v-fade-transition>
      </v-toolbar>
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
    <template slot="headers" slot-scope="props">
      <th>
        <v-checkbox
          :input-value="props.all"
          :indeterminate="props.indeterminate"
          primary
          hide-details
          @click.native="toggleAll"
        ></v-checkbox>
      </th>
      <th
        v-for="header in props.headers"
        :key="header.text"
        class="table-cell-header text-xs-left"
        :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
        @click="changeSort(header.value)"
      >
        <v-tooltip bottom>
          <span class="table-cell-header" slot="activator">
            {{ header.text }}
          </span>
          <span>
            {{ header.text }}
          </span>
        </v-tooltip>
        <v-icon small>arrow_upward</v-icon>
      </th>
    </template>
    <!-- Table: Row data-->
    <template slot="items" slot-scope="props">
      <tr>
        <td>
          <v-checkbox
            v-model="props.selected"
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
             ></v-select>
         </v-edit-dialog>
        </td>
      </tr>
    </template>
    </v-data-table>
    <!-- Table: Footer Pagination CRUD function buttons -->
      <v-card>
        <v-container class="my-1">
          <v-layout row fill-height align-center justify-center>
            <v-flex xs1 md1>
              <v-select
                class="ma-1"
                v-model="pagination.rowsPerPage"
                :items="rows"
                label="rows"
                color="primary"
              ></v-select>
            </v-flex >
            <v-pagination
              class="ml-1 mr-4"
              v-model="pagination.page"
              total-visible="10"
              :length="pages"
              >
            </v-pagination>
    <!-- Table: Footer Speed dial -->
            <v-speed-dial
              v-model="fab"
              class="table-fab ma-0"
              absolute
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
                color="primary"
                dark
                fab
              >
                <v-icon>menu</v-icon>
                <v-icon>close</v-icon>
              </v-btn>
              <v-btn
                v-if="selected.length < 2"
                @click="editDialog = true"
                fab
                dark
                small
                color="green"
              >
                <v-icon>edit</v-icon>
              </v-btn>
              </v-btn>
                <v-btn
                  @click="save"
                  fab
                  dark
                  small
                  color="error"
                >
              <v-icon>save</v-icon>
              </v-btn>
              <v-btn
                @click="newDialog = true"
                fab
                dark
                small
                color="green"
              >
                <v-icon>add</v-icon>
              </v-btn>
              <v-btn
                @click="delDialog = true"
                fab
                dark
                small
                color="error"
              >
                <v-icon>delete</v-icon>
              </v-btn>
              <v-btn fab dark small color="primary" @click="searchDisplay">
                <v-icon dark>search</v-icon>
              </v-btn>
            </v-speed-dial>
          </v-layout>
    <!-- Delete confirmation dialog -->
          <v-dialog v-model="delDialog" persistent max-width="500">
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
              <v-card-actions v-if="selected.length < 1">
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click.native="delDialog = false">Okay</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
    <!-- New Item newDialog -->
          <v-dialog v-model="newDialog" max-width="500px">
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
    <!-- Edit confirmation dialog -->
          <v-dialog v-model="editDialog" max-width="500px">
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
        </v-container>
      </v-card>
      <v-layout row justify-center align-center>
        <SubPageNavButton title="Home" route="/landing" large/>
      </v-layout>
      <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
        {{ snackText }}
        <v-btn flat @click="snack = false">Close</v-btn>
      </v-snackbar>
    </div>
  <!-- BREAKPOINT SMANDDOWN / MOBILE -->
    <v-container v-if="this.$vuetify.breakpoint.mdAndDown" fluid>
      <v-speed-dial
        v-model="fab"
        class="table-fab ma-0"
        fixed
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
          color="primary"
          dark
          fab
        >
          <v-icon>menu</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
        <v-btn
          v-if="selected.length < 2"
          @click="editDialog = true"
          fab
          dark
          small
          color="green"
        >
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn
          @click="save"
          fab
          dark
          small
          color="error"
        >
        <v-icon>save</v-icon>
        </v-btn>
        <v-btn
          @click="newDialog = true"
          fab
          dark
          small
          color="green"
        >
          <v-icon>add</v-icon>
        </v-btn>
        <v-btn
          @click="delDialog = true"
          fab
          dark
          small
          color="error"
        >
          <v-icon>delete</v-icon>
        </v-btn>
        <v-btn fab dark small color="primary" @click="searchDisplay">
          <v-icon dark>search</v-icon>
        </v-btn>
      </v-speed-dial>
      <v-toolbar v-if="!searchBarHidden" class="pa-1 my-1 elevation-1" flat color="white">
        <!-- <h2 class="table-header">{{ tableTitle }}</h2> -->
        <!-- <v-divider
          class="mx-2"
          inset
          vertical
        ></v-divider> -->
      <v-fade-transition>
        <v-card-title v-if="!searchBarHidden">
          <v-text-field
            v-model="search"
            append-icon="search"
            :label="searchLabel"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
      </v-fade-transition>
      </v-toolbar>
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
    <template slot="headers" slot-scope="props">
      <th v-if="$vuetify.breakpoint.smAndUp">
        <v-checkbox
          :input-value="props.all"
          :indeterminate="props.indeterminate"
          primary
          hide-details
          @click.native="toggleAll"
        ></v-checkbox>
      </th>
      <th
        v-for="header in props.headers"
        :key="header.text"
        class="table-cell-header text-xs-left"
        :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
        @click="changeSort(header.value)"
      >
        <v-tooltip bottom>
          <span class="table-cell-header" slot="activator">
            {{ header.text }}
          </span>
          <span>
            {{ header.text }}
          </span>
        </v-tooltip>
        <v-icon small>arrow_upward</v-icon>
      </th>
    </template>
    <!-- Table: Row data-->
    <template slot="items" slot-scope="props">
      <tr>
        <td v-if="$vuetify.breakpoint.smAndUp">
          <v-checkbox
            v-model="props.selected"
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
             ></v-select>
           </v-edit-dialog>
        </td>
      </tr>
    </template>
    </v-data-table>
    <!-- Table: Footer Pagination CRUD function buttons -->
      <v-card>
        <v-container class="my-1">
          <v-layout row wrap fill-height align-center justify-space-around>
            <v-flex xs3 md1>
              <v-select
                class="ma-1"
                v-model="pagination.rowsPerPage"
                :items="rows"
                label="rows"
                color="primary"
              ></v-select>
            </v-flex >
            <v-pagination
              class="ml-1 mr-4"
              v-model="pagination.page"
              total-visible="3"
              :length="pages"
              >
            </v-pagination>
    <!-- Table: Footer Speed dial -->
          </v-layout>
    <!-- Delete confirmation dialog -->
          <v-dialog v-model="delDialog" persistent max-width="500">
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
              <v-card-actions v-if="selected.length < 1">
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click.native="delDialog = false">Okay</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
    <!-- New Item newDialog -->
          <v-dialog v-model="newDialog" max-width="500px">
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
    <!-- Edit confirmation dialog -->
          <v-dialog v-model="editDialog" max-width="500px">
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
        </v-container>
      </v-card>
      <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
        {{ snackText }}
        <v-btn flat @click="snack = false">Close</v-btn>
      </v-snackbar>
    </v-container>
  <!-- Table Header: Title and '+' button -->
  </div>
</template>

<script>
import SubPageNavButton from '@/components/sub/SubPageNavButton.vue'

export default {
  components: {
    SubPageNavButton
  },
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
      editDialog: false,
      newDialog: false,
      direction: 'top',
      fab: false,
      fling: false,
      hover: false,
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
      this.pagination.totalItems = this.items.length
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
      this.newDialog = false
      console.log('Dialog Closing')
    },
    searchDisplay () {
      this.searchBarHidden = !this.searchBarHidden
      this.search = null
      return this.searchBarHidden
    },
    toggleAll () {
      if (this.selected.length) this.selected = []
      else this.selected = this.items.slice()
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
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
