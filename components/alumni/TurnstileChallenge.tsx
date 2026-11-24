"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

type Turnstile = {
  render(container: HTMLElement, options: { sitekey: string }): string;
  remove(id: string): void;
};

export function TurnstileChallenge({ attempt }: { attempt: number }) {
  const element = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  function render() {
    const api = (window as Window & { turnstile?: Turnstile }).turnstile;
    if (api && element.current && siteKey && widget.current === null) {
      widget.current = api.render(element.current, { sitekey: siteKey });
    }
  }

  useEffect(() => {
    render();
    return () => {
      const api = (window as Window & { turnstile?: Turnstile }).turnstile;
      if (widget.current !== null) api?.remove(widget.current);
      widget.current = null;
    };
  }, [attempt, siteKey]);

  if (!siteKey) return null;
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" onReady={render} />
      <div ref={element} />
    </>
  );
}
