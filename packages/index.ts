import { App } from 'vue'
import VirtualList from './VirtualList'
export { review as imageReview } from './ImageReview'

// 所有组件列表
const components = [VirtualList]

const install = (app: App): void => {
  // 遍历注册所有组件
  components.map((component) => app.component(component.name, component))
}

export { VirtualList }

export default {
  install
}
