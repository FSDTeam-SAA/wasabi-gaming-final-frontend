import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Filter, Bookmark, Search } from "lucide-react";
import { cn } from "@/utils/cn";

interface SearchFilterBarProps {
    onSavedClick: () => void;
    savedCount: number;
    showSaved: boolean;
}

const SearchFilterBar = ({ onSavedClick, savedCount, showSaved }: SearchFilterBarProps) => {
    const tags = [
        "All",
        "Corporate Law",
        "M&A",
        "Banking",
        "Real Estate",
        "Litigation",
        "IP",
        "Tax",
    ];

    return (
        <div className="bg-white p-4 md:p-6 rounded-3xl border border-gray-200">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-3/4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                        placeholder="Search law firms by name or expertise..."
                        className="pl-10 h-12 rounded-2xl bg-gray-50 border-transparent focus:bg-white transition-all"
                    />
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <Button
                        variant="outline"
                        onClick={onSavedClick}
                        className={cn(
                            "flex-1 md:flex-none h-12 rounded-2xl gap-2",
                            showSaved ? "bg-[#ffff00] border-[#ffff00] text-black hover:bg-[#e6e600]" : "bg-gray-50 border-transparent hover:bg-gray-100"
                        )}
                    >
                        <Bookmark className="w-4 h-4" />
                        Saved ({savedCount})
                    </Button>
                    <Button
                        variant="outline"
                        className="flex-1 md:flex-none h-12 rounded-2xl gap-2 bg-gray-50 border-transparent hover:bg-gray-100"
                    >
                        <Filter className="w-4 h-4" />
                        Filters
                    </Button>
                </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                    <Badge
                        key={i}
                        variant="secondary"
                        className={cn(
                            "rounded-full px-4 py-1.5 text-xs md:text-sm font-normal cursor-pointer hover:bg-gray-200 transition-colors",
                            tag === "All" ? "bg-[#ffff00] hover:bg-[#e6e600] text-black" : "bg-gray-100 text-gray-600"
                        )}
                    >
                        {tag}
                    </Badge>
                ))}
            </div>

            <p className="text-gray-500 mt-4 text-sm md:text-base pl-1">
                {showSaved ? `Showing ${savedCount} saved law firms` : "Showing 9 of 9 law firms"}
            </p>
        </div>
    );
};

export default SearchFilterBar;
