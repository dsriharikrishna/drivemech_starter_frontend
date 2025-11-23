"use client";

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { DotsThreeVertical } from "phosphor-react";
import Link from "next/link";

export interface MenuOptions {
  id: number | string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: (data?: any) => void;
  disabled?: boolean;
}

export interface MenuProps {
  items: MenuOptions[];
  data?: any;
  align?: "left" | "right";
  width?: number;
  sideOffset?: number;
  zIndex?: number;
  buttonClassName?: string;
}

export default function Menu({
  items,
  data,
  align = "right",
  width = 240,
  sideOffset = 8,
  zIndex = 1000,
  buttonClassName = "h-8 w-8 inline-flex items-center justify-center rounded hover:bg-gray-100",
}: MenuProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const portalRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [placement, setPlacement] = useState<"bottom" | "top">("bottom");

  // create portal container
  useEffect(() => {
    const el = document.createElement("div");
    portalRef.current = el;
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
      portalRef.current = null;
    };
  }, []);

  const computeAndSetPosition = useCallback(() => {
    const trigger = btnRef.current;
    if (!trigger) return;

    const r = trigger.getBoundingClientRect();
    const menuH = menuRef.current?.offsetHeight ?? 0;

    // Horizontal
    const left =
      align === "right"
        ? Math.min(r.right - width, window.innerWidth - width - 8)
        : Math.max(8, r.left);

    // Vertical: flip if not enough space below
    const spaceBelow = window.innerHeight - r.bottom - sideOffset;
    const spaceAbove = r.top - sideOffset;

    let top: number;
    if (menuH && spaceBelow < menuH && spaceAbove >= menuH) {
      // open upwards
      top = Math.max(8, r.top - menuH - sideOffset);
      setPlacement("top");
    } else {
      // open downwards, clamp if needed
      const desired = r.bottom + sideOffset;
      const clamped = Math.min(desired, window.innerHeight - (menuH || 0) - 8);
      top = Math.max(8, clamped);
      setPlacement("bottom");
    }

    setPos({ top, left });
  }, [align, sideOffset, width]);

  useLayoutEffect(() => {
    if (open) computeAndSetPosition();
  }, [open, computeAndSetPosition]);

  // Re-measure after it renders (height is known)
  useEffect(() => {
    if (!open) return;
    // small microtask to ensure the menu is in the DOM
    const t = setTimeout(computeAndSetPosition, 0);
    return () => clearTimeout(t);
  }, [open, items.length, computeAndSetPosition]);

  // Reposition on scroll/resize; close on ESC
  useEffect(() => {
    if (!open) return;
    const onScrollOrResize = () => computeAndSetPosition();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, computeAndSetPosition]);

  const handleItemClick = (item: MenuOptions) => {
    item.onClick?.(data);
    setOpen(false);
  };

  return (
    <>
      {/* Kebab trigger */}
      <button
        ref={btnRef}
        onClick={() => setOpen((s) => !s)}
        className={buttonClassName}
        aria-label="Toggle Menu"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <DotsThreeVertical size={20} weight="regular" />
      </button>

      {/* Floating popup in portal (never clipped), auto-flips up/down */}
      {open && portalRef.current &&
        createPortal(
          <>
            {/* backdrop for outside click */}
            <div
              className="fixed inset-0"
              style={{ zIndex: zIndex - 1 }}
              onClick={() => setOpen(false)}
            />
            <div
              ref={menuRef}
              role="menu"
              className={`fixed rounded-lg border border-border bg-gray-50 overflow-auto ${
                placement === "top" ? "origin-bottom" : "origin-top"
              }`}
              style={{
                top: placement !== 'top' ?  pos.top-20 : pos.top+23,
                left: pos.left-22,
                width,
                zIndex,
                maxHeight: "min(calc(100vh - 16px), 360px)", // guard for very small viewports
              }}
            >
              <ul className="py-1">
                {items.map((item) => (
                  <li key={String(item.id)}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={() => handleItemClick(item)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                      >
                        {item.icon}
                        <span className="truncate">{item.label}</span>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        disabled={item.disabled}
                        onClick={() => handleItemClick(item)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-light-redbackground hover:text-primary disabled:opacity-50 cursor-pointer"
                      >
                        {item.icon}
                        <span className="truncate">{item.label}</span>
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </>,
          portalRef.current
        )}
    </>
  );
}
