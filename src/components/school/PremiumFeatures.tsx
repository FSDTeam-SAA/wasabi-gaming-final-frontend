'use client';

import React, { useState } from "react";
import { BarChart3, Bell, Users, Headphones, Zap, Cog, CheckCircle2 } from "lucide-react";
import { ICONS, IMAGES } from "@/assets";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/cn";

export function PremiumFeatures() {
    const [isYearly, setIsYearly] = useState(false);

    const premiumPrice = isYearly ? "£150" : "£15";
    const premiumPeriod = isYearly ? "/year" : "/month";

    const features = [
        {
            icon: BarChart3,
            title: "Advanced Analytics",
            description: "Deep insights into student performance, trends, and predictive outcomes with customisable dashboards."
        },
        {
            icon: Bell,
            title: "Smart Notifications",
            description: "AI-powered alerts and reminders to keep you informed about critical student milestones."
        },
        {
            icon: Users,
            title: "Unlimited Students",
            description: "Remove all limits and manage an unlimited number of students across multiple programs."
        },
        {
            icon: Headphones,
            title: "Priority Support",
            description: "Get dedicated support with faster response times and a dedicated account manager."
        },
        {
            icon: Zap,
            title: "AI Career Matching",
            description: "Leverage advanced AI to match students with ideal career opportunities based on skills."
        },
        {
            icon: Cog,
            title: "Automation Tools",
            description: "Automate repetitive tasks like follow-ups, reporting, and student communications."
        }
    ];

    return (
        <div className="w-full font-poppins">
            {/* Header Section */}
            <section className="bg-yellow-400 py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="flex justify-center mb-8">
                        <div className="w-24 h-24 bg-black rounded-[32px] flex items-center justify-center shadow-xl rotate-3">
                            <img src={ICONS.premium} alt="icon" className="w-12 h-12" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 italic tracking-tight">
                        Premium Features
                    </h1>
                    <p className="text-xl text-black/70 max-w-2xl mx-auto font-medium">
                        Unlock powerful tools and insights to maximise student success and
                        streamline your institutional workflow.
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                            Everything You Need to Excel
                        </h2>
                        <div className="w-24 h-1.5 bg-yellow-400 mx-auto rounded-full mb-6" />
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
                            Premium features designed to help you track, support, and report
                            on student careers more effectively.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <Card key={idx} className="border-none ring-1 ring-gray-100 rounded-[32px] hover:shadow-2xl hover:ring-yellow-400 transition-all duration-500 group overflow-hidden">
                                <CardContent className="p-10 flex flex-col items-start text-left">
                                    <div className="size-16 bg-yellow-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-yellow-400 transition-colors duration-300">
                                        <feature.icon className="size-8 text-black" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-black mb-4">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-500 font-medium leading-relaxed">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="bg-gray-50/50 py-24 px-6 border-y border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-black mb-4 tracking-tight">
                            Choose Your Plan
                        </h2>
                        <p className="text-gray-500 text-lg font-medium">
                            Flexible pricing to match your institution's specific needs.
                        </p>
                    </div>

                    {/* Toggle Switch */}
                    <div className="flex justify-center mb-16">
                        <div className="bg-yellow-400 p-1.5 rounded-full inline-flex shadow-inner">
                            <button
                                onClick={() => setIsYearly(false)}
                                className={cn(
                                    "px-8 py-3 rounded-full text-sm font-bold transition-all",
                                    !isYearly ? "bg-white text-black shadow-md" : "text-black/60 hover:text-black"
                                )}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setIsYearly(true)}
                                className={cn(
                                    "px-8 py-3 rounded-full text-sm font-bold transition-all",
                                    isYearly ? "bg-white text-black shadow-md" : "text-black/60 hover:text-black"
                                )}
                            >
                                Yearly
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                        {/* Free Plan */}
                        <Card className="rounded-[32px] border-2 border-gray-100 shadow-sm bg-white overflow-hidden order-2 lg:order-1">
                            <CardContent className="p-10 space-y-8">
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-4">Free Plan</h3>
                                    <p className="text-gray-500 font-medium text-sm">Perfect for getting started.</p>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        "Community Access",
                                        "Access to Legal Opportunities",
                                        "Limited Firm Profiles",
                                        "Application Tracker",
                                        "CV Builder (1 use/24h)",
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" /> {item}
                                        </div>
                                    ))}
                                </div>
                                <Button variant="outline" className="w-full h-14 rounded-2xl border-2 font-bold">Standard Access</Button>
                            </CardContent>
                        </Card>

                        {/* Premium Plan */}
                        <Card className="rounded-[40px] border-4 border-yellow-400 shadow-2xl bg-white relative overflow-hidden order-1 lg:order-2 lg:scale-105 z-10">
                            <div className="absolute top-0 right-0 bg-yellow-400 text-black px-6 py-2 rounded-bl-3xl font-black text-xs uppercase tracking-tighter">Most Popular</div>
                            <CardContent className="p-10 space-y-8">
                                <div className="text-center">
                                    <h3 className="text-2xl font-black text-black mb-2 italic">Premium Plan</h3>
                                    <div className="flex items-baseline justify-center gap-2">
                                        <span className="text-5xl font-black text-black">{premiumPrice}</span>
                                        <span className="text-lg font-bold text-gray-400 uppercase">{premiumPeriod}</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        "Unlimited AI CV Builder",
                                        "Full Law Firm Access",
                                        "Educational Video Courses",
                                        "Unlimited Mock Interviews",
                                        "Assessment Centre Suite",
                                        "Full Test Suite Access",
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-base font-bold text-gray-800">
                                            <CheckCircle2 className="w-5 h-5 text-yellow-500" /> {item}
                                        </div>
                                    ))}
                                </div>
                                <Button className="w-full h-16 rounded-2xl bg-yellow-400 hover:bg-yellow-500 text-black font-black text-lg shadow-lg border-none mt-4">Upgrade Now</Button>
                            </CardContent>
                        </Card>

                        {/* Schools Plan */}
                        <Card className="rounded-[32px] border-2 border-gray-100 shadow-sm bg-white overflow-hidden order-3">
                            <CardContent className="p-10 space-y-8">
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-4">Schools Plan</h3>
                                    <p className="text-gray-500 font-medium text-sm">Empower your entire cohort.</p>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        "Everything in Premium",
                                        "School Dashboard Access",
                                        "Cohort Analytics",
                                        "Progress Tracking",
                                        "Priority Human Support",
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                                            <CheckCircle2 className="w-4 h-4 text-blue-500" /> {item}
                                        </div>
                                    ))}
                                </div>
                                <Button variant="outline" className="w-full h-14 rounded-2xl border-2 font-bold">Contact For Demo</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Advantage Section */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="space-y-4">
                            <p className="text-7xl font-black text-yellow-400/30">3x</p>
                            <h3 className="text-2xl font-bold text-black italic">Faster Tracking</h3>
                            <p className="text-gray-500 font-medium leading-relaxed">Automated workflows save your staff hours of manual data entry every single week.</p>
                        </div>
                        <div className="space-y-4">
                            <p className="text-7xl font-black text-yellow-400/30">25%</p>
                            <h3 className="text-2xl font-bold text-black italic">Better Placements</h3>
                            <p className="text-gray-500 font-medium leading-relaxed">AI-driven matching ensures students land roles that perfectly align with their cognitive profile.</p>
                        </div>
                        <div className="space-y-4">
                            <p className="text-7xl font-black text-yellow-400/30">10h</p>
                            <h3 className="text-2xl font-bold text-black italic">Saved Weekly</h3>
                            <p className="text-gray-500 font-medium leading-relaxed">Reduce administrative burden through smart automation and unified student management.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-yellow-400 py-24 px-6 relative overflow-hidden">
                <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-black/5 rounded-full" />
                <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black text-black italic tracking-tighter">
                        Ready to Amplify Success?
                    </h2>
                    <p className="text-black/80 text-xl font-bold max-w-xl mx-auto italic">
                        "The energy and enthusiasm shared was truly inspirational to our students." — Wimbledon High School
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button className="h-16 px-12 rounded-full bg-black hover:bg-black/90 text-yellow-400 font-black text-xl shadow-2xl border-none">
                            Schedule Demo
                        </Button>
                        <Button variant="ghost" className="text-black hover:bg-black/10 font-bold text-lg">Contact Support</Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
