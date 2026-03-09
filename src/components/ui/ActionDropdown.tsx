"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

export interface ActionDropdownOption {
    id: string | number;
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    color?: string;
}

export interface ActionDropdownProps {
    trigger: React.ReactNode;
    items: ActionDropdownOption[];
    align?: "left" | "right";
    width?: number;
    sideOffset?: number;
    zIndex?: number;
}

export default function ActionDropdown({
    trigger,
    items,
    align = "right",
    width = 140,
    sideOffset = 4,
    zIndex = 1000,
}: ActionDropdownProps) {
    const [open, setOpen] = useState(false);
    const [pos, setPos] = useState({ top: 0, left: 0 });
    const [placement, setPlacement] = useState<"bottom" | "top">("bottom");

    const triggerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const portalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = document.createElement("div");
        portalRef.current = el;
        document.body.appendChild(el);
        return () => {
            if (portalRef.current) {
                document.body.removeChild(portalRef.current);
            }
            portalRef.current = null;
        };
    }, []);

    const computeAndSetPosition = useCallback(() => {
        const trigger = triggerRef.current;
        if (!trigger) return;

        const r = trigger.getBoundingClientRect();
        const menuH = menuRef.current?.offsetHeight ?? 0;

        const left =
            align === "right"
                ? Math.min(r.right - width, window.innerWidth - width - 8)
                : Math.max(8, r.left);

        const spaceBelow = window.innerHeight - r.bottom - sideOffset;
        const spaceAbove = r.top - sideOffset;

        let top: number;
        if (menuH && spaceBelow < menuH && spaceAbove >= menuH) {
            top = Math.max(8, r.top - menuH - sideOffset);
            setPlacement("top");
        } else {
            top = r.bottom + sideOffset;
            setPlacement("bottom");
        }

        setPos({ top, left });
    }, [align, sideOffset, width]);

    useEffect(() => {
        if (open) {
            computeAndSetPosition();
            const onScrollOrResize = () => computeAndSetPosition();
            const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
            const onClickOutside = (e: MouseEvent) => {
                if (
                    menuRef.current && !menuRef.current.contains(e.target as Node) &&
                    triggerRef.current && !triggerRef.current.contains(e.target as Node)
                ) {
                    setOpen(false);
                }
            };

            window.addEventListener("scroll", onScrollOrResize, true);
            window.addEventListener("resize", onScrollOrResize);
            window.addEventListener("keydown", onKey);
            document.addEventListener("mousedown", onClickOutside);

            return () => {
                window.removeEventListener("scroll", onScrollOrResize, true);
                window.removeEventListener("resize", onScrollOrResize);
                window.removeEventListener("keydown", onKey);
                document.removeEventListener("mousedown", onClickOutside);
            };
        }
    }, [open, computeAndSetPosition]);

    return (
        <div className="relative inline-block">
            <div
                ref={triggerRef}
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen(!open);
                }}
                className="cursor-pointer"
            >
                {trigger}
            </div>

            {open && portalRef.current && createPortal(
                <div
                    ref={menuRef}
                    className={`fixed bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden transition-all duration-200 ease-out`}
                    style={{
                        top: pos.top,
                        left: pos.left,
                        width,
                        zIndex,
                    }}
                >
                    <div className="py-1">
                        {items.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                disabled={item.disabled}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    item.onClick?.();
                                    setOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors disabled:opacity-50 text-left`}
                            >
                                {item.icon && <span style={{ color: item.color }} className="flex-shrink-0">{item.icon}</span>}
                                <span className="font-normal text-gray-700">{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>,
                portalRef.current
            )}
        </div>
    );
}
