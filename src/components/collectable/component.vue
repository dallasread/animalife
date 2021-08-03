<template>
  <div class="collectable" :style="collectableStyle">
    <img :src="collectable.constructor.image" />
  </div>
</template>

<script>
const PIXEL_SIZE = 10

export default {
  props: ['collectable'],
  computed: {
    collectableStyle() {
      let style = `width: ${PIXEL_SIZE * this.collectable.constructor.width}px; `

      if (this.collectable.hide) {
        style += 'display: none;'
      } else {
        style += `margin-left: ${PIXEL_SIZE * this.collectable.coordinates[0]}px; margin-bottom: ${PIXEL_SIZE * this.collectable.coordinates[1]}px;`
      }

      return style
    }
  }
}
</script>

<style>
@import "style.scss"
</style>
