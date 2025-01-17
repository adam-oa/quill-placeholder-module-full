import * as QuillTypes from 'quill'
import {EmbedBlot} from 'parchment'

import {Placeholder} from './placeholder'

export default function getPlaceholderBlot(Quill: QuillTypes.Quill): any {
  const Embed: typeof EmbedBlot = Quill.import('blots/embed')

  class PlaceholderBlot extends Embed {
    static blotName = 'placeholder'
    static tagName = 'span'
    static className: string
    static delimiters: Array<string>
    public domNode: HTMLElement = this.domNode

    static create(value: Placeholder) {
      let node: HTMLElement = <HTMLElement>super.create(value)

      if (value.required) node.setAttribute('data-required', 'true')
      node.setAttribute('data-id', value.id)
      node.setAttribute('data-label', value.label)
      node.setAttribute('spellcheck', 'false')

      const {delimiters} = PlaceholderBlot
      const label = typeof delimiters === 'string' ?
          `${delimiters}${value.label}${delimiters}` :
          `${delimiters[0]}${value.label}${delimiters[1] || delimiters[0]}`

      const labelNode = document.createTextNode(label)

      node.appendChild(labelNode)

      return node
    }

    static value(domNode: HTMLElement): DOMStringMap {
      return domNode.dataset
    }

    length(): number {
      return 1
    }

    deleteAt(index: number, length: number): void {
      if (!this.domNode.dataset.required)
        super.deleteAt(index, length)
    }
  }

  return PlaceholderBlot
}


