<template>
  <div class="camera-wrapper" :style="cameraStyle">
    <div class="camera">
      <slot></slot>
    </div>
  </div>
</template>

<script>
const PIXEL_SIZE = 10

export default {
  props: ['character'],
  computed: {
    cameraStyle() {
      const characterOffset = this.character.width / 2 * PIXEL_SIZE
      const characterPositionOffset = PIXEL_SIZE * this.character.coordinates[0]
      let style = ''

      style += `margin-left: calc(50% - ${characterOffset + characterPositionOffset}px);`

      return style
    }
  }
}
</script>


<style lang="scss">
@import "style.scss";
</style>
