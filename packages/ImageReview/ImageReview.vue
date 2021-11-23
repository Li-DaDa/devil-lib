<template>
  <div class="md-image-review" :class="[{ visible: visible }]" @click="visible = false">
    <div class="md-image-review_pic-container" :style="{ left: pic.left + 'px', top: pic.top + 'px' }" @click.stop>
      <img :src="pic.url" :width="pic.width" :height="pic.height" />
      <div
        class="md-image-review_drag-target"
        @mousewheel="mousewheelHandler"
        @drag="dragHandler"
        @dragstart="dragstartHandler"
        @dragend="dragendHandler"
        draggable="true"
      ></div>
    </div>
    <div class="md-image-review_controller" @click.stop>
      <div class="md-image-review_controller-reflush" @click="reflushHandler">
        <i class="icon iconfont icon-shuaxin"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ImageReview',
  setup() {
    const visible = ref(false)
    // 图片默认尺寸最大范围
    const defaultSize = {
      width: window.innerWidth * 0.5,
      height: window.innerHeight * 0.5,
      maxWidth: 2 * window.innerWidth,
      maxHeight: 2 * window.innerHeight,
      minWidth: 100,
      minHeight: 100
    }
    // 缩放系数
    const scaleParams = {
      // 缩放中心点位置
      center: {
        x: defaultSize.width,
        y: defaultSize.height
      },
      // 一次缩放尺寸差值
      speed: {
        x: 0,
        y: 0
      },
      type: 1 // 1：放大，-1：缩小
    }

    // 重置各种参数
    const resetParams = (picSrc: string) => {
      scaleParams.center.x = defaultSize.width
      scaleParams.center.y = defaultSize.height
      pic.value.width = 0
      pic.value.height = 0
      pic.value.top = 0
      pic.value.left = 0
      pic.value.url = picSrc
    }

    const pic = ref({
      url: '',
      width: 0,
      height: 0,
      top: 0,
      left: 0
    })

    // 计算图片默认尺寸
    const computedDefaultSize = () => {
      const image = new Image()
      image.onload = function () {
        let width = 0
        let height = 0
        if (image.width / image.height > defaultSize.width / defaultSize.height) {
          width = defaultSize.width
          height = (defaultSize.width * image.height) / image.width
        } else {
          height = defaultSize.height
          width = (defaultSize.height * image.width) / image.height
        }
        const position = setPicPositionCenter(width, height)
        // 设置图片初始状态
        pic.value.width = width
        pic.value.height = height
        pic.value.left = position.left
        pic.value.top = position.top
        // 设置缩放速度
        scaleParams.speed.x = defaultSize.width / 10
        scaleParams.speed.y = (scaleParams.speed.x / width) * height
        console.log('anbb')
      }
      image.src = pic.value.url
    }

    // 鼠标在图片区域滚动滚轮
    const mousewheelHandler = (e: WheelEvent) => {
      // 向上滚动，放大，向下滚动，缩小
      e = e || window.event
      scaleParams.center.x = e.x
      scaleParams.center.y = e.y
      if (e.deltaY) {
        scaleParams.type = e.deltaY > 0 ? -1 : 1
      } else if (e.detail) {
        scaleParams.type = e.detail < 0 ? 1 : -1
      } else {
        throw new Error('无法获取滚动方向')
      }
      // 计算位置和大小
      requestAnimationFrame(() => {
        computedSize()
      })
    }

    // 计算实时尺寸
    const computedSize = () => {
      // 获取图片当前相对窗口位置
      const res = {
        width: pic.value.width + scaleParams.type * scaleParams.speed.x,
        height: pic.value.height + scaleParams.type * scaleParams.speed.y,
        left: pic.value.left,
        top: pic.value.top
      }
      // 计算偏移
      const offset = {
        left: ((scaleParams.center.x - pic.value.left) / pic.value.width) * scaleParams.speed.x,
        top: ((scaleParams.center.y - pic.value.top) / pic.value.height) * scaleParams.speed.y
      }
      res.left = res.left - scaleParams.type * offset.left
      res.top = res.top - scaleParams.type * offset.top
      if (
        res.width > defaultSize.maxWidth ||
        res.width < defaultSize.minWidth ||
        res.height > defaultSize.maxHeight ||
        res.height < defaultSize.minHeight
      ) {
        // 如果缩小到最小，则居中
        if (res.height < defaultSize.minHeight || res.width < defaultSize.minWidth) {
          const position = setPicPositionCenter(pic.value.width, pic.value.height)
          pic.value.top = position.top
          pic.value.left = position.left
        }
        return
      }
      // 赋值
      pic.value.top = res.top
      pic.value.left = res.left
      pic.value.width = res.width
      pic.value.height = res.height
    }

    // 根据当前尺寸居中
    const setPicPositionCenter = (width: number, height: number) => {
      return {
        left: defaultSize.width - width / 2,
        top: defaultSize.height - height / 2
      }
    }

    // 拖拽初始位置
    const dragParams = {
      left: 0,
      top: 0,
      startX: 0,
      startY: 0
    }
    // 鼠标拖拽
    const dragHandler = (e: DragEvent) => {
      // 计算新位置
      const offset = {
        left: e.clientX - dragParams.startX,
        top: e.clientY - dragParams.startY
      }
      if (e.clientX) {
        pic.value.left = dragParams.left + offset.left
      }
      if (e.clientY) {
        pic.value.top = dragParams.top + offset.top
      }
    }

    // 开始拖拽，记录初始数据
    const dragstartHandler = (e: DragEvent) => {
      dragParams.top = pic.value.top
      dragParams.left = pic.value.left
      dragParams.startX = e.clientX
      dragParams.startY = e.clientY
    }

    // 结束拖拽
    const dragendHandler = () => {
      //
    }

    // 外部调用，打开预览
    const review = (pics: string | string[]) => {
      if (typeof pics === 'string') {
        pics = [pics]
      }
      visible.value = true
      // 重置参数
      resetParams(pics[0])
      // 计算默认尺寸
      computedDefaultSize()
    }

    // 刷新按钮
    const reflushHandler = () => {
      computedDefaultSize()
    }

    return {
      pic,
      visible,
      mousewheelHandler,
      dragHandler,
      dragstartHandler,
      dragendHandler,
      review,
      reflushHandler
    }
  }
})
</script>

<style lang="scss">
.md-image-review {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
  display: none;
  &.visible {
    display: block;
  }
}
.md-image-review_pic-container {
  position: absolute;
  img {
    display: block;
  }
}
.md-image-review_drag-target {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  user-select: none;
}
.md-image-review_controller {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  align-items: center;
  z-index: 999999;
}
.md-image-review_controller-reflush {
  i {
    font-size: inherit;
  }
  font-size: 60px;
  color: #fff;
  opacity: 0.6;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    opacity: 0.8;
  }
}
</style>
