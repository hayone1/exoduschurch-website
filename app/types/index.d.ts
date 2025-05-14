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
    bodyButtonsParentClass?: string,
    bodyButtons?: ButtonContent[]
    footerButtonsParentClass?: string,
    footerButtons?: ButtonContent[]
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

interface ButtonContent {
    label: string
    variant?: "outline" | "subtle" | "solid" | "soft" | "ghost" | "link"
    class?: string
}

interface BasicContent {
    title?: string
    body?: string
    footer?: string
}

interface InlineImageText {
    pretext?: string
    imageUrl?: string
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

interface BoundingBox {
  height: number
  bottom: number
  left: number
  right: number
  top: number
  width: number
  x: number
  y: number
}