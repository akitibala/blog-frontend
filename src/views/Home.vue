
  <template>
  <v-container fluid>
    <v-row v-for="card in blogs" :key="card.id" dense>
      <!-- <v-col
          
  
        > -->
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
  name: "Home",
  props:{
    userId:Number
  },
  mounted() {
    this.userID=this.userId;
    this.loadData();
    this.mounted = true;
  },
  data() {
    return {
      data: "",
      blogs: [],
      userID:-1
    };
  },
  methods: {
    async loadData() {
      await axios
        .get("http://localhost:8000/posts/"+this.userID+"/")
        .then((response) => {
          // console.log(response.data);
          this.blogs.push(...response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
