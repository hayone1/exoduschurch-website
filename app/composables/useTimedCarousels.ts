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
                        background: 'url(/images/a-christmas-thought-the-most-precious-gift.jpg) center',
                        backgroundSize: 'cover',
                        backgroundColor: 'rgba(27, 28, 30, 0.5)'
                    },
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
                        background: 'url(/images/adventures-in-the-miraculous.jpg'
                    }
                },
                {
                    title: "August",
                    class: "rounded-lg bg-cover bg-no-repeat bg-[url(/images/burden-of-redemption.jpg)]",
                    motionStyle: {
                        background: 'url(/images/burden-of-redemption.jpg'
                    }
                },
                {
                    title: "March",
                    class: "rounded-lg bg-cover bg-no-repeat bg-[url(/images/God-will-and-you.jpg)]",
                    motionStyle: {
                        background: 'url(/images/God-will-and-you.jpg)'
                    }
                },
            ].map(card => {
                return {
                    ...card,
                    cardAnimation: defaultCardAnimation,
                    contentJustification: "justify-center",
                    showFooter: true,
                    carousels: [],
                    // showHeader: true,
                    // class: "-z-1",
                    cardClass: "bg-transparent h-50 w-full border-2",
                    variant: "solid",
                    // bodyButtonsParentClass: "justify-center h-80",
                    // cardAnimation: defaultCarousalAnimation
                } as CardData
            }),
            class: "",
            // cardClass: "size-full",
            variant: "subtle",
            backdropClasses: [
                "backdrop-blur-lg",
            ]
        },
    ] as CardData[]
}