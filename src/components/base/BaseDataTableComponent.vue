<template>
  <div>
    <v-container v-if="this.$vuetify.breakpoint.lgAndUp" fluid>
      <v-toolbar class="pa-1 my-1 elevation-1" flat color="white">
        <v-icon class="mr-2" medium :color="primaryColor">{{ recordIcon }}</v-icon>
        <h2 class="headline primary--text font-weight-medium ml-1">{{ tableTitle }}</h2>
        <v-divider class="mx-2" inset vertical />
        <v-spacer />
        <v-fade-transition mode="out-in" appear>
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
            />
          </v-flex>
        </v-fade-transition>
        <v-spacer />
        <v-divider v-if="editPerms.create" class="mx-2 mr-3" inset vertical />
        <v-btn v-if="editPerms.create" @click="newDialog = true" :color="primaryColor">
          {{ addBtnTitle }}
          <v-icon class="ml-2">{{ addRecordIcon }}</v-icon>
        </v-btn>
        <v-btn
          v-if="tableActionButton"
          @click="$emit('action-button-pressed')"
          :color="primaryColor"
        >
          {{ actionButtonTitle }}
          <v-icon class="ml-2">{{ actionButtonIcon }}</v-icon>
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
        :total="items.length"
        class="elevation-1"
      >
        <!-- Table: Headers -->
        <template slot="headers" slot-scope="props">
          <th v-if="editPerms.create || editPerms.update || editPerms.delete">
            <v-checkbox
              :input-value="props.all"
              :indeterminate="props.indeterminate"
              primary
              hide-details
              @click.native="toggleAll"
            />
          </th>
          <th
            v-for="header in props.headers"
            :key="header.text"
            :hidden="header.hidden"
            class="title primary--text text-xs-left"
            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)"
          >
            <v-tooltip bottom>
              <span class="primary--text text-xs-left" slot="activator">{{ header.text }}</span>
              <span>{{ header.text }}</span>
            </v-tooltip>
            <v-icon small>arrow_upward</v-icon>
          </th>
        </template>
        <!-- Table: Row data-->
        <template slot="items" slot-scope="props">
          <tr @click="$emit('row-clicked', props.item)">
            <td v-if="editPerms.create || editPerms.update || editPerms.delete">
              <v-checkbox v-model="props.selected" />
            </td>
            <td
              class="text-xs-left"
              :hidden="header.hidden"
              v-for="header in headers"
              :key="header.text"
              :color="primaryColor"
            >
              <div
                class="body-2 text-xs-left accent--text font-weight-regular"
              >
                {{ props.item[header.value] }}
              </div>
            </td>
          </tr>
        </template>
        <!-- Table: No Data Slot - spinner Loading, display Error -->
        <template slot="no-data">
          <BaseDataTableInfoCard
            :errorMsg="errorMsg"
            :loadingMsg="loadingMsg"
            :loadedMsg="loadedMsg"
            :loading="loading"
            :loaded="loaded"
            :error="error"
            :color="primaryColor"
          />
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
                :color="primaryColor"
              />
            </v-flex>
            <v-pagination
              class="ml-1 mr-4"
              v-model="pagination.page"
              total-visible="10"
              :length="pages()"
            />
            <!-- Table: Footer Speed dial -->
            <v-speed-dial
              v-if="$vuetify.breakpoint.mdAndDown"
              v-model="fab"
              class="ma-0"
              absolute
              :top="top"
              :bottom="bottom"
              :right="right"
              :left="left"
              :direction="dtDirection"
              :open-on-hover="hover"
              :transition="transition"
            >
              <v-btn slot="activator" v-model="fab" :color="primaryColor" dark fab>
                <v-icon>menu</v-icon>
                <v-icon>close</v-icon>
              </v-btn>
              <v-btn
                v-if="selected.length > 0 && editPerms.update"
                @click="editDialog = true"
                fab
                dark
                medium
                color="success"
              >
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn
                v-if="editPerms.create"
                @click="newDialog = true"
                fab
                dark
                medium
                color="success"
              >
                <v-icon>add</v-icon>
              </v-btn>
              <v-btn
                v-if="selected.length > 0 && editPerms.create"
                @click="delDialog = true"
                fab
                dark
                medium
                color="error"
              >
                <v-icon>delete</v-icon>
              </v-btn>
              <v-btn fab dark medium :color="primaryColor" @click="searchDisplay">
                <v-icon dark>search</v-icon>
              </v-btn>
            </v-speed-dial>
          </v-layout>
          <!-- Delete confirmation dialog -->
          <v-dialog v-model="delDialog" persistent max-width="500">
            <v-card class="pa-3">
              <v-card-title class="title primary--text">{{ delDialogTitle }}</v-card-title>
              <v-card-text class="ma-2">{{ msgDel }}</v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn :color="primaryColor" flat @click.native.prevent="close">Cancel</v-btn>
                <v-btn :color="primaryColor" flat @click.native.prevent="deleteItem">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- New Item newDialog -->
          <v-dialog v-model="newDialog" max-width="96%">
            <v-form ref="newForm" v-model="valid">
              <v-card class="pa-3">
                <v-layout row justify-center align-center>
                  <v-icon class="mr-2" medium :color="primaryColor">{{ recordIcon }}</v-icon>
                  <span class="title primary--text">{{ newDialogTitle }}</span>
                </v-layout>
                <v-card-text>
                  <v-container>
                    <v-layout column>
                      <v-flex v-for="(item, key) in newItem" :key="key">
                        <slot
                          name="newSlot"
                          v-if="item.cellType === 'tb'"
                          :item="item"
                          :itemKey="key"
                        />
                        <v-select
                          v-else-if="item.cellType === 'md'"
                          class="ma-1"
                          v-model="newItem[key].sync"
                          :items="item.menuItems"
                          :label="newItem[key].cellLabel"
                          :color="primaryColor"
                          outline
                          required
                          return-object
                          :item-value="item.returnVal"
                          :item-text="item.displayVal"
                        />
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn :color="primaryColor" flat @click.native="close">Cancel</v-btn>
                  <v-btn :color="secondaryColor" :disabled="!valid" flat @click.native="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
          <!-- Edit confirmation dialog -->
          <v-dialog v-model="editDialog" max-width="98%">
            <v-form v-model="valid" ref="editForm">
              <v-card class="pa-3">
                <v-layout row justify-start align-center>
                  <v-icon class="mr-2" medium :color="primaryColor">{{ recordIcon }}</v-icon>
                  <span class="title primary--text">{{ editDialogTitle }}</span>
                </v-layout>
                <v-card-text>
                  <v-container>
                    <v-layout v-for="(item, index) in selected" :key="index">
                      <v-flex
                        v-for="(property, key) in item"
                        :key="key"
                        v-show="newItem.find(attribute => attribute.attr === key)"
                      >
                        <slot
                          name="editSlot"
                          v-if="inputType(item, key, 'tb')"
                          :item="item"
                          :itemKey="key"
                          :property="property"
                        />
                        <v-select
                          v-if="inputType(item, key, 'md')"
                          class="ma-1"
                          v-model="item[key]"
                          :items="menuItems(key)"
                          :label="key"
                          :placeholder="item[key].value"
                          :color="primaryColor"
                          outline
                          required
                          :item-value="newItem.find(attribute => attribute.attr === key).returnVal"
                          :item-text="newItem.find(attribute => attribute.attr === key).displayVal"
                        />
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn :color="primaryColor" flat @click.native="close">Cancel</v-btn>
                  <v-btn
                    :color="secondaryColor"
                    :disabled="!valid"
                    flat
                    @click.native="saveChanges"
                  >
                    save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
        </v-container>
      </v-card>
      <v-layout row justify-center align-center ma-3>
        <v-fade-transition>
          <v-btn
            v-if="selected.length > 0 && editPerms.update"
            @click="editDialog = true"
            :color="primaryColor"
            large
          >
            edit record
            <v-icon class="ml-2">edit</v-icon>
          </v-btn>
        </v-fade-transition>
        <v-fade-transition>
          <v-btn
            v-if="selected.length > 0 && editPerms.delete"
            @click="delDialog = true"
            :color="primaryColor"
            large
          >
            delete
            <v-icon class="ml-2">delete</v-icon>
          </v-btn>
        </v-fade-transition>
        <v-fade-transition>
          <v-btn
            v-if="items.length > 0"
            @click="searchDisplay"
            :color="primaryColor"
            large
          >
            search
            <v-icon class="ml-2">search</v-icon>
          </v-btn>
        </v-fade-transition>
      </v-layout>
    </v-container>
    <!-- BREAKPOINT MDANDDOWN / MOBILE -->
    <v-container v-if="this.$vuetify.breakpoint.mdAndDown " fluid>
      <v-speed-dial
        v-if="editPerms.create || editPerms.update || editPerms.delete"
        v-model="fab"
        class="ma-0"
        fixed
        :top="top"
        :bottom="bottom"
        :right="right"
        :left="left"
        :direction="mbDirection"
        :open-on-hover="hover"
        :transition="transition"
      >
        <v-btn slot="activator" v-model="fab" :color="primaryColor" dark small fab>
          <v-icon>menu</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
        <v-btn v-if="selected.length > 0" @click="editDialog = true" fab dark small color="success">
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn @click="newDialog = true" fab dark small color="success">
          <v-icon>add</v-icon>
        </v-btn>
        <v-btn v-if="selected.length > 0" @click="delDialog = true" fab dark small color="error">
          <v-icon>delete</v-icon>
        </v-btn>
        <v-btn fab dark small :color="primaryColor" @click="searchBarHidden = !searchBarHidden">
          <v-icon dark>search</v-icon>
        </v-btn>
      </v-speed-dial>
      <!-- readonly table action button mode -->
      <v-speed-dial
        v-if="tableActionButton"
        v-model="fab"
        class="ma-0"
        fixed
        :top="top"
        :bottom="bottom"
        :right="right"
        :left="left"
        :direction="mbDirection"
        :open-on-hover="hover"
        :transition="transition"
      >
        <v-btn slot="activator" v-model="fab" :color="primaryColor" dark small fab>
          <v-icon>menu</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
        <v-btn @click="searchBarHidden = !searchBarHidden" fab dark small color="error">
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn @click="$emit('action-button-pressed')" fab dark small color="success">
          <v-icon>add</v-icon>
        </v-btn>
      </v-speed-dial>
      <v-fade-transition>
        <v-layout row align-center justify-space-around v-if="searchBarHidden">
          <v-text-field
            class="mb-2"
            @click:append-outer="search = ''"
            v-model="search"
            append-icon="search"
            :label="searchLabel"
            single-line
            hide-details
            append-outer-icon="close"
          />
        </v-layout>
      </v-fade-transition>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        :item-key="itemKey"
        v-model="selected"
        select-all
        hide-actions
        :pagination.sync="pagination"
        :total="items.length"
        class="elevation-1"
      >
        <!-- Table: Headers -->
        <template slot="headers" slot-scope="props">
          <th v-if="editPerms.create || editPerms.update || editPerms.delete">
            <v-checkbox
              :input-value="props.all"
              :indeterminate="props.indeterminate"
              primary
              small
              hide-details
              @click.native="toggleAll"
            />
          </th>
          <th
            v-for="header in props.headers"
            :key="header.text"
            :hidden="header.hidden"
            class="subheader primary--text text-xs-left"
            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)"
          >
            <v-tooltip bottom>
              <span class="primary--text font-weight-medium" slot="activator">{{ header.text }}</span>
              <span>{{ header.text }}</span>
            </v-tooltip>
            <v-icon small>arrow_upward</v-icon>
          </th>
        </template>
        <!-- Table: Row data-->
        <template slot="items" slot-scope="props">
          <tr @click="$emit('row-clicked', props.item)">
            <td v-if="editPerms.create || editPerms.update || editPerms.delete">
              <v-checkbox v-model="props.selected" />
            </td>
            <td
              class="text-xs-left body-2"
              v-for="header in headers"
              :hidden="header.hidden"
              :key="header.text"
            >
              <div
                class="body-2 text-xs-left accent--text font-weight-regular"
              >
                {{ props.item[header.value] }}
              </div>
            </td>
          </tr>
        </template>
        <template slot="no-data">
          <BaseDataTableInfoCard
            :errorMsg="errorMsg"
            :loadingMsg="loadingMsg"
            :loadedMsg="loadedMsg"
            :loading="loading"
            :loaded="loaded"
            :error="error"
            :color="primaryColor"
          />
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
              />
            </v-flex>
            <v-pagination
              class="ml-1 mr-4"
              v-model="pagination.page"
              total-visible="3"
              :length="pages()"
            />
          </v-layout>
          <!-- Delete confirmation dialog -->
          <v-dialog v-model="delDialog" persistent max-width="500">
            <v-card class="pa-3">
              <v-card-title class="title primary--text">{{ delDialogTitle }}</v-card-title>
              <v-card-text class="ma-2">{{ msgDel }}</v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn :color="primaryColor" flat @click.native="close">Cancel</v-btn>
                <v-btn :color="secondaryColor" flat @click.native="deleteItem">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- New Item newDialog -->
          <v-dialog v-model="newDialog" max-width="500px">
            <v-form ref="newForm" v-model="valid">
              <v-card class="pa-3">
                <v-layout row justify-center align-center>
                  <v-icon class="mr-2" medium :color="primaryColor">{{ recordIcon }}</v-icon>
                  <span class="title primary--text">{{ newDialogTitle }}</span>
                </v-layout>
                <v-card-text>
                  <v-container>
                    <v-layout row wrap justify-space-around>
                      <v-flex v-for="(item, key) in newItem" :key="key" xs12 md6>
                        <slot
                          name="newSlot"
                          v-if="item.cellType === 'tb'"
                          :item="item"
                          :itemKey="key"
                        />
                        <v-select
                          v-else-if="item.cellType === 'md'"
                          class="ma-1"
                          v-model="newItem[key].sync"
                          :items="newItem[key].menuItems"
                          :label="newItem[key].cellLabel"
                          :color="primaryColor"
                          outline
                          required
                          return-object
                          :item-value="item.returnVal"
                          :item-text="item.displayVal"
                        />
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn :color="primaryColor" flat @click.native.stop="close">Cancel</v-btn>
                  <v-btn
                    :color="secondaryColor"
                    :disabled="!valid"
                    flat
                    @click.native.stop="save"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
          <!-- Edit confirmation dialog -->
          <v-dialog v-model="editDialog" max-width="500px">
            <v-form v-model="valid" ref="editForm">
              <v-card class="pa-3">
                <v-layout>
                  <v-layout row fill-height justify-center align-center>
                    <v-icon class="mr-2" large :color="primaryColor">{{ recordIcon }}</v-icon>
                    <span class="title primary--text">{{ editDialogTitle }}</span>
                  </v-layout>
                </v-layout>
                <v-card-text>
                  <v-container class="ma-0 pa-0">
                    <template>
                      <v-layout v-for="(item, index) in selected" :key="index" column>
                        <v-flex
                          v-for="(property, key) in item"
                          :key="key"
                          v-show="newItem.find(attribute => attribute.attr === key)"
                        >
                          <slot
                            name="editSlot"
                            v-if="inputType(item, key, 'tb')"
                            :item="item"
                            :itemKey="key"
                            :property="property"
                          >
                            <v-select
                              v-if="inputType(item, key, 'md')"
                              class="ma-1"
                              v-model="item[key]"
                              :items="menuItems(key)"
                              :label="key"
                              :placeholder="item[key].value"
                              :color="primaryColor"
                              outline
                              required
                              :item-value="newItem.find(attribute => attribute.attr === key).returnVal"
                              :item-text="newItem.find(attribute => attribute.attr === key).displayVal"
                            />
                          </slot>
                        </v-flex>
                      </v-layout>
                    </template>
                  </v-container>
                </v-card-text>
                <v-card-actions column>
                  <v-layout row wrap>
                    <v-spacer />
                    <v-btn :color="primaryColor" flat @click.native="close">Cancel</v-btn>
                    <v-btn
                      :color="secondaryColor"
                      :disabled="!valid"
                      flat
                      @click.native="saveChanges"
                    >
                      Save
                    </v-btn>
                  </v-layout>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>

import BaseDataTableInfoCard from '@/components/base/BaseDataTableInfoComponent.vue'

export default {
  name: 'BaseDataTable',
  components: {
    BaseDataTableInfoCard
  },
  data () {
    return {
      valid: true,
      rows: [5, 10, 15, 20, 25, 50, 100],
      editIndex: 0,
      editDialog: false,
      search: '',
      selected: [],
      searchBarHidden: false,
      pagination: {},
      delDialog: false,
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
    loading: Boolean,
    loaded: Boolean,
    error: Boolean,
    errorMsg: String,
    loadingMsg: String,
    loadedMsg: String,
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
    crudIdKey: String,
    searchLabel: String,
    msgDel: String,
    titleDel: String,
    recordIcon: String,
    addRecordIcon: String,
    addBtnTitle: String,
    actionButtonTitle: String,
    actionButtonIcon: String,
    tableActionButton: Boolean,
    editPerms: Object
  },
  methods: {
    pages () {
      this.pagination.totalItems = this.items.length
      if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) {
        return 0
      } else {
        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
    close () {
      this.editDialog = false
      this.newDialog = false
      this.delDialog = false
      this.selected = []
      this.$emit('itemsCancelled')
    },
    decrement (index) {
      if (this.selected[index] && this.selected[index - 1]) {
        this.editIndex = index - 1
      } else {
        return 0
      }
    },
    deleteItem () {
      this.$emit('deleteSelected', this.selected)
      this.selected = []
      this.delDialog = false
    },
    getCellLabel (item, key, index) {
      for (var i = 0; i < this.newItem.length; i++) {
        if (this.newItem[i].attr === key) return this.newItem[i].cellLabel
      }
    },
    validate (key, value) {
      this.$emit('validate', { key: key, value: value })
    },
    increment (index) {
      if (this.selected[index] && this.selected[index + 1]) {
        this.editIndex = index + 1
      } else {
        return this.selected.length
      }
    },
    // Render logic for text box or dropdown
    inputType (item, key, type) {
      for (var i = 0; i < this.newItem.length; i++) {
        if (this.newItem[i].attr === key) {
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
        if (this.newItem[i].attr === key) return this.newItem[i].menuItems
      }
    },
    searchDisplay () {
      this.searchBarHidden = !this.searchBarHidden
      this.search = null
      return this.searchBarHidden
    },
    toggleAll () {
      if (this.selected.length) {
        this.selected = []
      } else this.selected = this.items.slice()
    },
    save () {
      if (this.$refs.newForm.validate()) {
        this.$emit('newItem', this.newItem)
        this.$refs.newForm.reset()
        this.close()
      }
    },
    saveChanges () {
      if (this.$refs.editForm.validate()) {
        this.$emit('itemsEdited', this.selected)
        this.close()
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";

tr:hover td {
  background-color: var(--v-secondary-darken1);
  cursor: pointer;
}

</style>
