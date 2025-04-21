"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import vinil1 from "@/assets/images/vinil-1.jpeg";
import vinil2 from "@/assets/images/vinil-7.png";
import vinil3 from "@/assets/images/vinil-8.png";
import vinil4 from "@/assets/images/vinil-9.png";
import vinil5 from "@/assets/images/vinil-10.png";
import backgroundImage from "@/assets/images/background-vinyl-stories.png";
import Container from "../container";

gsap.registerPlugin(ScrollTrigger);

const data = [
  {
    id: 0,
    message: `Toda vez que o Léo colocava o disco do Pink Floyd pra tocar, ele sentia o cheiro do café da tarde na casa do avô.
Era o mesmo vinil, herdado com riscos e tudo.
'Quando a agulha pula ali, parece que ele ainda tá aqui', dizia sorrindo, como se ouvisse a risada do velho junto da guitarra.`,
    image: vinil1,
  },
  {
    id: 1,
    message: `Júlia encontrou um disco do 'Alceu Valença' em um sebo.
Quando colocou pra tocar, a Faixa B começou e ela congelou:
era a mesma música que tocava no primeiro beijo dela, em 2003.
Nunca mais conseguiu ouvir sem sorrir com os olhos fechados.`,
    image: vinil2,
  },
  {
    id: 2,
    message: `Pedro não só escutava vinis, ele os celebrava.
Limpava com cuidado, deixava a luz baixa, escolhia um copo de vinho.
'É meu cinema sem tela', dizia.
Cada estalo entre as faixas era parte da trilha sonora do seu próprio mundo.`,
    image: vinil3,
  },
  {
    id: 3,
    message: `Aline ganhou um vinil antigo de uma amiga que morava na França.
Era um disco de jazz, com anotações à mão no encarte.
Colocou pra tocar num dia chuvoso e jura que sentiu cheiro de padaria e cigarro francês.
Desde então, diz que viaja sem sair da sala.`,
    image: vinil4,
  },
  {
    id: 4,
    message: `Davi comprou um disco só pela capa.
Nunca tinha ouvido falar da banda.
Quando tocou, algo clicou dentro dele.
Agora escreve músicas inspirado nesse som perdido no tempo.
Diz que foi o disco que o escolheu.`,
    image: vinil5,
  },
];

export default function VinylStories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Animação on scroll
  useGSAP(
    () => {
      if (sectionRef.current && listRef.current) {
        gsap.fromTo(
          sectionRef.current,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        gsap.fromTo(
          listRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  // Animação ao trocar depoimento
  useGSAP(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [activeIndex]);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.length);
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleClick = (index: number) => {
    setActiveIndex(index);
    startAutoSlide();
  };

  useGSAP(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  return (
    <section
      id="colecione"
      ref={sectionRef}
      className="relative text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />
      <Container>
        <div className="relative z-10 flex flex-col items-center justify-around h-screen">
          <h3
            ref={textRef}
            className="font-secondary font-bold text-[40px] text-center"
          >
            “{data[activeIndex].message}”
          </h3>

          <div
            ref={listRef}
            className="flex justify-center gap-10 mt-12 flex-wrap"
          >
            {data.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => handleClick(idx)}
                ref={idx === activeIndex ? imageRef : null}
                className={`rounded-lg border-4 cursor-pointer transition-all duration-500 ${
                  idx === activeIndex
                    ? "border-primary scale-105"
                    : "border-transparent opacity-40 hover:opacity-70"
                }`}
              >
                <img
                  src={item.image}
                  alt={`Vinil ${idx + 1}`}
                  className={`transition-all duration-300 size-40 object-cover ${
                    idx === activeIndex ? "scale-125" : "scale-90"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
