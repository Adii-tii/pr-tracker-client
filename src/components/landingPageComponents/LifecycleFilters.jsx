
function LifecycleFilters({ active, onChange }) {
    const filters = ["All", "Ready", "Blocked", "Review", "Stale"];

    return (
        <div className="flex gap-1 rounded-lg bg-surface-elev p-1">
            {filters.map((f) => (
                <button
                    key={f}
                    onClick={() => onChange(f)}
                    className={`px-2.5 py-1 text-xs rounded-md transition-colors ${active === f
                        ? "bg-selected text-primary"
                        : "text-secondary hover:text-primary hover:bg-hover"
                        }`}
                >
                    {f}
                </button>
            ))}
        </div>
    );
}

export default LifecycleFilters;