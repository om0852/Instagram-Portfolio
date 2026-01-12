import React from "react";

export default function SkeletonPost() {
    return (
        <div className="bg-black border border-gray-800 rounded-lg mb-4 max-w-[470px] mx-auto sm:max-w-full animate-pulse">
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2.5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-800" />
                    <div className="flex flex-col gap-2">
                        <div className="w-24 h-3 bg-gray-800 rounded" />
                        <div className="w-16 h-2 bg-gray-800 rounded" />
                    </div>
                </div>
                <div className="w-5 h-5 bg-gray-800 rounded" />
            </div>

            {/* Image */}
            <div className="w-full aspect-square bg-gray-900" />

            {/* Actions */}
            <div className="px-3 py-2.5">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-4">
                        <div className="w-6 h-6 bg-gray-800 rounded" />
                        <div className="w-6 h-6 bg-gray-800 rounded" />
                        <div className="w-6 h-6 bg-gray-800 rounded" />
                    </div>
                    <div className="w-6 h-6 bg-gray-800 rounded" />
                </div>
                <div className="w-20 h-3 bg-gray-800 rounded mb-2" />
                <div className="w-48 h-3 bg-gray-800 rounded" />
            </div>
        </div>
    );
}
