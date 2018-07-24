export default class Post {
  id: number
  userId: number
  title: string
  body: string
  time: number

  constructor (data: any = {}) {
    Object.assign(this as Post, data)
    this.time = Date.now()
  }

  render () {
    console.log('[ post ] => ', this)
  }

  toJSON () {
    return this
  }
}
