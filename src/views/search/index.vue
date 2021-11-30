<template>
  <div class="search">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        :placeholder="defaultsearch"
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isresultshow = false"
      />
    </form>
    <Results v-if="isresultshow"></Results>

    <Suggest v-else-if="value" :value="value" :onSearch="onSearch"></Suggest>

    <History v-else :onSearch="onSearch"></History>
    <Hotsearch :hotsearch="hotsearch" v-if="!isresultshow"></Hotsearch>
  </div>
</template>

<script>
import Hotsearch from "./components/hotsearch.vue";
import Suggest from "./components/suggest.vue";
import History from "./components/history.vue";
import Results from "./components/results.vue";
import { getsearchinfo, gethotsearch, getdefaultsearch } from "@/api/search.js";
import { mapState } from "vuex";
export default {
  name: "search",
  components: {
    Suggest,
    Results,
    History,
    Hotsearch,
  },
  data() {
    return {
      value: "",
      hotsearch: [], //热搜列表
      isresultshow: false, //控制搜索结果的显示状态
      defaultsearch: "",
    };
  },
  methods: {
    async onSearch(val) {
      const { data } = await getsearchinfo(val);
      // console.log(data);
      this.$store.commit("setsearchhistory", val);
      this.$store.commit("setsearchlist", data.result.songs);
      this.isresultshow = true;
    },
    async gethotsearch() {
      const { data } = await gethotsearch();
      // console.log(data.data);
      this.hotsearch = data.data;
    },
    async getdefaultsearch() {
      const { data } = await getdefaultsearch();
      console.log(data.data);
      this.defaultsearch = data.data.showKeyword;
    },
  },
  computed: {
    ...mapState(["searchhistory"]),
  },
  created() {
    this.gethotsearch();
    this.getdefaultsearch();
  },
};
</script>

<style lang="less" scoped>
.search {
}
</style>
