export default {
  copyProperties(source, target) {
    for (const key in target) {
      target[key] = source[key]
    }
  }
}
