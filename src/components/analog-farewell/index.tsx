"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "../container";
import coverVinilGithub from "@/assets/images/cover-vinil-github.png";
import vinil from "@/assets/images/vinil-github.png";
import backgroundImage from "@/assets/images/bg-github.png";

gsap.registerPlugin(ScrollTrigger);

export default function AnalogFarewell() {
  const vinilRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(vinilRef.current, {
      rotate: 360,
      repeat: -1,
      ease: "linear",
      duration: 20,
    });
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const elements = sectionRef.current.querySelectorAll(
      ".fade-scroll:not(.no-stagger)"
    );
    const button = sectionRef.current.querySelector(".fade-scroll.no-stagger");

    gsap.set(elements, { opacity: 0, y: 50 });
    if (button) gsap.set(button, { opacity: 0, y: 50 });

    ScrollTrigger.batch(elements, {
      start: "top 80%",
      once: false,
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          }
        );
      },
      onLeaveBack: (batch) => {
        gsap.set(batch, { opacity: 0, y: 50 });
      },
    });

    if (button) {
      ScrollTrigger.create({
        trigger: button,
        start: "top 80%",
        once: false,
        toggleActions: "play reset play reset",
        onEnter: () => {
          gsap.fromTo(
            button,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            }
          );
        },
        onLeaveBack: () => {
          gsap.set(button, { opacity: 0, y: 50 });
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="despedida"
      ref={sectionRef}
      className="h-screen relative"
      style={{
        background: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black/50 z-10" />
      <Container>
        <div className="relative z-10 flex justify-end items-center h-screen">
          <div className="flex flex-col items-center gap-10">
            <h2 className="fade-scroll text-[52px] font-bold font-primary text-center leading-[63px]">
              Obrigado por girar conosco. <br /> Que seus dias sejam analógicos.
            </h2>

            <div className="relative flex fade-scroll">
              <img
                src={coverVinilGithub}
                alt="capa de disco de vinil"
                className="size-[201px] outline-10 relative z-20 outline-dark"
              />
              <img
                src={vinil}
                alt="disco de vinil"
                ref={vinilRef}
                className="-translate-x-14 z-10 size-[220px]"
              />
            </div>

            <a
              href="https://github.com/miquelven/vinil"
              target="_blank"
              className="fade-scroll no-stagger transition-all duration-300 font-secondary font-bold text-center bg-dark py-3 px-7 rounded-xl hover:bg-darkLight cursor-pointer"
            >
              Ver projeto no github
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
