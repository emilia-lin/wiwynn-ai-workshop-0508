import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Car, Lock, User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginApi } from '@/api/auth'
import { useAuth } from '@/context/AuthContext'
import { DotPattern } from '@/components/magicui/dot-pattern'
import { BorderBeam } from '@/components/magicui/border-beam'
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text'
import { ShimmerButton } from '@/components/magicui/shimmer-button'
import { BlurFade } from '@/components/magicui/blur-fade'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await loginApi(username, password)
      login(user)
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : '帳號或密碼錯誤')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Dot pattern background */}
      <DotPattern className="fill-white/10 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_70%)]" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />

      <BlurFade delay={0.1}>
        <div className="relative w-full max-w-md mx-4">
          {/* Glass card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8">
            <BorderBeam size={300} duration={12} colorFrom="#818cf8" colorTo="#c084fc" borderWidth={1} />

            {/* Logo */}
            <BlurFade delay={0.2} className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Car size={32} className="text-white" />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 blur-xl opacity-40" />
              </div>
              <h1 className="text-2xl font-bold mb-1">
                <AnimatedGradientText>車輛管理系統</AnimatedGradientText>
              </h1>
              <p className="text-sm text-slate-400">Fleet Management System</p>
            </BlurFade>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <BlurFade delay={0.3}>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-slate-300 text-sm">帳號</Label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="username"
                      placeholder="admin / user1"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      autoComplete="username"
                      className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-purple-400 focus:ring-purple-400/20"
                    />
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={0.4}>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-300 text-sm">密碼</Label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      autoComplete="current-password"
                      className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-purple-400 focus:ring-purple-400/20"
                    />
                  </div>
                </div>
              </BlurFade>

              {error && (
                <BlurFade delay={0}>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                </BlurFade>
              )}

              <BlurFade delay={0.5} className="pt-1">
                <ShimmerButton
                  type="submit"
                  disabled={loading}
                  className="w-full font-semibold text-sm py-3"
                  background="linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)"
                  borderRadius="12px"
                >
                  {loading ? '登入中...' : '登入系統'}
                </ShimmerButton>
              </BlurFade>
            </form>

            {/* Hint */}
            <BlurFade delay={0.6}>
              <p className="mt-6 text-center text-xs text-slate-500">
                測試帳號：admin / admin123　或　user1 / user123
              </p>
            </BlurFade>
          </div>
        </div>
      </BlurFade>
    </div>
  )
}
