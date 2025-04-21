"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Github, Linkedin, Mail } from "lucide-react";
import Container from "../container";
import vinil from "@/assets/images/vinil-6.png";
import logo from "@/assets/images/logo.png";
import TextDecoration from "../text-decoration";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/miquelven/vinil",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "#",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:miquelven.silva@gmail.com",
    label: "Email",
  },
];

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
            <img src={logo} alt="Imagem da logo" className="w-auto h-9" />

            {/* Social icons */}
            <div className="flex items-center gap-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="transition-all duration-300 bg-darkLight p-2 rounded-full hover:scale-90"
                  aria-label={label}
                >
                  <Icon className={`text-[#f5e9da] max-sm:size-4`} />
                </a>
              ))}
            </div>
          </div>

          <div className="w-full h-0.5 bg-darkLight" />

          <div className="flex items-center gap-5 justify-center">
            <p className="font-secondary font-medium text-sm max-sm:text-xs">
              Feito por{" "}
              <TextDecoration
                className="font-bold text-primary"
                text="Miquelven"
              />
            </p>
            <img
              ref={vinilRef}
              src={vinil}
              alt="Imagem do vinil"
              className="size-6 max-sm:size-4"
            />
          </div>
        </div>
      </Container>
    </footer>
  );
}
