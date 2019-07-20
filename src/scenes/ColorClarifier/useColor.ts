import Color from 'color'
import { useEffect, useRef, useState } from 'react'

export const useColor = (colorText: string) => {
  const color = useRef<Color | null>(null)
  const [, setIsColorValid] = useState()

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
