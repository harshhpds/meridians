import { useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  type Variants,
} from 'framer-motion';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const lineReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function StaggerGroup({ children, className, delay = 0 }: StaggerProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delayChildren: delay }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={lineReveal}>
      {children}
    </motion.div>
  );
}

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  scaleFrom?: number;
};

export function ParallaxImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  scaleFrom = 1.1,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [scaleFrom, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ scale, y }}
        className={`h-full w-full object-cover ${imgClassName}`}
        loading="lazy"
      />
    </div>
  );
}

type MagneticButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'solid' | 'outline' | 'underline';
  className?: string;
  type?: 'button' | 'submit';
};

export function MagneticButton({
  children,
  onClick,
  href,
  variant = 'solid',
  className = '',
  type = 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.25, y: y * 0.25 });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const base =
    'group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium tracking-wide transition-colors duration-300';
  const variants = {
    solid: 'bg-gold text-obsidian hover:bg-gold-400',
    outline: 'border border-gold/60 text-gold hover:bg-gold hover:text-obsidian',
    underline: 'text-ivory hover:text-gold px-0 py-1',
  };

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {variant !== 'underline' && (
        <motion.span
          className="relative z-10"
          initial={false}
          animate={{ x: pos.x > 0 ? 4 : 0 }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      )}
      {variant === 'underline' && (
        <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
      )}
    </>
  );

  const motionProps = {
    animate: { x: pos.x, y: pos.y },
    transition: { type: 'spring' as const, stiffness: 200, damping: 15 },
    onMouseMove: handleMove,
    onMouseLeave: reset,
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={`${base} ${variants[variant]} ${className}`}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}

export function WaveDivider({
  position = 'bottom',
  fromColor = '#171814',
  toColor = '#F4F0E7',
  className = '',
}: {
  position?: 'top' | 'bottom';
  fromColor?: string;
  toColor?: string;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute left-0 right-0 z-10 w-full ${className}`}
      style={{ [position]: -1 } as React.CSSProperties}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full"
        style={{ height: '80px' }}
      >
        {position === 'bottom' ? (
          <path
            d="M0,0 L1440,0 L1440,60 C1080,110 720,10 360,50 C180,70 90,90 0,70 L0,120 L0,0 Z"
            fill={toColor}
          />
        ) : (
          <path
            d="M0,120 L0,50 C90,70 180,50 360,30 C720,-10 1080,90 1440,40 L1440,120 Z"
            fill={toColor}
          />
        )}
      </svg>
    </div>
  );
}
