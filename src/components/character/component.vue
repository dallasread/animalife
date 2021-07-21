<template>
  <div class="character">
    <img :src="character.image"/>
  </div>
</template>

<script>
export default {
  props: ['character', 'position']
}
</script>

<style>
@import "style.scss"
</style>
