/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module'*.png' {
  const value: string
  export = value
}

declare module'*.jpg' {
  const value: string
  export = value
}

declare module'*.jpeg' {
  const value: string
  export = value
}
