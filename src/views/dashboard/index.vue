<template>
  <div>
    <div class="admin_info">
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 7}" :xl="{span: 7}">
        <box-card />
      </el-col>
    </div>
  </div>
</template>

<script>
import BoxCard from './components/BoxCard'
export default {
  name: 'Dashboard',
  components: {
    BoxCard
  },
  data() {
    return {
      //  看板娘模型更换配置 后缀名字就行 如 live2d-widget-model-koharu 的 koharu
      modelName: 'shizuku'
    }
  },
  computed: {
  },
  created() {
    this.mouseScroll()
  },
  mounted() {
    this.initLive2d()
  },
  methods: {
    mouseScroll() {
      // 给页面绑定滑轮滚动事件
      if (document.addEventListener) {
        // firefox
        document.addEventListener('DOMMouseScroll', this.watchScroll, false)
      }
      // 滚动滑轮触发scrollFunc方法  //ie 谷歌
      window.onmousewheel = document.onmousewheel = this.watchScroll
    },
    initLive2d() {
      setTimeout(() => {
        window.L2Dwidget.init({
          pluginRootPath: 'live2dw/',
          pluginJsPath: 'lib/',
          pluginModelPath: `live2d-widget-model-${this.modelName}/assets/`,
          tagMode: false,
          debug: false,
          model: {
            jsonPath: `../live2dw/live2d-widget-model-${this.modelName}/assets/${this.modelName}.model.json`
          },
          display: { position: 'right', width: 240, height: 360 },
          mobile: { show: true },
          log: false
        })
      }, 1000)
    },
    watchScroll(e) {
      e = e || window.event
      if (e.wheelDelta) {
        if (e.wheelDelta > 0 && this.show === false) {
          // 当滑轮向上滚动
          this.show = true
        }
        if (e.wheelDelta < 0 && this.show === true) {
          // 当滑轮向下滚动
          this.show = false
        }
      } else if (e.detail) {
        if (e.detail < 0 && this.show === false) {
          // 当滑轮向上滚动
          this.show = true
        }
        if (e.detail > 0 && this.show === true) {
          // 当滑轮向下滚动
          this.show = false
        }
      }
    }
  }

}
</script>
<style lang="scss" scoped>
  .dashboard {
    &-container {
      background-color: #e3e3e3;
      min-height: 93vh;
    }
    &-padding {
      padding: 50px 60px 0px;
    }
  }
</style>
