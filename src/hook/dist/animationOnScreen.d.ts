/// <reference types="react" />
export declare const useAnimationOnScreen: (config?: {
    screenEntryRatio?: number | undefined;
    animationType?: string | undefined;
    transitionDuration?: number | undefined;
    transitionDelay?: number | undefined;
    transitionTimingFunction?: string | undefined;
    makeAnimationUnique?: boolean | undefined;
} | undefined) => import("react").RefObject<HTMLEmbedElement>;
