import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import AxiosInstance from "utils/AxiosInstance"

function useLogout() {
  const navigate = useNavigate()
  const refresh = localStorage.getItem('refreshToken') ? JSON.parse(localStorage.getItem('refreshToken') as string) : ""

  const handleLogout = useCallback(async () => {
    try {
      const response = await AxiosInstance.post('/auth/logout', { 'refresh': refresh })
      if (response.status === 204) {
        localStorage.clear()
        navigate('/')
        toast.success('You have logged out')
      }
    } catch (error) {
      localStorage.clear()
      navigate('/')
      toast.success('Session Timeout')
    }
  }, [navigate, refresh])

  return { handleLogout }
}

export default useLogout
