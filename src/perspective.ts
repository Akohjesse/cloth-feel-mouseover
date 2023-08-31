export const perspective = (inner: HTMLElement) => {
    let container = inner.parentNode as HTMLElement;

    const mouse = { _x: 0, _y: 0, x: 0, y: 0,
        updatePosition: function (e: MouseEvent) {
            this.x = e.clientX - this._x;
            this.y = (e.clientY - this._y) * -1;
        },
        setOrigin: function (e: HTMLElement) {
            this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
            this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
        },
        show: function () {
            return "(" + this.x + ", " + this.y + ")";
        },
    };

    mouse.setOrigin(container);

    var counter = 0;
    var refreshRate = 10;
    var isTimeToUpdate = function () {
        return counter++ % refreshRate === 0;
    };

    const onMouseEnterHandler = (event: MouseEvent): void => {
        update(event);
    };

    const onMouseLeaveHandler = (): void => {
        inner.style.transform = "";
    };

    const onMouseMoveHandler = (event: MouseEvent): void => {
        if (isTimeToUpdate()) {
            update(event);
        }
    };

    const update = (event: MouseEvent): void => {
        mouse.updatePosition(event);
        updateTransformStyle((mouse.y / inner.offsetHeight / 2).toFixed(2), (mouse.x / inner.offsetWidth / 2).toFixed(2));
    };

    const updateTransformStyle =  (x: String, y: String)=> {
        var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
        inner.style.transform = style;
    };

    const updatePerspective = () => {
        const mediaQueryList = window.matchMedia("(max-width: 865px)");

        if (mediaQueryList.matches) {
            container.onmousemove = null;
            container.onmouseleave = null;
            container.onmouseenter = null;
        } else {
            container.onmousemove = onMouseMoveHandler;
            container.onmouseleave = onMouseLeaveHandler;
            container.onmouseenter = onMouseEnterHandler;
        }
    };

    updatePerspective();

    window.addEventListener("resize", updatePerspective);
};
