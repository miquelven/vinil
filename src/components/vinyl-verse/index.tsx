"use client";

import { useEffect, useRef, Fragment } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../container";

gsap.registerPlugin(ScrollTrigger);

const poemLines = [
  {
    id: 1,
    segments: [
      { text: "O som que o vinil carrega não é frio, nem distante — " },
      { text: "é morno, íntimo, quase abraço.", highlight: true },
      { text: " Ele respira, range, vive." },
    ],
  },
  {
    id: 2,
    segments: [
      { text: "O peso de um disco não é só físico — " },
      { text: "é o tempo comprimido em espiral.", highlight: true },
      { text: " Cada volta é uma memória girando no coração do presente." },
    ],
  },
  {
    id: 3,
    segments: [
      {
        text: "O vinil não toca apenas música. Ele arranha o tempo com sulcos, despeja calor em ondas analógicas ",
      },
      {
        text: "e nos dá a chance de ouvir com o peito, não só com os ouvidos.",
        highlight: true,
      },
    ],
  },
  {
    id: 4,
    segments: [
      {
        text: "Nos sulcos, não há silêncio — só um sussurro empoeirado da alma sonora. ",
      },
      {
        text: "A granulação vibra como pele tocada, imperfeita, crua, humana.",
        highlight: true,
      },
    ],
  },
];

export default function VinylVerseScroll() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const verseRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    verseRefs.current.forEach((el, index) => {
      if (!el) return;
      const words = el.querySelectorAll(".word");

      gsap.set(words, { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: el,
        start: "top 75%",
        onEnter: () => {
          gsap.to(words, {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.3,
            ease: "power2.out",
            delay: index * 0.1,
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    gsap.to(".circle-one", {
      x: 100,
      y: -50,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".circle-two", {
      x: -80,
      y: 60,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section className="text-white relative overflow-hidden">
      {/* Fundo decorativo com animação GSAP */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute w-full h-full">
          {/* Círculo animado 1 */}
          <div
            className="circle-one absolute w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl"
            style={{ top: "20%", left: "10%" }}
          />
          {/* Círculo animado 2 */}
          <div
            className="circle-two absolute w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl"
            style={{ bottom: "15%", right: "15%" }}
          />
        </div>
      </div>

      <Container>
        <div
          ref={containerRef}
          className="flex flex-col items-center justify-center min-h-screen relative z-10"
        >
          {poemLines.map((line, idx) => (
            <div
              key={line.id}
              ref={(el) => {
                verseRefs.current[idx] = el;
              }}
              className="w-full flex items-center justify-center h-screen snap-center"
            >
              <div className="w-full max-w-3xl px-6 text-center">
                <p className="font-primary font-bold text-4xl md:text-6xl leading-snug relative z-10">
                  {line.segments.map((seg, i) => (
                    <Fragment key={i}>
                      {seg.text.split(/(\s+)/).map((word, j) =>
                        /\s+/.test(word) ? (
                          word
                        ) : (
                          <span
                            key={j}
                            className={`inline-block word mr-1 ${
                              seg.highlight
                                ? "bg-primary/20 text-primary px-1 rounded"
                                : ""
                            }`}
                          >
                            {word}
                          </span>
                        )
                      )}
                    </Fragment>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
