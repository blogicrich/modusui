<template lang="html">
  <div>
    <v-layout>
      <v-dialog v-model="dialog" persistent scrollable max-width="500px">
        <v-btn slot="activator" class="btnCol2">{{ btnTitle }}</v-btn>
        <v-card>
          <v-card-title><h2>{{ btnTitle }}</h2></v-card-title>
          <v-divider></v-divider>
          <v-card-title>
            <input type="checkbox" v-model="allSelected" @click="selectAll"/>
            <label> {{ SelectAll }}</label>
            <v-spacer></v-spacer>
            <v-icon>search</v-icon>
            <input type="text" class="styleSearch" v-model="search" placeholder="Search user.."/>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 300px;">
            <p>{{userIds}}</p>
            <p>{{selectedUsers}}</p>
              <div v-for="item in filteredName">
                <span class="test">
                <input  type="checkbox"
                        :value="item.name"
                        v-model="userIds"
                        @click="select"
                />
                <label> {{ item.name }}</label>
              </span>
                <p>
                  <hr class="hr"/>
                </p>
              </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-layout justify-space-around>
              <v-btn flat class="btnCol2" @click.native="close">Cancel</v-btn>
              <div v-if="this.userIds.length > 0">
                <v-btn flat class="btnCol2" @click.native="save">Save</v-btn>
              </div>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
export default {
  data(){
    return{
      dialog: true,
      allSelected: false,
      users: [
        {name: 'Elsa'},
        {name: 'Tamara'},
        {name: 'Daniek'},
        {name: 'Elsa1'},
        {name: 'Tamara2'},
        {name: 'Dani3ek'},
        {name: 'Elsa4'},
        {name: 'Tamaara'},
        {name: 'Dandiek'},
        {name: 'Elasa'},
        {name: 'Taemara'},
        {name: 'Danziek'},
        {name: 'Tameara'},
        {name: 'Danidek'},
        {name: 'Eelsa'},
        {name: 'Tamaewra'},
        {name: 'Tamzhwara'},
        {name: 'Danhtiek'},
        {name: 'Selectsa'},
        {name: 'Tatmara'}
      ],
      selectedUsers: [],
      userIds: [],
      search: '',
      btnTitle: 'Select Users',
      SelectAll: 'Select all',
      searchName: 'Search user..'
    }
  },
  props:{
    // users: Array,
    // btnTitle: String,
    // SelectAll: String,
    // SearchName: String
  },
  methods:{
    close(){
      if(this.selectedUsers.length >= 1){
        this.dialog = false
        this.userIds = this.selectedUsers
      }
    },
    save(){
      if(this.userIds.length >= 1){
        this.dialog = false
        this.selectedUsers = this.userIds
      }
    },
    selectAll(){
      this.allSelected = !this.allSelected
      this.userIds = [];
      if (this.allSelected) {
        for(name in this.users){
          this.userIds.push(this.users[name].name.toString());
        }
      }
    },
    select(){
      this.allSelected = false;
    }
  },
  computed:{
    filteredName(){
      return this.users.filter((name) =>{
        return name.name.match(this.search);
      })
    }
  }
}
</script>
<style>
  input[type=checkbox]:checked + label{
    color: #27aae2 !important;
  }
  .styleSearch{
    outline: none;
    border-bottom: solid 1px;
    border-color: #27aae2;
    border-radius: 3px;
  }
  .hr{
    border: dotted;
    border-width: 0.5px;
    border-color: #27aae2;
  }
  .btnCol2{
  background-color: #00a1cd !important;
  color: white !important;
  border: solid;
  border-color: #00a1cd;
  font-weight: bold;
  }
  .btnCol2:hover{
  background-color: white !important;
  color: #00a1cd !important;
  border: solid;
  border-color: #00a1cd;
  font-weight: bold;
  }
</style>
