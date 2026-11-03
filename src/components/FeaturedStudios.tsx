"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Studio {
    _id: string;
    title: string;
    category: string;
    image: string; // Database field matches "image"
    hourlyRate: number;
    location: string;
    rating?: number;
}

export default function FeaturedStudios() {
    const [studios, setStudios] = useState<Studio[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchStudios = async () => {
            try {
                // Port 8000 matching your backend port & endpoint
                const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
                const res = await fetch(`${apiBaseUrl}/featured-studios`);

                if (!res.ok) {
                    throw new Error(`Server returned status: ${res.status}`);
                }

                const data: Studio[] = await res.json();
                console.log(data);
                setStudios(data);
            } catch (err) {
                console.error("API Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStudios();
    }, []);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12 text-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <section className="py-12 bg-base-100">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-2">Featured Workspaces</h2>
                    <p className="text-gray-500">Discover top-rated creative studios near you</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {studios.map((studio) => (
                        <div
                            key={studio._id}
                            className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-all flex flex-col h-full"
                        >
                            <figure className="relative h-48 w-full">
                                <Image
                                    src={studio.image}
                                    alt={studio.title}
                                    className="w-full h-full object-cover"
                                    width={200}
                                    height={200}
                                />
                                <span className="badge badge-primary absolute top-3 left-3">
                                    {studio.category}
                                </span>
                            </figure>

                            <div className="card-body p-5 flex flex-col justify-between flex-grow">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="card-title text-lg font-bold line-clamp-1">
                                            {studio.title}
                                        </h3>
                                        <div className="badge badge-outline text-xs">
                                            ⭐ {studio.rating ?? 4.9}
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                                        📍 {studio.location}
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-base-200 flex items-center justify-between mt-auto">
                                    <div className="text-lg font-bold text-primary">
                                        ${studio.hourlyRate} <span className="text-xs font-normal text-gray-500">/ hr</span>
                                    </div>

                                    <Link
                                        href={`/studios/${studio._id}`}
                                        className="btn btn-primary btn-sm"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}