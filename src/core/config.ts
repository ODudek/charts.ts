export interface IConfig {
    datasets: IDataSet[];
    type: ChartTypes;
    elementId: string;
    options: ConfigOptions;
}

export interface IDataSet {
    color: IColorsConfig;
    data: IData[];
    min: number;
    max: number;
}

interface IData {
    value: number;
    label: string;
}

interface ConfigOptions {
    height: number;
    title: string;
    legend: ILegendConfig;
    responsive: boolean;
}

export interface ILegendConfig {
    position: Position;
}

export interface IColorsConfig {
    border: string;
    fill: string;
}

type Position = 'top' | 'bottom';

type ChartTypes = 'bar';
