<template>
  <div class="camera-wrapper" :style="cameraStyle">
    <div class="camera">
      <slot></slot>
    </div>
  </div>
</template>

<script>
const PIXEL_SIZE = 1

export default {
  props: ['characterPosition'],
  computed: {
    cameraStyle() {
      let style = ''

      style += `margin-left: ${PIXEL_SIZE * - 14 * this.characterPosition.x}px;`

      return style
    }
  }
}
</script>


<style lang="scss">
@import "style.scss"
</style>
