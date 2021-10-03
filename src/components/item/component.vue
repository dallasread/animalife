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
        let marginBottom = PIXEL_SIZE * this.item.coordinates[1]

        if (this.item.constructor.yOffset) {
          marginBottom -= this.item.constructor.yOffset
        }

        style += `margin-bottom: ${marginBottom}px;`
        style += `margin-left: ${PIXEL_SIZE * this.item.coordinates[0]}px;`

        if (!this.item.reverse) {
          style += 'transform: scaleX(-1);'
        }

        if (this.item.takingDamage) {
          style += 'opacity: 0.4'
        }
      }

      return style
    }
  }
}
</script>

<style lang="scss">
@import "style.scss"
</style>
