<template>
  <v-container>
    <v-card>
      <v-layout class="mb-3">
        <v-flex>
          <v-card-title>
            <h1>{{ title }}</h1>
          </v-card-title>
        </v-flex>
        <v-spacer></v-spacer>

        <v-flex xs1 mt-4>
          <v-dialog width="500">
            <template v-slot:activator="{ on }">
              <v-btn class="primary" v-on="on">Add Drink</v-btn>
            </template>
            <v-card>
              <v-layout row>
                <v-card-title>
                  <h3>Drink's Name</h3>
                </v-card-title>
                <v-card-text>
                  <v-input label="Name" v-model="name"></v-input>
                </v-card-text>
                <v-card-title>
                  <h3>Amount Drank</h3>
                </v-card-title>
                <v-card-text>
                  <v-input label="Amount" v-model="amount"></v-input>
                </v-card-text>
              </v-layout>
              <v-btn class="mb-3 primary">Add Drink</v-btn>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>

      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="drinks"
        :pagination.sync="pagination"
        select-all
        item-key="name"
        class="elevation-1"
      >
        <template v-slot:headers="props">
          <tr>
            <th>
              <v-checkbox
                :input-value="props.all"
                :indeterminate="props.indeterminate"
                primary
                hide-details
                @click.stop="toggleAll"
              ></v-checkbox>
            </th>
            <th
              v-for="header in props.headers"
              :key="header.text"
              :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
              @click="changeSort(header.value)"
            >
              <v-icon small>arrow_upward</v-icon>
              {{ header.text }}
            </th>
          </tr>
        </template>
        <template v-slot:items="props">
          <tr :active="props.selected" @click="props.selected = !props.selected">
            <td>
              <v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
            </td>
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.amount }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    title: "Add Additional Drinks",
    pagination: {
      sortBy: "name"
    },
    selected: [],
    headers: [
      { text: "Name", value: "name" },
      { text: "Amount", value: "amount" }
    ],
    drinks: [
      {
        name: "Coffee",
        calories: "1 Litre",
      },
      {
        name: "Water",
        amount: "2 Litre",
      }
    ]
  }),

  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.desserts.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    }
  }
};
</script>