import Grass from '@/assets/levels/gardens/grass.svg'
import Sky from '@/assets/levels/gardens/sky.svg'

export default {
  name: 'Gardens',
  foreground: {
    image: Grass,
    width: 5
  },
  background: {
    image: Sky,
    width: 1
  },
  items: [{
    type: 'villain',
    coordinates: [96, 0]
  }, {
    type: 'collectable',
    coordinates: [-25, 0],
  }, {
    type: 'collectable',
    coordinates: [25, 0],
  }, {
    type: 'booster',
    coordinates: [50, 0]
  }, {
    type: 'collectable',
    coordinates: [75, 0],
  }, {
    type: 'collectable',
    coordinates: [111, 0],
  }, {
    type: 'collectable',
    coordinates: [160, 0],
  }, {
    type: 'collectable',
    coordinates: [200, 0],
  }, {
    type: 'collectable',
    coordinates: [260, 0],
  }, {
    type: 'collectable',
    coordinates: [300, 0],
  }, {
    type: 'booster',
    coordinates: [350, 0],
  }, {
    type: 'collectable',
    coordinates: [340, 0],
  }, {
    type: 'collectable',
    coordinates: [400, 0],
  }, {
    type: 'collectable',
    coordinates: [430, 0],
  }, {
    type: 'collectable',
    coordinates: [445, 0],
  }, {
    type: 'booster',
    coordinates: [480, 0],
  }, {
    type: 'collectable',
    coordinates: [510, 0],
  }]
}
