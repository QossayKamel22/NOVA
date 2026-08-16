import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from 'recharts'

const weekly = [
  { day: 'Mon', value: 62 }, { day: 'Tue', value: 71 }, { day: 'Wed', value: 58 },
  { day: 'Thu', value: 80 }, { day: 'Fri', value: 74 }, { day: 'Sat', value: 45 }, { day: 'Sun', value: 68 },
]

const priorityData = [
  { name: 'High', value: 6, color: '#EF4444' },
  { name: 'Medium', value: 9, color: '#F59E0B' },
  { name: 'Low', value: 5, color: '#22C55E' },
]

const focusData = [
  { name: 'Deep Work', value: 45, color: '#4F46FF' },
  { name: 'Meetings', value: 25, color: '#6366F1' },
  { name: 'Admin', value: 18, color: '#3B82F6' },
  { name: 'Breaks', value: 12, color: '#22C55E' },
]

const categoryData = [
  { category: 'Work', count: 14 }, { category: 'Design', count: 9 },
  { category: 'Study', count: 6 }, { category: 'Health', count: 4 }, { category: 'Personal', count: 7 },
]

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--navy)', color: '#fff', padding: '8px 12px', borderRadius: 10, fontSize: 12 }}>
      <div>{label}</div>
      <div style={{ fontWeight: 700 }}>{payload[0].value}{payload[0].unit || ''}</div>
    </div>
  )
}

export function WeeklyTrendChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={weekly} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
        <defs>
          <linearGradient id="novaArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4F46FF" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#4F46FF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(17,17,17,0.06)" vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} width={28} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="value" stroke="#4F46FF" strokeWidth={2.5} fill="url(#novaArea)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function PriorityBarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={priorityData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(17,17,17,0.06)" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} width={28} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
          {priorityData.map((d) => <Cell key={d.name} fill={d.color} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function FocusPieChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={focusData} dataKey="value" nameKey="name" innerRadius={48} outerRadius={72} paddingAngle={3}>
          {focusData.map((d) => <Cell key={d.name} fill={d.color} />)}
        </Pie>
        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function CategoryBarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={categoryData} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(17,17,17,0.06)" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="category" tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} width={64} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" radius={[0, 8, 8, 0]} fill="#6366F1" />
      </BarChart>
    </ResponsiveContainer>
  )
}
