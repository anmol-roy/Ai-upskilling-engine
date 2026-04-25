import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import { Sparkles, User, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react'

const Register = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const { loading, handleRegister } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleRegister({ username, email, password })
    navigate("/")
  }

  if (loading) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)' }}>
        <div style={{ textAlign: 'center' }}>
          <Sparkles style={{ color: 'var(--accent)', width: 32, height: 32, margin: '0 auto 1rem', display: 'block' }} />
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Setting up your account...</p>
        </div>
      </main>
    )
  }

  return (
    <main style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-base)',
      padding: '1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Dot grid background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, opacity: 0.04,
        backgroundImage: 'radial-gradient(circle at 25px 25px, var(--accent) 2px, transparent 2px)',
        backgroundSize: '50px 50px',
        pointerEvents: 'none',
      }} />
      {/* Top gradient */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'linear-gradient(to bottom right, var(--accent-subtle) 0%, transparent 60%)',
      }} />

      {/* Card */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: '420px',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: '1.5rem',
        boxShadow: 'var(--shadow-xl)',
        overflow: 'hidden',
      }}>
        {/* Card top accent bar */}
        <div style={{ height: '4px', background: 'linear-gradient(90deg, #2563eb, #7c3aed)' }} />

        <div style={{ padding: '2.5rem' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            <Sparkles style={{ color: 'var(--accent)', width: 22, height: 22 }} />
            <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>AI Upskill</span>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem', lineHeight: 1.2 }}>
              Create your account
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Start your AI-powered career journey today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Username */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.02em' }}>
                USERNAME
              </label>
              <div style={{ position: 'relative' }}>
                <User style={{
                  position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)',
                  width: 16, height: 16, color: 'var(--text-muted)', pointerEvents: 'none',
                }} />
                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 2.5rem',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.75rem',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = 'var(--accent)'
                    e.target.style.boxShadow = '0 0 0 3px var(--accent-subtle)'
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'var(--border)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.02em' }}>
                EMAIL
              </label>
              <div style={{ position: 'relative' }}>
                <Mail style={{
                  position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)',
                  width: 16, height: 16, color: 'var(--text-muted)', pointerEvents: 'none',
                }} />
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 2.5rem',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.75rem',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = 'var(--accent)'
                    e.target.style.boxShadow = '0 0 0 3px var(--accent-subtle)'
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'var(--border)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.02em' }}>
                PASSWORD
              </label>
              <div style={{ position: 'relative' }}>
                <Lock style={{
                  position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)',
                  width: 16, height: 16, color: 'var(--text-muted)', pointerEvents: 'none',
                }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 2.5rem 0.75rem 2.5rem',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.75rem',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = 'var(--accent)'
                    e.target.style.boxShadow = '0 0 0 3px var(--accent-subtle)'
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'var(--border)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--text-muted)', padding: 0, display: 'flex',
                  }}
                >
                  {showPassword ? <EyeOff style={{ width: 16, height: 16 }} /> : <Eye style={{ width: 16, height: 16 }} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={{
                marginTop: '0.5rem',
                width: '100%',
                padding: '0.875rem',
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.95rem',
                border: 'none',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 15px rgba(37,99,235,0.3)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #1d4ed8, #1e40af)'
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,99,235,0.4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #2563eb, #1d4ed8)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(37,99,235,0.3)'
              }}
            >
              Create Account
              <ArrowRight style={{ width: 16, height: 16 }} />
            </button>
          </form>

          {/* Divider */}
          <div style={{ margin: '1.5rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          </div>

          {/* Login link */}
          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default Register