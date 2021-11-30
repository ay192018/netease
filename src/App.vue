<template>
  <div id="app">
    <router-view />
    <Audio></Audio>
  </div>
</template>

<script>
import Audio from "@/components/audio/";
export default {
  name: "App",
  components: { Audio },
};
</script>

<style></style>
