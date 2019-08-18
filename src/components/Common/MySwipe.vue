<template>
  <div>
    <mt-swipe :auto="4000" style="height:300px;">
        <mt-swipe-item v-for="item in imgs" :key="item.id"  >
            <img :src="item.img" alt="" width="100%" height="200px">
        </mt-swipe-item>
      </mt-swipe>
  </div>
</template>
<script>

  export default {
    name:'MySwipe',
    data () {
      return {
        imgs:[]
      };
    },
    props:['url'],
     created(){
          this.$axios.get(this.url).then(res=>{

           this.imgs=res.data.message;
          //  console.log(this.imgs);
       }).catch(err=>console.log(err))
     }

  }

</script>
<style>
</style>