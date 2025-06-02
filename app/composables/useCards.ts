import type { ButtonContent, CardAnimation, CardData } from "~/types";


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
                delay: .6,
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
            bodyButtons: [
                {
                    label: "I'm New",
                    color: 'neutral',
                    link: 'https://portal.exoduschurch.global/external/register/'
                },
                {
                    label: "About us",
                    color: 'neutral',
                    variant: 'outline',
                    link: '/about'
                },
            ],
            class: "z-0 flex flex-row col-span-full -translate-y-3",
            cardClass: "mt-20 bg-gradient-to-r h-[70vh]",
            variant: "solid",
            footer: "Making disciples of all nations.",
            showFooter: true,
            showHeader: true,
            backdropClasses: [
                "bg-cover mask-repeat-x mask-[url(/images/brush-mask-1-from-top.svg)] bg-[url(/images/main/supernatural-school-december-7.jpg)]",
                "bg-cover mask-t-from-60% mask-t-to-70% sm:mask-t-from-10% sm:mask-t-to-60% bg-[url(/images/main/supernatural-school-december-7.jpg)]",
                "backdrop-grayscale mask-r-from-30% mask-r-to-50%",
            ]
        },
        {
            // title: "Testimonies",
            contentJustification: "justify-center",
            footerButtonsParentClass: "justify-center",
            // footerButtons: [
            //     { label: "Share a testimony" },
            //     { label: "View testimonies", variant: 'outline' },
            // ],
            class: "col-span-full md:col-span-5 lg:col-span-3",
            cardClass: "bg-transparent",
            variant: "solid",
            //should apply to all button?
            bodyButtonsParentClass: "justify-center h-80 md:pt-20",
            bodyButtons: [{
                label: "Testimonies",
                variant: 'link',
                link: '/testimonies',
                // link: 'https://bit.ly/exodus_testimonies',
                class: "text-5xl md:text-4xl font-extrabold text-neutral-600"
            }],
            // showFooter: true,
            // showHeader: true,
            backdropClasses: [
                "mask-contain mask-center mask-no-repeat -z-1 mask-[url(/images/brush-mask-0-linear.svg)] bg-white"
            ]
        },
        {
            // title: "Testimonies",
            contentJustification: "justify-center",
            footerButtonsParentClass: "justify-center",
            footerButtons: [
                {
                    label: "Follow Us",
                    variant: "soft",
                    class: "text-xl bg-transparent"
                },
            ],
            class: "col-span-full md:col-span-5 lg:col-span-3",
            cardClass: "bg-transparent",
            variant: "solid",
            bodyButtonsParentClass: "justify-center h-80 pt-30 md:pb-5",
            bodyButtons: [
                {
                icon: "i-mdi-instagram",
                variant: 'solid',
                class: "text-5xl md:text-4xl font-extrabold bg-linear-65 from-purple-500 to-red-500",
                link: "https://www.instagram.com/exoduschurch_/#"
            },
                {
                icon: "i-mdi-telegram",
                variant: 'solid',
                class: "text-5xl md:text-4xl font-extrabold bg-blue-500",
                link: "https://t.me/ExodusChurch"
            },
                {
                icon: "i-mdi-youtube",
                variant: 'solid',
                class: "text-5xl md:text-4xl font-extrabold bg-red-500",
                link: "https://www.youtube.com/@ExodusMissions"
            },
        ],
            showFooter: true,
            // showHeader: true,
            backdropClasses: [
                "mask-contain mask-center mask-no-repeat -z-1 mask-[url(/images/brush-mask-0-linear.svg)] bg-white"
            ]
        },
        {
            contentJustification: "justify-center",
            footerButtonsParentClass: "justify-center",
            // footerButtons: [
            //     { label: "Join a unit" },
            // ],
            class: "col-span-full md:col-span-5 lg:col-span-3",
            cardClass: "bg-transparent",
            variant: "solid",
            //should apply to all button?
            bodyButtonsParentClass: "justify-center h-80 md:pt-20",
            bodyButtons: [{
                label: "Serve",
                variant: 'link',
                class: "text-6xl md:text-4xl font-extrabold text-white-600",
                link: "/community#technical-unit"
            }],
            // showFooter: true,
            // showHeader: true,
            backdropClasses: [
                "mask-contain mask-center mask-no-repeat -z-1 mask-[url(/images/brush-mask-0-linear.svg)] bg-neutral-600/30"
            ]
        },
        {
            contentJustification: "justify-center",
            titleButton: {
                label: "location",
                icon: "i-fluent-location-ripple-20-regular",
                link: "https://maps.app.goo.gl/iSkjrBP6eAdRfNX88"
            } as ButtonContent,
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
            body: "Meet our Pastor",
            bodyClass: "text-6xl",
            contentJustification: "justify-start",
            // backgroundImage: "bg-[linear-gradient(to_right,_#1e3a8a_30%,_transparent_70%),url('/images/worship-stock-image-1.jpg')]",
            bodyButtons: [
                { label: "Abhulimen Desmond", color: 'neutral' },
            ],
            // body: "making disciples of all nations",
            class: "col-span-full lg:col-span-5 -z-1 flex flex-row h-100 border-2",
            cardClass: "mt-20 bg-gradient-to-r",
            variant: "solid",
            // showFooter: true,
            // showHeader: true,
            backdropClasses: [
                `bg-cover bg-[url(/images/people/pastor-desmond-1.jpg)] sm:bg-[url(/images/people/pastor-desmond-3-shape.jpg)] bg-right h-full`,
                // "bg-cover mask-t-from-50% mask-t-to-70% sm:mask-t-from-10% sm:mask-t-to-60%  bg-[url(/images/worship-stock-image-1.jpg)]",
                // "backdrop-grayscale mask-r-from-30% mask-r-to-50%",
                "backdrop-blur-xs sm:backdrop-blur-lg mask-cover mask-[url(/images/people/pastor-desmond-1-mask.png)] sm:mask-[url(/images/people/pastor-desmond-3-mask.png)] mask-right h-full",
            ]
        },
        {
            title: "Special Meetings",
            showHeader: true,
            contentJustification: "justify-center",
            cardAnimation: defaultCarousalAnimation,
            comparisonCarousals: [
                [
                    {
                        title: "August",
                        bodyButtons: [{
                            label: "Supernatural School",
                            variant: 'link',
                            color: 'secondary',
                            class: "text-3xl md:text-4xl font-extrabold text-white z-0",
                            link: "/events#supernatural-school"
                        }],
                        backdropClasses: [
                            "-z-2 bg-cover bg-center bg-[url(/images/events/supernatural-school-december-2.jpg)]",
                            "-z-1 backdrop-blur-xs backdrop-opacity-100"
                        ],
                    },
                    {
                        title: "December",
                        bodyButtons: [{
                            label: "Supernatural School",
                            variant: 'link',
                            color: 'primary',
                            class: "text-3xl md:text-4xl font-extrabold text-white",
                            link: "/events#supernatural-school"
                        }],
                        backdropClasses: [
                            "-z-1 bg-cover bg-center bg-[url(/images/events/supernatural-school-december-nkire.jpg)]",
                            "-z-1 backdrop-grayscale",
                        ],
                    },
                ],
                [
                    {
                        class: 'w-50',
                        title: "Ajah",
                        bodyButtons: [{
                            label: "RISE",
                            variant: 'link',
                            color: 'error',
                            class: "text-3xl md:text-4xl font-extrabold text-white"
                        }],
                        backdropClasses: [
                            "-z-1 bg-cover bg-center bg-[url(/images/events/supernatural-school-december-4.jpg)]",
                            "-z-1 bg-black/60"
                        ],
                    },
                    {
                        title: "Abuja",
                        bodyButtons: [{
                            label: "RISE",
                            variant: 'link',
                            color: 'warning',
                            class: "text-3xl md:text-4xl font-extrabold text-white"
                        }],
                        backdropClasses: [
                            "-z-1 bg-cover bg-center bg-[url(/images/events/supernatural-school-december-8.jpg)]",
                            "-z-1 bg-black/60"
                        ],
                    },
                    {
                        title: "Ibadan",
                        bodyButtons: [{
                            label: "RISE",
                            variant: 'link',
                            color: 'primary',
                            class: "text-3xl md:text-4xl font-extrabold text-white"
                        }],
                        backdropClasses: [
                            "-z-1 bg-cover bg-[url(/images/events/supernatural-school-december-10.jpg)]",
                            "-z-1 bg-black/60"
                        ],
                    },
                    {
                        title: "United Kingdom",
                        bodyButtons: [{
                            label: "RISE",
                            variant: 'link',
                            color: 'secondary',
                            class: "text-3xl md:text-4xl font-extrabold text-white"
                        }],
                        backdropClasses: [
                            "-z-1 bg-cover bg-[url(/images/events/supernatural-school-december-11.jpg)]",
                            "-z-1 bg-black/60"
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
                    class: "h-100 -z-1",
                    cardClass: "bg-transparent",
                    variant: "solid",
                    bodyButtonsParentClass: "justify-center h-80",
                    // cardAnimation: defaultCarousalAnimation
                } as CardData
            })),
            class: "col-span-full",
            // cardClass: "h-100",
            variant: "subtle"
        },
    ] as CardData[]
}