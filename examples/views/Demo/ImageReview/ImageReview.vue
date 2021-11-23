<template>
  <div class="dv-demo_image-review">
    <img :src="picUrl" />
    <div class="dv-demo_image-review_btn" @click="viewHandler">查看大图</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { imageReview } from '../../../../packages'

export default defineComponent({
  name: 'ImageReviewDemo',
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const picUrl = ref(require('../../../assets/images/1.png'))
    const viewHandler = () => {
      imageReview(picUrl.value)
    }
    return {
      viewHandler,
      picUrl
    }
  }
})
</script>

<style lang="scss">
.dv-demo_image-review {
  width: 300px;
  margin: 50px auto;
  img {
    width: 100%;
    display: block;
  }
}
.dv-demo_image-review_btn {
  width: 100px;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 6px 0;
  text-align: center;
  margin: 50px auto;
  font-size: 13px;
  cursor: pointer;
}
</style>
