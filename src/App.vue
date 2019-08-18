<template>
  <div id="app">
<mt-header  title="首页">
  <router-link to="/" slot="left">
    <mt-button icon="back" @click="back">返回</mt-button>
  </router-link>
  <mt-button icon="more" slot="right"></mt-button>
</mt-header>

    <router-view/>
<mt-tabbar v-model="selected">
  <mt-tab-item id="Home">
    <img slot="icon" src="./assets/index.png">
    首页
  </mt-tab-item>
  <mt-tab-item id="Order">
    <img slot="icon" src="./assets/vip.png">
    订单
  </mt-tab-item>
  <mt-tab-item id="Shopcart">
    <img slot="icon" src="./assets/Shopcart.png">
    购物车
    <mt-badge type="success" >{{productCount}}</mt-badge>
  </mt-tab-item>
  <mt-tab-item id="Mine">
    <img slot="icon" src="./assets/find.png">
    我的
  </mt-tab-item>
</mt-tabbar>

  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      selected:'', // selected实现底部菜单切换
      productCount:0  // 购物车展示的商品数量
    }
  },
  methods: {
    back(){
      if(this.$route.path == "/"){
        return true;
      } else {
        this.$router.go(-1);//返回上一层
      }     
    },
  },
  // watch监视selected,当selected中的值发生变化，会自动调用后面的方法
  // 当我们单击底部菜单中的不同菜单项的时候，selected这个属性的值会发生变化，同时watch监视到该属性发生了变化，那么会自动调用后面的方法（函数）
  watch:{
      selected:function(newCompent,oldComment) {
        // newCompent:存储的是当前单击的菜单项
        // oldComment:存储的是前面所单击的菜单项。
        // console.log("newCompent",newCompent)
        //  console.log("oldComment",oldComment)
        // console.log('selected',this.selected)
        // this.selected返回的是mt-tab-item中的id属性的值。
        // 去执行对应的路由，找到对应的页面并且进行展示。
        this.$router.push({name:this.selected})


      }

  },
  created () {
     // 在Vue生命周期的created方法中，添加EventBus监听事件，当该事件触发后，完成购物车商品数量的累加。
    this.$bus.$on('getCarProdunctCount',(data)=>{
      console.log(data);
      this.productCount+=data;
    })
  }
}
</script>

<style scoped>
.mint-header {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 4;

}
.mint-tabbar{
  position:fixed;
}
.mint-tab-item{
position: relative;
}
.mint-badge.is-size-normal{
  position: absolute;
  top: 0;
  right: 0;
}

</style>
