/// <reference types="react" />
export declare const useAnimationOnScreen: (config?: {
    screenEntryRatio?: number | undefined;
    animationType?: string | undefined;
    transitionDuration?: number | undefined;
    makeAnimationUnique?: boolean | undefined;
} | undefined) => import("react").RefObject<HTMLEmbedElement>;
