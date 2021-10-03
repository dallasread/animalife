import ChihuahuaImage from '@/assets/characters/chihuahua.svg'
import DoggieImage from '@/assets/characters/doggie.svg'
import KittyImage from '@/assets/characters/kitty.svg'
import TurtleyImage from '@/assets/characters/turtley.svg'
import BoneImage from '@/assets/collectables/bone.svg'
import SeaweedImage from '@/assets/collectables/seaweed.svg'
import FishImage from '@/assets/collectables/fish.svg'
import RainbowBoneImage from '@/assets/collectables/rainbow-bone.svg'
import RainbowSeaweedImage from '@/assets/collectables/rainbow-seaweed.svg'
import RainbowFishImage from '@/assets/collectables/rainbow-fish.svg'
import SnailImage from '@/assets/characters/snail.svg'

class Collectable {
  constructor(coordinates) {
    this.id = Math.random()
    this.coordinates = coordinates
  }
}

Collectable.TYPE = 'collectable'
Collectable.ACTION = 'collect'

class Bone extends Collectable {}
Bone.plural = 'Bones'
Bone.singular = 'Bone'
Bone.image = BoneImage
Bone.width = 5

class Fish extends Collectable {}
Fish.plural = 'Fish'
Fish.singular = 'Fish'
Fish.image = FishImage
Fish.width = 5

class Seaweed extends Collectable {}
Seaweed.plural = 'Seaweed'
Seaweed.singular = 'Seaweed'
Seaweed.image = SeaweedImage
Seaweed.width = 3

class Booster {
  constructor(coordinates) {
    this.id = Math.random()
    this.coordinates = coordinates
  }
}

Booster.TYPE = 'booster'
Booster.ACTION = 'boost'

class RainbowBone extends Booster {}
RainbowBone.plural = 'Rainbow Bones'
RainbowBone.singular = 'Rainbow Bone'
RainbowBone.image = RainbowBoneImage
RainbowBone.width = 5

class RainbowFish extends Booster {}
RainbowFish.plural = 'Rainbow Fish'
RainbowFish.singular = 'Rainbow Fish'
RainbowFish.image = RainbowFishImage
RainbowFish.width = 5

class RainbowSeaweed extends Booster {}
RainbowSeaweed.plural = 'Rainbow Seaweed'
RainbowSeaweed.singular = 'Rainbow Seaweed'
RainbowSeaweed.image = RainbowSeaweedImage
RainbowSeaweed.width = 3

class Character {
  constructor(coordinates) {
    this.id = Math.random()
    this.coordinates = coordinates
    this.reverse = false
  }

  walk(delta) {
    this.coordinates[0] += delta * this.speed

    if (delta > 0) {
      this.reverse = true
    } else {
      this.reverse = false
    }
  }

  changeSpeed(speed) {
    this.speed += speed
  }

  takeDamage() {
    if (this.takingDamage) {
      return
    }

    this.takingDamage = true
    this.hearts -= 1

    setTimeout(() => {
      this.takingDamage = false
    }, 2500)

    return this.hearts
  }

  addBooster(booster) {
    booster.hide = true

    this.changeSpeed(+1)
    this.hearts += 1

    setTimeout(() => {
      this.changeSpeed(-1)
    }, 5000)
  }

  setCoordinates(x, y) {
    if (typeof x !== 'undefined') {
      this.coordinates[0] = x
    }

    if (typeof y !== 'undefined') {
      this.coordinates[1] = y
    }
  }
}

Character.TYPE = 'character'
Character.ACTION = ''

class Chihui extends Character {
  constructor(coordinates) {
    super(coordinates)

    this.firstName = 'Chihui'
    this.collectable = Bone
    this.booster = RainbowBone
    this.villain = Snail
    this.speed = 3
    this.hearts = 3
  }
}

Chihui.image = ChihuahuaImage
Chihui.width = 10
Chihui.yOffset = -1

class Doggie extends Character {
  constructor(coordinates) {
    super(coordinates)

    this.firstName = 'Doggie'
    this.collectable = Bone
    this.booster = RainbowBone
    this.villain = Snail
    this.speed = 2
    this.hearts = 3
  }
}

Doggie.image = DoggieImage
Doggie.width = 20
Doggie.yOffset = -1

class Kitty extends Character {
  constructor(coordinates) {
    super(coordinates)

    this.firstName = 'Kitty'
    this.collectable = Fish
    this.booster = RainbowFish
    this.villain = Snail
    this.speed = 2
    this.hearts = 3
  }
}

Kitty.image = KittyImage
Kitty.width = 17
Kitty.yOffset = -1

class Turtley extends Character {
  constructor(coordinates) {
    super(coordinates)

    this.firstName = 'Turtley'
    this.collectable = Seaweed
    this.booster = RainbowSeaweed
    this.villain = Snail
    this.speed = 1
    this.hearts = 3
  }
}

Turtley.image = TurtleyImage
Turtley.width = 6
Turtley.yOffset = 0

class Villain extends Character {
  constructor(coordinates) {
    super(coordinates)
  }
}

Villain.TYPE = 'villain'
Villain.ACTION = 'takeDamage'

const REFRESH_RATE = 50

class Snail extends Villain {
  constructor(coordinates) {
    super(coordinates)
    this.speed = 0.75
    this.pace(30)
  }

  pace (framesInDirection) {
    const updateInterval = REFRESH_RATE / this.speed

    let direction = -1
    let delta = 1

    setInterval(() => { direction *= -1 }, (updateInterval * framesInDirection) - 1)
    setInterval(() => this.walk(delta * direction), updateInterval)
  }
}
Snail.image = SnailImage
Snail.width = 8

export default [
  new Chihui([0, 0]),
  new Doggie([0, 0]),
  new Kitty([0, 0]),
  new Turtley([0, 0])
]
