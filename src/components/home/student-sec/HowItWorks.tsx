'use client';

import React, { useEffect, useState } from "react";

const steps = [
    { number: 1, text: "Create your profile" },
    { number: 2, text: "Build mock applications" },
    { number: 3, text: "Prepare for interviews" },
    { number: 4, text: "Connect to your career" },
    { number: 5, text: "Get Hired!" }, // Added step for better alignment with 5 circles if needed, legacy had 4.
];
// Actually legacy had 4: 1,2,3,4. Step code is fine.

const Step = ({ number, text, showLine, isMobile }: { number: number, text: string, showLine: boolean, isMobile: boolean }) => {
    const circleSize = isMobile ? 44 : 64;
    const fontSizeNumber = isMobile ? "16px" : "24px";
    const fontSizeText = isMobile ? "13px" : "16px";

    return (
        <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ textAlign: "center", position: "relative", flex: 1 }}>
                {/* Circle */}
                <div
                    style={{
                        width: `${circleSize}px`,
                        height: `${circleSize}px`,
                        backgroundColor: "#f7e83d",
                        borderRadius: "50%",
                        border: "2px solid black",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 12px",
                        fontSize: fontSizeNumber,
                        fontWeight: "bold",
                        position: "relative",
                        zIndex: 2,
                    }}
                >
                    {number}
                </div>

                {/* Text */}
                <div
                    style={{
                        fontSize: fontSizeText,
                        fontWeight: "bold",
                        lineHeight: "1.4",
                        maxWidth: isMobile ? "90px" : "none",
                        margin: "0 auto",
                        color: "black",
                    }}
                >
                    {text}
                </div>

                {/* Connecting Line */}
                {showLine && (
                    <div
                        style={{
                            position: "absolute",
                            top: `${circleSize / 2}px`,
                            left: `calc(50% + ${circleSize / 2}px)`,
                            width: `calc(100% - ${circleSize}px)`,
                            height: "2px",
                            backgroundColor: "#000",
                            zIndex: 1,
                        }}
                    />
                )}
            </div>
        </div>
    );
};

const HowItWorks = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div
            style={{
                width: "100%",
                minHeight: "488px",
                padding: isMobile ? "50px 12px" : "80px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {/* Header */}
            <div
                style={{
                    fontFamily: "neuton",
                    textAlign: "center",
                    marginBottom: isMobile ? "40px" : "60px",
                }}
            >
                <h2
                    style={{
                        fontSize: isMobile ? "22px" : "32px",
                        fontWeight: "bold",
                        margin: 0,
                        color: "#000",
                    }}
                >
                    How ALN Works
                </h2>
            </div>

            {/* Steps */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "1200px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "relative",
                    gap: isMobile ? "4px" : "0",
                }}
            >
                {/* Legacy had static array of 4 steps */}
                {[
                    { number: 1, text: "Create your profile" },
                    { number: 2, text: "Build mock applications" },
                    { number: 3, text: "Prepare for interviews" },
                    { number: 4, text: "Connect to your career" },
                ].map((step, index, arr) => (
                    <Step
                        key={step.number}
                        number={step.number}
                        text={step.text}
                        showLine={index < arr.length - 1} // Line connects to next
                        isMobile={isMobile}
                    />
                ))}
            </div>
        </div>
    );
};

export default HowItWorks;
