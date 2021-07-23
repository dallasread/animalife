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

export default {
  props: ['updateX', 'updateY', 'actionA', 'initialized'],
  mounted () {
    const currentKeys = []
    const onceler = {}

    this.run(currentKeys)

    document.addEventListener('keydown', (event) => {
      this.isInitialized = this.isInitialized ? this.isInitialized : this.initialized() || true
      const keycode = event.which || event.keyCode || 0
      onceler[keycode] = onceler[keycode] ? onceler[keycode] : this.addKey(currentKeys, keycode) || 1
    })

    document.addEventListener('keyup', (event) => {
      const keycode = event.which || event.keyCode || 0
      this.removeKey(currentKeys, keycode)
      delete onceler[keycode]
    })
  },
  data() {
    return {
      isInitialized: false,
      keydownInterval: undefined
    }
  },
  methods: {
    addKey(currentKeys, keycode) {
      if (currentKeys.indexOf(keycode) === -1) {
        currentKeys.push(keycode)
      }
    },

    removeKey(currentKeys, keycode) {
      if (currentKeys.indexOf(keycode) !== -1) {
        currentKeys.splice(currentKeys.indexOf(keycode), 1)
      }
    },

    run(currentKeys) {
      this.keydownInterval = setInterval(() => {
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
      clearInterval(this.keydownInterval)
    }
  }
}
</script>

<style>
@import "style.scss"
</style>
