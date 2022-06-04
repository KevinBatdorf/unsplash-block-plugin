import { ImagePosition, MaybeUndefinedImagePosition } from '../types'

export const areSimiliar = (a: ImagePosition, b: MaybeUndefinedImagePosition) =>
    String(Object.entries(a).sort()) === String(Object.entries(b).sort())
