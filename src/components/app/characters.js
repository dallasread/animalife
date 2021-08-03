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

class Collectable {
  constructor(coordinates) {
    this.id = Math.random()
    this.coordinates = coordinates
  }
}

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

class RainbowBone extends Collectable {}
RainbowBone.plural = 'Rainbow Bones'
RainbowBone.singular = 'Rainbow Bone'
RainbowBone.image = RainbowBoneImage
RainbowBone.width = 5

class RainbowFish extends Collectable {}
RainbowFish.plural = 'Rainbow Fish'
RainbowFish.singular = 'Rainbow Fish'
RainbowFish.image = RainbowFishImage
RainbowFish.width = 5

class RainbowSeaweed extends Collectable {}
RainbowSeaweed.plural = 'Rainbow Seaweed'
RainbowSeaweed.singular = 'Rainbow Seaweed'
RainbowSeaweed.image = RainbowSeaweedImage
RainbowSeaweed.width = 3

const changeSpeed = function (speed) {
  this.speed += speed
}

export default [{
    name: 'Chihui',
    image: Chihuahua,
    width: 10,
    yOffset: -1,
    collectable: Bone,
    booster: RainbowBone,
    speed: 3,
    changeSpeed
  }, {
    name: 'Doggie',
    image: Doggie,
    width: 20,
    yOffset: -1,
    collectable: Bone,
    booster: RainbowBone,
    speed: 2,
    changeSpeed
  }, {
    name: 'Kitty',
    image: Kitty,
    width: 17,
    yOffset: -1,
    collectable: Fish,
    booster: RainbowFish,
    speed: 2,
    changeSpeed
  }, {
    name: 'Turtley',
    image: Turtley,
    width: 6,
    yOffset: 0,
    collectable: Seaweed,
    booster: RainbowSeaweed,
    speed: 1,
    changeSpeed
}]
