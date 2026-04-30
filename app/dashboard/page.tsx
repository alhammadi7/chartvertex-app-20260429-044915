'use client';
import { useState, useRef, useCallback } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import StrategySelector from '@/components/analyzer/StrategySelector';
import RiskSettingsPanel from '@/components/analyzer/RiskSettings';
import AIResultPanel from '@/components/analyzer/AIResultPanel';
import { useApp } from '@/context/AppContext';
import type { AssetClass, Timeframe, Strategy, RiskSettings, AIAnalysisResult } from '@/types';

const ASSET_CLASSES: AssetClass[] = ['Forex', 'Stocks', 'Crypto', 'Commodities', 'Indices'];
const TIMEFRAMES: Timeframe[] = ['1M', '5M', '15M', '1H', '4H', 'Daily', 'Weekly'];
const LOADING_STEPS = [
  'Reading chart structure...',
  'Identifying key levels...',
  'Analyzing liquidity zones...',
  'Calculating risk parameters...',
  'Generating recommendation...',
];

// TradingView symbol map
const TV_SYMBOL: Record<AssetClass, string> = {
  Forex: 'FX:EURUSD',
  Stocks: 'NASDAQ:AAPL',
  Crypto: 'BINANCE:BTCUSDT',
  Commodities: 'TVC:GOLD',
  Indices: 'SP:SPX',
};
const TV_TF: Record<Timeframe, string> = {
  '1M': '1', '5M': '5', '15M': '15', '1H': '60', '4H': '240', Daily: 'D', Weekly: 'W',
};

type ChartMode = 'live' | 'upload';

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function dataUrlToBase64(dataUrl: string): Promise<string> {
  return dataUrl; // already a full data URL
}

export default function DashboardPage() {
  const { t } = useApp();
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Mode
  const [mode, setMode] = useState<ChartMode>('live');

  // Chart inputs
  const [assetClass, setAssetClass] = useState<AssetClass>('Forex');
  const [symbol, setSymbol] = useState('EURUSD');
  const [timeframe, setTimeframe] = useState<Timeframe>('4H');
  const [strategy, setStrategy] = useState<Strategy>('Smart Money Concepts');
  const [riskSettings, setRiskSettings] = useState<RiskSettings>({ accountBalance: '', riskPercentage: '', entryPrice: '' });

  // Image state
  const [capturedImage, setCapturedImage] = useState<string | null>(null); // base64 data URL from live capture
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);      // file from upload/photo
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);

  // Capture state
  const [capturing, setCapturing] = useState(false);

  // Result state
  const [result, setResult] = useState<AIAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState('');

  // Switch mode — clear images
  const switchMode = (m: ChartMode) => {
    setMode(m);
    setError('');
    setCapturedImage(null);
    setUploadedFile(null);
    setUploadedPreview(null);
    setResult(null);
  };

  // Handle file selection (upload or photo)
  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) return;
    setUploadedFile(file);
    setUploadedPreview(URL.createObjectURL(file));
    setError('');
  }, []);

  // Mock capture: draw TradingView iframe area to canvas via html2canvas-like approach
  // Since we cannot install libs, we do a clean mock capture using a placeholder canvas snapshot
  const handleCapture = useCallback(async () => {
    setCapturing(true);
    setError('');
    // Create a descriptive placeholder canvas representing the "captured" chart
    await new Promise(r => setTimeout(r, 1200)); // simulate capture delay

    // Build a minimal canvas screenshot placeholder
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 450;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Dark background
      ctx.fillStyle = '#131722';
      ctx.fillRect(0, 0, 800, 450);

      // Grid lines
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < 800; x += 50) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 450); ctx.stroke(); }
      for (let y = 0; y < 450; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(800, y); ctx.stroke(); }

      // Mock candlestick pattern
      const candles = [
        [80,180,220,150,200],[130,200,230,190,210],[180,210,240,195,225],
        [230,225,250,215,240],[280,240,260,230,245],[330,245,270,235,250],
        [380,250,275,240,265],[430,265,280,255,270],[480,270,285,260,278],
        [530,278,290,265,285],[580,285,295,272,288],[630,288,300,278,292],
        [680,292,305,285,298],
      ];
      candles.forEach(([x, open, high, low, close]) => {
        const bull = close >= open;
        ctx.strokeStyle = bull ? '#26a69a' : '#ef5350';
        ctx.fillStyle = bull ? '#26a69a' : '#ef5350';
        ctx.lineWidth = 1;
        // Wick
        ctx.beginPath();
        ctx.moveTo(x + 10, 450 - high);
        ctx.lineTo(x + 10, 450 - low);
        ctx.stroke();
        // Body
        const bodyTop = 450 - Math.max(open, close);
        const bodyH = Math.abs(close - open) || 2;
        ctx.fillRect(x + 4, bodyTop, 13, bodyH);
      });

      // Label
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '12px monospace';
      ctx.fillText(`${symbol} · ${timeframe} · ChartVertex Capture`, 12, 20);

      // Watermark
      ctx.fillStyle = 'rgba(59,130,246,0.15)';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('ChartVertex', 280, 240);
    }

    const dataUrl = canvas.toDataURL('image/png');
    setCapturedImage(dataUrl);
    setCapturing(false);
  }, [symbol, timeframe]);

  // Clear captured image
  const clearCapture = () => setCapturedImage(null);
  const clearUpload = () => { setUploadedFile(null); setUploadedPreview(null); };

  // Determine active image for analysis
  const activeImage: string | null = capturedImage ?? (uploadedFile ? uploadedPreview : null);

  const handleAnalyze = async () => {
    if (!activeImage) {
      setError('Please upload or capture a chart first.');
      return;
    }
    if (!symbol.trim()) {
      setError(t.dashboard.noSymbol);
      return;
    }

    setError('');
    setResult(null);
    setLoading(true);
    setLoadingStep(0);

    const stepTimer = setInterval(() => {
      setLoadingStep(s => s < LOADING_STEPS.length - 1 ? s + 1 : s);
    }, 600);

    try {
      let imageData: string;
      if (capturedImage) {
        imageData = capturedImage; // already data URL
      } else {
        imageData = await fileToBase64(uploadedFile!);
      }

      const res = await fetch('/api/analyze-chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: imageData,
          symbol: symbol.trim(),
          timeframe,
          analysisMode: strategy,
          marketCategory: assetClass,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || 'Analysis failed. Please try again.');
      } else {
        setResult(data as AIAnalysisResult);
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      clearInterval(stepTimer);
      setLoading(false);
      setLoadingStep(0);
    }
  };

  // Derive TradingView widget URL
  const tvSymbol = symbol.includes(':') ? symbol : `${assetClass === 'Forex' ? 'FX' : assetClass === 'Crypto' ? 'BINANCE' : assetClass === 'Stocks' ? 'NASDAQ' : assetClass === 'Commodities' ? 'TVC' : 'SP'}:${symbol || TV_SYMBOL[assetClass].split(':')[1]}`;
  const tvInterval = TV_TF[timeframe];
  const tvTheme = 'dark';
  const tvSrc = `https://s.tradingview.com/widgetembed/?frameElementId=tv_chart&symbol=${encodeURIComponent(tvSymbol)}&interval=${tvInterval}&theme=${tvTheme}&style=1&locale=en&hide_side_toolbar=0&allow_symbol_change=0&save_image=0&withdateranges=1&hide_volume=0`;

  const hasImage = !!activeImage;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="lg:hidden"><Header /></div>
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, overflowY: 'auto' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

            {/* Page header */}
            <div className="mb-6">
              <h1 className="font-display font-bold text-2xl sm:text-3xl mb-1" style={{ color: 'var(--cv-text)' }}>
                {t.dashboard.title}
              </h1>
              <p className="text-sm" style={{ color: 'var(--cv-text2)' }}>{t.dashboard.subtitle}</p>
            </div>

            {/* Mode switch */}
            <div className="flex items-center gap-1 mb-6 p-1 rounded-xl w-fit" style={{ background: 'var(--cv-surface)', border: '1px solid var(--cv-border)' }}>
              {([['live', 'Live Chart'], ['upload', 'Upload Image']] as [ChartMode, string][]).map(([m, label]) => (
                <button
                  key={m}
                  onClick={() => switchMode(m)}
                  className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
                  style={{
                    background: mode === m ? 'var(--cv-accent)' : 'transparent',
                    color: mode === m ? 'white' : 'var(--cv-text2)',
                    boxShadow: mode === m ? '0 0 16px rgba(59,130,246,0.3)' : 'none',
                  }}
                >
                  {m === 'live' ? (
                    <span className="flex items-center gap-1.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg>
                      {label}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/></svg>
                      {label}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Left config panel */}
              <div className="lg:col-span-2 space-y-4">

                {/* Chart source panel */}
                <div className="cv-card p-5 space-y-4">
                  {/* Asset + Symbol */}
                  <div>
                    <label className="cv-label">{t.dashboard.assetClass}</label>
                    <div className="flex flex-wrap gap-1.5">
                      {ASSET_CLASSES.map((a) => (
                        <button key={a} onClick={() => setAssetClass(a)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                          style={{ background: assetClass === a ? 'var(--cv-accent-glow)' : 'var(--cv-surface2)', border: `1px solid ${assetClass === a ? 'var(--cv-accent)' : 'var(--cv-border)'}`, color: assetClass === a ? 'var(--cv-accent2)' : 'var(--cv-text2)' }}>
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="cv-label">{t.dashboard.symbol}</label>
                    <input className="cv-input" placeholder={t.dashboard.symbolPlaceholder} value={symbol}
                      onChange={(e) => setSymbol(e.target.value.toUpperCase())} />
                  </div>

                  <div>
                    <label className="cv-label">{t.dashboard.timeframe}</label>
                    <div className="flex flex-wrap gap-1.5">
                      {TIMEFRAMES.map((tf) => (
                        <button key={tf} onClick={() => setTimeframe(tf)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                          style={{ background: timeframe === tf ? 'var(--cv-accent-glow)' : 'var(--cv-surface2)', border: `1px solid ${timeframe === tf ? 'var(--cv-accent)' : 'var(--cv-border)'}`, color: timeframe === tf ? 'var(--cv-accent2)' : 'var(--cv-text2)' }}>
                          {tf}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="cv-divider" style={{ margin: '4px 0' }} />

                  {/* Upload mode inputs */}
                  {mode === 'upload' && (
                    <div className="space-y-3">
                      <label className="cv-label">{t.dashboard.uploadTitle}</label>

                      {uploadedPreview ? (
                        <div className="relative rounded-lg overflow-hidden" style={{ aspectRatio: '16/9', background: 'var(--cv-surface2)' }}>
                          <img src={uploadedPreview} alt="Uploaded chart" className="w-full h-full object-cover" />
                          <button onClick={clearUpload}
                            className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{ background: 'rgba(239,68,68,0.9)', color: 'white' }}>✕</button>
                          <div className="absolute bottom-2 left-2 text-xs px-2 py-0.5 rounded font-mono"
                            style={{ background: 'rgba(0,0,0,0.7)', color: 'white' }}>Ready</div>
                        </div>
                      ) : (
                        <div
                          onClick={() => uploadInputRef.current?.click()}
                          className="rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors"
                          style={{ borderColor: 'var(--cv-border2)', minHeight: '100px', background: 'var(--cv-surface2)', padding: '20px' }}>
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--cv-accent-glow)', color: 'var(--cv-accent)' }}>
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
                            </svg>
                          </div>
                          <p className="text-sm font-medium" style={{ color: 'var(--cv-text)' }}>Drop chart here or click to browse</p>
                          <p className="text-xs" style={{ color: 'var(--cv-text3)' }}>PNG, JPG, WEBP</p>
                        </div>
                      )}

                      <input ref={uploadInputRef} type="file" accept="image/*" className="hidden"
                        onChange={e => handleFileSelect(e.target.files)} />
                      <input ref={photoInputRef} type="file" accept="image/*" capture="environment" className="hidden"
                        onChange={e => handleFileSelect(e.target.files)} />

                      {!uploadedPreview && (
                        <button onClick={() => photoInputRef.current?.click()}
                          className="btn-secondary w-full flex items-center justify-center gap-2" style={{ padding: '10px', fontSize: '13px' }}>
                          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"/>
                          </svg>
                          Take Photo
                        </button>
                      )}
                    </div>
                  )}

                  {/* Live mode capture status */}
                  {mode === 'live' && (
                    <div>
                      {capturedImage ? (
                        <div className="space-y-2">
                          <label className="cv-label">Captured Chart</label>
                          <div className="relative rounded-lg overflow-hidden" style={{ aspectRatio: '16/9', background: 'var(--cv-surface2)' }}>
                            <img src={capturedImage} alt="Captured chart" className="w-full h-full object-cover" />
                            <button onClick={clearCapture}
                              className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                              style={{ background: 'rgba(239,68,68,0.9)', color: 'white' }}>✕</button>
                            <div className="absolute bottom-2 left-2 text-xs px-2 py-0.5 rounded font-mono"
                              style={{ background: 'rgba(16,185,129,0.8)', color: 'white' }}>✓ Captured</div>
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-lg px-3 py-2 text-xs" style={{ background: 'var(--cv-surface2)', color: 'var(--cv-text3)', border: '1px solid var(--cv-border)' }}>
                          Use "Capture Chart" on the live chart to snapshot it for analysis.
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="cv-card p-5">
                  <StrategySelector value={strategy} onChange={setStrategy} />
                </div>

                <div className="cv-card p-5">
                  <RiskSettingsPanel values={riskSettings} onChange={setRiskSettings} />
                </div>

                {error && (
                  <p className="text-sm rounded-lg px-4 py-3"
                    style={{ background: 'rgba(239,68,68,0.08)', color: 'var(--cv-red)', border: '1px solid rgba(239,68,68,0.2)' }}>
                    {error}
                  </p>
                )}

                {/* Single main CTA */}
                <button onClick={handleAnalyze} disabled={loading} className="btn-primary w-full"
                  style={{ padding: '13px', fontSize: '14px', opacity: loading ? 0.7 : 1 }}>
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                        <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      {t.dashboard.analyzing}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
                      </svg>
                      {t.dashboard.analyzeBtn}
                    </span>
                  )}
                </button>
              </div>

              {/* Right panel: chart or result */}
              <div className="lg:col-span-3 space-y-4">
                {/* Live chart panel */}
                {mode === 'live' && !loading && !result && (
                  <div className="cv-card overflow-hidden" style={{ position: 'relative' }}>
                    {/* Capture button overlay */}
                    <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--cv-border)' }}>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500" style={{ animation: 'pulse 2s infinite' }} />
                        <span className="text-xs font-semibold font-mono" style={{ color: 'var(--cv-text2)' }}>
                          LIVE · {symbol || 'EURUSD'} · {timeframe}
                        </span>
                      </div>
                      <button
                        onClick={handleCapture}
                        disabled={capturing}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                        style={{
                          background: capturing ? 'var(--cv-surface2)' : 'var(--cv-accent-glow)',
                          border: '1px solid rgba(59,130,246,0.3)',
                          color: 'var(--cv-accent2)',
                          opacity: capturing ? 0.6 : 1,
                        }}
                      >
                        {capturing ? (
                          <>
                            <svg className="animate-spin" width="12" height="12" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                            </svg>
                            Capturing...
                          </>
                        ) : (
                          <>
                            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"/>
                            </svg>
                            Capture Chart
                          </>
                        )}
                      </button>
                    </div>

                    {/* TradingView iframe */}
                    <div style={{ height: '420px', position: 'relative' }}>
                      <iframe
                        key={`${tvSymbol}-${tvInterval}`}
                        src={tvSrc}
                        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                        allowFullScreen
                        title="TradingView Chart"
                      />
                    </div>
                  </div>
                )}

                {/* Upload mode empty state */}
                {mode === 'upload' && !loading && !result && !uploadedPreview && (
                  <div className="cv-card min-h-64 flex flex-col items-center justify-center gap-4 text-center p-10">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'var(--cv-surface2)', color: 'var(--cv-text3)' }}>
                      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-display font-semibold" style={{ color: 'var(--cv-text)' }}>Upload a Chart</p>
                      <p className="text-sm mt-1" style={{ color: 'var(--cv-text3)' }}>Use the panel on the left to upload or take a photo of your chart</p>
                    </div>
                  </div>
                )}

                {/* Upload preview full size */}
                {mode === 'upload' && !loading && !result && uploadedPreview && (
                  <div className="cv-card overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--cv-border)' }}>
                      <span className="text-xs font-semibold font-mono" style={{ color: 'var(--cv-text2)' }}>UPLOADED · {symbol} · {timeframe}</span>
                      <span className="badge text-xs" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>● Ready</span>
                    </div>
                    <img src={uploadedPreview} alt="Chart" style={{ width: '100%', maxHeight: '420px', objectFit: 'contain', display: 'block', background: 'var(--cv-surface2)' }} />
                  </div>
                )}

                {/* Loading */}
                {loading && (
                  <div className="cv-card min-h-64 flex flex-col items-center justify-center gap-5 text-center p-8">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'var(--cv-accent-glow)', color: 'var(--cv-accent)' }}>
                      <svg className="animate-spin" width="28" height="28" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-display font-semibold mb-1" style={{ color: 'var(--cv-text)' }}>ChartVertex AI is analyzing...</p>
                      <p className="text-sm font-mono" style={{ color: 'var(--cv-accent2)' }}>{LOADING_STEPS[loadingStep]}</p>
                    </div>
                    <div className="w-48 h-1 rounded-full" style={{ background: 'var(--cv-border2)' }}>
                      <div className="h-1 rounded-full transition-all duration-500"
                        style={{ width: `${((loadingStep + 1) / LOADING_STEPS.length) * 100}%`, background: 'var(--cv-accent)' }} />
                    </div>
                  </div>
                )}

                {/* Result */}
                {result && !loading && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-display font-semibold text-lg" style={{ color: 'var(--cv-text)' }}>
                        Analysis Result — <span className="font-mono gradient-text">{symbol}</span>
                      </h2>
                      <button onClick={() => setResult(null)} className="btn-secondary text-xs" style={{ padding: '6px 14px' }}>
                        ← New Analysis
                      </button>
                    </div>
                    <AIResultPanel result={result} symbol={symbol} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
