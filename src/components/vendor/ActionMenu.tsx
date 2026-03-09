"use client";

import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import { createPortal } from "react-dom";

export interface ActionMenuOption {
  id: number | string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export interface ActionMenuProps {
  items: ActionMenuOption[];
  trigger: React.ReactNode;
  align?: "left" | "right";
  width?: number;
  sideOffset?: number;
  zIndex?: number;
  title?: string;
}

export default function ActionMenu({
  items,
  trigger,
  align = "right",
  width = 200,
  sideOffset = 8,
  zIndex = 1000,
  title,
}: ActionMenuProps) {
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

  const handleItemClick = (item: ActionMenuOption) => {
    item.onClick?.();
    setOpen(false);
  };

  return (
    <>
      {/* Custom trigger button */}
      <button
        ref={btnRef}
        onClick={() => setOpen((s) => !s)}
        className="relative"
        aria-label="Toggle Menu"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {trigger}
      </button>

      {/* Floating popup in portal */}
      {open &&
        portalRef.current &&
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
              className={`fixed rounded-lg border border-gray-200 bg-white shadow-lg overflow-auto ${
                placement === "top" ? "origin-bottom" : "origin-top"
              }`}
              style={{
                top: pos.top,
                left: pos.left,
                width,
                zIndex,
                maxHeight: "min(calc(100vh - 16px), 360px)",
              }}
            >
              {title && (
                <div className="px-3 py-1.5 border-b border-gray-200">
                  <h3 className="text-base font-semibold text-gray-900">
                    {title}
                  </h3>
                </div>
              )}
              <ul className="py-1">
                {items.map((item) => (
                  <li key={String(item.id)}>
                    <button
                      type="button"
                      disabled={item.disabled}
                      onClick={() => handleItemClick(item)}
                      className="w-full lg:w-auto flex items-center gap-3 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 cursor-pointer transition-colors"
                    >
                      {item.icon && (
                        <span className="text-gray-600">{item.icon}</span>
                      )}
                      <span className="truncate">{item.label}</span>
                    </button>
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
