/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Maximize } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData.ts';

interface PresentationVideoProps {
  className?: string;
  autoPlay?: boolean;
}

export const PresentationVideo: React.FC<PresentationVideoProps> = ({
  className = '',
  autoPlay = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (autoPlay) {
      video.muted = true;
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStartedPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [autoPlay]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true));
      setHasStartedPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
  };

  const handleRestart = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
    setIsPlaying(true);
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  return (
    <div
      className={`relative group overflow-hidden rounded-3xl bg-neutral-900 border border-rose-200/80 shadow-md ${className}`}
    >
      {/* HTML5 Video element */}
      <video
        ref={videoRef}
        src={PROFILE_INFO.presentationVideo}
        poster={PROFILE_INFO.videoPoster}
        playsInline
        loop
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer select-none"
      />

      {/* Floating Audio Unmute Indicator badge when muted */}
      {isMuted && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleMute();
          }}
          className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-rose-900 text-xs font-medium shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <VolumeX className="w-3.5 h-3.5 text-rose-600" />
          <span>Ativar áudio</span>
        </button>
      )}

      {/* Center Play Overlay when paused */}
      {!isPlaying && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/35 cursor-pointer transition-opacity"
        >
          <div className="w-16 h-16 rounded-full bg-white/95 text-rose-700 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform">
            <Play className="w-7 h-7 ml-1 fill-current" />
          </div>
          <p className="mt-3 text-xs font-medium text-white tracking-wide uppercase drop-shadow-md">
            {hasStartedPlaying ? 'Continuar vídeo' : 'Assistir Apresentação'}
          </p>
        </div>
      )}

      {/* Bottom Floating Control Bar */}
      <div className="absolute bottom-0 inset-x-0 z-20 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col gap-2">
        {/* Progress Bar */}
        <div className="w-full bg-white/30 h-1 rounded-full overflow-hidden">
          <div
            className="bg-rose-400 h-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Buttons row */}
        <div className="flex items-center justify-between text-white text-xs px-1">
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
              title={isPlaying ? 'Pausar' : 'Reproduzir'}
              aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
              title={isMuted ? 'Ativar som' : 'Silenciar'}
              aria-label={isMuted ? 'Ativar som' : 'Silenciar'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRestart();
              }}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
              title="Reiniciar"
              aria-label="Reiniciar vídeo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/80">Vídeo Oficial</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFullscreen();
              }}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
              title="Tela cheia"
              aria-label="Assistir em tela cheia"
            >
              <Maximize className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
