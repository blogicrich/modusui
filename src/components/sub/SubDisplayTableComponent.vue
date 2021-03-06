<template>
  <div>
    <v-container v-if="this.$vuetify.breakpoint.lgAndUp" fluid>
      <v-toolbar v-if="!justRows" class="pa-1 my-1 elevation-1" flat color="white">
        <v-icon class="mr-2" medium :color="$vuetify.theme.primary">{{ tableTitleIcon }}</v-icon>
        <h2 class="headline primary--text font-weight-medium ml-1">{{ tableTitle }}</h2>
        <v-divider class="mx-2" inset vertical />
        <v-spacer />
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
        <v-spacer />
        <v-btn
          v-if="tableActionButton"
          @click="$emit('action-button-pressed')"
          :color="$vuetify.theme.primary"
        >
          <div class="body-2 text-xs-center secondary--text">{{ actionButtonTitle }}</div>
          <v-icon class="ml-2" :color="$vuetify.theme.secondary">{{ actionButtonIcon }}</v-icon>
        </v-btn>
      </v-toolbar>
      <v-data-table
        id="table"
        :headers="headers"
        :items="items"
        :search="search"
        :expand="expandable"
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
          <th
            v-for="header in props.headers"
            :key="header.text"
            :hidden="header.hidden"
            class="title primary--text text-xs-left"
            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)"
          >
            <v-tooltip bottom>
              <span class="subheader primary--text text-xs-left" slot="activator">{{ header.text }}</span>
              <span>{{ header.text }}</span>
            </v-tooltip>
            <v-icon small class="mx-1">arrow_upward</v-icon>
          </th>
        </template>
        <!-- Table: Row data-->
        <template slot="items" slot-scope="props">
          <tr
            ref="clickableRow"
            @click="(props.expanded = !props.expanded) && rowClicked(props)"
            :class="(props.expanded && hasRowContent) ? 'select' : 'unselect'"
          >
            <td
              class="text-xs-left"
              :hidden="header.hidden"
              v-for="header in headers"
              :key="header.text"
              :color="$vuetify.theme.primary"
            >
              <div class="body-2 text-xs-left accent--text font-weight-regular">{{ props.item[header.value] }}</div>
            </td>
            <td>
              <v-layout row align-center justify-end>
                <v-icon
                  v-if="hasRowContent"
                  :color="$vuetify.theme.accent"
                  medium
                >
                  {{ (props.expanded && hasRowContent) ? 'expand_less' : 'expand_more' }}
                </v-icon>
              </v-layout>
            </td>
          </tr>
        </template>
        <!-- Table Row Expanded Data -->
        <!-- eslint-disable-next-line -->
        <template slot="expand">
          <slot name="expandedRow" />
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
            :color="$vuetify.theme.primary"
            :actionBtn="infoActionButton"
            :actionBtnTitle="infoActionBtnTitle"
            @action-button-pressed="$emit('info-action-button-pressed')"
          />
        </template>
      </v-data-table>
      <!-- Table: Footer Pagination CRUD function buttons -->
      <v-card v-if="!justRows">
        <v-container class="my-1">
          <v-layout row fill-height align-center justify-center>
            <v-flex xs1 md1>
              <v-select
                class="ma-1"
                v-model="pagination.rowsPerPage"
                :items="rows"
                label="rows"
                :color="$vuetify.theme.primary"
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
              <v-btn slot="activator" v-model="fab" :color="$vuetify.theme.primary" dark fab>
                <v-icon>menu</v-icon>
                <v-icon>close</v-icon>
              </v-btn>
              <v-btn fab dark medium :color="$vuetify.theme.primary" @click="searchDisplay">
                <v-icon dark>search</v-icon>
              </v-btn>
            </v-speed-dial>
          </v-layout>
        </v-container>
      </v-card>
      <v-layout v-if="!justRows" row justify-center align-center ma-3>
        <v-fade-transition>
          <v-btn
            v-if="items.length > 0"
            @click="searchDisplay"
            :color="$vuetify.theme.primary"
            large
          >
            <div class="secondary--text">search</div>
            <v-icon :color="$vuetify.theme.secondary" class="ml-2">search</v-icon>
          </v-btn>
        </v-fade-transition>
      </v-layout>
    </v-container>
    <!-- BREAKPOINT MDANDDOWN / MOBILE -->
    <v-container v-if="this.$vuetify.breakpoint.mdAndDown " fluid>
      <!-- Speed dial mobile button -->
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
        <v-btn slot="activator" v-model="fab" :color="$vuetify.theme.primary" dark small fab>
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
        id="table"
        :headers="headers"
        :items="items"
        :search="search"
        :expand="expandable"
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
          <th
            v-for="header in props.headers"
            :key="header.text"
            :hidden="header.hidden"
            class="subheader primary--text font-weight-medium text-xs-left"
            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)"
          >
            <v-tooltip bottom>
              <span class="subheader primary--text font-weight-medium text-xs-left" slot="activator">{{ header.text }}</span>
              <span>{{ header.text }}</span>
            </v-tooltip>
            <v-icon small>arrow_upward</v-icon>
          </th>
        </template>
        <!-- Table: Row data-->
        <template slot="items" slot-scope="props">
          <tr
            ref="clickableRow"
            @click="(props.expanded = !props.expanded) && rowClicked(props)"
            :class="(props.expanded && hasRowContent) ? 'select' : 'unselect'"
          >
            <td
              v-for="header in headers"
              :hidden="header.hidden"
              :key="header.text"
            >
              <div class="body-2 text-xs-left accent--text font-weight-regular">{{ props.item[header.value] }}</div>
            </td>
            <td>
              <v-layout row align-center justify-end>
                <v-icon
                  v-if="hasRowContent"
                  :color="$vuetify.theme.accent"
                  medium
                >
                  {{ (props.expanded && hasRowContent) ? 'expand_less' : 'expand_more' }}
                </v-icon>
              </v-layout>
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
            :color="$vuetify.theme.primary"
            :actionBtn="infoActionButton"
            :actionBtnTitle="infoActionBtnTitle"
            @action-button-pressed="$emit('info-action-button-pressed')"
          />
        </template>
        <!-- Table Row Expanded Data -->
        <!-- eslint-disable-next-line -->
        <template slot="expand">
          <slot name="expandedRow" />
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
                :color="$vuetify.theme.primary"
              />
            </v-flex>
            <v-pagination
              class="ml-1 mr-4"
              v-model="pagination.page"
              total-visible="3"
              :length="pages()"
            />
          </v-layout>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>

import BaseDataTableInfoCard from '@/components/base/BaseDataTableInfoComponent.vue'

export default {
  name: 'SubDisplayTable',
  components: {
    BaseDataTableInfoCard
  },
  data () {
    return {
      rows: [5, 10, 15, 20, 25, 50, 100],
      search: '',
      selected: [],
      searchBarHidden: false,
      pagination: {},
      mbDirection: 'top',
      dtDirection: 'left',
      fab: false,
      hover: false,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition'
    }
  },
  props: {
    // Data Objects and keys
    items: Array,
    itemKey: String,
    headers: Array,
    // Messages and Titles
    errorMsg: String,
    loadingMsg: String,
    loadedMsg: String,
    tableTitle: String,
    infoActionBtnTitle: String,
    // Styling
    searchLabel: String,
    tableTitleIcon: String,
    // Booleans
    expandable: {
      type: Boolean,
      default: false
    },
    justRows: {
      type: Boolean,
      default: false
    },
    hasRowContent: {
      type: Boolean,
      default: false
    },
    error: Boolean,
    loaded: Boolean,
    loading: Boolean,
    // Table Action Button
    actionButtonTitle: String,
    actionButtonIcon: String,
    tableActionButton: Boolean,
    infoActionButton: Boolean
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
    rowClicked (e) {
      this.$emit('row-clicked', e)
    },
    searchDisplay () {
      this.searchBarHidden = !this.searchBarHidden
      this.search = null
      return this.searchBarHidden
    }
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";

.select {
  td {
    background-color: var(--v-tertiary-base);
    cursor: pointer;
  }
}
.unselect {
  td {
    background-color: inherit;
    cursor: inherit;
  }
}
tr:hover td {
  background-color: var(--v-secondary-darken1);
  cursor: pointer;
}
</style>
