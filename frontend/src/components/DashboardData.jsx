import React from 'react'

    function DashboardData({ icon, title, number, color, shadow, bg }) {

        const bgClasses = {
            section: "bg-section",
            profit: "bg-profit",
            lose : "bg-lose"
        };

        const textClasses = {
            accent: "text-accent",
        };

        const borderClasses = {
            accent: "border-accent border-b-accent/70",
        };

        const shadowClasses = {
            accent: "shadow-accent/40",
        };

        const bgLightClasses = {
            accent: "bg-accent/20",
        };

        return (
            <div className={`
            flex flex-col gap-5 border border-secondary/40
            ${bgClasses[bg]}
            w-full md:w-7xl px-5 py-7 rounded-xl
            shadow-lg ${shadowClasses[shadow]}
            border-b-6 ${borderClasses[color]}
            hover:-translate-y-4 transition duration-200
            `}>

            <div className='flex justify-start items-center gap-3'>

                <span className={`
                ${textClasses[color]}
                ${bgLightClasses[color]}
                p-2 rounded-xl text-2xl
                `}>
                {icon}
                </span>

                <span className='text-white font-light'>{title}</span>
            </div>

            <span
                className={`font-bold text-4xl px-8 ${
                    title === "Total Profit"
                    ? number.toString().includes("-")
                        ? "text-lose"
                        : "text-profit"
                    : "text-white"
                }`}
                >
                {number}
                </span>
            </div>
        )
    }

export default DashboardData
