import { Chart } from './core/chart';

function containChartCode() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    svg.setAttribute('height', `${500}px`);
    svg.setAttribute('width', `${500}px`);
    svg.setAttribute('viewBox', `0 0 500 500`);


    const chartData = new Array(10)
        .fill(0)
        .map(
            () =>
                parseInt(
                    100 * (Math.random() + 1),
                    10
                ),
        );

    function generateChart(data) {
        const barChartElems = [];

        const create = (d) => {
            d.forEach((entry, index) => {
                const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                bar.setAttribute('x', index * (500 / data.length));
                bar.setAttribute('y', 500 - 0);
                bar.setAttribute('height', `${0}px`);
                bar.setAttribute('width', `${500 / data.length}px`);
                bar.setAttribute('style', 'transition: 0.5s all;');
                svg.appendChild(bar);
                barChartElems.push(bar);
            });
        };

        const update = (newData) => {
            if (newData.length > barChartElems.length) {
                create(newData.filter(((e, i) => i > barChartElems.length - 1)));
            }

            newData.forEach((newEntry, index) => {
                if (index > barChartElems.length - 1) return;

                const bar = barChartElems[index];
                bar.setAttribute('x', index * (500 / newData.length));
                bar.setAttribute('width', `${500 / newData.length}px`);

                setTimeout(() => {
                    bar.setAttribute('y', 500 - newEntry);
                    bar.setAttribute('height', `${newEntry}px`);
                }, 100 * index);
            });
        };

        create(data);
        update(data);
        return update;
    }

    document.getElementById('demo').appendChild(svg);

    const updateChart = generateChart(chartData);

    const input = document.createElement('input');
    const button = document.createElement('button');
    button.innerText = 'Add to data';
    input.setAttribute('type', 'number');
    input.setAttribute('min', '0');
    input.setAttribute('max', '500');

    button.addEventListener('click', (e) => {
        const nextEntry = parseInt(input.value, 10);
        chartData.push(nextEntry);

        if(updateChart === null) {
            updateChart = generateChart(chartData);
        } else {
            updateChart(chartData);
        }
    });

    document.getElementById('demo').appendChild(input);
    document.getElementById('demo').appendChild(button);
}

window.Chart = Chart
