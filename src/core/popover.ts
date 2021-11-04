export class Popover {
    private readonly title: string;
    private readonly value: number;
    public element: HTMLDivElement | undefined;
    private root: HTMLElement;

    constructor(title: string, value: number, root: HTMLElement) {
        this.title = title;
        this.value = value;
        this.root = root;
    }

    create(width: string, x: string, y: string) {
        this.element = document.createElement('div');
        this.element.classList.add('popover');
        this.element.setAttribute('style', `--top: ${y}px`)
        this.element.style.opacity = '0';
        this.element.style.width = width;
        this.element.style.left = x + 'px';
        this.element.setAttribute('data-top', y);
        this.element.innerHTML = `<span class="popover-arrow"></span><p>${this.title} - ${this.value}</p>`;
        setTimeout(() => {
            if (this.element) {
                this.element.style.opacity = '1';
            }
        }, 100);
        this.root.appendChild(this.element);
    }

    destroy() {
        if (this.element) {
            this.element.remove();
        }
    }
}
