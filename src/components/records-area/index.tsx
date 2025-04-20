"use client";

import { useAtom } from "jotai";
import type { RecordData } from "@/data/records";
import { selectedRecordAtom } from "@/state/recordsAtom";
import { isPlayingAtom } from "@/state/playerAtom";
import vinylRecord from "@/assets/images/vinil-6.png";
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

interface RecordsAreaProps {
  record: RecordData;
  onClick: () => void;
}

export default function RecordsArea({ record, onClick }: RecordsAreaProps) {
  const [selectedRecord] = useAtom(selectedRecordAtom);
  const [isPlaying] = useAtom(isPlayingAtom);
  const isSelected = selectedRecord?.id === record.id;
  const behindRef = useRef<HTMLImageElement>(null);
  const rotationTweenRef = useRef<gsap.core.Tween | null>(null);

  // Inicializa rotação contínua do disco
  useGSAP(
    () => {
      if (behindRef.current) {
        rotationTweenRef.current = gsap.to(behindRef.current, {
          rotation: 360,
          duration: 20,
          ease: "linear",
          repeat: -1,
          transformOrigin: "50% 50%",
          paused: !isPlaying,
        });
      }
    },
    { scope: behindRef }
  );

  // Pausa ou continua a rotação quando `isPlaying` muda
  useEffect(() => {
    if (rotationTweenRef.current) {
      if (isPlaying) {
        rotationTweenRef.current.play();
      } else {
        rotationTweenRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Animação de entrada/saída do disco ao selecionar
  useGSAP(() => {
    if (!behindRef.current) return;

    if (isSelected) {
      gsap.fromTo(
        behindRef.current,
        { x: -50 },
        { x: 0, duration: 0.6, ease: "power2.out" }
      );
    } else {
      gsap.to(behindRef.current, {
        x: -70,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isSelected]);

  return (
    <div className="relative w-fit cursor-pointer" onClick={onClick}>
      <img
        ref={behindRef}
        src={vinylRecord}
        alt=""
        className="size-36 absolute top-1 left-1/2 z-10"
      />

      <img
        src={record.image}
        alt={record.albumName}
        className={`size-36 relative z-10 transition-transform duration-200 ease-out ${
          isSelected
            ? "scale-105 shadow-xl shadow-dark"
            : "scale-100 shadow-none"
        }`}
      />
    </div>
  );
}
