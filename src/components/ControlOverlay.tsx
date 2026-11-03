import React, { useState } from 'react';
import {
  Camera,
  Moon,
  Sparkles,
  Volume2,
  VolumeX,
  Camera as SnapshotIcon,
  ChevronDown,
  ChevronUp,
  RotateCw,
  Eye,
  Sliders,
  Flower2,
  Waves,
} from 'lucide-react';
import { CameraPresetId, LightingMoodId, SceneConfig } from '../types.ts';

interface ControlOverlayProps {
  config: SceneConfig;
  onUpdateConfig: (newConfig: Partial<SceneConfig>) => void;
  onCaptureSnapshot: () => void;
  onOpenReference: () => void;
}

export const ControlOverlay: React.FC<ControlOverlayProps> = ({
  config,
  onUpdateConfig,
  onCaptureSnapshot,
  onOpenReference,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'camera' | 'atmosphere' | 'audio'>('camera');

  const cameraPresets: { id: CameraPresetId; label: string; desc: string }[] = [
    { id: 'photo_match', label: 'Góc Nhìn Giống Ảnh', desc: 'Góc máy trùng khớp hình mẫu' },
    { id: 'golden_lotus', label: 'Cận Cảnh Sen Vàng', desc: 'Chiêm ngưỡng đóa sen hoàng kim' },
    { id: 'pavilion', label: 'Hành Lang Đèn Lồng', desc: 'Đình viện & hai nhân vật' },
    { id: 'rockery', label: 'Hòn Non Bộ', desc: 'Đá thái hồ giữa hồ sen' },
    { id: 'wide_panoramic', label: 'Toàn Cảnh Hồ Sen', desc: 'Bao quát không gian ngoại cảnh' },
    { id: 'moon_view', label: 'Trăng Khuyết', desc: 'Vầng trăng đêm và bầu trời sao' },
  ];

  const lightingMoods: { id: LightingMoodId; label: string; iconColor: string }[] = [
    { id: 'mystic_night', label: 'Đêm Huyền Diệu', iconColor: '#60a5fa' },
    { id: 'golden_moon', label: 'Trăng Rằm Kim Quang', iconColor: '#f59e0b' },
    { id: 'twilight_dusk', label: 'Hoàng Hôn Lam Tím', iconColor: '#c084fc' },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 select-none overflow-hidden font-sans">
      {/* 1. Minimal Top Header Badge */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-3">
        <div 
          className="pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-xl border border-slate-700/60 shadow-lg"
          style={{ backgroundColor: 'rgba(10, 16, 29, 0.92)' }}
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Flower2 size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-semibold tracking-wide text-slate-100">
                Vườn Sen Ngoại Cảnh 3D
              </h1>
              <span className="text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Three.js PBR
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Dạ nguyệt • Sen hoàng kim • Non bộ đá thái hồ • Đình viện
            </p>
          </div>
        </div>

        {/* Reference Image Quick Button */}
        <button
          onClick={onOpenReference}
          className="pointer-events-auto flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-amber-300 border border-amber-500/40 hover:bg-amber-500/20 transition-all shadow-md active:scale-95"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.92)' }}
          title="Xem ảnh gốc tham chiếu"
        >
          <Eye size={15} />
          <span>Đối Chiếu Ảnh Gốc</span>
        </button>

        {/* Snapshot Photo Button */}
        <button
          onClick={onCaptureSnapshot}
          className="pointer-events-auto flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/20 transition-all shadow-md active:scale-95"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.92)' }}
          title="Chụp ảnh khung cảnh hiện tại (PNG)"
        >
          <SnapshotIcon size={15} />
          <span>Chụp Ảnh Lưu Niệm</span>
        </button>
      </div>

      {/* 2. Unified Collapsible Bottom Control Dock (Adheres to Three.js Ergonomic Dock Rule) */}
      <div 
        className="pointer-events-auto absolute bottom-5 left-1/2 -translate-x-1/2 z-20 w-[94vw] max-w-[920px] transition-all duration-300 ease-out"
        style={{
          transform: `translateX(-50%) translateY(${isCollapsed ? 'calc(100% - 38px)' : '0px'})`,
        }}
      >
        {/* Collapse / Expand Toggle Tab */}
        <div className="flex justify-center mb-1">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center gap-2 px-5 py-1.5 rounded-t-xl text-xs font-semibold text-slate-300 hover:text-white border-t border-x border-slate-700/80 shadow-md transition-colors"
            style={{ backgroundColor: 'rgba(13, 21, 38, 0.96)' }}
          >
            {isCollapsed ? (
              <>
                <ChevronUp size={14} className="text-amber-400" />
                <span>▴ Hiện Bảng Điều Khiển</span>
              </>
            ) : (
              <>
                <ChevronDown size={14} className="text-amber-400" />
                <span>▾ Thu Gọn (Cinema Zen Mode)</span>
              </>
            )}
          </button>
        </div>

        {/* Main Dock Surface (Solid/rgba surface without backdrop-filter) */}
        <div 
          className="rounded-2xl border border-slate-700/80 shadow-2xl p-4 sm:p-5"
          style={{ backgroundColor: 'rgba(11, 18, 33, 0.96)' }}
        >
          {/* Tabs Navigation */}
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-3 mb-4">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setActiveTab('camera')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === 'camera'
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Camera size={14} />
                <span>Góc Nhìn</span>
              </button>
              <button
                onClick={() => setActiveTab('atmosphere')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === 'atmosphere'
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Sparkles size={14} />
                <span>Khí Quyển & Ánh Sáng</span>
              </button>
              <button
                onClick={() => setActiveTab('audio')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === 'audio'
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {config.enableAudio ? <Volume2 size={14} /> : <VolumeX size={14} />}
                <span>Âm Thanh & Tùy Chọn</span>
              </button>
            </div>

            {/* Quick Auto-Rotate toggle */}
            <button
              onClick={() => onUpdateConfig({ autoRotate: !config.autoRotate })}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                config.autoRotate
                  ? 'border-teal-500/60 bg-teal-500/20 text-teal-300 font-medium'
                  : 'border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
              title="Tự động quay camera nhẹ nhàng"
            >
              <RotateCw size={13} className={config.autoRotate ? 'animate-spin' : ''} />
              <span>Tự Động Quay</span>
            </button>
          </div>

          {/* Tab 1: Camera Presets */}
          {activeTab === 'camera' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {cameraPresets.map((preset) => {
                const isActive = config.preset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => onUpdateConfig({ preset: preset.id })}
                    className={`flex flex-col text-left p-2.5 rounded-xl border transition-all ${
                      isActive
                        ? 'border-amber-500 bg-amber-500/15 text-amber-200 shadow-md'
                        : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-xs font-semibold">{preset.label}</span>
                      {preset.id === 'photo_match' && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 font-bold">
                          GỐC
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 line-clamp-1">
                      {preset.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Tab 2: Atmosphere & Lighting */}
          {activeTab === 'atmosphere' && (
            <div className="space-y-4">
              {/* Mood Presets */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-slate-400 mr-2">Khí sắc:</span>
                {lightingMoods.map((m) => {
                  const isActive = config.mood === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => onUpdateConfig({ mood: m.id })}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                        isActive
                          ? 'border-amber-500 bg-amber-500/20 text-white'
                          : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: m.iconColor }}
                      />
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                {/* Lotus Glow Slider */}
                <div className="bg-slate-900/50 p-2.5 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Flower2 size={13} className="text-amber-400" />
                      Hào Quang Sen Vàng
                    </span>
                    <span className="text-amber-400 font-mono">
                      {Math.round(config.lotusGlowMultiplier * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.3"
                    max="2.2"
                    step="0.1"
                    value={config.lotusGlowMultiplier}
                    onChange={(e) =>
                      onUpdateConfig({ lotusGlowMultiplier: parseFloat(e.target.value) })
                    }
                    className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>

                {/* Fireflies Count */}
                <div className="bg-slate-900/50 p-2.5 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Sparkles size={13} className="text-teal-400" />
                      Linh Khí / Đom Đóm
                    </span>
                    <span className="text-teal-400 font-mono">{config.fireflyCount} hạt</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="90"
                    step="5"
                    value={config.fireflyCount}
                    onChange={(e) =>
                      onUpdateConfig({ fireflyCount: parseInt(e.target.value, 10) })
                    }
                    className="w-full accent-teal-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>

                {/* Water Ripples */}
                <div className="bg-slate-900/50 p-2.5 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Waves size={13} className="text-cyan-400" />
                      Gợn Sóng Mặt Nước
                    </span>
                    <span className="text-cyan-400 font-mono">
                      {config.waterRippleSpeed.toFixed(1)}x
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="2.5"
                    step="0.1"
                    value={config.waterRippleSpeed}
                    onChange={(e) =>
                      onUpdateConfig({ waterRippleSpeed: parseFloat(e.target.value) })
                    }
                    className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Procedural Audio & Options */}
          {activeTab === 'audio' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Soundscape Control */}
              <div className="bg-slate-900/50 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                      <Volume2 size={16} className="text-amber-400" />
                      Âm Thanh Dạ Viên (Cổ Cầm & Tiếng Nước)
                    </span>
                    <button
                      onClick={() => onUpdateConfig({ enableAudio: !config.enableAudio })}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                        config.enableAudio
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {config.enableAudio ? 'BẬT' : 'TẮT'}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-3">
                    Tổng hợp bằng Web Audio API: giai điệu ngũ cung tĩnh lặng, tiếng dế đêm và giọt sương rơi trên mặt hồ sen.
                  </p>
                </div>

                {config.enableAudio && (
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1 text-slate-300">
                      <span>Âm Lượng:</span>
                      <span className="font-mono text-amber-400">
                        {Math.round(config.audioVolume * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.05"
                      max="1.0"
                      step="0.05"
                      value={config.audioVolume}
                      onChange={(e) =>
                        onUpdateConfig({ audioVolume: parseFloat(e.target.value) })
                      }
                      className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Interactive Tips */}
              <div className="bg-slate-900/50 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-center space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-amber-300 font-medium">
                  <Flower2 size={14} />
                  <span>Tương tác cảm ứng hoa sen:</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  • Nhấp chuột trực tiếp vào đóa hoa sen vàng hoặc sen hồng bất kỳ trong hồ để kích hoạt chuông gió thanh tịnh và làm cánh hoa dao động nhẹ.
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  • Giữ chuột trái & kéo để xoay tự do; cuộn chuột để phóng to / thu nhỏ góc máy.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
