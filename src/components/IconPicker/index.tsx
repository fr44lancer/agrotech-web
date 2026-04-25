'use client'
import React, { useState, useMemo } from 'react'
import { useField } from '@payloadcms/ui'
import { ALL_ICON_NAMES, getIconComponent } from './AllIcons'

type Variant = 'Outlined' | 'Filled' | 'TwoTone' | 'All'

type Props = {
  path: string
}

export function IconPickerField({ path }: Props) {
  const { value, setValue } = useField<string>({ path })
  const [search, setSearch] = useState('')
  const [variant, setVariant] = useState<Variant>('Outlined')

  const filtered = useMemo(() => {
    return ALL_ICON_NAMES.filter((name) => {
      const matchesVariant = variant === 'All' || name.endsWith(variant)
      const matchesSearch = name.toLowerCase().includes(search.toLowerCase())
      return matchesVariant && matchesSearch
    })
  }, [search, variant])

  const SelectedIcon = value ? getIconComponent(value) : null

  return (
    <div className="field-type" style={{ marginBottom: '16px' }}>
      <label className="field-label">Icon</label>

      {/* Current selection */}
      {value && SelectedIcon && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 12px',
            background: '#f0f9ff',
            border: '2px solid #0ea5e9',
            borderRadius: '8px',
            marginBottom: '10px',
          }}
        >
          <SelectedIcon style={{ fontSize: '24px', color: '#0ea5e9' }} />
          <span style={{ fontSize: '13px', color: '#0369a1', fontFamily: 'monospace' }}>
            {value}
          </span>
        </div>
      )}

      {/* Search + variant filters */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search icons…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: '140px',
            padding: '5px 10px',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            fontSize: '13px',
          }}
        />
        {(['Outlined', 'Filled', 'TwoTone', 'All'] as Variant[]).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setVariant(v)}
            style={{
              padding: '5px 10px',
              border: `1px solid ${variant === v ? '#0ea5e9' : '#cbd5e1'}`,
              borderRadius: '6px',
              background: variant === v ? '#0ea5e9' : 'transparent',
              color: variant === v ? '#fff' : '#64748b',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Icon grid */}
      <div
        style={{
          maxHeight: '280px',
          overflowY: 'auto',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '8px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))',
          gap: '4px',
        }}
      >
        {filtered.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#94a3b8', padding: '20px', fontSize: '13px' }}>
            No icons match
          </div>
        )}
        {filtered.map((name) => {
          const IconComponent = getIconComponent(name)
          const isSelected = value === name
          return (
            <button
              key={name}
              type="button"
              onClick={() => setValue(name)}
              title={name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '6px 4px',
                border: `2px solid ${isSelected ? '#0ea5e9' : 'transparent'}`,
                borderRadius: '6px',
                background: isSelected ? '#f0f9ff' : 'transparent',
                cursor: 'pointer',
                gap: '4px',
              }}
            >
              <IconComponent style={{ fontSize: '20px', color: isSelected ? '#0ea5e9' : '#475569' }} />
              <span
                style={{
                  fontSize: '9px',
                  color: isSelected ? '#0ea5e9' : '#94a3b8',
                  textAlign: 'center',
                  lineHeight: 1.2,
                  wordBreak: 'break-all',
                  maxWidth: '64px',
                }}
              >
                {name.replace(/(Outlined|Filled|TwoTone)$/, '')}
              </span>
            </button>
          )
        })}
      </div>

      <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
        {filtered.length} icons
      </div>
    </div>
  )
}
