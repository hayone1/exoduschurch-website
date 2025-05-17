import type { CardAnimation, CardData } from "~/types";


export const useCards = () => {

    const defaultCardAnimation: CardAnimation = {
        offscreen: {
            opacity: 0,
        },
        onscreen: {
            opacity: 1,
            // opacity: 1,
            transition: {
                type: "spring",
                // bounce: 0.3,
                duration: .8,
                delay: .4
            },
        },
        backdropOffscreen: {
            opacity: 0,
            // backdropFilter: "blur(15px)"
        },
        backdropOnScreen: {
            // backdropFilter: "blur(0px)",
            opacity: 1,
            transition: {
                duration: .6,
                //will happen after the text animation is complete
                delay: .6,
                ease: "easeOut"
            },
        },
        textOffscreen: {
            opacity: 0,
            y: 50,
            // backdropFilter: "blur(15px)"
        },
        textOnScreen: {
            y: 0,
            // backdropFilter: "blur(0px)",
            opacity: 1,
            transition: {
                duration: .6,
                //will finish after the backdrop animation is complete
                delay: .8,
                ease: "easeOut"
            },
        },

    };

    const defaultCarousalAnimation: CardAnimation = {
    offscreen: { opacity: 1, },
    onscreen: { opacity: 1 },
    textOffscreen: { opacity: 1 },
    textOnScreen: { opacity: 1 },
    backdropOffscreen: { opacity: 1 },
    backdropOnScreen: { opacity: 1 }
};

    const viewport = useViewport();
    const colorMode = useColorMode();
    return [
        {
            title: "Welcome To",
            contentJustification: "justify-start",
            textWithImage: {
                pretext: "Ex",
                imageUrl: "/images/exodus-missions-logo-icon.png",
                postText: "dus Church",
                imageClass: "h-15 sm:h-20 pb-5"
            },
            // backgroundImage: "bg-[linear-gradient(to_right,_#1e3a8a_30%,_transparent_70%),url('/images/worship-stock-image-1.jpg')]",
            bodyButtons: [
                { label: "I'm New", color: 'neutral' },
                { label: "About us", color: 'neutral', variant: 'outline' },
            ],
            // body: "making disciples of all nations",
            class: "-z-1 flex flex-row col-span-full -translate-y-3",
            cardClass: "mt-20 bg-gradient-to-r",
            variant: "solid",
            footer: "Making disciples of all nations.",
            showFooter: true,
            showHeader: true,
            backdropClasses: [
                "bg-cover mask-repeat-x mask-[url(/images/brush-mask-1-from-top.svg)] bg-[url(/images/worship-stock-image-1.jpg)]",
                "bg-cover mask-t-from-50% mask-t-to-70% sm:mask-t-from-10% sm:mask-t-to-60%  bg-[url(/images/worship-stock-image-1.jpg)]",
                "backdrop-grayscale mask-r-from-30% mask-r-to-50%",
            ]
        },
        {
            // title: "Testimonies",
            contentJustification: "justify-center",
            footerButtonsParentClass: "justify-center",
            footerButtons: [
                { label: "Share a testimony" },
                { label: "View testimonies", variant: 'outline' },
            ],
            class: "col-span-full md:col-span-5 lg:col-span-3",
            cardClass: "bg-transparent",
            variant: "solid",
            //should apply to all button?
            bodyButtonsParentClass: "justify-center h-80 pt-30",
            bodyButtons: [{
                label: "Testimonies",
                variant: 'link',
                class: "text-5xl md:text-4xl font-extrabold text-neutral-600"
            }],
            showFooter: true,
            // showHeader: true,
            backdropClasses: [
                "mask-contain mask-center mask-no-repeat -z-1 mask-[url(/images/brush-mask-0-linear.svg)] bg-white"
            ]
        },
        {
            contentJustification: "justify-center",
            footerButtonsParentClass: "justify-center",
            footerButtons: [
                { label: "Join a unit" },
            ],
            class: "col-span-full md:col-span-5 lg:col-span-3",
            cardClass: "bg-transparent",
            variant: "solid",
            //should apply to all button?
            bodyButtonsParentClass: "justify-center h-80 pt-30",
            bodyButtons: [{
                label: "Service",
                variant: 'link',
                class: "text-6xl md:text-4xl font-extrabold text-white-600"
            }],
            showFooter: true,
            // showHeader: true,
            backdropClasses: [
                "mask-contain mask-center mask-no-repeat -z-1 mask-[url(/images/brush-mask-0-linear.svg)] bg-neutral-600/30"
            ]
        },
        {
            // title: "Testimonies",
            contentJustification: "justify-center",
            footerButtonsParentClass: "justify-center",
            footerButtons: [
                { label: "Share a testimony" },
                { label: "View testimonies", variant: 'outline' },
            ],
            class: "col-span-full md:col-span-5 lg:col-span-3",
            cardClass: "bg-transparent",
            variant: "solid",
            bodyButtonsParentClass: "justify-center h-80 pt-30",
            bodyButtons: [{
                label: "Testimonies",
                variant: 'link',
                class: "text-5xl md:text-4xl font-extrabold text-neutral-600"
            }],
            showFooter: true,
            // showHeader: true,
            backdropClasses: [
                "mask-contain mask-center mask-no-repeat -z-1 mask-[url(/images/brush-mask-0-linear.svg)] bg-white"
            ]
        },
        {
            titleIcon: "i-fluent-location-ripple-20-regular",
            contentJustification: "justify-center",
            titleIconLink: "https://github.com/nuxt/ui",
            showHeader: true,
            bodies: [
                {
                    title: "SUNDAY",
                    body: "Kobi's food, Oregun, Ikeja",
                    footer: "10:00 AM"
                },
                {
                    title: "THURSDAY",
                    body: "Online",
                    footer: "6:00 PM"
                },
            ],
            class: "col-span-full md:col-span-5 lg:col-span-4",
            cardClass: "bg-transparent",
            backdropClasses: [
                "bg-cover bg-[url(/images/navigation-illustration.svg)] mask-x-from-20% mask-y-from-20%"
            ],
            variant: "solid"
        },
        {
            title: "Special Meetings",
            showHeader: true,
            contentJustification: "justify-center",
            cardAnimation: defaultCarousalAnimation,
            carousals: [
                [
                    {
                        title: "December",
                        bodyButtons: [{
                            label: "Supernatural School",
                            variant: 'link',
                            color: 'secondary',
                            class: "text-3xl md:text-4xl font-extrabold text-white z-0"
                        }],
                        backdropClasses: [
                            "-z-1 bg-cover bg-[url(/images/worship-stock-image-1.jpg)]"
                        ],
                    },
                    {
                        title: "August",
                        bodyButtons: [{
                            label: "Supernatural School",
                            variant: 'link',
                            class: "text-3xl md:text-4xl font-extrabold text-white"
                        }],
                        backdropClasses: [
                            "-z-1 bg-cover bg-[url(/images/worship-stock-image-2.jpg)]"
                        ],
                    },
                ],
                [
                    {
                        class: 'w-50 border-5',
                        title: "Ajah",
                        bodyButtons: [{
                            label: "RISE",
                            variant: 'link',
                            class: "text-3xl md:text-4xl font-extrabold text-white"
                        }],
                        backdropClasses: [
                            "-z-1 bg-cover bg-[url(/images/worship-stock-image-2.jpg)]"
                        ],
                    },
                    {
                        title: "Abuja",
                        bodyButtons: [{
                            label: "RISE",
                            variant: 'link',
                            class: "text-3xl md:text-4xl font-extrabold text-white"
                        }],
                        backdropClasses: [
                            "-z-1 bg-cover bg-[url(/images/worship-stock-image-2.jpg)]"
                        ],
                    },
                    {
                        title: "Ibadan",
                        bodyButtons: [{
                            label: "RISE",
                            variant: 'link',
                            class: "text-3xl md:text-4xl font-extrabold text-white"
                        }],
                        backdropClasses: [
                            "-z-1 bg-cover bg-[url(/images/worship-stock-image-3.jpg)]"
                        ],
                    },
                    {
                        title: "United Kingdom",
                        bodyButtons: [{
                            label: "RISE",
                            variant: 'link',
                            class: "text-3xl md:text-4xl font-extrabold text-white"
                        }],
                        backdropClasses: [
                            "-z-1 bg-cover bg-[url(/images/worship-stock-image-4.jpg)]"
                        ],
                    },
                ],
            ].map(carousal => carousal.map(card => {
                return {
                    ...card,
                    cardAnimation: defaultCardAnimation,
                    contentJustification: "justify-center",
                    showFooter: true,
                    showHeader: true,
                    class: "h-80 -z-1",
                    cardClass: "bg-transparent",
                    variant: "solid",
                    bodyButtonsParentClass: "justify-center h-80",
                    // cardAnimation: defaultCarousalAnimation
                } as CardData
            })),
            class: "col-span-full lg:col-span-5",
            variant: "subtle"
        },
    ] as CardData[]
}