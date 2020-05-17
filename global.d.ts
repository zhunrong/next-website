declare module '*.less' {
  const style: {
    [key: string]: string
  }
  export default style
}

declare module '*.scss' {
  const style: {
    [key: string]: string
  }
  export default style
}

declare module '*.jpg' {
  const path: string
  export default path
}