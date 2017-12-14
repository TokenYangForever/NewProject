const PageView = require('../../pageView')
const util = require('../../util')
const Lizard = require('../../lizard')
const Ajax = require('../../ajax')

let vueConfig = {
  methods: {
    getAddress () {
      Lizard
        .startPosition()
        .then(() => {
          this.curCity = Lizard.state.address
        })
        .catch(() => {
          this.curCity = null
        })
    },
    chooseAction ({data: {item: {code, name}}}) {
      Lizard.state.cityInfo = {
        id: code,
        name
      }
      if (this.selectCity) {
        this.selectCity()
      } else {
        Lizard.goBack()
      }
    },
    currentCityAction () {
      let { cityId, cityName } = this.curCity
      if (!cityId) {
        Lizard.hint(`${cityName}暂不支持保养`)
      } else {
        this.chooseAction({data: {item: {code: cityId, name: cityName}}})
      }
    },
    scrollAction ({data: {value}}) {
      Lizard.hint(value)
      if (this.toView == value) {
        Lizard.currentPage.setData({toView: value})
      } else {
        this.toView = value
      }
    }
  }
}
class View extends PageView {
  onCreate () {
  }

  * ajaxGen () {
    let getCitys = yield new Ajax({
      url: 'maintenance/getCitys',
      cache: 1
    }).request()
    let wHeight = '603px'
    wx.getSystemInfo({success: (res) => {
      wHeight = `${res.windowHeight}px`
    }})
    return [getCitys, wHeight]
  }

  vueLink ({all, hot}, wHeight) {
    // 按首字母分组
    let group = {}
    if (all instanceof Array) {
      all.forEach((item) => {
        let caps = item.capital
        if (!group[caps]) {
          group[caps] = []
        }
        group[caps].push(util.pick(item, ['code', 'name']))
      })
    }

    for (let i in hot) {
      hot[i] = util.pick(hot[i], ['code', 'name'])
    }
    let sh = Object.keys(group)
    let data = {
      allCity: Object.entries(group),
      hotCitys: hot,
      sh,
      curCity: Lizard.state.address || null,
      toView: '',
      windowHeight: wHeight
    }
    return {
      data
    }
  }

  onShow () {
    let vue = this.vue
    if (!vue.curCity) { vue.getAddress() }
  }
}

View.vueConfig = vueConfig
module.exports = View
