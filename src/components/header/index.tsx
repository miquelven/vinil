"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X } from "lucide-react";
import Container from "../container";

import logo from "@/assets/images/logo.png";
import backgroundHeader from "@/assets/images/background-header.png";
import headerIcon from "@/assets/images/icon-header.png";

const headerData = [
  { href: "#ouca", label: "Ouça" },
  { href: "#sinta", label: "Sinta" },
  { href: "#explore", label: "Explore" },
  { href: "#colecione", label: "Colecione" },
  { href: "#conheca", label: "Conheça" },
  { href: "#despedida", label: "Despedida" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    setShowMenu(true);
    setMenuOpen(true);
  };

  const closeMenu = () => {
    if (menuRef.current) {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setMenuOpen(false);
          setShowMenu(false);
        },
      });
    }
  };

  const handleClickItem = (href: string) => {
    const target = document.querySelector(href);
    if (!target) return;

    setActiveItem(href);

    if (menuRef.current) {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setMenuOpen(false);
          setShowMenu(false);
          setTimeout(() => {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 50);
        },
      });
    }
  };

  useGSAP(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 1.4,
        }
      );
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  useGSAP(() => {
    if (menuOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [menuOpen]);

  const renderMenuItem = (href: string, label: string) => {
    const isActive = activeItem === href;

    return (
      <button
        key={href}
        onClick={() => handleClickItem(href)}
        className={`group relative flex items-center gap-3 transition-all duration-300 cursor-pointer max-lg:-translate-x-5 ${
          isActive ? "scale-110" : "hover:scale-110"
        }`}
      >
        <img
          src={headerIcon}
          alt="Ícone decorativo"
          className={`w-6 h-6 transform transition-all duration-300 ${
            isActive
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
          }`}
        />
        <span className="relative font-secondary font-bold text-[40px] text-white max-sm:text-4xl">
          {label}
          <span
            className={`absolute left-0 top-1/2 translate-y-1/2 w-full h-1 bg-white origin-center transition-transform duration-300 ${
              isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`}
          />
        </span>
      </button>
    );
  };

  return (
    <header>
      <Container>
        <div
          ref={headerRef}
          className="flex justify-between items-center pt-5 z-50 relative"
        >
          <img src={logo} alt="Imagem da logo" className="w-auto h-9" />
          <button onClick={openMenu}>
            <Menu className="transition-all duration-300 cursor-pointer size-9 hover:scale-90 text-white" />
          </button>
        </div>
      </Container>

      {showMenu && (
        <div
          ref={menuRef}
          className="fixed inset-0 bg-darkLight text-white flex flex-col items-center justify-center gap-10 z-50"
        >
          <div
            className="absolute inset-0"
            style={{ background: `url(${backgroundHeader})` }}
          />
          <button
            className="absolute top-6 right-6 text-white cursor-pointer"
            onClick={closeMenu}
          >
            <X className="size-8 transition-transform hover:scale-90" />
          </button>

          <nav className="flex flex-col items-center gap-12 text-3xl font-semibold z-10 ">
            {headerData.map(({ href, label }) => renderMenuItem(href, label))}
          </nav>
        </div>
      )}
    </header>
  );
}
