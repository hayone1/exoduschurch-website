import type { Variant, VariantLabels } from 'motion-v';
import type { StyleValue } from 'vue';

interface CardData {
    backgroundImage?: string
    motionStyle?: StyleValue
    backdropClasses?: string[]
    contentJustification?: string
    title?: string
    titleIcon?: string
    titleIconLink?: string
    textWithImage?: InlineImageText
    bodyImage?: string
    qrCodeUrl?: string
    bodyButtonsParentClass?: string
    bodyButtons?: ButtonContent[]
    footerButtonsParentClass?: string
    footerButtons?: ButtonContent[]
    body?: string
    bodyClass?: string
    bodies?: BasicContent[]
    //could be single images of multiplace image per slot for comparison
    comparisonCarousals?: CardData[][]
    carousels?: CardData[]
    carouselsClass?: string
    carouselsUi?: any
    showFooter?: boolean
    showHeader?: boolean
    footer?: string
    class: string
    cardClass?: string
    variant?: "outline" | "subtle" | "solid" | "soft"
    cardAnimation?: CardAnimation
}

interface IParallaxFlow {
    visibilityNodesGroup: string[][],
    focusNodes: string[],
    nodes: (width: number, height: number) => Node<any, any, string>[],
    // globalThis.Ref<Node<any, any, string>[],Node<any, any, string>[]>,
    // nodes: (width: number, height: number) => Node<any, any, string>[],
    edges: Edge<any, any, string>[],
    backGroundColor: ComputedRef<{
        parentBackground: string;
        patternBackground: string;
    }>
    // {
    //     parentBackground: string,
    //     patternBackground: string
    // }
}

interface IParallaxVariant {
    backGroundColor: string
    graphic: {
        centralImage: string,
        icons: string[],
    },
    nodes: {
        label: string,
        locationClass: string
    }[]
}

interface ButtonContent {
    label: string
    variant?: "outline" | "subtle" | "solid" | "soft" | "ghost" | "link"
    class?: string
    icon?: string
    color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral"
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
    height?: number
    bottom: number
    left: number
    right: number
    top: number
    width?: number
    x?: number
    y?: number
}

interface PointerLocation {
    clientX: number
    clientY: number
}