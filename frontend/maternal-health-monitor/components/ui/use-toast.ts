"use client"

import * as React from "react"

type ToastProps = {
  id: string
  title?: string
  description?: string
  variant?: "default" | "success" | "destructive"
}

const ToastContext = React.createContext<{
  toasts: ToastProps[]
  toast: (props: Omit<ToastProps, "id">) => void
}>({
  toasts: [],
  toast: (_props: Omit<ToastProps, "id">) => {},
})

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const toast = (props: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).slice(2, 11)
    setToasts((current) => [...current, { id, ...props }])
    setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id))
    }, 3000) // auto dismiss after 3s
  }

  return React.createElement(
    ToastContext.Provider,
    { value: { toasts, toast } },
    children
  )
}

export function useToast() {
  return React.useContext(ToastContext)
}
