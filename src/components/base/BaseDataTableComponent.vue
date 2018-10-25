<template>
  <div>
    <v-toolbar class="my-1" flat color="white">
      <v-toolbar-title>{{ tableTitle }}</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>

      <v-dialog max-width="500px">
      <v-btn slot="activator" color="primary" dark class="mb-2">{{ btnTitle }}</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ dialogTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-for="item in editedItem" :key="item.text" v-model="item.value"></v-text-field>
              </v-flex>
              <!-- <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
              </v-flex> -->
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
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
      </template>
    </v-data-table>
  </div>
</template>

<script>

export default {
  name: 'BaseDataTable',
  props: {
    items: Array,
    headers: Array,
    btnTitle: String,
    dialogTitle: String,
    tableTitle: String,
    editedItem: Array
  },
  mounted () {
    console.log(this.items)
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
