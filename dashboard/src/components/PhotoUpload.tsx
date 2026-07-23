import { useRef, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

interface Props {
  hundId: string | null
  currentUrl: string | null
  onUpload: (url: string) => void
}

export function PhotoUpload({ hundId, currentUrl, onUpload }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = async (file: File) => {
    if (!hundId) return
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Nur JPEG, PNG oder WebP erlaubt.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Datei zu groß (max. 5 MB).')
      return
    }
    setError(null)
    setUploading(true)
    const ext = file.name.split('.').pop() ?? 'jpg'
    const path = `${hundId}/foto.${ext}`
    const { error: upErr } = await supabase.storage
      .from('hundefotos')
      .upload(path, file, { upsert: true })
    if (upErr) {
      setError(upErr.message)
      setUploading(false)
      return
    }
    const { data } = supabase.storage.from('hundefotos').getPublicUrl(path)
    onUpload(data.publicUrl)
    setUploading(false)
  }

  return (
    <div className="photo-upload">
      {currentUrl ? (
        <img src={currentUrl} alt="Hundefoto" className="photo-preview" />
      ) : (
        <div className="photo-preview">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--btn-text)', opacity: 0.5 }}>
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          disabled={!hundId || uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? 'Wird hochgeladen…' : 'Foto hochladen'}
        </button>
        {!hundId && (
          <div className="field-hint">Zuerst speichern, dann Foto hochladen.</div>
        )}
        {error && (
          <div className="field-hint" style={{ color: 'var(--color-cat-blush-text)' }}>
            {error}
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        style={{ display: 'none' }}
        onChange={e => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
          e.target.value = ''
        }}
      />
    </div>
  )
}
