"use client";
import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

export default function Button({ variant = "primary", size = "md", className, ...props }: Props) {
  const base = "inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed";
  const sizes = {
    sm: "px-2.5 py-1.5 text-sm",
    md: "px-3.5 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  }[size];
  const variants = {
    primary: "bg-gradient-to-tr from-indigo-600 via-sky-500 to-cyan-400 text-white hover:opacity-90",
    secondary: "bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700",
    ghost: "bg-transparent text-slate-100 hover:bg-slate-800/40",
  }[variant];
  return <button className={clsx(base, sizes, variants, className)} {...props} />;
}