<template>
  <div class="controller"></div>
</template>

<script>
export default {
  props: ['updateX', 'updateY', 'actionA'],
  mounted () {
    document.addEventListener('keydown', (event) => {
      const keycode = event.which || event.keyCode || 0

      if (keycode === 38) {
        this.updateY(+1)
      } else if (keycode === 40) {
        this.updateY(-1)
      } else if (keycode === 37) {
        this.updateX(-1)
      } else if (keycode === 39) {
        this.updateX(+1)
      } else if (keycode === 32) {
        this.actionA()
      }
    })
  }
}
</script>

<style>
@import "style.scss"
</style>
