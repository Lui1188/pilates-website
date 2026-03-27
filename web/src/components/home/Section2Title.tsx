"use client";

import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

export default function Section2Title({ title }: { title: string }) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [direction, setDirection] = useState<"down" | "up">("down");

    const { scrollY, scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    useMotionValueEvent(scrollY, "change", (current) => {
        const previous = scrollY.getPrevious();

        if (previous === undefined) return;

        if (current > previous) {
            setDirection("down");
        } else if (current < previous) {
            setDirection("up");
        }
    });

    const downX = useTransform(scrollYProgress, [0, 1], ["100%", "-100%"]);
    const upX = useTransform(scrollYProgress, [1, 0], ["-100%", "100%"]);

    const smoothDownX = useSpring(downX, {
        stiffness: 90,
        damping: 20,
    });

    const smoothUpX = useSpring(upX, {
        stiffness: 90,
        damping: 20,
    });

    return (
        <div ref={ref} className="w-full overflow-hidden">
            <motion.h2
                style={{ x: direction === "down" ? smoothDownX : smoothUpX }}
                className="whitespace-nowrap text-[88px] leading-none uppercase tracking-[0.08em] text-[#ead6d6] md:text-[120px] lg:text-[200px]"
            >
                {title}
            </motion.h2>
        </div>
    );
}