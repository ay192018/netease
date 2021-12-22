<template>
  <div class="userprofile">
      <van-nav-bar title="标题"  left-arrow :border="false" @click-left="$router.back()">
  <template #right>
    <van-icon name="search" size="18" />
  </template>
</van-nav-bar>
      <van-tabs v-model="active" animated>
  <van-tab title="关注"> 
                <van-cell  clickable center    :to="{
                  name: 'PersonalCenter',
                  params: {
                    id: item.userId,
                  },
                }"
                 v-for="(item,index) in fens" :key="index" 
                  :class="index%2===0?'animate__animated animate__bounceInLeft':'animate__animated animate__bounceInRight'">
            <template #title >
                <van-image
             
                width="40"
                height="40"
                fit="cover"
                radius="12"
                :src="item.avatarUrl"
                />
    <span class="title">{{item.nickname}}</span>

  </template>
       </van-cell>
          </van-tab>
  <van-tab title="粉丝"> 
               <van-cell  clickable center :to="{
                  name: 'PersonalCenter',
                  params: {
                    id: item.userId,
                  },
                }" v-for="(item,index) in guanzhu" :key="index" 
               :class="index%2===0?'animate__animated animate__bounceInLeft':'animate__animated animate__bounceInRight'" >
            <template #title >
                <van-image
             
                width="40"
                height="40"
                fit="cover"
                radius="12"
               :src="item.avatarUrl"
                />
    <span class="title">{{item.nickname}}</span>
  </template>
       </van-cell>
          </van-tab>

</van-tabs>
  </div>
</template>

<script>
import {getfens,getguanzhu} from '@/api/fens.js'
export default {
name:"userprofile",
 data() {
    return {
      active: 0,
      fens:[],//关注列表
      guanzhu:[],//粉丝列表
    };
  },
props:{
    id:{
        type:[String,Number],
        required:true,
    }
},
methods:{
    async getfens(){
        const {data} =await getfens({
            uid :this.id,
            limit : 99999,
            
        })
        this.fens=data.follow
        // console.log(data.follow);
        const res =await getguanzhu({
             uid :this.id,
            limit : 99999,
        })
        this.guanzhu=res.data.followeds
        console.log(res.data.followeds);
    }
},
created(){
      console.log(typeof this.id);
    this.getfens();
  
}
}
</script>

<style lang="less" scoped>
.userprofile{
    /deep/ .van-nav-bar, .van-hairline--bottom{
   background: transparent;
    }
      /deep/ .van-tabs__nav,
  .van-tabs__nav--line {
    background: transparent;
  }
  /deep/ .van-tabs__wrap {
    background: transparent;
  }
  /deep/  .van-cell{
      background: transparent;
  }
    .title {
        margin-left: 10px;
        margin-top:30px ;
  }

}
</style>