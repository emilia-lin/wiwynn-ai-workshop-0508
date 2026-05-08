import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes } from 'react'

interface ShimmerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  className?: string
  children: React.ReactNode
}

export function ShimmerButton({
  shimmerColor = '#ffffff',
  shimmerSize = '0.05em',
  shimmerDuration = '3s',
  borderRadius = '100px',
  background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  className,
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      style={
        {
          '--shimmer-color': shimmerColor,
          '--shimmer-size': shimmerSize,
          '--shimmer-duration': shimmerDuration,
          '--border-radius': borderRadius,
          '--background': background,
        } as React.CSSProperties
      }
      className={cn(
        'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [border-radius:var(--border-radius)]',
        '[background:var(--background)]',
        'transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(120,80,220,0.4)] active:scale-[0.98]',
        'before:absolute before:inset-0 before:animate-shimmer-slide before:[background:linear-gradient(transparent,var(--shimmer-color)/10%,transparent)] before:[border-radius:var(--border-radius)]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
