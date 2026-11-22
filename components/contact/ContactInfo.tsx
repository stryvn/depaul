import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { WhatsAppIcon, InstagramIcon, FacebookIcon, YoutubeIcon } from "../ui/SocialIcons";

export function ContactInfo() {
  return (
    <div className="flex flex-col justify-between h-full text-white">
      <div className="space-y-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-brand-sky px-3 py-1 rounded-full bg-white/10 border border-white/15 inline-block mb-3">
            Reach Out To Us
          </span>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
            We&apos;d Love to Hear From You
          </h3>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Our admissions office and administrative secretariat are available Monday through Saturday.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          {/* Address */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-brand-crimson/20 border border-brand-crimson/30 flex items-center justify-center text-brand-crimson shrink-0">
              <MapPin className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-brand-sky uppercase tracking-wide">
                Campus Location
              </h4>
              <p className="text-sm font-medium text-white mt-0.5 leading-snug">
                De Paul Public School, Rajamudy P.O.
                <br />
                Idukki District, Kerala, Pin: 685604
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-brand-sky shrink-0">
              <Phone className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-brand-sky uppercase tracking-wide">
                Telephone & Hotline
              </h4>
              <p className="text-sm font-medium text-white mt-0.5">
                <a href="tel:+914868272312" className="hover:underline">
                  +91 4868 272312
                </a>
                <span className="text-slate-400 mx-2">/</span>
                <a href="tel:+919447123456" className="hover:underline">
                  +91 9447 123456
                </a>
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-brand-sky uppercase tracking-wide">
                Official Inquiries
              </h4>
              <p className="text-sm font-medium text-white mt-0.5">
                <a
                  href="mailto:depaulrajamudy@gmail.com"
                  className="hover:underline text-white hover:text-brand-sky transition-colors"
                >
                  depaulrajamudy@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Office hours */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-brand-sky uppercase tracking-wide">
                Working Hours
              </h4>
              <p className="text-sm font-medium text-white mt-0.5">
                Mon – Sat: 8:30 AM – 4:30 PM (Sunday Closed)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Buttons */}
      <div className="pt-6 mt-6 border-t border-white/15">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
          Connect On Digital Channels
        </h4>
        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href="https://wa.me/914868272312"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-600/30 hover:bg-emerald-600 border border-emerald-500/40 text-white text-xs font-medium transition-all hover:scale-105"
          >
            <WhatsAppIcon className="w-4 h-4 text-emerald-300" />
            <span>WhatsApp</span>
          </a>

          <a
            href="https://www.instagram.com/depaulschoolrajamudy"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-pink-600/30 hover:bg-pink-600 border border-pink-500/40 text-white text-xs font-medium transition-all hover:scale-105"
          >
            <InstagramIcon className="w-4 h-4 text-pink-300" />
            <span>Instagram</span>
          </a>

          <a
            href="https://www.facebook.com/depaulschoolrajamudy"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-blue-600/30 hover:bg-blue-600 border border-blue-500/40 text-white text-xs font-medium transition-all hover:scale-105"
          >
            <FacebookIcon className="w-4 h-4 text-blue-300" />
            <span>Facebook</span>
          </a>

          <a
            href="https://www.youtube.com/@depaulschoolrajamudy"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-red-600/30 hover:bg-red-600 border border-red-500/40 text-white text-xs font-medium transition-all hover:scale-105"
          >
            <YoutubeIcon className="w-4 h-4 text-red-300" />
            <span>YouTube</span>
          </a>
        </div>
      </div>
    </div>
  );
}
