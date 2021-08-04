import { useState, useCallback } from 'react'
import { useMessage } from './message.hook'

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const message = useMessage()
  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true)

      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
        })
        const data = await response.json()
        if (Array.isArray(data.errors)) {

          setLoading(false)
          data.errors.map(t=>message(t.msg))

          return data
        }
        if (!response.ok) {
          throw new Error(data.message || 'Что-то пошло не так')
        }
        setLoading(false)

        return data
      } catch (e) {
        setLoading(false)
        setError(e.message)
        throw e
      }
    },
    []
  )
  const clearError = useCallback(() => {
    setError(null)
  }, [setError])
  return { loading, request, error, clearError }
}
