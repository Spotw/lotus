/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { SceneManager } from './three/sceneManager.ts';
import { ControlOverlay } from './components/ControlOverlay.tsx';
import { ReferenceViewerModal } from './components/ReferenceViewerModal.tsx';
import { SceneConfig } from './types.ts';
import { audioEngine } from './audio/ambientAudio.ts';

const initialConfig: SceneConfig = {
  preset: 'photo_match',
  mood: 'mystic_night',
  lotusGlowMultiplier: 1.0,
  waterRippleSpeed: 1.0,
  fireflyCount: 80,
  showLanternGlow: true,
  enableAudio: false,
  audioVolume: 0.6,
  autoRotate: false,
};

export default function App() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneManagerRef = useRef<SceneManager | null>(null);

  const [config, setConfig] = useState<SceneConfig>(initialConfig);
  const [isReferenceModalOpen, setIsReferenceModalOpen] = useState(false);

  // Initialize Three.js scene once in dedicated isolated mount container
  useEffect(() => {
    if (!mountRef.current) return;

    const manager = new SceneManager(mountRef.current, initialConfig);
    sceneManagerRef.current = manager;

    return () => {
      manager.dispose();
      sceneManagerRef.current = null;
      audioEngine.stop();
    };
  }, []);

  // Sync state updates to SceneManager without re-instantiating WebGL
  const handleUpdateConfig = (newConfig: Partial<SceneConfig>) => {
    setConfig((prev) => {
      const updated = { ...prev, ...newConfig };
      
      // Update scene manager
      if (sceneManagerRef.current) {
        sceneManagerRef.current.updateConfig(newConfig);
      }

      // Handle procedural audio
      if (newConfig.enableAudio !== undefined) {
        if (newConfig.enableAudio) {
          audioEngine.start();
          audioEngine.setVolume(updated.audioVolume);
        } else {
          audioEngine.stop();
        }
      }

      if (newConfig.audioVolume !== undefined && updated.enableAudio) {
        audioEngine.setVolume(newConfig.audioVolume);
      }

      return updated;
    });
  };

  // Capture high-resolution PNG snapshot
  const handleCaptureSnapshot = () => {
    if (!sceneManagerRef.current) return;
    const dataUrl = sceneManagerRef.current.captureSnapshot();
    const link = document.createElement('a');
    link.download = `vuon-sen-ngoai-canh-3d-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#050c18] select-none">
      {/* 3D WebGL Canvas Container - Isolated from React state rerenders */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Floating HUD Controls */}
      <ControlOverlay
        config={config}
        onUpdateConfig={handleUpdateConfig}
        onCaptureSnapshot={handleCaptureSnapshot}
        onOpenReference={() => setIsReferenceModalOpen(true)}
      />

      {/* Reference Image Comparison Modal */}
      <ReferenceViewerModal
        isOpen={isReferenceModalOpen}
        onClose={() => setIsReferenceModalOpen(false)}
      />
    </div>
  );
}
