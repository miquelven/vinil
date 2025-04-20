"use client";

import {
  Play,
  SkipBack,
  SkipForward,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { selectedRecordAtom } from "@/state/recordsAtom";
import { isPlayingAtom } from "@/state/playerAtom";
import { records } from "@/data/records";

export default function MusicControl() {
  const [selectedRecord, setSelectedRecord] = useAtom(selectedRecordAtom);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);

  const playPauseIconRef = useRef<HTMLDivElement | null>(null);
  const volumeIconRef = useRef<HTMLDivElement | null>(null);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!selectedRecord?.musicUrl) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const newAudio = new Audio(selectedRecord.musicUrl);
    newAudio.volume = volume;
    audioRef.current = newAudio;

    setProgress(0);
    setDuration(0);

    const updateProgress = () => {
      if (!newAudio.duration) return;
      setProgress(newAudio.currentTime / newAudio.duration);
    };

    newAudio.addEventListener("loadedmetadata", () => {
      setDuration(newAudio.duration);
    });

    newAudio.addEventListener("timeupdate", updateProgress);

    newAudio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        setIsPlaying(false);
      });

    return () => {
      newAudio.removeEventListener("loadedmetadata", () => {});
      newAudio.removeEventListener("timeupdate", updateProgress);
      newAudio.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRecord]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    setIsMuted(volume === 0);
  }, [volume]);

  const animateIconSwap = (ref: React.RefObject<HTMLElement | null>) => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, rotate: -45, scale: 0.7 },
        { opacity: 1, rotate: 0, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying((prev) => !prev);
    animateIconSwap(playPauseIconRef);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(0.1);
    } else {
      setVolume(0);
    }
    animateIconSwap(volumeIconRef);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const seekTime = (clickX / width) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { scale: 1.2, duration: 0.2, ease: "power2.out" });
  };

  const handleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: "power2.out" });
  };

  const handlePrevious = () => {
    if (!selectedRecord) return;
    const currentIndex = records.findIndex((r) => r.id === selectedRecord.id);
    const previousIndex =
      currentIndex > 0 ? currentIndex - 1 : records.length - 1;
    setSelectedRecord(records[previousIndex]);
  };

  const handleNext = () => {
    if (!selectedRecord) return;
    const currentIndex = records.findIndex((r) => r.id === selectedRecord.id);
    const nextIndex = currentIndex < records.length - 1 ? currentIndex + 1 : 0;
    setSelectedRecord(records[nextIndex]);
  };

  return (
    <div ref={containerRef}>
      <div className="text-sm text-neutral-400 max-w-[320px] mx-auto text-right">
        <span>
          {formatTime(progress * duration)} / {formatTime(duration)}
        </span>
      </div>

      <div
        ref={progressRef}
        onClick={handleSeek}
        className="w-[320px] max-w-[320px] mt-1 mb-4 h-1.5 bg-neutral-500/30 rounded overflow-hidden cursor-pointer mx-auto"
      >
        <div
          className="h-full bg-[#e55a30] transition-all duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="flex justify-between items-center text-[#e55a30]">
        <div className="flex gap-4">
          <button
            onClick={handlePrevious}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            className="cursor-pointer"
          >
            <SkipBack size={20} strokeWidth={2} />
          </button>

          <button
            onClick={handlePlayPause}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            className="cursor-pointer"
          >
            <div ref={playPauseIconRef}>
              {isPlaying ? (
                <Pause size={20} strokeWidth={2} />
              ) : (
                <Play size={20} strokeWidth={2} />
              )}
            </div>
          </button>

          <button
            onClick={handleNext}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            className="cursor-pointer"
          >
            <SkipForward size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={toggleMute}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            className="cursor-pointer"
          >
            <div ref={volumeIconRef}>
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </div>
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
            className="w-[80px] cursor-pointer accent-[#e55a30]"
          />
        </div>
      </div>
    </div>
  );
}
