// components/ui/card.tsx
import { FC, ReactNode } from "react"
import cn from "classnames"

interface CardProps {
  children: ReactNode
  className?: string
}

export const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div className={cn("bg-muted border border-gray-200 rounded-xl shadow-sm", className)}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export const CardHeader: FC<CardHeaderProps> = ({ children, className }) => {
  return <div className={cn("p-4 border-b border-gray-200", className)}>{children}</div>
}

interface CardTitleProps {
  children: ReactNode
  className?: string
}

export const CardTitle: FC<CardTitleProps> = ({ children, className }) => {
  return <h2 className={cn("text-lg font-semibold text-yellow-600", className)}>{children}</h2>
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

export const CardContent: FC<CardContentProps> = ({ children, className }) => {
  return <div className={cn("p-4", className)}>{children}</div>
}
