class ProgressBlock {
  constructor(container) {
    this.circle = container.querySelector('.progress__circle')
    this.input = container.querySelector('[data-role="progress__input"]')
    this.progressCircle = container.querySelector('.progress-circle')
    this.hideToggle = container.querySelector(
      '[data-role="progress-tongle__hide"]'
    )
    this.rotateToggle = container.querySelector(
      '[data-role="progeress-toggle__animate"]'
    )
    this.round = 2 * Math.PI * 45
    this.animation = null
    this.circle.style.strokeDasharray = this.round
    this.circle.style.strokeDashoffset = this.round
    this.progressCircle.style.display = this.hideToggle.checked
      ? 'none'
      : 'block'
    this.input.addEventListener('input', (e) => this.onInput(e))
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.animate(parseInt(this.input.value, 10) || 0)
    })

    this.hideToggle.addEventListener('change', () => {
      this.progressCircle.style.display = this.hideToggle.checked
        ? 'none'
        : 'block'
    })

    if (this.rotateToggle) {
      this.rotateToggle.addEventListener('change', () => {
        this.toggleRotation(this.rotateToggle.checked)
      })

      this.toggleRotation(this.rotateToggle.checked)
    }
  }

  onInput(e) {
    let clean = e.target.value.replace(/[^0-9]/g, '')
    let num = parseInt(clean, 10)
    if (!isNaN(num)) {
      num = Math.max(0, Math.min(100, num))
      e.target.value = num
    } else {
      e.target.value = ''
    }
  }

  animate(targetValue) {
    let current = 0

    if (this.animation) {
      clearInterval(this.animation)
    }

    this.animation = setInterval(() => {
      const offset = this.round - (current / 100) * this.round
      this.circle.style.strokeDashoffset = offset
      if (current >= targetValue) {
        clearInterval(this.animation)
        this.animation = null
        this.input.value = targetValue
      }
      current++
    }, 30)
  }

  toggleRotation(shouldRotate) {
    if (shouldRotate) {
      this.progressCircle.style.animation = 'rotate 2s linear infinite'
    } else {
      this.progressCircle.style.animation = ''
    }
  }

  setValue(value) {
    let num = parseInt(value)
    num = num > 100 ? 100 : num
    num = num < 0 ? 0 : num
    this.input.value = num
    this.animate(num)
  }

  getValue() {
    return this.input.value
  }

  setHidden(isHidden) {
    this.hideToggle.checked = isHidden
    this.progressCircle.style.display = isHidden ? 'none' : 'block'
  }

  getHidden() {
    return this.hideToggle.checked
  }

  setRotation(isRotating) {
    this.rotateToggle.checked = isRotating
    this.toggleRotation(isRotating)
  }

  getRotation() {
    return this.rotateToggle.checked
  }
}

document.querySelectorAll('.progress-container').forEach((elem) => {
  window.progressBlock = new ProgressBlock(elem)
})
