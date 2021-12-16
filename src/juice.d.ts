declare module "juice" {}

interface Options {
    applyAttributesTableElements: boolean;
    applyHeightAttributes: boolean;
    applyStyleTags: boolean;
    applyWidthAttributes: boolean;
    extraCss: string;
    insertPreservedExtraCss: boolean;
    inlinePseudoElements: boolean;
    preserveFontFaces: boolean;
    preserveImportant: boolean;
    preserveMediaQueries: boolean;
    preserveKeyFrames: boolean;
    preservePseudos: boolean;
    removeStyleTags: boolean;
    webResources: any;
    xmlMode: boolean;
}

declare function e(content: string, options: Options): string;

export = e;