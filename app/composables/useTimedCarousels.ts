import type { CardAnimation, CardData } from "~/types";


export const useTimedCarousels = () => {

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
            // title: "Special Meetings",
            // showHeader: true,
            contentJustification: "justify-center",
            cardAnimation: defaultCarousalAnimation,
            carouselsClass: 'pb-12 left-40 md:left-40 lg:left-20',
            carouselsUi: {
                controls: 'absolute bottom-6 left-10',
                // dots: 'top-1',
                // dot: 'w-6 h-1',
                item: 'basis-1/3'
            },
            carousels: [
                {
                    title: "A Christmas thought: The most precious gift",
                    // cardClass: "bg-transparent",
                    // contentJustification: "justify-center",
                    class: "rounded-lg bg-cover bg-center bg-no-repeat bg-[url(/images/a-christmas-thought-the-most-precious-gift.jpg)]",
                    footerButtonsParentClass: "justify-center",
                    footerButtons: [
                        { label: "Listen" },
                    ],
                    motionStyle: {
                        backgroundColor: '#000435'
                    }
                    // backdropClasses: [
                    //     "h-full ",
                    //     // "bg-cover mask-t-from-50% mask-t-to-70% sm:mask-t-from-10% sm:mask-t-to-60%  bg-[url(/images/worship-stock-image-1.jpg)]",
                    //     // "backdrop-grayscale mask-r-from-30% mask-r-to-50%",
                    // ]
                },
                {
                    title: "December",
                    class: "rounded-lg bg-cover bg-no-repeat bg-[url(/images/adventures-in-the-miraculous.jpg)]",
                    footerButtonsParentClass: "justify-center",
                    footerButtons: [
                        { label: "Share a testimony" },
                        { label: "View testimonies", variant: 'outline' },
                    ],
                    motionStyle: {
                        backgroundColor: '#FFD700'
                    }
                },
                {
                    title: "August",
                    class: "rounded-lg bg-cover bg-no-repeat bg-[url(/images/burden-of-redemption.jpg)]",
                    motionStyle: {
                        backgroundColor: '#d84418'
                    }
                },
                {
                    title: "March",
                    class: "rounded-lg bg-cover bg-no-repeat bg-[url(/images/God-will-and-you.jpg)]",
                    motionStyle: {
                        backgroundColor: '#4f42b5'
                    }
                },
            ].map(card => {
                return {
                    ...card,
                    cardAnimation: defaultCardAnimation,
                    contentJustification: "justify-center",
                    showFooter: true,
                    // showHeader: true,
                    // class: "-z-1",
                    cardClass: "bg-transparent h-50 w-full border-2",
                    variant: "solid",
                    // bodyButtonsParentClass: "justify-center h-80",
                    // cardAnimation: defaultCarousalAnimation
                } as CardData
            }),
            // class: "",
            // cardClass: "size-full",
            variant: "subtle",
            backdropClasses: [
                "mask-contain mask-center mask-no-repeat -z-1 mask-[url(/images/brush-mask-0-linear.svg)] bg-white"
            ]
        },
    ] as CardData[]
}