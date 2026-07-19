"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, type AnimationPlaybackControls } from "motion/react";
import { useTranslations } from "next-intl";
import { SiShopify, SiTesla, SiUnilever, SiNike, SiSpotify } from "react-icons/si";
import type { IconType } from "react-icons";

type Brand = { name: string; icon: IconType };

const brands: Brand[] = [
  { name: "Shopify", icon: SiShopify },
  { name: "Tesla", icon: SiTesla },
  { name: "Unilever", icon: SiUnilever },
  { name: "Nike", icon: SiNike },
  { name: "Spotify", icon: SiSpotify },
];

const ITEM_WIDTH = 220;
const SET_WIDTH = ITEM_WIDTH * brands.length;
const SLIDE_DURATION = 18;
const PAUSE_DURATION = 15;
const MOBILE_BREAKPOINT = 640;

function BrandItem({ brand }: { brand: Brand }) {
  const Icon = brand.icon;
  return (
    <div
      style={{ width: ITEM_WIDTH }}
      className="flex shrink-0 items-center justify-center gap-3 grayscale opacity-45 transition duration-300 hover:opacity-100 hover:grayscale-0"
    >
      <Icon size={24} className="text-foreground" />
      <span className="whitespace-nowrap font-display text-xl font-semibold tracking-tight text-foreground">
        {brand.name}
      </span>
    </div>
  );
}

export function TrustMarquee() {
  const t = useTranslations("trustMarquee");
  const measureRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function measure() {
      if (!measureRef.current) return;
      const available = measureRef.current.offsetWidth;
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);

      if (mobile) {
        setViewportWidth(available);
      } else {
        const wholeItems = Math.max(1, Math.floor(available / ITEM_WIDTH));
        setViewportWidth(wholeItems * ITEM_WIDTH);
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const x = useMotionValue(0);
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loop() {
      while (!cancelled) {
        const controls = animate(x, -SET_WIDTH, {
          duration: SLIDE_DURATION,
          ease: "linear",
        });
        controlsRef.current = controls;
        await controls;
        if (cancelled) return;

        if (!isMobile) {
          await new Promise((resolve) => setTimeout(resolve, PAUSE_DURATION * 1000));
          if (cancelled) return;
        }

        x.set(0);
      }
    }

    loop();
    return () => {
      cancelled = true;
      controlsRef.current?.stop();
    };
  }, [x, isMobile]);

  return (
    <section className="border-y border-border bg-elevated py-8">
      <div className="mx-auto max-w-6xl px-4">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.14em] text-foreground/40">
          {t("trustedBy")}
        </p>

        <div ref={measureRef} className="w-full">
          <div className="mx-auto overflow-hidden" style={{ width: viewportWidth || undefined }}>
            <motion.div style={{ x }} className="flex w-max">
              {[...brands, ...brands, ...brands].map((brand, i) => (
                <BrandItem brand={brand} key={`${brand.name}-${i}`} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}