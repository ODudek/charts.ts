import { IColorsConfig } from './config';
import { Popover } from './popover';

export type ISvg =
    SVGSymbolElement
    | SVGMetadataElement
    | SVGUseElement
    | SVGAnimateElement
    | SVGFEImageElement
    | SVGPathElement
    | SVGViewElement
    | SVGFEConvolveMatrixElement
    | SVGFECompositeElement
    | SVGEllipseElement
    | SVGFEOffsetElement
    | SVGTextElement
    | SVGDefsElement
    | SVGFETurbulenceElement
    | SVGImageElement
    | SVGFEFuncGElement
    | SVGMPathElement
    | SVGTSpanElement
    | SVGClipPathElement
    | SVGLinearGradientElement
    | SVGFEFuncRElement
    | SVGScriptElement
    | SVGFEColorMatrixElement
    | SVGFEComponentTransferElement
    | SVGStopElement
    | SVGMarkerElement
    | SVGFEMorphologyElement
    | SVGFEMergeElement
    | SVGFEPointLightElement
    | SVGForeignObjectElement
    | SVGFEDiffuseLightingElement
    | SVGStyleElement
    | SVGFEBlendElement
    | SVGCircleElement
    | SVGPolylineElement
    | SVGDescElement
    | SVGFESpecularLightingElement
    | SVGLineElement
    | SVGFESpotLightElement
    | SVGFETileElement
    | SVGPatternElement
    | SVGTitleElement
    | SVGSwitchElement
    | SVGRectElement
    | SVGFEDisplacementMapElement
    | SVGFEFuncAElement
    | SVGFEFuncBElement
    | SVGFEMergeNodeElement
    | SVGTextPathElement
    | SVGFEFloodElement
    | SVGMaskElement
    | SVGAElement
    | SVGAnimateTransformElement
    | SVGSetElement
    | SVGSVGElement
    | SVGAnimateMotionElement
    | SVGGElement
    | SVGFEDistantLightElement
    | SVGFEDropShadowElement
    | SVGRadialGradientElement
    | SVGFilterElement
    | SVGPolygonElement
    | SVGFEGaussianBlurElement;

type AnimationType = 'y' | 'height';
type SetType = Exclude<keyof CSSStyleDeclaration, 'style'> | 'preserveAspectRatio' | 'viewBox' | 'y' | 'x' | 'points';

export class Svg {
    private readonly svg: ISvg;
    private interval: number | undefined;
    private popover: Popover | undefined;

    constructor(type: keyof SVGElementTagNameMap, color?: IColorsConfig) {
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', type);
        this._addStyles(color);
    }

    addClass(name: string) {
        this.svg.classList.add(name);
    }

    removeClass(name: string) {
        this.svg.classList.remove(name);
    }

    animate(key: AnimationType, value: number, interval = 10) {

        this.interval = setTimeout(() => {
            this.set(key, `${value}`);
        }, interval);
    }

    _addStyles(color: IColorsConfig | undefined) {
        if (!color) {
            return;
        }
        this.setStyle(`fill: ${color.fill}; stroke: ${color.border};`);
    }

    get(key: string) {
        return this.svg.getAttribute(key);
    }

    setStyle(value: string) {
        const styles = this.svg.getAttribute('style');
        this.svg.setAttribute('style', styles ? `${styles} ${value}` : value);
    }

    set(key: SetType, value: string) {
        this.svg.setAttribute(key as string, value);
    }

    getElement(): ISvg {
        return this.svg;
    }

    addEventListener(eventName: string, callback: any) {
        this.svg.addEventListener(eventName, callback, {
            passive: true
        });
    }

    addPopover(popover: Popover, padding: number) {
        this.popover = popover;
        this.popover.create(this.get('width')!, this.get('x')!, (parseInt(this.get('y')!) - (3 * padding)).toString());
    }

    removePopover = (e: any) => {
        if (this.popover && e.toElement !== this.svg && e.toElement !== this.popover.element) {
            console.log('e.toElement: ', e.toElement, this.popover.element);
            this.popover.destroy();
        }
    }
}
