import { useEffect, useState } from "react"

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({
    x: null,
    y: null,
  })

  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({
        x: ev.clientX,
        y: ev.clientY,
      })
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])

  return mousePosition
}
