import { useEffect, useState } from 'react'

export const useShowData = (text: string, date?: Date) => {
  const [textToShow, setTextToShow] = useState('')
  const [dateToShow, setDateToShow] = useState('')

  useEffect(() => {
    let t = ''
    let i = 0
    const interval = setInterval(() => {
      t += text[i]
      setTextToShow(t)
      i++
      if (i === text.length) {
        clearInterval(interval)
      }
    }, 100)

    setDateToShow(date?.toLocaleTimeString() ?? '')

    return () => {
      clearInterval(interval)
    }
  }, [text, date])

  return [textToShow, dateToShow]
}
