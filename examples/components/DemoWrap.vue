<template>
  <div class="dv-demo_wrap">
    <div class="dv-demo_component">
      <slot name="view"></slot>
    </div>
    <div class="dv-demo_code">
      <slot name="code"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DemoWrap',
  setup() {
    return {}
  }
})
</script>

<style lang="scss">
.dv-demo_wrap {
  display: flex;
}
.dv-demo_component,
.dv-demo_code {
  flex: 1;
}
</style>
