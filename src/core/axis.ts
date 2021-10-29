import { ISvg, Svg } from './svg';

type AxisType = 'y' | 'x';

export class Axis {
    private readonly height: number;
    private rootSvg: ISvg;
    private readonly type: AxisType;

    constructor(height: number, rootSvg: ISvg, type: AxisType) {
        this.height = height;
        this.rootSvg = rootSvg;
        this.type = type;
    }

    getPoints() {
        if (this.type === 'y') {
            return `${0},${0} ${0},${this.height}`;
        }
        return `${0},${this.height} ${this.rootSvg.clientWidth},${this.height}`;
    }

    render() {
        const svg = new Svg('polyline');
        svg.set('fill', 'none');
        svg.set('stroke', 'black');
        svg.set('strokeWidth', '1');
        svg.set('points', this.getPoints());
        this.rootSvg.appendChild(svg.getElement());
    }

}
