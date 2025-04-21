"use client";

import { useRef, useEffect } from "react";
import { useAtom } from "jotai";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

import Container from "../container";
import RecordsArea from "../records-area";
import MusicControl from "../music-control";

import { records } from "@/data/records";
import { selectedRecordAtom } from "@/state/recordsAtom";
import { isPlayingAtom } from "@/state/playerAtom";

import vinylRecord from "@/assets/images/vinil-6.png";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function VisualTrackPlayer() {
  const [selectedRecord, setSelectedRecord] = useAtom(selectedRecordAtom);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
  const container = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const largeRef = useRef<HTMLImageElement>(null);
  const infosRef = useRef<HTMLImageElement>(null);
  const fadeInRef = useRef<HTMLDivElement>(null);
  const recordsListRef = useRef<HTMLDivElement>(null);
  const rotationTweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (fadeInRef.current) {
        gsap.fromTo(
          fadeInRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: fadeInRef.current,
              start: "top 40%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }

      if (recordsListRef.current) {
        const items = recordsListRef.current.querySelectorAll(".record-item");
        gsap.fromTo(
          items,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            delay: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: fadeInRef.current,
              start: "top 40%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }

      if (largeRef.current) {
        gsap.fromTo(
          largeRef.current,
          { opacity: 0, scale: 0.7 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: 1.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: fadeInRef.current,
              start: "top 40%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }

      if (infosRef.current) {
        gsap.fromTo(
          infosRef.current,
          { opacity: 0, scale: 0.7 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: fadeInRef.current,
              start: "top 40%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!selectedRecord) return;

    setIsPlaying(true);

    if (bgRef.current) {
      gsap.to(bgRef.current, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          if (bgRef.current) {
            bgRef.current.style.backgroundImage = `url(${selectedRecord.image})`;
            gsap.to(bgRef.current, {
              opacity: 1,
              duration: 0.6,
              ease: "power1.out",
            });
          }
        },
      });
    }

    if (largeRef.current) {
      if (rotationTweenRef.current) {
        rotationTweenRef.current.kill();
      }

      rotationTweenRef.current = gsap.to(largeRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "linear",
        transformOrigin: "50% 50%",
        paused: !isPlaying,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRecord]);

  useEffect(() => {
    if (rotationTweenRef.current) {
      if (isPlaying) {
        rotationTweenRef.current.play();
      } else {
        rotationTweenRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <section
      ref={container}
      id="sinta"
      className="relative min-h-screen pt-20 overflow-hidden"
    >
      <div
        ref={fadeInRef}
        className="opacity-0 transition-opacity duration-[0ms]"
      >
        <div className="absolute inset-0 z-0">
          <div
            ref={bgRef}
            className="w-full h-full bg-no-repeat bg-cover blur-xl scale-110 transition-opacity duration-700"
            style={{
              backgroundImage: `url(${selectedRecord.image})`,
              opacity: 1,
            }}
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <Container>
          <div className="flex items-center relative z-10">
            <div ref={recordsListRef} className="flex flex-col gap-5 flex-1">
              {records.map((item) => (
                <div key={item.id} className="record-item">
                  <RecordsArea
                    record={item}
                    onClick={() => setSelectedRecord(item)}
                  />
                </div>
              ))}
            </div>

            <div className="flex-[2] flex flex-col items-center justify-center gap-4 text-white">
              <img
                ref={largeRef}
                src={vinylRecord}
                alt={selectedRecord?.albumName || "Vinil"}
                className="size-[70%]"
              />

              <div ref={infosRef} className="max-w-[320px]">
                <h3 className="text-3xl font-primary font-semibold ">
                  {selectedRecord?.albumName || "Selecione um disco"}
                </h3>
                <p className="font-secondary text-neutral-300">
                  {selectedRecord?.artistName || "Artista"}
                </p>

                <MusicControl />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
