interface CardData {
    backgroundImage?: string
    backdropClasses?: string[]
    contentJustification?: string
    title?: string
    titleIcon?: string
    titleIconLink?: string
    textWithImage?: {
        pretext?: string,
        imageUrl: string,
        postText?: string,
        imageClass?: string
    }
    bodyImage?: string
    qrCodeUrl?: string
    buttonsParentClass?: string,
    bodyButtons?: {
        label: string
        variant?: "outline" | "subtle" | "solid" | "soft" | "ghost" | "link"
        class?: string
    }[]
    footerButtons?: {
        label: string
        variant?: "outline" | "subtle" | "solid" | "soft" | "ghost" | "link"
    }[]
    body?: string
    bodies?: {
        title: string,
        body: string,
        footer: string
    }[],
    //could be single images of multiplace image per slot for comparison
    carousals?: CardData[][],
    showFooter?: boolean
    showHeader?: boolean
    footer?: string
    class: string
    cardClass?: string
    variant?: "outline" | "subtle" | "solid" | "soft"
}