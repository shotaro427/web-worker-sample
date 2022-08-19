import { useCallback, useState } from 'react'
import useAnimationFrame from './useAnimationFrame'

const now = () => new Date().getTime()

function useTimer(onChange?: (time: number) => void) {
  const [offsetTime, setOffsetTime] = useState(0)
  const [time, setLocalTime] = useState(0)
  const [running, setRunning] = useState(false)
  const [startAt, setStartAt] = useState(0)

  const getTime = useCallback(() => {
    if (!running) {
      return offsetTime
    }
    return offsetTime + (now() - startAt)
  }, [running, offsetTime, startAt])

  const start = useCallback(() => {
    setStartAt(now())
    setRunning(true)
  }, [setRunning, setStartAt])

  const stop = useCallback(() => {
    setOffsetTime(getTime())
    setRunning(false)
  }, [setRunning, setOffsetTime, getTime])

  const reset = useCallback(() => {
    setRunning(false)
    setOffsetTime(0)
  }, [setRunning, setOffsetTime])

  const setTime = useCallback(
    (ms: number) => {
      if (running) {
        setStartAt(now())
      }
      setOffsetTime(ms)
    },
    [running, setStartAt, setOffsetTime],
  )

  useAnimationFrame(
    useCallback(() => {
      const currentTime = getTime()
      if (currentTime !== time) {
        setLocalTime(currentTime)
        onChange && onChange(currentTime)
      }
    }, [setLocalTime, getTime, onChange, time]),
  )

  return {
    time,
    running,
    start,
    stop,
    reset,
    setTime,
  }
}

export default useTimer
