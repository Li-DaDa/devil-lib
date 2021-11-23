<template>
  <div class="dv-demo_home">
    <div class="dv-demo_menu-item" v-for="item in items" :key="item.component" @click="clickHandler(item)">
      <span>{{ item.name }}</span>
      <span>{{ item.component }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

interface ItemType {
  name: string
  component: string
}

export default defineComponent({
  name: 'Home',
  setup() {
    const items: ItemType[] = [
      { name: '虚拟列表', component: 'VirtualList' },
      { name: '图片查看', component: 'ImageReview' }
    ]
    const router = useRouter()

    const clickHandler = (item: ItemType) => {
      router.push({
        name: item.component
      })
    }

    return {
      items,
      clickHandler
    }
  }
})
</script>

<style lang="scss">
.dv-demo_home {
  width: 500px;
  margin: 50px auto;
}
.dv-demo_menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
}
</style>
