<template>
  <div class="dv-demo_virtual-list">
    <virtual-list :items="items">
      <template v-slot="{ item }">
        <div style="padding: 50px 0">{{ item.name }}</div>
      </template>
    </virtual-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'ViryualListDemo',
  setup() {
    const items = ref<any>([])

    onMounted(() => {
      const arr = []
      for (let i = 0; i < 10000; i++) {
        arr.push({
          name: 'name_' + i
        })
      }
      items.value = arr
    })

    return {
      items
    }
  }
})
</script>

<style lang="scss">
.dv-demo_virtual-list {
  height: 400px;
  width: 300px;
  margin: 50px auto;
}
</style>
