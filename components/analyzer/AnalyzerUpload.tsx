'use client';
import { useRef, useCallback } from 'react';
import { useApp } from '@/context/AppContext';

interface AnalyzerUploadProps {
  images: File[];
  setImages: (imgs: File[]) => void;
}

export default function AnalyzerUpload({ images, setImages }: AnalyzerUploadProps) {
  const { t } = useApp();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
    setImages([...images, ...newFiles].slice(0, 6));
  }, [images, setImages]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (idx: number) => {
    setImages(images.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <label className="cv-label">{t.dashboard.uploadTitle}</label>

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="relative rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors"
        style={{
          borderColor: 'var(--cv-border2)',
          minHeight: '120px',
          background: 'var(--cv-surface2)',
          padding: '24px',
        }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'var(--cv-accent-glow)', color: 'var(--cv-accent)' }}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
          </svg>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium" style={{ color: 'var(--cv-text)' }}>{t.dashboard.uploadDesc}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--cv-text3)' }}>PNG, JPG, WEBP — up to 6 charts</p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-3">
          {images.map((file, i) => (
            <div key={i} className="relative group rounded-lg overflow-hidden" style={{ aspectRatio: '16/9', background: 'var(--cv-surface2)' }}>
              <img
                src={URL.createObjectURL(file)}
                alt={`Chart ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'rgba(239,68,68,0.9)', color: 'white' }}
              >
                <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
              <div className="absolute bottom-1 left-1 text-xs px-1.5 py-0.5 rounded font-mono" style={{ background: 'rgba(0,0,0,0.7)', color: 'white' }}>
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
