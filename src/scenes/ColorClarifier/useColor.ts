import Color from 'color'
import { MutableRefObject, useEffect, useRef, useState } from 'react'

export const useColor = (colorText: string): MutableRefObject<Color | null> => {
  const color = useRef<Color | null>(null)
  const [, setIsColorValid] = useState<boolean>()

  useEffect(() => {
    try {
      color.current = new Color(colorText)
      setIsColorValid(true)
    } catch (error) {
      color.current = null
      setIsColorValid(false)
    }
  }, [colorText])

  return color
}
