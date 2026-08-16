import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('[NOVA] Unhandled UI error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: 12, background: '#F7F7F5', fontFamily: 'Inter, sans-serif', padding: 24, textAlign: 'center',
        }}>
          <h2 style={{ color: '#111', margin: 0 }}>Something went wrong.</h2>
          <p style={{ color: '#6B7280', margin: 0 }}>Please refresh the page. If the problem persists, try again shortly.</p>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: 12, padding: '10px 20px', borderRadius: 10, border: 'none', background: '#4F46FF', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
          >
            Reload NOVA
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
