<template>
  <router-link
    :to="{
      name: 'songsinfo',
      params: {
        id: userplaylist[1].id,
      },
    }"
  >
    <div class="gedan">
      <div class="img">
        <van-image
          class="toux"
          width="40"
          height="40"
          radius="15"
          fit="cover"
          :src="userplaylist[1].coverImgUrl"
        />
      </div>
      <div class="like">
        <div class="Ilike">{{ userplaylist[1].name }}</div>
        <div class="count">{{ userplaylist[1].trackCount }}首</div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "musicdan",
  props: {
    userplaylist: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.gedan {
  width: 95vw;
  margin: auto;
  height: 70px;
  border-radius: 15px;
  margin-top: 15px;
  background-color: #ccc;
  display: flex;
  align-items: center;
  .img {
    margin-left: 15px;
  }
  .like {
    margin-left: 15px;
    .count {
      margin-top: 6px;
    }
  }
}
router-link {
  text-decoration: none;
}
</style>
