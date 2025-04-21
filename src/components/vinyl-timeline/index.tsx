"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../container";
import background from "@/assets/images/background-vinyl-timeline.png";
import timeline1 from "@/assets/images/timeline-1.png";
import timeline2 from "@/assets/images/timeline-2.png";
import timeline3 from "@/assets/images/timeline-3.png";
import timeline4 from "@/assets/images/timeline-4.png";
import timeline5 from "@/assets/images/timeline-5.png";
import timeline6 from "@/assets/images/timeline-6.png";
import timeline7 from "@/assets/images/timeline-7.png";
import timeline8 from "@/assets/images/timeline-8.png";
import timeline9 from "@/assets/images/timeline-9.png";
import timeline10 from "@/assets/images/timeline-10.png";
import timeline11 from "@/assets/images/timeline-11.png";

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    year: "1857",
    title: "O Fonautógrafo",
    description:
      "O primeiro dispositivo capaz de gravar som foi inventado por Édouard-Léon Scott de Martinville. No entanto, não podia reproduzir o som gravado.",
    image: timeline10,
  },
  {
    year: "1877",
    title: "O Fonógrafo",
    description:
      "Thomas Edison inventa o fonógrafo, o primeiro aparelho capaz de gravar e reproduzir som usando cilindros de estanho. Este foi o precursor direto dos sistemas de gravação modernos.",
    image: timeline1,
  },
  {
    year: "1887",
    title: "O Gramofone",
    description:
      "Emile Berliner patenteia o gramofone, que usa discos planos em vez de cilindros. Estes primeiros discos eram feitos de vidro, depois de zinco e finalmente de borracha dura, marcando o início da era dos discos planos.",
    image: timeline2,
  },
  {
    year: "1895",
    title: "Discos de Goma-laca",
    description:
      "Os discos começam a ser produzidos em massa usando goma-laca, um material mais durável. Estes discos giravam a 78 rpm e se tornaram o padrão da indústria por várias décadas.",
    image: timeline3,
  },
  {
    year: "1948",
    title: "O LP de Vinil",
    description:
      "A Columbia Records introduz o Long Play (LP) de 33⅓ rpm feito de vinil, que podia armazenar até 30 minutos de música por lado. Esta inovação revolucionou a indústria musical.",
    image: timeline4,
  },
  {
    year: "1949",
    title: "O Single de 45 rpm",
    description:
      "A RCA Victor lança o single de 7 polegadas que gira a 45 rpm, tornando-se padrão para lançamentos de músicas individuais. Este formato se popularizou rapidamente entre os jovens.",
    image: timeline5,
  },
  {
    year: "1960",
    title: "Era de Ouro do Vinil",
    description:
      "Década em que o vinil se consolida como principal formato para música gravada. Artistas como The Beatles, Rolling Stones e outros lançam álbuns icônicos que definiram gerações.",
    image: timeline11,
  },
  {
    year: "1982",
    title: "A Chegada do CD",
    description:
      "Sony e Philips lançam o CD, que começa a substituir gradualmente o vinil como formato dominante. A superioridade técnica anunciada e a praticidade impulsionam a mudança.",
    image: timeline6,
  },
  {
    year: "1990",
    title: "Declínio do Vinil",
    description:
      "As vendas de vinil caem drasticamente em favor do CD e, posteriormente, do formato digital. Muitas fábricas de discos fecham e o vinil se torna artigo de nicho.",
    image: timeline7,
  },
  {
    year: "2000",
    title: "Renascimento Inicial",
    description:
      "O vinil começa a ser redescoberto por audiophiles, DJs e colecionadores. Artistas passam a lançar edições limitadas em vinil, marcando o início do retorno do formato.",
    image: timeline8,
  },
  {
    year: "2020",
    title: "Boom do Vinil",
    description:
      "Pela primeira vez desde os anos 1980, as vendas de vinil superam as de CDs nos EUA. O formato é valorizado por sua qualidade sonora, arte física e experiência tátil.",
    image: timeline9,
  },
];

export default function VinylTimeLine() {
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentScrollRef = useRef<HTMLDivElement>(null);
  const imageScrollRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) =>
        prev === timelineData.length - 1 ? 0 : prev + 1
      );
    }, 10000);
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useGSAP(
    () => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          }
        );
      }

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          }
        );
      }
    },
    { dependencies: [activeIndex] }
  );

  useGSAP(() => {
    if (buttonsRef.current && sectionRef.current) {
      gsap.fromTo(
        buttonsRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.15,
          delay: 1.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            once: true,
          },
        }
      );
    }
  }, []);

  useGSAP(() => {
    if (contentScrollRef.current) {
      gsap.fromTo(
        contentScrollRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentScrollRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }

    if (imageScrollRef.current) {
      gsap.fromTo(
        imageScrollRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageScrollRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  useGSAP(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="conheca"
      ref={sectionRef}
      className="h-screen flex justify-center items-center text-white relative"
      style={{
        background: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Container>
        <div
          ref={contentRef}
          className="bg-neutral-900 p-6 mx-auto mb-32 transition-all duration-300 [box-shadow:5px_5px_2px_#3a3a3a] hover:bg-neutral-800 max-sm:mb-20 max-[340px]:mb-10"
        >
          <h3 className="text-primary font-primary text-[44px] font-bold mb-2 max-2xl:text-4xl max-sm:text-lg max-[340px]:!text-lg">
            {timelineData[activeIndex].year} - {timelineData[activeIndex].title}
          </h3>
          <p
            ref={textRef}
            className="text-base font-secondary text-[32px] leading-snug max-2xl:text-2xl max-sm:text-sm max-[340px]:!text-xs"
          >
            {timelineData[activeIndex].description
              .split(". ")
              .map((part, i) => (
                <span key={i} className="block">
                  {part.trim()}
                  {part.endsWith(".") ? "" : "."}
                </span>
              ))}
          </p>
        </div>

        <div
          ref={imageScrollRef}
          className="flex justify-center bg-white w-fit mx-auto mb-16 rounded-lg shadow-lg shadow-dark "
        >
          <img
            ref={imageRef}
            src={timelineData[activeIndex].image}
            alt={timelineData[activeIndex].title}
            className="w-[320px] h-[240px] object-contain transition-all duration-500 hover:scale-105 rounded-md max-sm:!w-[210px] max-sm:!h-[120px]"
          />
        </div>

        <div className="relative w-full">
          <div className="absolute top-3.5 left-0 right-0 h-1 bg-primary z-0 max-2xl:top-3 max-lg:top-2.5 max-sm:top-1.5" />
          <div
            ref={buttonsRef}
            className="relative z-10 flex justify-between items-center flex-wrap"
          >
            {timelineData.map((item, index) => (
              <button
                key={item.year}
                onClick={() => {
                  setActiveIndex(index);
                  startInterval();
                }}
                className="flex flex-col items-center focus:outline-none group transition-transform duration-300 hover:scale-110 hover:cursor-pointer"
                aria-label={`Ir para ${item.year}: ${item.title}`}
              >
                <div
                  className={`size-8 rounded-full transition-all duration-300 max-2xl:size-6 max-lg:size-5 max-sm:size-3 ${
                    index === activeIndex
                      ? "bg-primary border-primary scale-125"
                      : "bg-neutral-100 border-neutral-700 group-hover:border-primary"
                  } ${index === 0 ? "self-start" : ""} ${
                    index === timelineData.length - 1 ? "self-end" : ""
                  }`}
                />
                <span
                  className={`mt-2 font-bold text-[40px] font-primary transition-colors duration-300 max-2xl:text-4xl max-lg:text-2xl max-sm:text-sm max-[340px]:!text-[10px] ${
                    index === activeIndex
                      ? "text-primary font-bold"
                      : "text-neutral-300 group-hover:text-neutral-100"
                  }`}
                >
                  {item.year}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
