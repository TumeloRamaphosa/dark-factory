import { useState, useEffect } from 'react'
import './App.css'

interface TikTokMetrics {
  followers: number
  following: number
  likes: number
  views: number
  videos: number
  lastUpdated: string
}

function App() {
  const [metrics, setMetrics] = useState<TikTokMetrics>({
    followers: 0,
    following: 0,
    likes: 0,
    views: 0,
    videos: 0,
    lastUpdated: 'Loading...'
  })
  const [loading, setLoading] = useState(true)

  // Fetch data from n8n webhook (you'll configure this)
  useEffect(() => {
    fetch('/api/metrics')
      .then(res => res.json())
      .then(data => {
        setMetrics(data)
        setLoading(false)
      })
      .catch(() => {
        // Demo data for now
        setMetrics({
          followers: 12450,
          following: 892,
          likes: 89520,
          views: 1245300,
          videos: 156,
          lastUpdated: new Date().toLocaleString()
        })
        setLoading(false)
      })
  }, [])

  const statCards = [
    { label: 'Followers', value: metrics.followers, icon: '👥', color: 'from-purple-500 to-pink-500' },
    { label: 'Total Views', value: metrics.views, icon: '👁️', color: 'from-blue-500 to-cyan-500' },
    { label: 'Total Likes', value: metrics.likes, icon: '❤️', color: 'from-red-500 to-pink-500' },
    { label: 'Videos', value: metrics.videos, icon: '🎬', color: 'from-yellow-500 to-orange-500' },
  ]

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <header className="border-b border-gray-800 p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              TikTok Analytics
            </h1>
            <p className="text-gray-500 text-sm">@ramaphosatumelo</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-xs">LAST UPDATED</p>
            <p className="text-purple-400">{metrics.lastUpdated}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statCards.map((card, i) => (
            <div key={i} className={`bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{card.icon}</span>
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${card.color}`}></div>
              </div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{card.label}</p>
              <p className="text-2xl font-bold">
                {loading ? '...' : card.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* Chart Area - Placeholder */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-8">
          <h2 className="text-lg font-semibold mb-4">Growth Trend</h2>
          <div className="h-48 flex items-end justify-around gap-2">
            {[65, 45, 78, 52, 89, 70, 95].map((h, i) => (
              <div key={i} className="w-full bg-gradient-to-t from-purple-600 to-pink-500 rounded-t" style={{ height: `${h}%` }}></div>
            ))}
          </div>
          <div className="flex justify-around mt-2 text-gray-500 text-xs">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* Recent Videos */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-lg font-semibold mb-4">Recent Performance</h2>
          <div className="space-y-3">
            {[
              { title: 'Latest viral video', views: '125K', likes: '8.2K', comments: '432' },
              { title: 'Dance challenge', views: '89K', likes: '5.1K', comments: '287' },
              { title: 'Behind the scenes', views: '45K', likes: '2.3K', comments: '156' },
            ].map((video, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium">{video.title}</p>
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="text-gray-400">👁️ {video.views}</span>
                  <span className="text-gray-400">❤️ {video.likes}</span>
                  <span className="text-gray-400">💬 {video.comments}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Hex.tech style footer */}
      <footer className="border-t border-gray-800 p-4 text-center">
        <p className="text-gray-600 text-xs">POWERED BY • N8N • BLOTATO</p>
      </footer>
    </div>
  )
}

export default App