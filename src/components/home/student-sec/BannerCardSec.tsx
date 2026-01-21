'use client';

import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const cardData = [
    {
        title: "AI CV Builder",
        description: "Turn your profile into management ready CVs/AL",
        buttonText: "Start planning",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
            >
                <path
                    d="M20 2.66699H8.00004C7.2928 2.66699 6.61452 2.94794 6.11442 3.44804C5.61433 3.94814 5.33337 4.62641 5.33337 5.33366V26.667C5.33337 27.3742 5.61433 28.0525 6.11442 28.5526C6.61452 29.0527 7.2928 29.3337 8.00004 29.3337H24C24.7073 29.3337 25.3856 29.0527 25.8857 28.5526C26.3858 28.0525 26.6667 27.3742 26.6667 26.667V9.33366L20 2.66699Z"
                    stroke="black"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M18.6666 2.66699V8.00033C18.6666 8.70757 18.9476 9.38585 19.4477 9.88594C19.9478 10.386 20.626 10.667 21.3333 10.667H26.6666"
                    stroke="black"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M13.3333 12H10.6666"
                    stroke="black"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M21.3333 17.333H10.6666"
                    stroke="black"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M21.3333 22.667H10.6666"
                    stroke="black"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        title: "Cover Letter Studio",
        description: "Guided walkthrough to editing cohesive portfolio",
        buttonText: "View my cvs",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
            >
                <path
                    d="M20.9426 28.3911C20.6926 28.6411 20.3535 28.7815 20 28.7815C19.6464 28.7815 19.3073 28.6411 19.0573 28.3911L16.9426 26.2765C16.6927 26.0264 16.5522 25.6873 16.5522 25.3338C16.5522 24.9802 16.6927 24.6412 16.9426 24.3911L24.3906 16.9431C24.6407 16.6932 24.9797 16.5527 25.3333 16.5527C25.6868 16.5527 26.0259 16.6932 26.276 16.9431L28.3906 19.0578C28.6406 19.3078 28.781 19.6469 28.781 20.0004C28.781 20.354 28.6406 20.6931 28.3906 20.9431L20.9426 28.3911Z"
                    stroke="black"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M24 17.3337L22.1666 8.16833C22.1168 7.91897 21.9966 7.68907 21.8204 7.50575C21.6442 7.32242 21.4192 7.19332 21.172 7.13367L4.3133 2.70433C4.0912 2.65064 3.85904 2.65492 3.63907 2.71676C3.4191 2.77861 3.21872 2.89595 3.05715 3.05752C2.89558 3.21909 2.77824 3.41947 2.7164 3.63943C2.65455 3.8594 2.65027 4.09157 2.70397 4.31367L7.1333 21.1723C7.19296 21.4195 7.32206 21.6445 7.50538 21.8208C7.68871 21.997 7.91861 22.1171 8.16797 22.167L17.3333 24.0003"
                    stroke="black"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M3.06665 3.06641L12.7813 12.7811"
                    stroke="black"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M14.6667 17.3333C16.1394 17.3333 17.3333 16.1394 17.3333 14.6667C17.3333 13.1939 16.1394 12 14.6667 12C13.1939 12 12 13.1939 12 14.6667C12 16.1394 13.1939 17.3333 14.6667 17.3333Z"
                    stroke="black"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        title: "Mock Interview Simulation",
        description: "Practise applications with resident feedback",
        buttonText: "Try a mock",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
            >
                <path
                    d="M21.3333 17.333L28.2973 21.9757C28.3976 22.0425 28.5143 22.0808 28.6347 22.0866C28.7552 22.0924 28.8749 22.0653 28.9813 22.0084C29.0876 21.9515 29.1764 21.8668 29.2384 21.7634C29.3004 21.6599 29.3332 21.5416 29.3333 21.421V10.493C29.3333 10.3757 29.3024 10.2605 29.2436 10.159C29.1849 10.0574 29.1004 9.9732 28.9987 9.91477C28.897 9.85634 28.7816 9.82578 28.6643 9.82618C28.547 9.82657 28.4319 9.85792 28.3306 9.91704L21.3333 13.9997"
                    stroke="black"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M18.6666 8H5.33329C3.86053 8 2.66663 9.19391 2.66663 10.6667V21.3333C2.66663 22.8061 3.86053 24 5.33329 24H18.6666C20.1394 24 21.3333 22.8061 21.3333 21.3333V10.6667C21.3333 9.19391 20.1394 8 18.6666 8Z"
                    stroke="black"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        title: "Assessment Centre Lab",
        description: "Prepare this profile emulator of skills simulator",
        buttonText: "Start test",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
            >
                <path
                    d="M16.0001 29.3337C23.3639 29.3337 29.3334 23.3641 29.3334 16.0003C29.3334 8.63653 23.3639 2.66699 16.0001 2.66699C8.63628 2.66699 2.66675 8.63653 2.66675 16.0003C2.66675 23.3641 8.63628 29.3337 16.0001 29.3337Z"
                    stroke="black"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M16 24C20.4183 24 24 20.4183 24 16C24 11.5817 20.4183 8 16 8C11.5817 8 8 11.5817 8 16C8 20.4183 11.5817 24 16 24Z"
                    stroke="black"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M15.9999 18.6663C17.4727 18.6663 18.6666 17.4724 18.6666 15.9997C18.6666 14.5269 17.4727 13.333 15.9999 13.333C14.5272 13.333 13.3333 14.5269 13.3333 15.9997C13.3333 17.4724 14.5272 18.6663 15.9999 18.6663Z"
                    stroke="black"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        title: "Law Firm Library",
        description: "Complete virtual library of guides, courts, and more",
        buttonText: "Explore drive",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
            >
                <path
                    d="M21.3333 8L26.6666 26.6667"
                    stroke="black"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M16 8V26.6667"
                    stroke="black"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M10.6667 10.667V26.667"
                    stroke="black"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M5.33325 5.33301V26.6663"
                    stroke="black"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
];

const BannerCardSec = () => {
    return (
        <div className="w-full max-w-7xl mx-auto py-8 px-8">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full relative"
            >
                <CarouselContent className="-ml-6 select-none">
                    {cardData.map((card, idx) => (
                        <CarouselItem key={idx} className="pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                            <div className="h-80 rounded-2xl bg-white p-6 flex flex-col hover:shadow-lg transition-shadow border border-slate-100">
                                <div className="flex justify-center mb-6">
                                    <div
                                        className="w-16 h-16 rounded-full flex items-center justify-center bg-[#ffed00]"
                                    >
                                        {card.icon}
                                    </div>
                                </div>

                                <h3
                                    className="text-center text-xl mb-4 min-h-[60px] flex items-center justify-center font-normal"
                                    style={{
                                        fontFamily: "'Neuton', serif",
                                        fontSize: "24px",
                                        lineHeight: "1.2",
                                    }}
                                >
                                    {card.title}
                                </h3>

                                <p
                                    className="text-gray-600 text-sm text-center mb-6 flex-grow"
                                    style={{
                                        fontFamily: "'Neuton', serif",
                                        fontSize: "14px",
                                        lineHeight: "1.4",
                                    }}
                                >
                                    {card.description}
                                </p>

                                <Button
                                    className="w-full rounded-full font-bold bg-[#ffed00] hover:bg-yellow-500 text-black h-10 mt-auto shadow-sm"
                                    style={{
                                        borderRadius: "24px",
                                    }}
                                >
                                    {card.buttonText}
                                </Button>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="hidden sm:block">
                    <CarouselPrevious className="left-[-40px] bg-black text-white border-none hover:bg-gray-800" />
                    <CarouselNext className="right-[-40px] bg-black text-white border-none hover:bg-gray-800" />
                </div>
            </Carousel>

            {/* Pagination logic is tricky with Shadcn/Embla out of box component, but we have arrows. 
            Legacy had pagination dots. We can implement standard embla dots if necessary, 
            but arrows are often sufficient. For now, skipping dots to save complexity 
            unless requested, but I'll add a 'flex justify-center gap-2 mt-4' as placeholder for dots if I extended it. */}
        </div>
    );
};

export default BannerCardSec;
