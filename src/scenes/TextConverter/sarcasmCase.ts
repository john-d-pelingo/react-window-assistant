import { lowerCase } from 'lower-case'
import { upperCase } from 'upper-case'

const isLetter = (letter: string) => upperCase(letter) !== lowerCase(letter)

const LowerCase = 0 as const
const UpperCase = 1 as const

type Cases = typeof LowerCase | typeof UpperCase

export const sarcasmCase = (
  text: string,
  firstLetter: Cases = LowerCase,
): string => {
  let textCase: Cases = firstLetter

  return text
    .split('')
    .map((letter) => {
      if (letter.trim().length === 0 || !isLetter(letter)) {
        return letter
      }

      if (textCase === LowerCase) {
        textCase = UpperCase

        return lowerCase(letter)
      }

      textCase = LowerCase
      return upperCase(letter)
    })
    .join('')
}
