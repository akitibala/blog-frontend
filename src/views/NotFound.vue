<template>
  <div class="not-found-wrapper">
    <img class="not-found-image" src="../assets/404.png" />
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style>
.not-found-wrapper {
  height: 100vh;
  width: 100%;
  display: grid;
  place-items: center;
}
.not-found-image {
  height: 500px;
  width: 700px;
}
@media screen and (max-width: 768px) {
  .not-found-image {
    height: 250px;
    width: 80vw;
  }
}
</style>