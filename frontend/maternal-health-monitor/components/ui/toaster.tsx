"use client"

import {
  Toast,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
  return (
    <ToastProvider>
      <ToasterContent />
      <ToastViewport />
    </ToastProvider>
  )
}

function ToasterContent() {
  const { toasts } = useToast()

  return (
    <>
      {toasts.map(function ({ id, title, description, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
          </Toast>
        )
      })}
    </>
  )
}
