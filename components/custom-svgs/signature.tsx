"use client"

import { motion } from 'motion/react';

interface SignatureProps {
    className?: string;
}

export default function Signature({ className = "h-18 w-auto md:h-25" }: SignatureProps) {
    return (
        <svg
            viewBox="300 200 400 570"
            className={`text-foreground ${className}`}
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Stroke 1: Top loops & internal wave */}
            <motion.path
                d="M 375 440 
                   C 385 410, 390 410, 395 410
                   C 400 410, 405 425, 410 425
                   C 415 425, 420 395, 425 395
                   C 430 395, 432 410, 434 380
                   C 435 320, 395 280, 370 290
                   C 345 300, 340 390, 348 435
                   C 355 490, 385 520, 425 510
                   C 465 500, 510 490, 515 450
                   C 520 410, 490 360, 495 330
                   C 500 270, 540 210, 575 215
                   C 605 220, 615 310, 600 380
                   C 585 440, 575 480, 566 520"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                    duration: 1.2,
                    ease: [0.445, 0.05, 0.55, 0.95]
                }}
            />

            {/* Stroke 2: Bottom cursive/Z shape */}
            <motion.path
                d="M 460 570
                   C 475 550, 490 590, 515 570
                   C 530 550, 510 630, 490 680
                   C 475 720, 495 745, 515 745
                   C 550 745, 600 710, 640 690"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                    duration: 1.2,
                    delay: 1.6,
                    ease: [0.445, 0.05, 0.55, 0.95]
                }}
            />

            {/* Stroke 3: Accent Dot */}
            <motion.circle
                cx="667"
                cy="600"
                r="4"
                fill="currentColor"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                    duration: 0.3,
                    delay: 2.8,
                    ease: [0.445, 0.05, 0.55, 0.95]
                }}
            />
        </svg>
    );
}