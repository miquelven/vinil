"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import homeVinilImg from "@/assets/images/home-vinil.svg";
import TextDecoration from "../text-decoration";
import { ChevronsDown } from "lucide-react";

gsap.registerPlugin(useGSAP);

export default function Home() {
  const container = useRef(null);
  const vinilRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".vinil",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 3.2,
          ease: "power1.out",
          delay: 0.3,
        }
      )
        .fromTo(
          ".title",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
          "-=2.5"
        )
        .fromTo(
          ".chevron",
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power1.out" },
          "-=1.7"
        );

      gsap.to(vinilRef.current, {
        rotation: 360,
        duration: 20,
        ease: "linear",
        repeat: -1,
        transformOrigin: "50% 50%",
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={container}
      id="ouca"
      className="flex justify-center items-center flex-col relative h-[75vh] pt-[47vh] max-xl:pt-[28vh] max-xl:h-[50vh] max-sm:h-auto max-sm:py-10"
    >
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[calc(50%+67px)] max-2xl:-translate-y-[calc(50%+65px)] max-xl:-translate-y-[calc(50%+62px)] max-sm:static max-sm:translate-0">
        <img
          ref={vinilRef}
          src={homeVinilImg}
          alt="Imagem do vinil da home"
          className="vinil h-[80%] max-h-[90vh] w-auto max-sm:size-[60%] max-sm:mx-auto max-sm:mb-10"
        />
      </div>

      <h1 className="title font-primary text-center font-bold text-[80px] max-xl:text-6xl max-xl:mb-4 max-sm:text-5xl max-xl:px-5">
        Antes de ser{" "}
        <TextDecoration text={"ouvido,"} className="text-primary" /> o vinil é{" "}
        <TextDecoration text={"sentido."} className="text-primary" />
      </h1>

      <ChevronsDown
        className="chevron animate-soft-bounce-down max-xl:size-14"
        color="#f5e9da"
        size={60}
      />
    </main>
  );
}
