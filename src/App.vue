<template>
  <v-app>
    <template v-if="isNotLogged">
    
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Login form</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                           <v-text-field
                              prepend-icon="mdi-account"
                              name="login"
                              label="Login"
                              v-model="userName"
                              type="text"
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              prepend-icon="mdi-lock"
                              name="password"
                              label="Password"
                              type="password"
                              v-model="pwd"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="verify(userName,pwd)">Login</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      
      </template>
    <template v-else>
      <v-toolbar dense color="purple" dark max-height="70">
        <v-toolbar-title>Awesome Blog</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <div class="d-flex align-center">
            <input v-model="term"  v-on:input="check(term)" style="background-color:white" placeholder="search blog ..." />&nbsp;
            <input v-model="count" type="number" v-on:input="check(count)" style="background-color:white" placeholder="0"/>

            <v-btn icon @click="setTerm(term,count)">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </div>
          <v-divider vertical></v-divider>
          <div class="d-flex align-center">
            
              <v-btn text :to="{ 
                name: 'Blog' , 
                params :  {username:this.userName,password:this.pwd}
                }"> Post A Bolg </v-btn>
          </div>

          <v-divider vertical></v-divider>

          <div class="d-flex align-center">
            <v-btn :to="{name:'Home',params:{userId:this.id}}" text>My Blogs </v-btn>
          </div>
        </v-toolbar-items>
      </v-toolbar>
    </template>

    <v-main justify-center>
      <v-container class="px-5 py-0">
        <v-container class="px-5 py-0">
          <keep-alive :include="['Login']">

          <router-view></router-view>
          </keep-alive>
        </v-container>
      </v-container>
    </v-main>
  </v-app>
</template>



<script>
import axios from 'axios';


export default {
  name: "App",


  data() {
    return {
      term: "",
      isNotLogged:true,
      search:'',
      count:0,
      userName:"",
      pwd:"",
      id:-1
    };
  },
  methods: {
    setTerm(value,value1) {
      
      if (this.$router.currentRoute.name !== 'SearchBlogs') {
        // console.log(`${value}:${value1}`)
   this.$router.push({ name: "SearchBlogs",params:{ term:value,count:parseInt(value1)} });
    // this.$router.go(-1);
  }

    },
    check(val){
    if(val === ''  && this.$router.currentRoute.name === 'SearchBlogs' ){
       this.$router.go(-1);
    }
    },
    async verify(name,passwd){
      this.userName = name;
      this.pwd = passwd
      if (this.userName === '' || this.pwd === ''){
        console.log('Please Fill empty fields');
      }
      else{
        await axios.post('http://localhost:8000/users/',{
          username:this.userName,
          password:this.pwd
        }).then(
          (res) => {
           const  user = res.data
           console.log(user)
            this.id=user[0].id
            // console.log(`User id ${user[0].id}`)
            
            this.isNotLogged=false
            this.$router.push({name:"Home",params:{userId:this.id}})
          }
        )
        .catch((err)=>{
          console.log('Please Enter valid Credentials or Register')
          console.log(err)
        })
      }
    },


  },
};
</script>
