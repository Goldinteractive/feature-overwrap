/**
 * Overwrap feature class.
 */
class Overwrap extends base.features.Feature {

  init() {
    this.update()
    this.addEventListener(window, 'resize', this.update.bind(this))
    this.addEventListener(this.node, 'scroll', this.update.bind(this))
  }

  update() {
    if (!this.updating) {
      base.utils.func.rAF(this._update.bind(this))
    }

    this.updating = true
    return this
  }

  _update() {
    this.trigger('update')

    this._updateProps()
    this._updateClasses()

    this.trigger('updated')

    // reset the updating property so we can
    // capture the next resize/scroll event
    this.updating = false
  }

  _updateProps() {
    this.width = this.node.clientWidth
    this.scrollWidth = this.node.scrollWidth
    this.scrollLeft = this.node.scrollLeft

    this.isTrailingLeft = this.scrollLeft > 0
    this.isTrailingRight = this.scrollWidth > this.width
                           && this.width + this.scrollLeft < this.scrollWidth
  }

  _updateClasses() {
    this.node.classList.toggle(this.options.trailingContentClassLeft, this.isTrailingLeft)
    this.node.classList.toggle(this.options.trailingContentClassRight, this.isTrailingRight)
  }

}

Overwrap.defaultOptions = {
  trailingContentClassLeft: '-trailing-left',
  trailingContentClassRight: '-trailing-right'
}

export default Overwrap
