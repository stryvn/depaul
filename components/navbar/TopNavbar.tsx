"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Menu, ArrowUpRight } from "lucide-react";
import { cn } from "../ui/utils";
import { WhatsAppIcon, PhoneCallIcon, InstagramIcon, FacebookIcon, YoutubeIcon } from "../ui/SocialIcons";
import { NavButton } from "./NavButton";

interface NavbarProps {
  isMerged: boolean;
}

export const NAV_LINKS_LEFT = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Docs", href: "/docs" },
];

export const NAV_LINKS_RIGHT = [
  { name: "Stories", href: "/stories" },
  { name: "Alumni", href: "/alumni" },
  { name: "TC", href: "/tc" },
];

const MOBILE_MENU_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Docs", href: "/docs" },
  { name: "Stories", href: "/stories" },
  { name: "Alumni", href: "/alumni" },
  { name: "TC", href: "/tc" },
];

export function TopNavbar({ isMerged }: NavbarProps) {
  const [activeModal, setActiveModal] = useState<"phone" | "whatsapp" | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const phoneNumber = "+91 96056 02400";
  const rawNumber = "+919605602400";

  // Close modals or mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModal(null);
        setIsMobileMenuOpen(false);
      }
    };
    if (activeModal || isMobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [activeModal, isMobileMenuOpen]);

  // If user scrolls back to unmerged state, close mobile menu
  useEffect(() => {
    if (!isMerged) {
      setIsMobileMenuOpen(false);
    }
  }, [isMerged]);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Invisible click-away backdrop (pure overlay, zero blur for maximum GPU performance) */}
      {(activeModal || isMobileMenuOpen) && (
        <div
          className="fixed inset-0 z-40 pointer-events-auto bg-black/10"
          onClick={() => {
            setActiveModal(null);
            setIsMobileMenuOpen(false);
          }}
        />
      )}

      {/* Main Top Header Navbar */}
      <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex flex-col items-center px-3 sm:px-5 pointer-events-none">
        {/* Main Pill Navbar */}
        <div
          style={{ maxWidth: isMerged ? "1140px" : "780px" }}
          className={cn(
            "pointer-events-auto relative w-full border px-3 py-2 sm:px-5 sm:py-2.5 rounded-full flex items-center justify-between select-none shadow-xl transition-all duration-300 ease-out",
            isMerged
              ? "bg-white/80 backdrop-blur-xl border-white/60 text-slate-800 shadow-xl shadow-slate-900/10"
              : "bg-white/20 hover:bg-white/25 backdrop-blur-md border-white/30 text-white shadow-black/20"
          )}
        >
          {/* Top Bar Row: Symmetrical 3-Column Grid */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center w-full h-8 sm:h-9">
            {/* Left Column: Contact Triggers (or Mobile Hamburger) + Left Nav Links */}
            <div className="flex items-center justify-between min-w-0 pr-2">
              <div className="relative flex items-center gap-1.5 sm:gap-2 shrink-0">
                {isMerged ? (
                  <>
                    {/* Mobile: Hamburger / Close toggle */}
                    <button
                      type="button"
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      className="lg:hidden relative flex items-center justify-center w-8 h-8 rounded-full bg-slate-900/5 hover:bg-slate-900/10 border border-slate-900/10 text-slate-800 transition-colors active:scale-95 shrink-0"
                      aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                      <motion.div
                        key={isMobileMenuOpen ? "close" : "open"}
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="flex items-center justify-center"
                      >
                        {isMobileMenuOpen ? (
                          <X className="w-4 h-4 text-slate-800" />
                        ) : (
                          <Menu className="w-4 h-4 text-slate-800" />
                        )}
                      </motion.div>
                    </button>

                    {/* Desktop: Contact buttons */}
                    <div className="hidden lg:flex relative items-center gap-1.5 sm:gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setActiveModal(activeModal === "phone" ? null : "phone")}
                        className={cn(
                          "group flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border text-xs font-medium transition-all shadow-sm active:scale-95 shrink-0",
                          activeModal === "phone"
                            ? "bg-brand-royal text-white border-brand-royal shadow-inner"
                            : "bg-slate-900/5 hover:bg-slate-900/10 border-slate-900/10 text-slate-700 hover:text-brand-royal"
                        )}
                        title="Office Telephone"
                        aria-label="School office phone"
                      >
                        <PhoneCallIcon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform shrink-0" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveModal(activeModal === "whatsapp" ? null : "whatsapp")}
                        className={cn(
                          "group flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border text-xs font-medium transition-all shadow-sm active:scale-95 shrink-0",
                          activeModal === "whatsapp"
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-inner"
                            : "bg-slate-900/5 hover:bg-slate-900/10 border-slate-900/10 text-slate-700 hover:text-emerald-600"
                        )}
                        title="WhatsApp Inquiry"
                        aria-label="School WhatsApp channel"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform shrink-0" />
                      </button>
                    </div>
                  </>
                ) : (
                  /* Unmerged state (initial hero): Contact trigger buttons */
                  <div className="relative flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setActiveModal(activeModal === "phone" ? null : "phone")}
                      className={cn(
                        "group flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border text-white text-xs font-medium transition-all shadow-sm active:scale-95 shrink-0",
                        activeModal === "phone"
                          ? "bg-white/35 border-white/60 shadow-inner"
                          : "bg-white/15 hover:bg-white/30 border-white/25"
                      )}
                      title="Office Telephone"
                      aria-label="School office phone"
                    >
                      <PhoneCallIcon className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform shrink-0" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveModal(activeModal === "whatsapp" ? null : "whatsapp")}
                      className={cn(
                        "group flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border text-white text-xs font-medium transition-all shadow-sm active:scale-95 shrink-0",
                        activeModal === "whatsapp"
                          ? "bg-white/35 border-white/60 shadow-inner"
                          : "bg-white/15 hover:bg-white/30 border-white/25"
                      )}
                      title="WhatsApp Inquiry"
                      aria-label="School WhatsApp channel"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform shrink-0" />
                    </button>
                  </div>
                )}

                {/* Popover Card for Desktop / Unmerged Contact Buttons */}
                <AnimatePresence>
                  {activeModal && (
                    <motion.div
                      key={activeModal}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.1, ease: "easeOut" }}
                      className={cn(
                        "absolute top-full left-0 mt-3 z-50 w-[275px] origin-top-left rounded-2xl p-4 shadow-xl backdrop-blur-md select-none pointer-events-auto will-change-transform",
                        isMerged
                          ? "bg-white/95 border border-slate-200 text-slate-800 shadow-slate-900/10"
                          : "bg-slate-900/90 border border-white/20 text-white shadow-black/40"
                      )}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 border border-white/20 text-[10px] font-semibold uppercase tracking-wider text-white">
                          <span
                            className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              activeModal === "phone" ? "bg-brand-sky" : "bg-emerald-400"
                            )}
                          />
                          <span>{activeModal === "phone" ? "Office Desk" : "WhatsApp"}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveModal(null)}
                          className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/25 text-white/70 hover:text-white flex items-center justify-center transition-colors"
                          aria-label="Dismiss popover"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div
                        className={cn(
                          "flex items-center justify-between px-3 py-2.5 rounded-2xl mb-3 shadow-inner border",
                          isMerged
                            ? "bg-slate-50 border-slate-200"
                            : "bg-white/15 border-white/20"
                        )}
                      >
                        <div className="flex flex-col">
                          <span
                            className={cn(
                              "text-sm font-semibold tracking-wide",
                              isMerged ? "text-slate-900" : "text-white"
                            )}
                          >
                            {phoneNumber}
                          </span>
                          <span
                            className={cn(
                              "text-[10px] mt-0.5 font-medium",
                              isMerged ? "text-slate-500" : "text-white/70"
                            )}
                          >
                            {activeModal === "phone" ? "Mon – Fri · 9 AM – 5 PM" : "Official Support"}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopy}
                          className={cn(
                            "w-7 h-7 rounded-full border transition-all duration-150 flex items-center justify-center shrink-0 active:scale-95",
                            copied
                              ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-600"
                              : isMerged
                              ? "bg-white hover:bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm"
                              : "bg-white/15 hover:bg-white/30 border-white/25 text-white/80 hover:text-white"
                          )}
                          title="Copy phone number"
                        >
                          {copied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      <a
                        href={activeModal === "phone" ? `tel:${rawNumber}` : `https://wa.me/${rawNumber.replace("+", "")}`}
                        target={activeModal === "whatsapp" ? "_blank" : undefined}
                        rel={activeModal === "whatsapp" ? "noreferrer" : undefined}
                        className={cn(
                          "w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full font-semibold text-xs tracking-wider uppercase shadow-sm transition-all duration-200 active:scale-95 border",
                          isMerged
                            ? "bg-brand-royal hover:bg-blue-800 text-white border-brand-royal shadow-blue-900/20"
                            : "bg-white/20 hover:bg-white/35 border-white/30 text-white"
                        )}
                      >
                        {activeModal === "phone" ? (
                          <>
                            <PhoneCallIcon className="w-3.5 h-3.5 text-white" />
                            <span>Call Office</span>
                          </>
                        ) : (
                          <>
                            <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                            <span>Open Chat</span>
                          </>
                        )}
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Left Navigation Links: Anchored on the inner side (right-aligned in this column) */}
              {isMerged ? (
                <div className="hidden lg:flex items-center gap-1 ml-auto shrink-0 animate-in fade-in duration-200">
                  {NAV_LINKS_LEFT.map((link) => (
                    <NavButton key={link.name} name={link.name} href={link.href} isLight={isMerged} />
                  ))}
                </div>
              ) : (
                <div className="hidden lg:block ml-auto" />
              )}
            </div>

            {/* Center Column: Logo + School Name (Naturally and perfectly centered between columns) */}
            <div className="flex items-center justify-center shrink-0 px-2 sm:px-4">
              <a
                href="/"
                className="flex items-center gap-2 sm:gap-2.5 px-2 py-0.5 rounded-full group select-none whitespace-nowrap"
              >
                <div className="relative w-7 h-7 sm:w-8 sm:h-8 shrink-0 group-hover:scale-105 transition-transform">
                  <Image
                    src="/assets/branding/logo-navbar.png"
                    alt="De Paul School Logo"
                    fill
                    sizes="32px"
                    className="object-contain drop-shadow-sm"
                    priority
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span
                    className={cn(
                      "font-display font-bold text-xs sm:text-sm leading-tight tracking-tight whitespace-nowrap transition-colors",
                      isMerged ? "text-brand-royal" : "text-white"
                    )}
                  >
                    DE PAUL PUBLIC SCHOOL
                  </span>
                  <span
                    className={cn(
                      "text-[10px] tracking-wider uppercase font-semibold leading-none transition-colors",
                      isMerged ? "text-slate-500" : "text-brand-sky"
                    )}
                  >
                    Rajamudy • Idukki
                  </span>
                </div>
              </a>
            </div>

            {/* Right Column: Right Nav Links + Social Icons */}
            <div className="flex items-center justify-between min-w-0 pl-2">
              {/* Right Navigation Links: Anchored on the inner side (left-aligned in this column) */}
              {isMerged ? (
                <div className="hidden lg:flex items-center gap-1 mr-auto shrink-0 animate-in fade-in duration-200">
                  {NAV_LINKS_RIGHT.map((link) => (
                    <NavButton key={link.name} name={link.name} href={link.href} isLight={isMerged} />
                  ))}
                </div>
              ) : (
                <div className="hidden lg:block mr-auto" />
              )}

              {/* Social icons: on desktop (>= lg) always visible; on mobile (< lg) only visible in unmerged/hero state, hidden when full/merged */}
              <div
                className={cn(
                  "flex items-center gap-1 shrink-0 ml-auto",
                  isMerged ? "hidden lg:flex" : "flex"
                )}
              >
                <a
                  href="https://www.youtube.com/@depaulschoolrajamudy"
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "p-1.5 rounded-full transition-all",
                    isMerged
                      ? "text-slate-600 hover:text-brand-crimson hover:bg-slate-900/5"
                      : "text-white/80 hover:text-white hover:bg-white/20"
                  )}
                  title="YouTube Channel"
                  aria-label="YouTube Channel"
                >
                  <YoutubeIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.instagram.com/depaulschoolrajamudy"
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "p-1.5 rounded-full transition-all",
                    isMerged
                      ? "text-slate-600 hover:text-brand-royal hover:bg-slate-900/5"
                      : "text-white/80 hover:text-white hover:bg-white/20"
                  )}
                  title="Instagram"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.facebook.com/depaulschoolrajamudy"
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "p-1.5 rounded-full transition-all",
                    isMerged
                      ? "text-slate-600 hover:text-brand-royal hover:bg-slate-900/5"
                      : "text-white/80 hover:text-white hover:bg-white/20"
                  )}
                  title="Facebook"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Anchored Mobile Drawer Island */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{
                duration: 0.22,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ maxWidth: "780px" }}
              className={cn(
                "pointer-events-auto w-full mt-2 rounded-[28px] border p-3.5 flex flex-col select-none overflow-y-auto max-h-[80vh] shadow-2xl backdrop-blur-2xl transition-colors",
                isMerged
                  ? "bg-white/95 border-slate-200/80 text-slate-800 shadow-slate-900/15"
                  : "bg-slate-900/90 border-white/20 text-white shadow-black/50"
              )}
            >
              <div className="flex flex-col gap-2 pb-1">
                {/* Proper Glass Pill Buttons for each navigation link */}
                {MOBILE_MENU_LINKS.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={handleLinkClick}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.02 + idx * 0.02, duration: 0.16 }}
                    className={cn(
                      "group flex items-center justify-between px-4 py-2.5 rounded-full border shadow-sm transition-all duration-200",
                      isMerged
                        ? "bg-slate-900/5 hover:bg-slate-900/10 active:bg-slate-900/15 border-slate-200/80 text-slate-800"
                        : "bg-white/10 hover:bg-white/20 active:bg-white/25 border-white/15 text-white"
                    )}
                  >
                    <span className="font-display text-xs sm:text-sm font-semibold tracking-wider uppercase">
                      {link.name}
                    </span>
                    <ArrowUpRight
                      className={cn(
                        "w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200",
                        isMerged
                          ? "text-slate-400 group-hover:text-brand-royal"
                          : "text-white/60 group-hover:text-white"
                      )}
                    />
                  </motion.a>
                ))}

                {/* Call & WhatsApp Frosted Pill Buttons */}
                <div className="flex items-center gap-2 pt-1.5">
                  <a
                    href={`tel:${rawNumber}`}
                    className={cn(
                      "flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-full border text-xs font-semibold tracking-wide shadow-sm transition-all duration-200",
                      isMerged
                        ? "bg-slate-900/5 hover:bg-slate-900/10 active:bg-slate-900/15 border-slate-200 text-slate-800"
                        : "bg-white/15 hover:bg-white/25 active:bg-white/30 border-white/25 text-white"
                    )}
                  >
                    <PhoneCallIcon
                      className={cn(
                        "w-3.5 h-3.5",
                        isMerged ? "text-brand-royal" : "text-white"
                      )}
                    />
                    <span>Call Office</span>
                  </a>
                  <a
                    href={`https://wa.me/${rawNumber.replace("+", "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-full border text-xs font-semibold tracking-wide shadow-sm transition-all duration-200",
                      isMerged
                        ? "bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-150 border-emerald-200 text-emerald-800"
                        : "bg-white/15 hover:bg-white/25 active:bg-white/30 border-white/25 text-white"
                    )}
                  >
                    <WhatsAppIcon
                      className={cn(
                        "w-3.5 h-3.5",
                        isMerged ? "text-emerald-600" : "text-emerald-300"
                      )}
                    />
                    <span>WhatsApp</span>
                  </a>
                </div>

                {/* Hero Admissions Button Replica */}
                <div className="pt-1">
                  <a
                    href="/admissions"
                    onClick={handleLinkClick}
                    className="w-full group relative inline-flex items-center justify-center gap-2.5 px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-b from-[#0262b6] to-[#02498b] hover:from-[#036bc7] hover:to-[#02539d] text-white text-xs sm:text-sm font-semibold tracking-wide border border-white/20 hover:border-white/40 shadow-[0_4px_20px_rgba(2,86,161,0.3),inset_0_1px_0_rgba(255,255,255,0.25)] hover:shadow-[0_4px_28px_rgba(2,86,161,0.5),inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-300"
                  >
                    <span>Admissions</span>
                    <span className="w-5 h-5 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-200">
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/90 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
