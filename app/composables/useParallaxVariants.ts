import type { IParallaxVariant } from "~/types"

export const useParallaxVariants = () => [
    {
        title: "OUTREACH",
        backGroundColor: 'bg-neutral-100',
        graphic: {
            centralImage: '/images/dark/exodus-missions-logo.png',
            icons: [
                // "i-fluent-color-people-community-20",
                "i-fluent-people-community-20-filled",
                "i-fluent-fire-20-filled",
                "i-mdi-hands-pray",
            ]
        },
        nodes: [
            {
                label: 'Covenant University',
                locationClass: 'col-start-1 col-span-2 sm:col-span-1'
            },
            {
                label: 'Lagos State University',
                locationClass: 'col-start-3 col-span-2 sm:col-start-2 sm:col-span-1'
            },
            {
                label: 'Yaba College of Technology',
                locationClass: 'col-start-1 col-span-2 sm:col-start-3 sm:col-span-1'
            },
            {
                label: 'University of Lagos',
                locationClass: 'col-start-3 col-span-2 sm:col-start-4 sm:col-span-1'
            },
            {
                label: 'Lagos Island',
                locationClass: 'col-start-1 col-span-2 sm:col-span-1'
            },
            {
                label: 'Bells University',
                locationClass: 'col-start-3 col-span-2 sm:col-start-4 sm:col-span-1'
            },
        ]

    } as IParallaxVariant
]
