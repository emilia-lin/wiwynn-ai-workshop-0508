import { cn } from '@/lib/utils'

interface AnimatedGradientTextProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedGradientText({ children, className }: AnimatedGradientTextProps) {
  return (
    <span
      className={cn(
        'animate-gradient bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-[length:200%_auto] bg-clip-text text-transparent',
        className,
      )}
    >
      {children}
    </span>
  )
}
