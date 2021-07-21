<template>
  <div class="controller"></div>
</template>

<script>
const isKeyActive = (keys, key) => {
  return keys.indexOf(key) !== -1
}

let keydownInterval

export default {
  props: ['updateX', 'updateY', 'actionA'],
  mounted () {
    const currentKeys = []

    document.addEventListener('keydown', (event) => {
      const keycode = event.which || event.keyCode || 0
      this.addKey(currentKeys, keycode)
      this.run(currentKeys)
    })

    document.addEventListener('keyup', (event) => {
      const keycode = event.which || event.keyCode || 0
      this.removeKey(currentKeys, keycode)
    })
  },
  methods: {
    addKey(currentKeys, keycode) {
      if (currentKeys.indexOf(keycode) === -1) {
        currentKeys.push(keycode)
      }
    },

    removeKey(currentKeys, key) {
      currentKeys.splice(currentKeys.indexOf(key), 1)
    },

    run(currentKeys) {
      clearInterval(keydownInterval)

      keydownInterval = setInterval(() => {
        if (isKeyActive(currentKeys, 38)) {
          this.updateY(+1)
        } else if (isKeyActive(currentKeys, 40)) {
          this.updateY(-1)
        }

        if (isKeyActive(currentKeys, 37)) {
          this.updateX(-1)
        } else if (isKeyActive(currentKeys, 39)) {
          this.updateX(+1)
        }

        if (isKeyActive(currentKeys, 32)) {
          this.actionA()
        }
      }, 50)
    }
  }
}
</script>

<style>
@import "style.scss"
</style>
