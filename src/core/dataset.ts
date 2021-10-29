import { IDataSet } from './config';
import { ISvg, Svg } from './svg';
import { Popover } from './popover';

export class Dataset {
    private readonly config: IDataSet;
    private readonly rootSvg: ISvg;
    private readonly height: number;
    private readonly padding: number;
    private readonly min: number;
    private readonly max: number;

    constructor(config: IDataSet, rootSvg: ISvg, height: number) {
        this.config = config;
        this.rootSvg = rootSvg;
        this.height = height;
        this.min = config.min;
        this.max = config.max;
        this.padding = 20;
    }

    calculateHeight(height: number) {
        if (height === this.max) {
            return this.height - this.padding;
        }
        console.log('height: ', height, this.max)
        const percent = (height * 100) / this.max;
        return parseFloat(((percent * 0.01 * this.height) - this.padding).toFixed(4))
    }

    render() {

        const length = this.config.data.length;
        this.config.data.forEach((d, index) => {
            const svg = new Svg('rect', this.config.color);
            const popover = new Popover(d.label, d.value, this.rootSvg.parentElement!);
            const height = this.calculateHeight(d.value);
            console.log('this.rootSvg.clientWidth: ', this.rootSvg.clientWidth);
            svg.set('x', (index * ((this.rootSvg.clientWidth - this.padding) / length) + this.padding).toString());
            svg.set('y', `${this.height}`);
            svg.set('height', `${height}px`);
            svg.set('width', `${(this.rootSvg.clientWidth - this.padding) / length}px`);
            svg.setStyle('transition: 0.5s all;');
            svg.addEventListener('mouseover', (e: any) => {
                svg.addPopover(popover, this.padding);
            });
            svg.addEventListener('mouseleave', svg.removePopover);
            this.rootSvg.appendChild(svg.getElement());
            svg.animate('y', this.height - height - this.padding, 100 * index);
        });
    }
}
