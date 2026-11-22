import React from "react";

export function MapEmbed() {
  return (
    <div className="relative w-full h-[360px] sm:h-[440px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-800">
      <iframe
        title="De Paul Public School Rajamudy Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15730.076839352932!2d76.9808383!3d9.8966956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b070404dae70c2d%3A0xb36710b77626359f!2sRajamudy%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full filter saturate-125 contrast-105"
      />
      <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-brand-royal/90 backdrop-blur-md border border-white/20 text-white px-4 py-2.5 rounded-xl shadow-lg pointer-events-none flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-brand-crimson animate-ping" />
        <span className="text-xs font-semibold">Rajamudy Campus, Idukki District</span>
      </div>
    </div>
  );
}
