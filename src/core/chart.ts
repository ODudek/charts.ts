import { IConfig } from './config';
import { ISvg, Svg } from './svg';
import { Dataset } from './dataset';
import { Axis } from './axis';

export class Chart {
    private datasets: Dataset[];
    private readonly rootSvg: ISvg;
    private readonly root: HTMLElement | null;

    constructor(config: IConfig) {
        this.rootSvg = this.initSvg(config.options.responsive, config.options.height);
        this.root = document.getElementById(config.elementId);
        if (this.root) {
            this.root.appendChild(this.rootSvg);
        }
        this.datasets = config.datasets.map((ds) => new Dataset(ds, this.rootSvg, config.options.height));
        this.renderDataSets();
        this.renderAxis(config.options.height);
    }

    renderAxis(height: number) {
        const axisX = new Axis(height, this.rootSvg, 'x');
        const axisY = new Axis(height, this.rootSvg, 'y');
        axisX.render();
        axisY.render();
    }

    renderDataSets() {
        this.datasets.forEach((ds) => {
            ds.render();
        });
    }


    initSvg(isResponsive: boolean, height: number): ISvg {
        const svg = new Svg('svg');
        svg.set('height', `${height}px`);
        svg.set('width', '100%')
        return svg.getElement();
    }

}
