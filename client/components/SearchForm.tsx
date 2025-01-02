"use client";
import { usejobsContext } from '@/context/jobsContext';
import { Search } from "lucide-react";
import { location } from "./utils/Icons";

const SearchForm = () => {
    const { searchJobs, handleSearchChange, searchQuery } = usejobsContext();
    return (
        <form
            className="relative flex items-center"
            onSubmit={(e) => {
                e.preventDefault();
                const query = `title=${searchQuery.title}&location=${searchQuery.location}&tags=${searchQuery.tags}&jobType=${searchQuery.jobType}&skills=${searchQuery.skills}`;
                searchJobs(query);
            }}
        >
            <div className="flex-1 relative">
                <input
                    type="text"
                    id="job-title"
                    name="title"
                    value={searchQuery.title}
                    onChange={(e) => handleSearchChange("title", e.target.value)}
                    placeholder="Job Title"
                    className="w-full py-3 px-4 text-lg text-black pl-12 rounded-tl-full rounded-bl-full"
                />
                <span>
                    <Search
                        size={20}
                        className="text-gray-400 absolute left-4 top-[50%] translate-y-[-50%]"
                    />
                </span>
            </div>
            <div className="absolute top-1/2 left-[48%] transform -translate-x-1/2 -translate-y-1/2 w-[2px] h-8 bg-gray-300"></div>

            <div className="flex-1 relative">
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={searchQuery.location}
                    onChange={(e) => handleSearchChange("location", e.target.value)}
                    placeholder="Location"
                    className="w-full py-3 px-4 text-lg text-black pl-12 rounded-tr-full rounded-br-full"
                />
                <span className="text-gray-400 absolute left-4 top-[50%] translate-y-[-50%]">
                    {location}
                </span>
            </div>
            <button
                type="submit"
                className="bg-[#7263F3] hover:bg-[#7263F3]/90 text-white text-xl px-8 py-3 rounded-full absolute right-2 top-[50%] transform translate-y-[-50%] h-[calc(100%-1rem)]"
            >
                Search
            </button>
        </form>
    );
};

export default SearchForm;
