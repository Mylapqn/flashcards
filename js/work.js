class Work {
  constructor(author, title, images = [], description) {
    this.author = author
    this.title = title
    this.images = images || null
    this.description = description || null
  }
}