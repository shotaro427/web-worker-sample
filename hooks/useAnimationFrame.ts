import { useCallback, useEffect, useRef } from 'react'

function useAnimationFrame(callback: () => void) {
  const reqIdRef = useRef<number>()
  const loop = useCallback(() => {
    reqIdRef.current = requestAnimationFrame(loop)
    callback()
  }, [callback])

  useEffect(() => {
    reqIdRef.current = requestAnimationFrame(loop)

    if (reqIdRef.current !== undefined) {
      return () => cancelAnimationFrame(reqIdRef.current as number)
    }
  }, [loop])
}

export default useAnimationFrame
