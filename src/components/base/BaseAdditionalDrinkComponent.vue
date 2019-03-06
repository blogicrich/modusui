<template>
  <v-container>
    <v-card>
      <v-layout>
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
            </v-card>
          </v-dialog>
        </v-flex>

        <v-flex xs4>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
        </v-flex>
      </v-layout>

      <v-data-table :headers="headers" :items="drinks" :search="search" must-sort>
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.amount }}</td>
        </template>
        <v-alert
          v-slot:no-results
          :value="true"
          color="error"
          icon="warning"
        >Your search for "{{ search }}" found no results.</v-alert>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import StoreAditionalDrinks from "../../store/StoreAditionalDrinks.js";

export default {
  mixins: {
    StoreAditionalDrinks
  },
  data() {
    return {
      title: "Add Additional Drinks",
      search: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Amount", sortable: false, value: "amount" }
      ],
      drinks: []
    };
  },
  methods: {
    addDrink: function() {
      //
    }
  }
};
</script>