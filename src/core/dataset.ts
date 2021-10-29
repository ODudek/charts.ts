import { IDataSet } from './config';
import { ISvg, Svg } from './svg';
import { Popover } from './popover';

export class Dataset {
    private readonly config: IDataSet;
    private readonly rootSvg: ISvg;
    private readonly height: number;
    private readonly padding: number;

    constructor(config: IDataSet, rootSvg: ISvg, height: number) {
        this.config = config;
        this.rootSvg = rootSvg;
        this.height = height;
        this.padding = 20;
    }

    render() {
        const length = this.config.data.length;
        this.config.data.forEach((d, index) => {
            const svg = new Svg('rect', this.config.color);
            const popover = new Popover(d.label, d.value, this.rootSvg.parentElement!);
            svg.set('x', (index * (this.rootSvg.clientWidth / length) + this.padding).toString());
            svg.set('y', `${this.height}`);
            svg.set('height', `${d.value}px`);
            svg.set('width', `${this.rootSvg.clientWidth / length}px`);
            svg.setStyle('transition: 0.5s all;');
            svg.addEventListener('mouseover', (e: any) => {
                svg.addPopover(popover, this.padding);
            });
            svg.addEventListener('mouseleave', svg.removePopover);
            this.rootSvg.appendChild(svg.getElement());
            svg.animate('height', this.height - d.value - this.padding, 100 * index);
        });
    }
}
