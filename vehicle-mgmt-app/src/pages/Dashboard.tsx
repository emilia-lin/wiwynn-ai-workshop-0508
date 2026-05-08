import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Car, CheckCircle, Activity, Wrench } from 'lucide-react'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useVehicles } from '@/hooks/useVehicles'
import { MagicCard } from '@/components/magicui/magic-card'
import { NumberTicker } from '@/components/magicui/number-ticker'
import { BlurFade } from '@/components/magicui/blur-fade'
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text'

const kpiConfig = [
  {
    label: '車輛總數',
    key: 'total' as const,
    icon: Car,
    gradient: 'from-slate-500 to-slate-600',
    glow: '#64748b30',
    textColor: 'text-slate-700',
    bg: 'bg-slate-50',
  },
  {
    label: '可用車輛',
    key: 'available' as const,
    icon: CheckCircle,
    gradient: 'from-emerald-500 to-green-600',
    glow: '#10b98130',
    textColor: 'text-emerald-700',
    bg: 'bg-emerald-50',
  },
  {
    label: '使用中',
    key: 'inUse' as const,
    icon: Activity,
    gradient: 'from-blue-500 to-indigo-600',
    glow: '#3b82f630',
    textColor: 'text-blue-700',
    bg: 'bg-blue-50',
  },
  {
    label: '維修中',
    key: 'maintenance' as const,
    icon: Wrench,
    gradient: 'from-amber-500 to-orange-500',
    glow: '#f59e0b30',
    textColor: 'text-amber-700',
    bg: 'bg-amber-50',
  },
]

export default function Dashboard() {
  const { data: vehicles = [], isLoading } = useVehicles()

  const stats = {
    total: vehicles.length,
    available: vehicles.filter(v => v.status === 'available').length,
    inUse: vehicles.filter(v => v.status === 'in-use').length,
    maintenance: vehicles.filter(v => v.status === 'maintenance').length,
  }

  const chartData = [
    { name: '可用', count: stats.available, fill: '#10b981' },
    { name: '使用中', count: stats.inUse, fill: '#3b82f6' },
    { name: '維修中', count: stats.maintenance, fill: '#f59e0b' },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0s]" />
          <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.15s]" />
          <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.3s]" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <BlurFade delay={0.05}>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            <AnimatedGradientText>Fleet Dashboard</AnimatedGradientText>
          </h2>
          <p className="text-sm text-slate-500 mt-1">即時掌握車隊運營狀態</p>
        </div>
      </BlurFade>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiConfig.map(({ label, key, icon: Icon, gradient, glow, textColor, bg }, i) => (
          <BlurFade key={label} delay={0.1 + i * 0.07}>
            <MagicCard gradientColor={glow} className="h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-3 pt-4 px-5">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm`}>
                  <Icon size={15} className="text-white" />
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <div className={`text-4xl font-bold ${textColor} tabular-nums`}>
                  <NumberTicker value={stats[key]} />
                </div>
                <div className={`mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${bg} text-xs font-medium ${textColor}`}>
                  <span>輛</span>
                </div>
              </CardContent>
            </MagicCard>
          </BlurFade>
        ))}
      </div>

      {/* Chart */}
      <BlurFade delay={0.4}>
        <MagicCard gradientColor="#6366f115" className="overflow-hidden">
          <CardHeader className="px-6 pt-6 pb-2">
            <CardTitle className="text-base font-semibold text-slate-800">車輛狀態分布</CardTitle>
            <p className="text-xs text-slate-400 mt-0.5">Vehicle Status Distribution</p>
          </CardHeader>
          <CardContent className="px-4 pb-6">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    fontSize: '12px',
                  }}
                  formatter={(value) => [value, '車輛數']}
                  labelFormatter={label => `狀態：${label}`}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={64}>
                  {chartData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </MagicCard>
      </BlurFade>
    </div>
  )
}
