<style lang="less">
#home-box{
    height: 100%;
  .home-header{
    background-color: #fff;
    border-bottom: 2px solid #d7d9df ;
    padding: 20px;
    width: 100%;
    // position:fixed;
  }
  .el-container{
      height: 100%;
      .el-row{
          height: 100%;
          .el-col{
              height: 100%;
              .el-menu{
                  height: 100%;
              }
          }
      }
  }

} 

</style>


<template>
  <div id="home-box" >
  
        <!-- <el-header class="home-header">        
            <div style="text-align:right">
                <br />你好
            </div>    
        </el-header> -->
        <el-container >
            
            <el-aside width="250px" >
                <el-row class="tac">
                    <el-col height= "100%">
                        <el-menu
                        
                            default-active="this.$route.path"
                            router mode="TRUE"
                            class="el-menu-vertical-demo"
                            background-color="#545c64"
                            text-color="#fff"
                            @open="handleOpen"
                            @close="handleClose">
                            <div v-for="(item,i) in navList" :key="i">
                                <el-menu-item   :index="item.name">
                                    <template slot="title">
                                    <i class="el-icon-s-platform"></i>
                                    <span> {{ item.navItem }}</span>
                                    </template>
                                </el-menu-item>
                                

                           </div>
                        </el-menu>
                    </el-col>
                </el-row>

            </el-aside>
        
            <el-main>
                
                <keep-alive>
                <router-view></router-view>
                </keep-alive>
            </el-main>
        </el-container>
 
        
  
</div>
</template>

<script>
//   import { mapGetters, mapMutations, mapActions } from "vuex";
  export default {
    // computed: {
    // ...mapGetters([
    //   "user"
    // ])
//   },
    data() {
      return {
        navList:[ 
        {name:'/api/city_babylon',navItem:'city_babylon'},
       
         
        {name:'/api/city_luma',navItem:'city_luma'}, 
        
        {name:'/api/city_three',navItem:'city_three'}, 
        
        
        ] } 
    },
    created(){
    //   this.loadUser()
        this.id = sessionStorage.getItem("id");
    },
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    
    },
    mounted(){
    }

  }
</script>