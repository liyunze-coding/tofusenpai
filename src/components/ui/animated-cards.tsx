import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";

import { useEffect, useState, useRef } from "react";

type Project = {
  name: string;
  subtitle: string;
  src: string;
  href?: string;
  target?: string;
};

export const AnimatedCards = ({
  projects,
  autoplay = false,
  className = "",
}: {
  projects: Project[];
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  // Swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchCurrentX = useRef<number | null>(null);
  const isPointerDown = useRef(false);
  const [translateX, setTranslateX] = useState(0); // optional visual feedback
  const swiped = useRef(false);
  const SWIPE_THRESHOLD = 50; // px

  const handleTouchStart = (clientX: number) => {
    touchStartX.current = clientX;
    touchCurrentX.current = clientX;
    isPointerDown.current = true;
    swiped.current = false;
    setTranslateX(0);
  };

  const handleTouchMove = (clientX: number) => {
    if (!isPointerDown.current || touchStartX.current == null) return;
    touchCurrentX.current = clientX;
    const delta = clientX - touchStartX.current;
    setTranslateX(delta);
    // mark swiped when user drags past small amount to avoid accidental clicks
    if (Math.abs(delta) > 10) swiped.current = true;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current == null || touchCurrentX.current == null) {
      resetSwipe();
      return;
    }
    const delta = touchCurrentX.current - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    resetSwipe();
  };

  const resetSwipe = () => {
    touchStartX.current = null;
    touchCurrentX.current = null;
    isPointerDown.current = false;
    setTranslateX(0);
    // keep swiped flag momentarily to suppress click — cleared on next tick
    setTimeout(() => (swiped.current = false), 50);
  };

  // event wrappers
  const onTouchStart = (e: React.TouchEvent) =>
    handleTouchStart(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) =>
    handleTouchMove(e.touches[0].clientX);
  const onTouchEnd = () => handleTouchEnd();

  // pointer events for broader support (mouse / pen)
  const onPointerDown = (e: React.PointerEvent) =>
    handleTouchStart(e.clientX as number);
  const onPointerMove = (e: React.PointerEvent) =>
    isPointerDown.current && handleTouchMove(e.clientX as number);
  const onPointerUp = () => handleTouchEnd();

  return (
    <div
      className={cn(
        "mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12",
        className,
      )}
    >
      <div className="relative grid grid-cols-1 gap-10 md:gap-20 md:grid-cols-2">
        <div>
          {/* Attach touch/pointer handlers here to enable swiping on mobile */}
          <div
            className="relative h-80 w-full"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            // suppress built-in gestures that may conflict
            style={{ touchAction: "pan-y" }}
            // optional visual feedback while swiping
            // translateX will not break layout — it's applied to inner absolute items
          >
            <AnimatePresence>
              {projects.map((testimonial, index) =>
                projects[active].href !== "" ? (
                  <motion.a
                    key={testimonial.src}
                    href={projects[active].href}
                    target={projects[active].target ?? "_self"}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: randomRotateY(),
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0.7,
                      scale: isActive(index) ? 1 : 0.95,
                      z: isActive(index) ? 0 : -100,
                      rotate: isActive(index) ? 0 : randomRotateY(),
                      zIndex: isActive(index)
                        ? 40
                        : projects.length + 2 - index,
                      y: isActive(index) ? [0, -80, 0] : 0,
                      // small translate for visual during active swipe only
                      x: isActive(index) ? translateX : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: randomRotateY(),
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 origin-bottom"
                    onClick={(e) => {
                      // suppress clicks that were actually swipes
                      if (swiped.current) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
                  >
                    <img
                      src={testimonial.src}
                      alt={testimonial.name}
                      width={500}
                      height={500}
                      draggable={false}
                      className="h-full w-full rounded-3xl object-cover object-center"
                    />
                  </motion.a>
                ) : (
                  <motion.div
                    key={testimonial.src}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: randomRotateY(),
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0.7,
                      scale: isActive(index) ? 1 : 0.95,
                      z: isActive(index) ? 0 : -100,
                      rotate: isActive(index) ? 0 : randomRotateY(),
                      zIndex: isActive(index)
                        ? 40
                        : projects.length + 2 - index,
                      y: isActive(index) ? [0, -80, 0] : 0,
                      x: isActive(index) ? translateX : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: randomRotateY(),
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 origin-bottom"
                    onClick={(e) => {
                      if (swiped.current) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
                  >
                    <img
                      src={testimonial.src}
                      alt={testimonial.name}
                      width={500}
                      height={500}
                      draggable={false}
                      className="h-full w-full rounded-3xl object-cover object-center"
                    />
                  </motion.div>
                ),
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-col justify-between md:py-4 items-center md:items-start text-center md:text-left">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
            className="mt-8 md:mt-24"
          >
            {projects[active].href !== "" ? (
              <a
                href={projects[active].href}
                target={projects[active].target ?? "_self"}
                className="font-bold text-black text-4xl dark:text-white"
              >
                {projects[active].name}
              </a>
            ) : (
              <h3 className="font-bold text-black text-4xl dark:text-white">
                {projects[active].name}
              </h3>
            )}
            {projects[active].href !== "" ? (
              <>
                <br />
                <a
                  href={projects[active].href}
                  target={projects[active].target ?? "_self"}
                  className="text-gray-400 mt-5"
                >
                  {projects[active].subtitle}
                </a>
              </>
            ) : (
              <p className=" text-gray-400 mt-5">{projects[active].subtitle}</p>
            )}
          </motion.div>
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
