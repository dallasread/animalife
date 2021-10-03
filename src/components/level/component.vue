<template>
  <div class="level">
    <a v-if="isInitialized" href="javascript:window.location.reload();" class="reset">
      &laquo;
    </a>
    <div v-else>
      <div class="logo" @click="controllerInitialized">
        <img src="@/assets/logo.svg">
      </div>
      <p class="name">Welcome to {{level.name}}!</p>
    </div>
    <ul class="hearts">
      <li v-for="index in character.hearts" :key="'heart-' + index">
        <img src="@/assets/interface/heart.svg">
      </li>
    </ul>
    <p class="collectable-count">{{pluralize(collectableCount, character.collectable.singular, character.collectable.plural)}}</p>
    <Camera :character="character">
      <div class="background" :style="backgroundStyle"></div>
      <div class="foreground" :style="foregroundStyle"></div>
      <Item v-for="item in items" :key="item.id" :item="item" />
    </Camera>
    <Controller :updateX="updateCharacterX" :updateY="updateCharacterY" :actionA="actionA" :initialized="controllerInitialized" />
  </div>
</template>

<script>
import Controller from '@/components/controller/component.vue'
import Item from '@/components/item/component.vue'
import Camera from '@/components/camera/component.vue'

const COLLISION_MAP = {
  character: {
    villain(character, villain) {
      this.takeDamage(character, villain)
    },
    collectable(character, collectable) {
      this.collect(collectable)
    },
    booster(character, booster) {
      this.boost(character, booster)
    }
  },
  villain: {
    character(villain, character) {
      this.takeDamage(character, villain)
    }
  },
}

const PIXEL_SIZE = 10
const REFRESH_RATE = 50

export default {
  props: ['character', 'level', 'reset'],
  components: {
    Camera,
    Controller,
    Item
  },
  data () {
    return {
      reverseCharacter: false,
      isInitialized: false,
      collectableCount: 0,
      items: []
    }
  },
  mounted() {
    this.addItems()
  },
  computed: {
    backgroundStyle () {
      let style = `background-image: url(${this.level.background.image});`

      style += `background-size: ${this.level.background.width * PIXEL_SIZE}px;`
      style += `background-position: bottom;`

      return style;
    },

    foregroundStyle() {
      let style = `background-image: url(${this.level.foreground.image});`

      style += `background-size: ${this.level.foreground.width * PIXEL_SIZE}px;`
      style += `background-position: top;`

      return style;
    }
  },
  methods: {
    updateCharacterX(deltaX) {
      this.updateX(this.character, deltaX)
    },

    updateCharacterY(deltaY) {
      this.updateY(this.character, deltaY)
    },

    updateX(item, deltaX) {
      const itemNextFrame = item.nextFrame(deltaX)
      const collidedItem = this.collide(itemNextFrame)

      item.move(deltaX)

      if (collidedItem) {
        const action = COLLISION_MAP[item.constructor.TYPE][collidedItem.constructor.TYPE]

        if (action) {
          action.call(this, item, collidedItem)
        }
      }
    },

    updateY() {
      // const newPosition = this.character.position[1] + deltaY

      // if (newPosition <= 0) {
      //   this.character.position[1] = newPosition
      // }
    },

    actionA() {
      this.character.setCoordinates(undefined, this.character.coordinates[1] + 3)

      setTimeout(() => this.character.setCoordinates(undefined, this.character.coordinates[1] + 3), REFRESH_RATE / 2)
      setTimeout(() => this.character.setCoordinates(undefined, this.character.coordinates[1] + 3), REFRESH_RATE)
      setTimeout(() => this.character.setCoordinates(undefined, this.character.coordinates[1] - 3), REFRESH_RATE * 5)
      setTimeout(() => this.character.setCoordinates(undefined, this.character.coordinates[1] - 3), REFRESH_RATE * 6)
      setTimeout(() => this.character.setCoordinates(undefined, this.character.coordinates[1] - 3), REFRESH_RATE * 7)
    },

    collect(collectable) {
      this.collectableCount += 1
      collectable.hide = true
    },

    boost(item, booster) {
      item.addBooster(booster)
    },

    takeDamage(item, villain) {
      if (item.takeDamage(villain) === 0) {
        alert('Game Over')
        this.reset()
      }
    },

    controllerInitialized() {
      this.isInitialized = true
    },

    pluralize (count, singular, plural) {
      return `${count} ${count === 1 ? singular : plural}`
    },

    addItems () {
      this.character.setCoordinates(5, 0)

      this.items.push(this.character)

      this.level.items.forEach((builder) => {
        const item = new this.character[builder.type](builder.coordinates)

        this.items.push(item)

        item.start(this)
      })
    },

    collide(nextFrame) {
      return this.findBoundary(this.items, nextFrame)
    },

    findBoundary(collection, nextFrame) {
      const nextFrameXStart = nextFrame.coordinates[0]
      const nextFrameXFinish = nextFrame.coordinates[0] + nextFrame.constructor.width

      return collection
        .filter((item) => item.id !== nextFrame.id)
        .filter((item) => !item.hide)
        .find((item) => {
          const itemXStart = item.coordinates[0]
          const itemXFinish = item.coordinates[0] + item.constructor.width
          const itemY = item.coordinates[1]

          return (
            (nextFrameXFinish >= itemXStart && nextFrameXFinish <= itemXFinish) ||
            (nextFrameXStart >= itemXStart && nextFrameXStart <= itemXFinish)
          ) && itemY === nextFrame.coordinates[1]
        })
    }
  }
}
</script>

<style lang="scss">
@import "style.scss"
</style>
