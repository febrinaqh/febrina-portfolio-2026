'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, type Domain } from '@/data'

const TABS: { label: string; value: Domain | 'all' }[] = [
  { label: 'all',        value: 'all' },
  { label: 'fullstack',  value: 'fullstack' },
  { label: 'ai / ml',   value: 'ai-ml' },
  { label: 'ui / ux',   value: 'ui-ux' },
  { label: 'enterprise', value: 'enterprise' },
]

const BADGE_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  star: { bg: 'rgba(245,158,11,0.1)',   color: '#fcd34d', border: 'rgba(245,158,11,0.25)' },
  win:  { bg: 'rgba(45,212,191,0.1)',   color: '#5eead4', border: 'rgba(45,212,191,0.25)' },
  ml:   { bg: 'rgba(124,92,252,0.1)',   color: '#a78bfa', border: 'rgba(124,92,252,0.25)' },
  expo: { bg: 'rgba(96,165,250,0.1)',   color: '#93c5fd', border: 'rgba(96,165,250,0.25)' },
  java: { bg: 'rgba(251,146,60,0.1)',   color: '#fb923c', border: 'rgba(251,146,60,0.25)' },
}

const TOP_BORDER: Record<string, string> = {
  fullstack:  'linear-gradient(90deg,#7c5cfc,#2dd4bf)',
  'ai-ml':    'linear-gradient(90deg,#2dd4bf,#7c5cfc)',
  'ui-ux':    'linear-gradient(90deg,#f472b6,#a78bfa)',
  enterprise: 'linear-gradient(90deg,#fb923c,#f59e0b)',
}

function getDominantDomain(domains: Domain[]): string {
  if (domains.includes('ai-ml')) return 'ai-ml'
  if (domains.includes('fullstack')) return 'fullstack'
  return domains[0]
}

// ── Featured card (DIWD) ──────────────────────────────────────────────────────
function FeaturedCard({ project }: { project: typeof projects[0] }) {
  const badge = project.badge!
  const bs    = BADGE_STYLES[badge.color]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      style={{
        background: 'var(--surface)',
        border: '0.5px solid var(--border2)',
        borderRadius: '14px',
        overflow: 'hidden',
        marginBottom: '14px',
        position: 'relative',
      }}
    >
      {/* Top gradient bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: 'var(--grad)',
      }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 220px',
        gap: 0,
      }}>
        {/* Body */}
        <div style={{ padding: '24px 24px 20px' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            fontSize: '10px', padding: '3px 10px', borderRadius: '20px',
            background: bs.bg, color: bs.color,
            border: `0.5px solid ${bs.border}`,
            marginBottom: '12px',
          }}>
            {badge.emoji} {badge.label}
          </div>

          <h3 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 700,
            fontSize: '17px', color: 'var(--text)',
            letterSpacing: '-0.01em', marginBottom: '6px',
          }}>
            {project.title}
          </h3>

          <p style={{
            fontSize: '12px', color: 'var(--text2)',
            lineHeight: 1.75, marginBottom: '16px',
          }}>
            {project.description}
          </p>

          {/* Metrics */}
          {project.metrics && (
            <div style={{ display: 'flex', gap: '24px', marginBottom: '16px' }}>
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <div style={{
                    fontFamily: 'Syne, sans-serif', fontWeight: 700,
                    fontSize: '16px',
                    background: 'var(--grad)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    {m.value}
                  </div>
                  <div style={{
                    fontSize: '9px', color: 'var(--text3)',
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                  }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stack */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '16px' }}>
            {project.stack.map((s) => (
              <span key={s} className={project.stackHighlight?.includes(s) ? 'pill pill-hi' : 'pill'}>
                {s}
              </span>
            ))}
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{
              padding: '8px 20px', borderRadius: '8px',
              background: 'var(--grad)', color: '#fff', border: 'none',
              fontSize: '11px', letterSpacing: '0.04em', cursor: 'pointer',
              fontFamily: 'DM Mono, monospace',
            }}>
              view case study →
            </button>
            <button style={{
              padding: '8px 18px', borderRadius: '8px',
              background: 'transparent', border: '0.5px solid var(--border2)',
              color: 'var(--text2)', fontSize: '11px',
              letterSpacing: '0.04em', cursor: 'pointer',
              fontFamily: 'DM Mono, monospace',
            }}>
              github ↗
            </button>
          </div>
        </div>

        {/* Thumbnail placeholder */}
        <div style={{
          background: 'var(--bg3)',
          borderLeft: '0.5px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: '10px', padding: '20px',
        }}>
          <div style={{ fontSize: '10px', color: 'var(--text3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            dashboard preview
          </div>
          {/* Mock UI bars */}
          <div style={{
            width: '100%', background: 'var(--bg2)',
            borderRadius: '8px', border: '0.5px solid var(--border)', padding: '12px',
            display: 'flex', flexDirection: 'column', gap: '6px',
          }}>
            {[80, 60, 40, 75, 55].map((w, i) => (
              <div key={i} style={{
                height: '5px', borderRadius: '3px', width: `${w}%`,
                background: i % 2 === 0
                  ? 'linear-gradient(90deg, var(--purple), var(--teal))'
                  : 'var(--surface2)',
              }} />
            ))}
            <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
              <div style={{ flex: 1, height: '40px', background: 'var(--surface2)', borderRadius: '6px' }} />
              <div style={{ flex: 1, height: '40px', background: 'var(--surface2)', borderRadius: '6px' }} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Regular project card ──────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const badge = project.badge
  const bs    = badge ? BADGE_STYLES[badge.color] : null
  const dom   = getDominantDomain(project.domains)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--surface)',
        border: `0.5px solid ${hovered ? 'var(--border2)' : 'var(--border)'}`,
        borderRadius: '12px',
        padding: '18px',
        position: 'relative', overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.2s, transform 0.2s',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      {/* Top color bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1.5px',
        background: TOP_BORDER[dom] || 'var(--grad)',
      }} />

      {/* Badge */}
      {badge && bs && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '4px',
          fontSize: '10px', padding: '2px 9px', borderRadius: '20px',
          background: bs.bg, color: bs.color,
          border: `0.5px solid ${bs.border}`,
          marginBottom: '10px',
        }}>
          {badge.emoji} {badge.label}
        </div>
      )}

      <h3 style={{
        fontFamily: 'Syne, sans-serif', fontWeight: 700,
        fontSize: '14px', color: 'var(--text)',
        marginBottom: '6px',
      }}>
        {project.title}
      </h3>

      <p style={{
        fontSize: '11px', color: 'var(--text2)',
        lineHeight: 1.65, marginBottom: '12px',
      }}>
        {project.description}
      </p>

      {/* Metrics if any */}
      {project.metrics && (
        <div style={{ display: 'flex', gap: '16px', marginBottom: '10px' }}>
          {project.metrics.map((m) => (
            <div key={m.label}>
              <div style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px',
                background: 'var(--grad)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                {m.value}
              </div>
              <div style={{ fontSize: '9px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stack pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
        {project.stack.slice(0, 5).map((s) => (
          <span key={s} className={project.stackHighlight?.includes(s) ? 'pill pill-hi' : 'pill'}>
            {s}
          </span>
        ))}
        {project.stack.length > 5 && (
          <span className="pill">+{project.stack.length - 5}</span>
        )}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {project.domains.map((d) => (
            <span key={d} className="pill">{d}</span>
          ))}
        </div>
        <span style={{
          color: hovered ? 'var(--purple2)' : 'var(--text3)',
          fontSize: '14px', transition: 'color 0.2s',
        }}>→</span>
      </div>
    </motion.div>
  )
}

// ── Main Projects section ─────────────────────────────────────────────────────
export default function Projects() {
  const [active, setActive] = useState<Domain | 'all'>('all')

  const filtered = active === 'all'
    ? projects
    : projects.filter((p) => p.domains.includes(active as Domain))

  const featured   = filtered.find((p) => p.featured)
  const nonFeatured = filtered.filter((p) => !p.featured)

  return (
    <section id="projects" style={{ padding: '80px 40px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-eyebrow">projects</div>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(24px, 4vw, 32px)', color: 'var(--text)',
            letterSpacing: '-0.02em', marginBottom: '6px',
          }}>
            Things I&apos;ve Built
          </h2>
          <p style={{
            fontSize: '13px', color: 'var(--text2)',
            marginBottom: '28px', lineHeight: 1.7,
          }}>
            From disaster early-warning systems to award-winning web apps — real problems, real solutions.
          </p>
        </motion.div>

        {/* Domain tabs */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActive(tab.value)}
              style={{
                padding: '6px 16px', borderRadius: '20px',
                fontSize: '11px', letterSpacing: '0.04em',
                cursor: 'pointer', fontFamily: 'DM Mono, monospace',
                border: 'none', transition: 'all 0.2s',
                background: active === tab.value
                  ? 'var(--grad)'
                  : 'var(--surface)',
                color: active === tab.value ? '#fff' : 'var(--text3)',
                outline: active !== tab.value ? '0.5px solid var(--border2)' : 'none',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project list */}
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            {/* Featured */}
            {featured && <FeaturedCard project={featured} />}

            {/* Grid */}
            {nonFeatured.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '12px',
              }}>
                {nonFeatured.map((p, i) => (
                  <ProjectCard key={p.id} project={p} index={i} />
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <div style={{
                textAlign: 'center', padding: '60px',
                color: 'var(--text3)', fontSize: '13px',
              }}>
                Belum ada project di kategori ini 🐱
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
