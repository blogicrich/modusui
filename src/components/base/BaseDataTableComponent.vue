<template>
  <div>
    <div v-if="this.$vuetify.breakpoint.lgAndUp" fluid>
      <v-toolbar class="pa-1 my-1 elevation-1" flat color="white">
        <h2 class="table-header">{{ tableTitle }}</h2>
        <v-icon medium :color="primaryColor">{{ recordIcon }}</v-icon>
        <v-divider
          class="mx-2"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-flex v-if="searchBarHidden" lg-3 xl-2>
          <v-text-field
            class="mb-2"
            @click:append-outer="search = ''"
            v-model="search"
            append-icon="search"
            :label="searchLabel"
            single-line
            hide-details
            append-outer-icon="close"
          ></v-text-field>
        </v-flex>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-divider
          class="mx-2 mr-3"
          inset
          vertical
        ></v-divider>
        <v-btn @click="newDialog = true" :color="primaryColor">new administrator
          <v-icon class="ml-2">person_add</v-icon>
        </v-btn>
      </v-toolbar>
      <v-data-table
      id="table"
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
        :hidden="header.hidden"
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
          :hidden="header.hidden"
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
               :color="primaryColor"
               large
               outline
             ></v-select>
         </v-edit-dialog>
        </td>
      </tr>
    </template>
    </v-data-table>
  <!-- Table: No Data Slot - spinner Loading, display Error -->
    <template slot="no-data">
      
    </template>
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
                :color="primaryColor"
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
              :direction="dtDirection"
              :open-on-hover="hover"
              :transition="transition"
            >
              <v-btn
                slot="activator"
                v-model="fab"
                :color="primaryColor"
                dark
                fab
              >
                <v-icon>menu</v-icon>
                <v-icon>close</v-icon>
              </v-btn>
              <v-btn
                v-if="selected.length > 0"
                @click="editDialog = true"
                fab
                dark
                medium
                color="success"
              >
                <v-icon>edit</v-icon>
              </v-btn>
              </v-btn>
              <!-- <v-btn
                @click="save"
                fab
                dark
                medium
                color="error"
              >
              <v-icon>save</v-icon>
              </v-btn> -->
              <v-btn
                v-if="selected.length > 0"
                @click="delDialog = true"
                fab
                dark
                medium
                color="error"
              >
                <v-icon>delete</v-icon>
              </v-btn>
              <v-btn
                fab
                dark
                medium
                :color="primaryColor"
                @click="searchDisplay"
              >
                <v-icon dark>search</v-icon>
              </v-btn>
            </v-speed-dial>
          </v-layout>
  <!-- Delete confirmation dialog -->
          <v-dialog v-model="delDialog" persistent max-width="500">
            <v-card>
              <v-card-title class="table-header">{{ delDialogTitle }}</v-card-title>
              <v-card-text class="ma-2">{{ msgDel }}</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :color="primaryColor" flat @click.native.prevent="close">Cancel</v-btn>
                <v-btn :color="primaryColor" flat @click.native.prevent="deleteItem">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
  <!-- New Item newDialog -->
          <v-dialog v-model="newDialog" max-width="96%">
            <v-card>
              <v-card-title>
                <span class="table-header">{{ newDialogTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-layout row justify-space-around>
                    <v-flex v-for="(item, key) in newItem" :key="key">
                      <v-text-field
                        v-if="item.cellType === 'tb'"
                        class="ma-1"
                        :label="item.cellLabel"
                        v-model="newItem[key].sync"
                        :color="primaryColor"
                        outline
                        required
                      ></v-text-field>
                      <v-select
                        v-else-if="item.cellType === 'md'"
                        class="ma-1"
                        v-model="newItem[key].sync"
                        :items="newItem[key].menuItems"
                        :label="newItem[key].cellLabel"
                        :color="primaryColor"
                        outline
                        required
                      ></v-select>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :color="secondaryColor" flat @click.native="close">Cancel</v-btn>
                <v-btn :color="secondaryColor" flat @click.native="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
    <!-- Edit confirmation dialog -->
          <v-dialog v-model="editDialog" max-width="98%">
            <v-card class="pa-0">
              <v-card-title>
                <span class="table-header">{{ editDialogTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-layout v-for="(item, index) in selected" :key="index" row wrap justify-space-around>
                    <v-flex v-for="(property, key) in item" :key="key" v-if="newItem.find(attr => attr.cellLabel === key)" xs12 md6 lg2>
                      <v-text-field
                          v-if="inputType(key, 'tb')"
                          class="ma-1"
                          :label="key"
                          v-model.sync="item[key]"
                          :color="primaryColor"
                          outline
                          required
                        >{{ item[key].value }}
                      </v-text-field>
                      <v-select
                          v-if="inputType(key, 'md')"
                          class="ma-1"
                          v-model="item[key].sync"
                          :items="menuItems(key)"
                          :label="key"
                          :placeholder="String(item[key])"
                          :color="primaryColor"
                          outline
                          required
                        >{{ item[key].value }}
                      </v-select>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :color="primaryColor" flat @click.native="close">Cancel</v-btn>
                <v-btn :color="secondaryColor" flat @click.native="saveChanges">save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
      </v-card>
      <v-layout row justify-center align-center ma-3>
        <!-- <v-fade-transition>
          <v-btn class="pg-foot-btn" @click="$router.push('/landing')" color="primary" large>home
            <v-icon class="ml-2">home</v-icon>
          </v-btn>
        </v-fade-transition>
        <v-fade-transition>
          <v-btn class="pg-foot-btn" @click="" color="primary" large>save
            <v-icon class="ml-2">save</v-icon>
          </v-btn>
        </v-fade-transition> -->
        <v-fade-transition>
          <v-btn v-if="selected.length > 0" class="pg-foot-btn" @click="editDialog = true" :color="primaryColor" large>edit record
            <v-icon class="ml-2">edit</v-icon>
          </v-btn>
        </v-fade-transition>
        <v-fade-transition>
          <v-btn v-if="selected.length > 0" class="pg-foot-btn" @click="delDialog = true" :color="primaryColor" large>delete
            <v-icon class="ml-2">delete</v-icon>
          </v-btn>
        </v-fade-transition>
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
        :direction="mbDirection"
        :open-on-hover="hover"
        :transition="transition"
      >
        <v-btn
          slot="activator"
          v-model="fab"
          :color="primaryColor"
          dark
          small
          fab
        >
          <v-icon>menu</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
        <v-btn
          v-if="selected.length > 0"
          @click="editDialog = true"
          fab
          dark
          small
          color="success"
        >
          <v-icon>edit</v-icon>
        </v-btn>
        <!-- <v-btn
          @click="save"
          fab
          dark
          small
          color="error"
        >
        <v-icon>save</v-icon>
        </v-btn> -->
        <v-btn
          @click="newDialog = true"
          fab
          dark
          small
          :color="primaryColor"
        >
          <v-icon>add</v-icon>
        </v-btn>
        <v-btn
          v-if="selected.length > 0"
          @click="delDialog = true"
          fab
          dark
          small
          color="error"
        >
          <v-icon>delete</v-icon>
        </v-btn>
        <v-btn fab dark small :color="primaryColor" @click="searchDisplay">
          <v-icon dark>search</v-icon>
        </v-btn>
      </v-speed-dial>
      <v-fade-transition>
        <v-layout
          row align-center justify-space-around
          v-if="searchBarHidden"
        >
          <v-text-field
            class="mb-2"
            @click:append-outer="search = ''"
            v-model="search"
            append-icon="search"
            :label="searchLabel"
            single-line
            hide-details
            append-outer-icon="close"
          ></v-text-field>
        </v-layout>
  <!-- </v-card-title> -->
      </v-fade-transition>
  <!-- </v-toolbar> -->
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        :item-key="itemKey"
        v-model="selected"
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
          small
          hide-details
          @click.native="toggleAll"
        ></v-checkbox>
      </th>
      <th
        v-for="header in props.headers"
        :key="header.text"
        :hidden="header.hidden"
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
          :hidden="header.hidden"
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
               :items="headers"
               :label="header.text"
               :color="primaryColor"
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
            <v-flex xs3 md1 lg1>
              <v-select
                class="ma-1"
                v-model="pagination.rowsPerPage"
                :items="rows"
                label="rows"
                :color="primaryColor"
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
            <v-card>
              <v-card-title class="table-header">{{ delDialogTitle }}</v-card-title>
              <v-card-text class="ma-2">{{ msgDel }}</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :color="primaryColor" flat @click.native="close">Cancel</v-btn>
                <v-btn :color="secondaryColor" flat @click.native="deleteItem">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
  <!-- New Item newDialog -->
          <v-dialog v-model="newDialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="table-header">{{ newDialogTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-layout row wrap justify-space-around>
                    <v-flex v-for="(item, key) in newItem" :key="key" xs12 md6>
                      <v-text-field
                        v-if="item.cellType === 'tb'"
                        class="ma-1"
                        :label="item.cellLabel"
                        v-model="newItem[key].sync"
                        :color="primaryColor"
                        outline
                        required
                      ></v-text-field>
                      <v-select
                        v-else-if="item.cellType === 'md'"
                        class="ma-1"
                        v-model="newItem[key].sync"
                        :items="menuItems(key)"
                        :label="newItem[key].cellLabel"
                        :color="primaryColor"
                        outline
                        required
                      ></v-select>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :color="primaryColor" flat @click.native.stop="close">Cancel</v-btn>
                <v-btn :color="secondaryColor" flat @click.native.stop="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
  <!-- Edit confirmation dialog -->
          <v-dialog v-model="editDialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="table-header">{{ editDialogTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-layout row wrap justify-space-around>
                    <v-flex v-for="(item, key) in newItem" :key="key" xs12 md6>
                      <v-text-field
                        v-if="item.cellType === 'tb'"
                        class="ma-1"
                        :label="item.cellLabel"
                        v-model="newItem[key].sync"
                        :color="primaryColor"
                        outline
                        required
                      ></v-text-field>
                      <v-select
                        v-else-if="item.cellType === 'md'"
                        class="ma-1"
                        v-model="newItem[key].sync"
                        :items="menuItems(key)"
                        :label="newItem[key].cellLabel"
                        :color="primaryColor"
                        outline
                        required
                      ></v-select>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :color="primaryColor" flat @click.native="close">Cancel</v-btn>
                <v-btn :color="secondaryColor" flat @click.native="save">Save</v-btn>
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
  </div>
</template>

<script>
// import SubPageNavButton from '@/components/sub/SubPageNavButton.vue'

export default {
  components: {
    // SubPageNavButton
  },
  name: 'BaseDataTable',
  data () {
    return {
      rows: [ 5, 10, 15, 20, 25, 50, 100 ],
      editDialog: false,
      search: '',
      selected: [],
      searchBarHidden: false,
      pagination: {},
      snackColor: 'primary',
      snackText: '',
      snack: false,
      delDialog: false,
      editDialog: false,
      newDialog: false,
      mbDirection: 'top',
      dtDirection: 'left',
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
    primaryColor: String,
    secondaryColor: String,
    newDialogTitle: String,
    editDialogTitle: String,
    delDialogTitle: String,
    tableTitle: String,
    newItem: Array,
    editItem: Object,
    itemKey: String,
    searchLabel: String,
    msgDel: String,
    titleDel: String,
    recordIcon: String
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
    inputType (key, type) {
      for (var i = 0; i < this.newItem.length; i++) {
        if (this.newItem[i].cellLabel) {
          if (this.newItem[i].cellType === type) {
            return true
          } else {
            return false
          }
        }
      }
    },
    menuItems (key) {
      for (var i = 0; i < this.newItem.length; i++) {
        console.log("retrun menItem: ", this.newItem[i].menuItems, i)
        if (this.newItem[i].cellLabel === key) return this.newItem[i].menuItems
      }
    },
    close () {
      console.log(this.selected);
      if (this.selected.length) this.selected = []
      this.editDialog = false
      this.newDialog = false
      this.delDialog = false
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
      this.$emit('newItem', this.newItem)
      this.close()
    },
    saveChanges () {
      this.$emit('itemsChanged', this.selected)
      console.log(this.selected)
      console.log(this.items)
      this.close()
      this.selected = []
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
      this.snackColor = 'success'
      this.snackText = 'Dialog opened'
    },
    msgClose () {
      console.log('Snackbar closed')
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
