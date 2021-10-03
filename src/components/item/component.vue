<template>
  <div :class="'item ' + item.constructor.TYPE" :style="itemStyle">
    <img :src="item.constructor.image" />
  </div>
</template>

<script>
const PIXEL_SIZE = 10

export default {
  props: ['item'],
  computed: {
    itemStyle() {
      let style = `width: ${PIXEL_SIZE * this.item.constructor.width}px; `

      if (this.item.hide) {
        style += 'display: none;'
      } else {
        style += `margin-left: ${PIXEL_SIZE * this.item.coordinates[0]}px; margin-bottom: ${PIXEL_SIZE * this.item.coordinates[1]}px;`
      }

      if (this.item.reverse) {
        style += 'transform: scaleX(-1);'
      }

      return style
    }
  }
}
</script>

<style lang="scss">
@import "style.scss"
</style>
