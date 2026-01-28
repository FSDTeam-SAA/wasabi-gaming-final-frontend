'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Logo from '@/components/shared/logo/Logo';
import { secureStorage } from '@/utils/secureStorage';
import { ActiveSection } from '@/constant/navConstant';
import {  IMAGES } from '@/assets';
import { toast } from 'sonner';
import { getDeviceInfo } from '@/utils/deviceInfo';
import { Eye, EyeOff, Mail } from 'lucide-react';

// Replicating SocialLoginButton locally as it was in the original file
const SocialLoginButton = () => (
    <Button
        variant="outline"
        size="lg"
        className="w-full flex items-center justify-center gap-2 h-12 bg-white border-gray-300 text-black font-medium hover:bg-gray-50"
        onClick={() => toast.info('Google login not implemented yet')}
    >
        {/* Simple Google Icon SVG */}
        <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.769 -21.864 51.959 -21.864 51.129 C -21.864 50.299 -21.734 49.489 -21.484 48.729 L -21.484 45.639 L -25.464 45.639 C -26.284 47.269 -26.754 49.129 -26.754 51.129 C -26.754 53.129 -26.284 54.989 -25.464 56.619 L -21.484 53.529 Z" />
                <path fill="#EA4335" d="M -14.754 43.769 C -12.984 43.769 -11.424 44.369 -10.174 45.569 L -6.714 42.109 C -8.804 40.159 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.769 -14.754 43.769 Z" />
            </g>
        </svg>
        Continue with Google
    </Button>
);

export default function LoginPage() {
    // Use "Students" as default fallbacks if storage is empty
    const [activeTab, setActiveTab] = useState('Students');

    // Initialize state from storage in useEffect to avoid hydration mismatch
    useEffect(() => {
        const saved = secureStorage.getItem("activeSection");
        if (saved) setActiveTab(saved);
    }, []);

    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        secureStorage.setItem("activeSection", tab);
    };

    const onSubmit = async (data: any) => {
        console.log("Login data:", { ...data });

        const deviceInfo = getDeviceInfo();

        try {
            const res = await signIn('credentials', {
                email: data.email,
                password: data.password,
                deviceInfo : JSON.stringify(deviceInfo),
                redirect: false,
            });

            if (res?.error) {
                toast.error("Login failed. Please check your credentials.");
            } else {
                toast.success("Login successful!");

                router.push("/")

                // Use activeTab to decide where to go, similar to original logic
                // Original: if (currentTab === ActiveSection.Students) navigate("/dashboard");
                // We use the string values directly or import ActiveSection if available.
                // Assuming ActiveSection.Students = "Students" based on context.

                // if (activeTab === "Students") {
                //     router.push("/dashboard");
                // } else {
                //     router.push("/manage-students");
                // }
            }
        } catch (err) {
            toast.error("Login encountered an error.");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-[#f0f2f5] flex flex-wrap">
            {/* LEFT: Login Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white">
                <div className="w-full max-w-xl">
                    <div className="flex justify-center mb-8">
                        <Logo height={88} mobileHeight={70} name="Aspiring Legal Network" />
                    </div>

                    {/* Tabs */}
                    <div className="flex justify-center mb-6">
                        {["Students", "School"].map((tab) => (
                            <Button
                                key={tab}
                                variant={activeTab === tab ? "default" : "outline"}
                                size="lg"
                                className={`mx-1 rounded-lg font-bold border ${activeTab === tab ? 'bg-[#ffff00] text-black hover:bg-[#ffff00]/90 border-[#ffff00]' : 'bg-white text-black border-[#d9d9d9]'}`}
                                onClick={() => handleTabChange(tab)}
                            >
                                {tab === "Students" ? "Student" : "School"}
                            </Button>
                        ))}
                    </div>

                    <h2 className="text-3xl font-bold text-center mb-2">
                        Welcome back, Future Legal Professional!
                    </h2>
                    <p className="text-center text-gray-600 mb-8 block">
                        Welcome back to The Aspiring Legal Network. Pick up where you left
                        off and keep building your future in law.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Email Input */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-lg text-black">Email address</Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="johndoe@example.com"
                                    className={`p-4 h-auto ${errors.email ? "border-red-500" : "border-gray-300"} pr-10`}
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                                    })}
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <Mail className='opacity-60'/>
                                </div>
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-lg text-black">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className={`p-4 h-auto ${errors.password ? "border-red-500" : "border-gray-300"} pr-10`}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 8, message: "Min 8 characters" },
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ?  <Eye /> : <EyeOff />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message as string}</p>
                            )}
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    checked={rememberMe}
                                    onCheckedChange={(c) => setRememberMe(!!c)}
                                />
                                <label
                                    htmlFor="remember"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Remember me
                                </label>
                            </div>
                            <Link href="/forgot-password" style={{ color: "#B9B92B" }}>
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 text-black font-bold text-lg bg-[#ffff00] hover:bg-[#ffff00]/90"
                        >
                            Log in
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-muted-foreground">Or</span>
                            </div>
                        </div>

                        <SocialLoginButton />

                        <p className="text-center text-gray-600 mt-6">
                            Don't have an account?{" "}
                            <Link href="/signup" style={{ color: "#B9B92B" }}>
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

            {/* RIGHT: Hero */}
            <div className="hidden md:flex w-1/2 p-6 md:p-12 flex-col justify-center bg-[#f0f2f5]">
                <h3 className="text-2xl font-semibold mb-4 text-black">
                    {activeTab === "Students"
                        ? "Your All-in-one Platform for Aspiring Legal Professionals!"
                        : "Aspiring — Your All-in-One School Management Platform"}
                </h3>
                <p className="mb-8 text-gray-700">
                    {activeTab === "Students"
                        ? "Aspiring is a simple, powerful tool that helps you create a professional resume in minutes. With modern templates and smart guidance, it lets you showcase your skills confidently and take the next step in your career."
                        : "Aspiring is a simple yet powerful system that helps schools manage students, teachers, and activities with ease. With smart tools and a modern interface, it lets you organize efficiently and focus on better learning outcomes."}
                </p>
                <div className="flex space-x-2 mb-8">
                    <div className="w-3 h-3 rounded-full bg-[#ffff00]" />
                    <div className="w-3 h-3 rounded-full bg-[#cccccc]" />
                    <div className="w-3 h-3 rounded-full bg-[#cccccc]" />
                </div>
                <div className="w-full rounded-lg shadow-lg overflow-hidden">
                    <img
                        src={
                            activeTab === "Students"
                                ? IMAGES.signup_Image_Student.src
                                : IMAGES.signup_Image_School.src
                        }
                        alt="Legal professionals"
                        className="w-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}
