
  <template>
  <v-container fluid>
     <v-alert color="red darken-1" dark v-if="alertError">
      {{alertMsg}}</v-alert>

    <v-row v-for="card in blogs" :key="card.id" dense>
      <!-- <v-spacer></v-spacer> -->
      <v-container>
        <v-card>
          <v-card-text v-text="card.body"></v-card-text>
        </v-card>
        <!-- </v-col> -->
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "SearchBlogs",
  props:{
      term:String,
      count:Number
  },

  mounted() {
   
    this.searchTerm=this.term;
    this.wordCount=this.count;
    if(this.wordCount){
      this.searchBlogsByCount(this.wordCount);
    }
    else{
      this.searchBlogs(this.searchTerm);
    }
    this.mounted = true;
  },

  watch:{
      alertError(value){
      if(value){
        setTimeout(()=>{this.alertError=false ;this.alertMsg='';},5000)
      }
    }  
  },
  data() {
    return {
      searchTerm: "",
      wordCount:0,
      blogs: [],
      // countBlogs:[],
      alertError:false,
      alertMsg:''
    };
  },
  methods: {
    async searchBlogsByCount(val){
      
        await axios
          .get("http://localhost:8000/search/" + this.searchTerm + "/"+val+"/")
          .then((response) => {
            // console.log(response.data);
            this.blogs.push(...response.data);
            // console.log(this.countBlogs);
          })
          .catch((error) => {
            console.log("error")
            console.log(error);
          this.alertError = true;
          this.alertMsg = 'No Matched Count for Word';
          });
          
      
    },
    async searchBlogs(val) {
      // console.log(`Inside serach ${this.searchTerm}`);
      if (this.searchTerm) {
        await axios
          .get("http://localhost:8000/search/" + val+ "/")
          .then((response) => {
            // console.log(response.data);
            this.blogs.push(...response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>