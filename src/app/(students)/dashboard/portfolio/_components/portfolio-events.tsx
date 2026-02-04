// "use client";

// import React from "react";
// import { MapPin, ArrowUpRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useQuery } from "@tanstack/react-query";
// import { EventsResponse, Event } from "@/types/portfolio";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// export default function PortfolioEvents() {
//     const router = useRouter()
//     const { data, isLoading, isError } = useQuery<EventsResponse>({
//         queryKey: ["events"],
//         queryFn: async () => {
//             const res = await fetch(
//                 `${process.env.NEXT_PUBLIC_API_BASE_URL}/event`
//             );
//             if (!res.ok) throw new Error("Failed to load events");
//             return res.json();
//         },
//     });

//     const events = data?.data ?? [];

//     return (
//         <section className="py-16 px-6 bg-[#FEFDF6] border-[#FFFFE6]">
//             <div className="container mx-auto">

//                 {/* Heading */}
//                 <div className="text-center mb-16 space-y-4">
//                     <h2 className="text-3xl  text-slate-800">
//                         About the events
//                     </h2>
//                 </div>

//                 {/* LOADING STATE */}
//                 {isLoading && (
//                     <div className="space-y-24">
//                         {[1, 2, 3].map((i) => (
//                             <div
//                                 key={i}
//                                 className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
//                             >
//                                 <div className="flex-1 space-y-4">
//                                     <Skeleton className="h-4 w-32" />
//                                     <Skeleton className="h-6 w-3/4" />
//                                     <Skeleton className="h-4 w-40" />
//                                     <Skeleton className="h-20 w-full" />
//                                     <Skeleton className="h-10 w-40 rounded-full" />
//                                 </div>

//                                 <div className="flex-1 w-full">
//                                     <Skeleton className="aspect-[4/5] md:aspect-square rounded-xl" />
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}

//                 {/* ERROR STATE */}
//                 {isError && (
//                     <p className="text-center text-red-500 font-medium">
//                         Failed to load events.
//                     </p>
//                 )}

//                 {/* DATA STATE */}
//                 {!isLoading && !isError && (
//                     <div className="space-y-24">
//                         {events.map((event: Event, index: number) => {
//                             const image =
//                                 event.thumbnail ||
//                                 event.thamble ||
//                                 "/event-placeholder.png";

//                             return (
//                                 <div
//                                     key={event._id}
//                                     className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""
//                                         }`}
//                                 >
//                                     {/* TEXT AREA */}
//                                     <div className="flex-1 relative">
//                                         <div className="absolute -top-10 left-0 w-12 h-12 bg-white rounded-full border-2 border-dashed border-yellow-400 flex items-center justify-center shadow-sm">
//                                             <MapPin className="w-5 h-5 text-yellow-500" />
//                                         </div>

//                                         <div className="bg-[#F9F9F9] p-8 rounded-3xl space-y-3">
//                                             <p className="text-[10px] md:text-xs mb-1 font-semibold text-slate-400 uppercase ">
//                                                 {new Date(event.date).toDateString()}
//                                             </p>

//                                             <h3 className="text-xl  text-[#000000] leading-tight">
//                                                 {event.title}
//                                             </h3>

//                                             {event.eventType && (
//                                                 <p className="text-[14px] text-[#C49F18]">
//                                                     {event.eventType}
//                                                 </p>
//                                             )}

//                                             <p
//                                                 className="text-sm  text-slate-500 leading-relaxed line-clamp-3"
//                                                 dangerouslySetInnerHTML={{
//                                                     __html: event.description,
//                                                 }}
//                                             />

//                                             <Button
//                                                 onClick={() => router.push(`/portfolio/${event._id}`)}
//                                                 variant="outline"
//                                                 className="mt-10 py-2  rounded-full border-[#FFFF00] text-[#B2B200] font-bold text-xs h-10 px-6 hover:bg-yellow-50"
//                                             >
//                                                 <ArrowUpRight className="w-4 h-4 mr-2 text-[#B2B200]" />
//                                                 Go to event
//                                             </Button>
//                                         </div>
//                                     </div>

//                                     {/* IMAGE AREA */}
//                                     <div className="flex-1 w-full h-[400px]">
//                                         <div className="border-4  border-[#FDC700] p-3">
//                                             <Image
//                                                 src={image}
//                                                 width={600}
//                                                 height={600}
//                                                 alt={event.title}
//                                                 className="object-cover w-full h-full"
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// }


"use client";

import React from "react";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { EventsResponse, Event } from "@/types/portfolio";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PortfolioEvents() {
    const router = useRouter();

    const { data, isLoading, isError } = useQuery<EventsResponse>({
        queryKey: ["events"],
        queryFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/event`
            );
            if (!res.ok) throw new Error("Failed to load events");
            return res.json();
        },
    });

    const events = data?.data ?? [];

    return (
        <section className="py-16 px-6 bg-[#FEFDF6] border-[#FFFFE6]">
            <div className="container mx-auto">

                {/* Heading */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl text-slate-800">
                        About the events
                    </h2>
                </div>

                {/* LOADING STATE */}
                {isLoading && (
                    <div className="space-y-24">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
                            >
                                <div className="flex-1 space-y-4">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-40" />
                                    <Skeleton className="h-20 w-full" />
                                    <Skeleton className="h-10 w-40 rounded-full" />
                                </div>

                                <div className="flex-1 w-full flex justify-center">
                                    <Skeleton className="w-full max-w-[420px] h-[300px] rounded-xl" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ERROR STATE */}
                {isError && (
                    <p className="text-center text-red-500 font-medium">
                        Failed to load events.
                    </p>
                )}

                {/* DATA STATE */}
                {!isLoading && !isError && (
                    <div className="space-y-24">
                        {events.map((event: Event, index: number) => {
                            const image =
                                event.thumbnail ||
                                event.thamble ||
                                "/event-placeholder.png";

                            return (
                                <div
                                    key={event._id}
                                    className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""
                                        }`}
                                >
                                    {/* TEXT AREA */}
                                    <div className="flex-1 relative">
                                        <div className="absolute -top-10 left-0 w-12 h-12 bg-white rounded-full border-2 border-dashed border-yellow-400 flex items-center justify-center shadow-sm">
                                            <MapPin className="w-5 h-5 text-yellow-500" />
                                        </div>

                                        <div className="bg-[#F9F9F9] p-8 rounded-3xl space-y-3">
                                            <p className="text-[10px] md:text-xs font-semibold text-slate-400 uppercase">
                                                {new Date(event.date).toDateString()}
                                            </p>

                                            <h3 className="text-xl text-black leading-tight">
                                                {event.title}
                                            </h3>

                                            {event.eventType && (
                                                <p className="text-sm text-[#C49F18]">
                                                    {event.eventType}
                                                </p>
                                            )}

                                            <p
                                                className="text-sm text-slate-500 leading-relaxed line-clamp-3"
                                                dangerouslySetInnerHTML={{
                                                    __html: event.description,
                                                }}
                                            />

                                            <Button
                                                onClick={() =>
                                                    router.push(`/dashboard/portfolio/${event._id}`)
                                                }
                                                variant="outline"
                                                className="mt-10 rounded-full border-[#FFFF00] text-[#B2B200] font-bold text-xs h-10 px-6 hover:bg-yellow-50"
                                            >
                                                <ArrowUpRight className="w-4 h-4 mr-2" />
                                                Go to event
                                            </Button>
                                        </div>
                                    </div>

                                    {/* IMAGE AREA (FIXED + RESPONSIVE) */}
                                    <div className="flex-1 w-full flex justify-center">
                                        <div
                                            className="
                                                relative
                                                w-full
                                                max-w-[420px]
                                                h-[260px]
                                                sm:h-[300px]
                                                md:h-[360px]
                                                lg:h-[400px]

                                                border-4 border-[#FDC700] p-3
                                            "
                                        >
                                            <div className="relative w-full h-full rounded-xl overflow-hidden">
                                                <Image
                                                    src={image}
                                                    alt={event.title}
                                                    fill
                                                    sizes="(max-width: 640px) 100vw,
                                                           (max-width: 1024px) 50vw,
                                                           420px"
                                                    className="object-cover transition-transform duration-300 md:hover:scale-105"
                                                    priority={index === 0}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
