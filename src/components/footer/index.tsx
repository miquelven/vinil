"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Github, Linkedin, Mail } from "lucide-react";
import Container from "../container";
import vinil from "@/assets/images/vinil-6.png";

import TextDecoration from "../text-decoration";

export default function Footer() {
  const vinilRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    gsap.to(vinilRef.current, {
      rotate: 360,
      repeat: -1,
      ease: "linear",
      duration: 10,
    });
  }, []);

  return (
    <footer className="pt-14 pb-5">
      <Container>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <p>Logo</p>
            {/* icons */}
            <div className="flex items-center gap-6">
              <div className="bg-darkLight p-2 rounded-full">
                <Github className=" text-[#f5e9da] " />
              </div>
              <div className="bg-darkLight p-2 rounded-full">
                <Linkedin className="text-[#f5e9da]" />
              </div>
              <div className="bg-darkLight p-2 rounded-full">
                <Mail className=" text-[#f5e9da] " />
              </div>
            </div>
          </div>
          <div className="w-full h-0.5 bg-darkLight" />
          <div className="flex items-center gap-5 justify-center">
            <p className="font-secondary font-bold text-sm">
              Feito por{" "}
              <TextDecoration className="text-primary" text="Miquelven" />
            </p>
            <img
              ref={vinilRef}
              src={vinil}
              alt="Imagem do vinil"
              className="size-6"
            />
          </div>
        </div>
      </Container>
    </footer>
  );
}
