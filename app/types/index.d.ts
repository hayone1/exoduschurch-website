import { type Variant, type VariantLabels } from 'motion-v';

interface CardData {
    backgroundImage?: string
    backdropClasses?: string[]
    contentJustification?: string
    title?: string
    titleIcon?: string
    titleIconLink?: string
    textWithImage?: InlineImageText
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
    bodies?: BasicContent[],
    //could be single images of multiplace image per slot for comparison
    carousals?: CardData[][],
    showFooter?: boolean
    showHeader?: boolean
    footer?: string
    class: string
    cardClass?: string
    variant?: "outline" | "subtle" | "solid" | "soft",
    cardAnimation?: CardAnimation
}

interface BasicContent {
    title: string
    body: string
    footer: string
}

interface InlineImageText {
    pretext?: string
    imageUrl: string
    postText?: string
    imageClass?: string
}

interface CardAnimation {
    offscreen: boolean | Variant | VariantLabels
    onscreen: Variant | VariantLabels
    textOffscreen: boolean | Variant | VariantLabels
    textOnScreen: Variant | VariantLabels
    backdropOffscreen: boolean | Variant | VariantLabels
    backdropOnScreen: Variant | VariantLabels
}