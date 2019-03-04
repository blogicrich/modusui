<template>
  <v-menu v-model="open" full-width offset-x>
    <template v-slot:activator="{ on }">
      <v-btn block :color="color" dark v-on="on">{{title}}</v-btn>
    </template>

    <v-card>
      <v-toolbar dark :color="color">
        <v-toolbar-title v-html="title"></v-toolbar-title>
      </v-toolbar>
      <v-card-title primary-title>
        <span v-html="menuText"></span>
      </v-card-title>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data: function () {
    return { open: false }
  },
  props: {
    title: String,
    color: String,
    menuText: String
  }
}
</script>
