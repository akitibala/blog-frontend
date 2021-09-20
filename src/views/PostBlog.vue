<template>
    <v-container fluid>
    <v-row>
    
      <v-col
       
      >
        <v-textarea
          solo
          name="input-7-7"
          label="Type your post "
        background-color="amber lighten-4"
        color="orange orange-darken-4"
        auto-grow
    prepend-icon="mdi-comment"
    v-model="data"
       clearable
      clear-icon="mdi-close-circle"
        ></v-textarea>
        
      </v-col>
      <v-col 
      >
       <v-btn
      class="mx-2"
      fab
      dark
      color="green"
      @click="createPost"
    >
      <v-icon dark float>
        mdi-plus
      </v-icon>
    </v-btn>
      </v-col>
     
    </v-row>
    
    
    </v-container>

</template>
<script>
import axios from 'axios'
// import { defineComponent } from '@vue/composition-api'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
export default {
    name:'PostBlog',
    data(){
        return{
            data:"",
            name:'',
            passwd:''
        }
    },
    props:{
      username:String,
      password:String
    },
    mounted(){
      this.name = this.username,
      this.passwd = this.password
    },
    methods:{
        async createPost(){
          if (this.data) {
            const tokenObject = await axios.get('http://localhost:8000/get-token/').then(
              (res) => {
                // console.log(res.data)
                 return res.data
              }
            )
            console.log(this.name)
            console.log(this.passwd)
            axios.defaults.xsrfCookieValue = tokenObject.token;
            axios.defaults.xsrfHeaderValue = tokenObject.token;
            // console.log(tokenObject)

            await axios.post('http://localhost:8000/posts/',{
                body:this.data,
               
                owner:this.name
            },
            // {
           { headers :
            {
                'X-CSRFToken':tokenObject.token,
            }
            ,
            auth:{
              username : "admin",
              password: "Death.bed-01"
            }
            }
          
            ).then(
                () => {console.log("post created successfully")}
                // {console.log(response.data);}
            ).catch(
                (err) =>{
                    console.log(err)
                }
            )
            this.$router.push({ path: "/" });


        }
        }
    }
}
</script>
