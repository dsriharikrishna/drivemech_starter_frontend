import React from "react";
import clsx from "clsx";

type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "caption"
  | "overline"
  | "blockquote"
  | "code"
  | "lead"
  | "small"
  | "large";

type TypographyProps = {
  variant?: Variant;
  as?: React.ElementType;
  color?: "default" | "muted" | "primary" | "danger" | "success" | "warning" | "inherit";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
  align?: "left" | "center" | "right" | "justify" | "start" | "end";
  truncate?: boolean;
  responsive?: boolean;
  className?: string;
  children: React.ReactNode;
  
  // ✅ NEW OPTIONAL PROPS
  gradient?: boolean;
  gradientColors?: string;
  underline?: boolean;
  strikeThrough?: boolean;
  italic?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
  noWrap?: boolean;
  lineClamp?: 1 | 2 | 3 | 4 | 5 | 6;
  letterSpacing?: "tighter" | "tight" | "normal" | "wide" | "wider" | "widest";
  wordBreak?: "normal" | "words" | "all" | "truncate";
  transform?: "normal" | "uppercase" | "lowercase" | "capitalize" | "none";
  
  // ✅ ENHANCED RESPONSIVE PROPS
  fluid?: boolean; // Enable fluid typography
  minFontSize?: string; // Minimum font size for fluid typography
  maxFontSize?: string; // Maximum font size for fluid typography
  viewportMin?: number; // Minimum viewport width for fluid typography
  viewportMax?: number; // Maximum viewport width for fluid typography
  
  // ✅ MISSING PROPS - Added
  title?: string;
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  download?: boolean | string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
  
  // ✅ Accessibility
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  role?: string;
  tabIndex?: number;
};

// ✅ ENHANCED: Fluid typography scales for better responsiveness
const fluidTypographyScales = {
  h1: { min: "1.75rem", max: "3.75rem" }, // 28px → 60px
  h2: { min: "1.5rem", max: "3rem" },     // 24px → 48px
  h3: { min: "1.25rem", max: "2.25rem" }, // 20px → 36px
  h4: { min: "1.125rem", max: "1.875rem" }, // 18px → 30px
  h5: { min: "1rem", max: "1.5rem" },     // 16px → 24px
  h6: { min: "0.875rem", max: "1.25rem" }, // 14px → 20px
  body: { min: "0.5rem", max: "0.65rem" }, // 14px → 18px
  large: { min: "1rem", max: "1.25rem" }, // 16px → 20px
  small: { min: "0.75rem", max: "0.875rem" }, // 12px → 14px
  caption: { min: "0.75rem", max: "0.875rem" }, // 12px → 14px
  lead: { min: "1rem", max: "1.25rem" },  // 16px → 20px
  // Add missing variants with reasonable defaults:
  blockquote: { min: "1rem", max: "2rem" }, // 16px → 32px
  overline: { min: "0.75rem", max: "0.875rem" }, // 12px → 14px
  code: { min: "0.55rem", max: "0.65rem" }, // 12px → 14px
};

// ✅ ENHANCED: Advanced responsive styles with better breakpoints
const responsiveStyles: Record<Variant, string> = {
  h1: "text-[1.75rem] leading-tight xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
  h2: "text-[1.5rem] leading-tight xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight",
  h3: "text-[1.25rem] leading-tight xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight",
  h4: "text-[1.125rem] leading-tight xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-tight",
  h5: "text-base xs:text-lg sm:text-xl md:text-2xl font-medium",
  h6: "text-sm xs:text-base sm:text-lg md:text-xl font-medium",
  body: "text-sm xs:text-base sm:text-sm md:text-md leading-relaxed",
  caption: "text-xs xs:text-sm sm:text-base",
  overline: "text-xs xs:text-xs sm:text-sm uppercase tracking-wide",
  blockquote: "text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl italic border-l-4 pl-4 border-gray-300 dark:border-gray-600",
  // ✅ NEW VARIANTS
  code: "text-xs xs:text-sm sm:text-sm font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded",
  lead: "text-base xs:text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed",
  small: "text-xs xs:text-xs sm:text-sm",
  large: "text-base xs:text-lg sm:text-xl",
};

// ✅ ENHANCED: Fixed sizes with better mobile scaling
const fixedStyles: Record<Variant, string> = {
  h1: "text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight",
  h2: "text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight",
  h3: "text-xl xs:text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight",
  h4: "text-lg xs:text-xl sm:text-2xl md:text-3xl font-medium tracking-tight",
  h5: "text-base xs:text-lg sm:text-xl md:text-2xl font-medium",
  h6: "text-sm xs:text-base sm:text-lg md:text-xl font-medium",
  body: "text-sm xs:text-base sm:text-sm md:text-md leading-relaxed",
  caption: "text-xs xs:text-sm sm:text-base",
  overline: "text-xs xs:text-xs sm:text-sm uppercase tracking-wide",
  blockquote: "text-base xs:text-lg sm:text-xl md:text-2xl italic border-l-4 pl-4 border-gray-300 dark:border-gray-600",
  code: "text-sm xs:text-base font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded",
  lead: "text-lg xs:text-xl sm:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed",
  small: "text-xs xs:text-xs sm:text-sm",
  large: "text-lg xs:text-xl sm:text-2xl",
};

// ✅ Enhanced colors with dark mode support
const colorStyles: Record<NonNullable<TypographyProps["color"]>, string> = {
  default: "text-gray-900 dark:text-gray-100",
  muted: "text-gray-600 dark:text-gray-400",
  primary: "text-primary-600 dark:text-primary-400",
  danger: "text-danger-600 dark:text-danger-400",
  success: "text-success-600 dark:text-success-400",
  warning: "text-warning-600 dark:text-warning-400",
  inherit: "text-inherit",
};

// ✅ Enhanced font weights
const weightStyles = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

// ✅ Enhanced text alignment
const alignStyles = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
  start: "text-start",
  end: "text-end",
};

// ✅ Letter spacing
const letterSpacingStyles = {
  tighter: "tracking-tighter",
  tight: "tracking-tight",
  normal: "tracking-normal",
  wide: "tracking-wide",
  wider: "tracking-wider",
  widest: "tracking-widest",
};

// ✅ Word break
const wordBreakStyles = {
  normal: "break-normal",
  words: "break-words",
  all: "break-all",
  truncate: "truncate",
};

// ✅ Line clamp utilities
const lineClampStyles = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
  6: "line-clamp-6",
};

// ✅ Enhanced variant → Element mapping
const variantToElement: Record<Variant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body: "p",
  caption: "span",
  overline: "span",
  blockquote: "blockquote",
  code: "code",
  lead: "p",
  small: "small",
  large: "p",
};

// ✅ Fluid typography calculation
// const getFluidTypographyStyles = (
//   variant: Variant,
//   minFontSize?: string,
//   maxFontSize?: string,
//   viewportMin: number = 320,
//   viewportMax: number = 1920
// ): string => {
//   const scale = fluidTypographyScales[variant] || fluidTypographyScales.body;
//   const minSize = minFontSize || scale.min;
//   const maxSize = maxFontSize || scale.max;
  
//   return `
//     font-size: clamp(
//       ${minSize},
//       calc(${minSize} + (${parseFloat(maxSize) - parseFloat(minSize)}) * ((100vw - ${viewportMin}px) / (${viewportMax} - ${viewportMin}))),
//       ${maxSize}
//     )
//   `;
// };

export default function Typography({
  variant = "body",
  as,
  color = "default",
  weight = "normal",
  align = "left",
  truncate = false,
  responsive = true,
  className,
  children,
  
  // ✅ NEW PROPS WITH DEFAULTS
  gradient = false,
  gradientColors = "from-primary-600 to-primary-400",
  underline = false,
  strikeThrough = false,
  italic = false,
  uppercase = false,
  lowercase = false,
  capitalize = false,
  noWrap = false,
  lineClamp,
  letterSpacing = "normal",
  wordBreak = "normal",
  transform,
  
  // ✅ ENHANCED RESPONSIVE PROPS
  fluid = false,
  minFontSize,
  maxFontSize,
  viewportMin = 320,
  viewportMax = 1920,
  
  // ✅ MISSING PROPS - Added
  title,
  href,
  target,
  rel,
  download,
  onClick,
  onMouseEnter,
  onMouseLeave,
  
  // ✅ Accessibility props
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  role,
  tabIndex,
}: TypographyProps) {
  const Component: React.ElementType = as || variantToElement[variant];
  const baseStyle = responsive ? responsiveStyles[variant] : fixedStyles[variant];

  // ✅ Handle text transform (new way with priority)
  const getTextTransform = () => {
    if (transform) {
      switch (transform) {
        case "uppercase": return "uppercase";
        case "lowercase": return "lowercase";
        case "capitalize": return "capitalize";
        case "none": return "normal-case";
        default: return "";
      }
    }
    
    // Backward compatibility with old boolean props
    if (uppercase) return "uppercase";
    if (lowercase) return "lowercase";
    if (capitalize) return "capitalize";
    return "";
  };

  const textTransform = getTextTransform();

  // ✅ Determine if it's a link element
  const isLink = href !== undefined;

  // ✅ Auto-add noopener noreferrer for external links
  const linkRel = isLink && target === '_blank' 
    ? (rel ? `${rel} noopener noreferrer` : 'noopener noreferrer')
    : rel;

  return (
    <Component
      className={clsx(
        baseStyle,
        colorStyles[color],
        weightStyles[weight],
        alignStyles[align],
        letterSpacingStyles[letterSpacing],
        wordBreakStyles[wordBreak],
        "transition-colors duration-200 ease-in-out",
        {
          // ✅ Existing styles
          "truncate": truncate,
          "leading-tight": variant.startsWith("h"),
          "leading-relaxed": variant === "body" || variant === "lead",
          
          // ✅ New styles
          "bg-gradient-to-r bg-clip-text text-transparent": gradient,
          [gradientColors]: gradient,
          "underline": underline,
          "line-through": strikeThrough,
          "italic": italic,
          "whitespace-nowrap": noWrap && !lineClamp,
          [lineClampStyles[lineClamp!]]: lineClamp,
          [textTransform]: textTransform,

          // ✅ Link-specific styles
          "hover:text-blue-800 cursor-pointer": isLink && color === "primary",
          "hover:opacity-80 cursor-pointer": isLink && color !== "primary",
        },
        className
      )}
      
      // ✅ Fluid typography inline styles
      style={fluid ? { 
        fontSize: `clamp(${minFontSize || fluidTypographyScales[variant]?.min || '1rem'}, 
                 calc(${minFontSize || fluidTypographyScales[variant]?.min || '1rem'} + 
                 (${parseFloat(maxFontSize || fluidTypographyScales[variant]?.max || '1.25rem') - 
                 parseFloat(minFontSize || fluidTypographyScales[variant]?.min || '1rem')}) * 
                 ((100vw - ${viewportMin}px) / (${viewportMax} - ${viewportMin}))), 
                 ${maxFontSize || fluidTypographyScales[variant]?.max || '1.25rem'})` 
      } : undefined}
      
      // ✅ URL-related props for links
      href={href}
      target={target}
      rel={linkRel}
      download={download}
      
      // ✅ Event handlers
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      
      // ✅ Title and accessibility
      title={title}
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      role={role}
      tabIndex={tabIndex}
    >
      {children}
    </Component>
  );
}

// ✅ Additional helper components for common patterns
export function Heading1(props: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="h1" {...props} />;
}

export function Heading2(props: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="h2" {...props} />;
}

export function Body(props: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="body" {...props} />;
}

export function Caption(props: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="caption" {...props} />;
}

export function Code(props: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="code" {...props} />;
}

export function Small(props: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="small" {...props} />;
}

export function Large(props: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="large" {...props} />;
}

export function Link(props: Omit<TypographyProps, 'variant' | 'as'> & {
  variant?: "body" | "caption" | "overline" | "small";
}) {
  return (
    <Typography
      variant={props.variant || "body"}
      color="primary"
      {...props}
    />
  );
}

// ✅ Type exports for better DX
export type { TypographyProps, Variant };