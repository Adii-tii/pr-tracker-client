function Tag({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-surface-elev text-secondary",
    open: "bg-emerald-500/12 text-emerald-400",
    merged: "bg-purple-500/12 text-purple-400",
    review: "bg-amber-500/12 text-amber-400",
    draft: "bg-zinc-500/12 text-zinc-400",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export default Tag;