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
            title: "Messages",
            showHeader: true,
            showFooter: true,
            footer: "Hii",
            // contentJustification: "justify-center",
            // cardAnimation: defaultCarousalAnimation,
            class: "border-2",
            cardClass: "",
            carouselsClass: '',
            carouselsUi: {
                controls: 'absolute bottom-6 left-10',
                // dots: 'top-1',
                // dot: 'w-6 h-1',
                item: 'basis-1/8'
            },
            carousels: [
                {
                    title: "A Christmas thought: The most precious gift",
                    // cardClass: "bg-transparent",
                    // contentJustification: "justify-center",
                    class: "rounded-lg bg-cover bg-center bg-no-repeat bg-[url(/images/a-christmas-thought-the-most-precious-gift.jpg)]",
                    footerButtons: [
                        { label: "Listen" },
                    ],
                },
                {
                    title: "Adventures in the miraculous",
                    class: "rounded-lg bg-cover bg-no-repeat bg-[url(/images/adventures-in-the-miraculous.jpg)]",
                    footerButtons: [
                        { label: "Listen" },
                    ],
                },
                {
                    title: "Burden of redemption",
                    class: "rounded-lg bg-cover bg-no-repeat bg-[url(/images/burden-of-redemption.jpg)]",
                    footerButtons: [
                        { label: "Listen" },
                    ],
                },
                {
                    title: "God's will aand you",
                    class: "rounded-lg bg-cover bg-no-repeat bg-[url(/images/God-will-and-you.jpg)]",
                    footerButtons: [
                        { label: "Listen" },
                    ],
                },
                {
                    title: "Heartbeats",
                    // cardClass: "bg-transparent",
                    // contentJustification: "justify-center",
                    class: "rounded-lg bg-cover bg-center bg-no-repeat bg-[url(/images/heartbeats.jpg)]",
                    footerButtonsParentClass: "justify-center",
                    footerButtons: [
                        { label: "Listen" },
                    ],
                },
                {
                    title: "Help and favour in God",
                    // cardClass: "bg-transparent",
                    // contentJustification: "justify-center",
                    class: "rounded-lg bg-cover bg-center bg-no-repeat bg-[url(/images/help-and-favour-in-God.jpg)]",
                    footerButtonsParentClass: "justify-center",
                    footerButtons: [
                        { label: "Listen" },
                    ],
                },
                {
                    title: "In New Seasons",
                    // cardClass: "bg-transparent",
                    // contentJustification: "justify-center",
                    class: "rounded-lg bg-cover bg-center bg-no-repeat bg-[url(/images/in-new-seasons.jpg)]",
                    footerButtonsParentClass: "justify-center",
                    footerButtons: [
                        { label: "Listen" },
                    ],
                },
                {
                    title: "Prayer Focused: Making power available",
                    // cardClass: "bg-transparent",
                    // contentJustification: "justify-center",
                    class: "rounded-lg bg-cover bg-center bg-no-repeat bg-[url(/images/prayer-focused-making-power-available.jpg)]",
                    footerButtonsParentClass: "justify-center",
                    footerButtons: [
                        { label: "Listen" },
                    ],
                },
                {
                    title: "Recovery: Bouncing back from bondage",
                    // cardClass: "bg-transparent",
                    // contentJustification: "justify-center",
                    class: "rounded-lg bg-cover bg-center bg-no-repeat bg-[url(/images/recovery-bouncing-back-from-bondage.jpg)]",
                    footerButtonsParentClass: "justify-center",
                    footerButtons: [
                        { label: "Listen" },
                    ],
                },
                {
                    title: "Speedy Deliverance",
                    // cardClass: "bg-transparent",
                    // contentJustification: "justify-center",
                    class: "rounded-lg bg-cover bg-center bg-no-repeat bg-[url(/images/speedy-deliverance.jpg)]",
                    footerButtonsParentClass: "justify-center",
                    footerButtons: [
                        { label: "Listen" },
                    ],
                },
                {
                    title: "The amazing gosepl of christ",
                    // cardClass: "bg-transparent",
                    // contentJustification: "justify-center",
                    class: "rounded-lg bg-cover bg-center bg-no-repeat bg-[url(/images/the-amazing-gospel-of-christ.jpg)]",
                    footerButtonsParentClass: "justify-center",
                    footerButtons: [
                        { label: "Listen" },
                    ],
                },
                {
                    title: "The Spirit of faith",
                    // cardClass: "bg-transparent",
                    // contentJustification: "justify-center",
                    class: "rounded-lg bg-cover bg-center bg-no-repeat bg-[url(/images/the-spirit-of-faith.jpg)]",
                    footerButtonsParentClass: "justify-center",
                    footerButtons: [
                        { label: "Listen" },
                    ],
                },
            ].map(card => {
                return {
                    ...card,
                    cardAnimation: defaultCardAnimation,
                    contentJustification: "justify-center",
                    showFooter: true,
                    footerButtonsParentClass: "pt-20 justify-center",
                    carousels: [],
                    // showHeader: true,
                    // class: "border-2",
                    cardClass: "bg-transparent h-50 w-full",
                    variant: "solid",
                    // bodyButtonsParentClass: "justify-center h-80",
                    // cardAnimation: defaultCarousalAnimation
                } as CardData
            }),
            variant: "solid",
        },
    ] as CardData[]
}