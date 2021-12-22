<template>
  <div class="suggest">
    <van-cell
     :class="index%2===0?'animate__animated animate__wobble':'animate__animated animate__jello'"
      v-for="(item, index) in suggest"
      :key="index"
      @click="gosearch(item.name)"
    >
      <template #title>
        <van-icon name="search" />
        <span class="custom-title">{{ item.name }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getsearchsuggest } from "@/api/search.js";
import { debounce } from "lodash";
export default {
  name: "suggest",
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      suggest: [],
    };
  },
  watch: {
    value: {
      handler: debounce(function (newval, oldval) {
        // console.log(newval, oldval);

        // this.oldval = oldval;
        // console.log(this.searchtext);
        getsearchsuggest(this.value)
          .then(({ data }) => {
            console.log(data);

            this.suggest = data.result.songs;
          })
          .catch((err) => {
            console.log(err);
          });
      }, 300),
      immediate: true,
    },
  },
  methods: {
    gosearch(item) {
      this.$parent.value = item;
      this.$parent.onSearch(item);
    },
  },
};
</script>

<style></style>
