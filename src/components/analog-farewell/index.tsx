"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Container from "../container";
import coverVinilGithub from "@/assets/images/cover-vinil-github.png";
import vinil from "@/assets/images/vinil-github.png";
import backgroundImage from "@/assets/images/bg-github.png";

export default function AnalogFarewell() {
  const vinilRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    gsap.to(vinilRef.current, {
      rotate: 360,
      repeat: -1,
      ease: "linear",
      duration: 20,
    });
  }, []);

  return (
    <section
      id="despedida"
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
            <h2 className="text-[52px] font-bold font-primary text-center leading-[63px]">
              Obrigado por girar conosco. <br /> Que seus dias sejam analógicos.
            </h2>

            <div className="relative flex">
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

            <button className="transition-all duration-300 font-secondary font-bold text-center bg-dark py-3 px-7 rounded-xl hover:bg-darkLight cursor-pointer">
              Ver projeto no github
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
