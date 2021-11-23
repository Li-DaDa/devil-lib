import { createApp } from 'vue'
import ImageReview from './ImageReview.vue'

// 引入组件时创建
// 创建根节点
const rootDom = document.createElement('div')
rootDom.className = 'md'
document.body.appendChild(rootDom)
const instance = createApp(ImageReview).mount(rootDom)

export const review = (urls: string | string[]) => {
  const root = instance.$root as any
  root.review(urls)
}
