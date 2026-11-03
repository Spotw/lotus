import React from 'react';
import { X, ExternalLink, Image as ImageIcon } from 'lucide-react';

interface ReferenceViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferenceViewerModal: React.FC<ReferenceViewerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(3, 7, 18, 0.88)' }}
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl"
        style={{ backgroundColor: '#0d1527' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/60 bg-[#0a1120]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <ImageIcon size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-100 text-base">
                Hình Ảnh Tham Chiếu Gốc (Reference Image)
              </h3>
              <p className="text-xs text-slate-400">
                Khung cảnh dạ nguyệt hồ sen, đình viện đèn lồng và non bộ tiên hiệp
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Image Content */}
        <div className="p-4 bg-black flex items-center justify-center">
          <img
            src="/assets/aistudio/image_5ad8fb86.png"
            alt="Reference Lotus Garden"
            className="max-h-[70vh] w-auto object-contain rounded-lg border border-slate-800"
          />
        </div>

        {/* Footer with key elements guide */}
        <div className="px-6 py-3.5 bg-[#0a1120] border-t border-slate-700/60 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              ✦ Hoa sen vàng hoàng kim phát sáng
            </span>
            <span className="flex items-center gap-1.5 text-teal-400 font-medium">
              ✦ Trăng khuyết & linh khí lung linh
            </span>
            <span className="flex items-center gap-1.5 text-indigo-300 font-medium">
              ✦ Đình viện & non bộ đá thái hồ
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-medium rounded-lg transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
