<template>
  <div class="controller"></div>
</template>

<script>
const isKeyActive = (keys, key) => {
  return keys.indexOf(key) !== -1
}

const UP = 38
const DOWN = 40
const LEFT = 37
const RIGHT = 39
const SPACE = 32

let keydownInterval

export default {
  props: ['updateX', 'updateY', 'actionA'],
  mounted () {
    const currentKeys = []
    const onceler = {}

    this.run(currentKeys)

    document.addEventListener('keydown', (event) => {
      const keycode = event.which || event.keyCode || 0
      onceler[keycode] = onceler[keycode] ? onceler[keycode] : this.addKey(currentKeys, keycode)
    })

    document.addEventListener('keyup', (event) => {
      const keycode = event.which || event.keyCode || 0
      this.removeKey(currentKeys, keycode)
      delete onceler[keycode]
    })
  },
  methods: {
    addKey(currentKeys, keycode) {
      if (currentKeys.indexOf(keycode) === -1) {
        currentKeys.push(keycode)
      }

      return 1
    },

    removeKey(currentKeys, keycode) {
      if (currentKeys.indexOf(keycode) !== -1) {
        currentKeys.splice(currentKeys.indexOf(keycode), 1)
      }
    },

    run(currentKeys) {
      keydownInterval = setInterval(() => {
        if (isKeyActive(currentKeys, UP)) {
          this.updateY(+1)
        } else if (isKeyActive(currentKeys, DOWN)) {
          this.updateY(-1)
        }

        if (isKeyActive(currentKeys, LEFT)) {
          this.updateX(-1)
        } else if (isKeyActive(currentKeys, RIGHT)) {
          this.updateX(+1)
        }

        if (isKeyActive(currentKeys, SPACE)) {
          this.removeKey(currentKeys, SPACE)
          this.actionA()
        }
      }, 50)
    },

    stop() {
      clearInterval(keydownInterval)
    }
  }
}
</script>

<style>
@import "style.scss"
</style>
