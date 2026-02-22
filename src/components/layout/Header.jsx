import { Bell, Search } from "lucide-react";

function Header() {
    return (
        <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b border-divider bg-bg-80 backdrop-blur px-4">
            {/* Left */}
            <div className="flex items-center gap-2 font-semibold tracking-tight">
                <div className="h-5 w-5 rounded-sm bg-white" />
                <span className="text-primary">Repo name</span>
            </div>

            {/* Center */}
            <div className="hidden w-full max-w-md items-center gap-2 rounded-md border border-divider bg-surface px-3 py-1.5 md:flex">
                <Search className="h-4 w-4 text-secondary" />
                <input
                    placeholder="Search pull requests..."
                    className="w-full bg-transparent text-sm text-primary placeholder:text-secondary outline-none"
                />
            </div>  

            {/* Right */}
            <div className="flex items-center gap-3">
                <button className="rounded-md p-2 hover:bg-hover">
                    <Bell className="h-4 w-4 text-secondary" />
                </button>
                <div className="h-7 w-7 rounded-full bg-surface-elev" />
            </div>
        </header>
    );
}

export default Header