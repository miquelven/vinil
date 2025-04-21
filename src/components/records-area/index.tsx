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
        className={`size-36 absolute top-1 left-1/2 z-10 max-2xl:size-28 max-2xl:left-[calc(50%+10px)] max-lg:left-[calc(50%+7px)] max-sm:size-14 max-[340px]:!size-12 ${
          isSelected
            ? ""
            : "max-sm:left-[calc(50%+44px)]  max-[340px]:!left-[calc(50%+50px)]"
        }`}
      />

      <img
        src={record.image}
        alt={record.albumName}
        className={`size-36 relative z-10 transition-transform duration-200 ease-out max-2xl:size-28 max-sm:size-14 max-[340px]:!size-12 ${
          isSelected
            ? "scale-105 shadow-xl shadow-dark"
            : "scale-100 shadow-none"
        }`}
      />
    </div>
  );
}
