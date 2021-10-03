import Chihuahua from '@/assets/characters/chihuahua.svg'
import Doggie from '@/assets/characters/doggie.svg'
import Kitty from '@/assets/characters/kitty.svg'
import Turtley from '@/assets/characters/turtley.svg'
import BoneImage from '@/assets/collectables/bone.svg'
import SeaweedImage from '@/assets/collectables/seaweed.svg'
import FishImage from '@/assets/collectables/fish.svg'
import RainbowBoneImage from '@/assets/collectables/rainbow-bone.svg'
import RainbowSeaweedImage from '@/assets/collectables/rainbow-seaweed.svg'
import RainbowFishImage from '@/assets/collectables/rainbow-fish.svg'
import SnailImage from '@/assets/characters/snail.svg'

class Villain {
  constructor(coordinates) {
    this.id = Math.random()
    this.coordinates = coordinates
    this.reverse = false
  }

  walk(delta) {
    this.coordinates[0] += delta

    if (delta > 0) {
      this.reverse = true
    } else {
      this.reverse = false
    }
  }
}

Villain.TYPE = 'villain'
Villain.ACTION = 'takeDamage'

class Snail extends Villain {
  constructor(coordinates) {
    super(coordinates)
    this.speed = 125
    this.startWalking(30)
  }

  startWalking (framesInDirection) {
    let direction = -1
    let delta = 1

    setInterval(() => { direction *= -1 }, this.speed * framesInDirection)
    setInterval(() => this.walk(delta * direction), this.speed)
  }
}
Snail.image = SnailImage
Snail.width = 8

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

const changeSpeed = function (speed) {
  this.speed += speed
}

const takeDamage = function () {
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

export default [{
    name: 'Chihui',
    image: Chihuahua,
    width: 10,
    yOffset: -1,
    collectable: Bone,
    booster: RainbowBone,
    villain: Snail,
    speed: 3,
    hearts: 3,
    changeSpeed,
    takeDamage
  }, {
    name: 'Doggie',
    image: Doggie,
    width: 20,
    yOffset: -1,
    collectable: Bone,
    booster: RainbowBone,
    villain: Snail,
    speed: 2,
    hearts: 3,
    changeSpeed,
    takeDamage
  }, {
    name: 'Kitty',
    image: Kitty,
    width: 17,
    yOffset: -1,
    collectable: Fish,
    booster: RainbowFish,
    villain: Snail,
    speed: 2,
    hearts: 3,
    changeSpeed,
    takeDamage
  }, {
    name: 'Turtley',
    image: Turtley,
    width: 6,
    yOffset: 0,
    collectable: Seaweed,
    booster: RainbowSeaweed,
    villain: Snail,
    speed: 1,
    hearts: 3,
    changeSpeed,
    takeDamage
}]
