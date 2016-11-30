class ScratchCard {
    /**
     * constructor method
     * @param sectionIndex
     */
    constructor(sectionIndex) {
        this.sectionIndex = sectionIndex;
        this.containerSelector = document.querySelector('#section-' + sectionIndex + ' .scratch-container');
        this.canvasSelector = document.querySelector('#section-' + sectionIndex + ' .scratch-canvas');

        this.isDrawing = false;
        this.lastPoint;
        this.canvasWidth = this.canvasSelector.width;
        this.canvasHeight = this.canvasSelector.height;
        this.ctx = this.canvasSelector.getContext('2d');
        this.image = new Image();
        this.brush = new Image();

        this.maxPercent = 75;

        this.init();
        this.addEventListeners();
    }

    /**
     * init method
     */
    init() {
        const sectionIndex = this.sectionIndex;
        const image = this.image;
        const brush = this.brush;

        image.src = '/images/circle.png';
        brush.src = '/images/brush.png';

        image.onload = () => {
            this.ctx.drawImage(image, 0, 0);
            document.querySelector('#section-' + sectionIndex + ' .scratch-container img').style.visibility = 'visible';
        };
    }

    /**
     * distanceBetween method
     * @param point1
     * @param point2
     * @returns {number}
     */
    distanceBetween(point1, point2) {
        return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }

    /**
     * angleBetween method
     * @param point1
     * @param point2
     * @returns {number}
     */
    angleBetween(point1, point2) {
        return Math.atan2(point2.x - point1.x, point2.y - point1.y);
    }

    // Only test every `stride` pixel. `stride`x faster,
    // but might lead to inaccuracy
    /**
     * getFilledInPixels method
     * @param stride
     * @returns {number}
     */
    getFilledInPixels(stride) {
        const ctx = this.ctx;
        const canvasWidth = this.canvasWidth;
        const canvasHeight = this.canvasHeight;

        if (!stride || stride < 1) {
            stride = 1;
        }

        const pixels = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        const pdata = pixels.data;
        const l = pdata.length;
        const total = (l / stride);
        let count = 0;

        // Iterate over all pixels
        for (let i = 0; i < l; i += stride) {
            if (parseInt(pdata[i]) === 0) {
                count++;
            }
        }

        return Math.round((count / total) * 100);
    }

    /**
     * getMouse method
     * @param e
     * @param canvas
     * @returns {{x: (number|*), y: (number|*)}}
     */
    getMouse(e, canvas) {
        let offsetX = 0;
        let offsetY = 0;
        let mx;
        let my;

        if (canvas.offsetParent !== undefined) {
            do {
                offsetX += canvas.offsetLeft;
                offsetY += canvas.offsetTop;
            } while ((canvas = canvas.offsetParent));
        }

        mx = (e.pageX || e.touches[0].clientX) - offsetX;
        my = (e.pageY || e.touches[0].clientY) - offsetY;

        return {x: mx, y: my};
    }

    /**
     * handlePercentage method
     * @param filledInPixels
     */
    handlePercentage(filledInPixels) {
        const canvas = this.canvasSelector;
        const maxPercent = this.maxPercent;

        filledInPixels = filledInPixels || 0;
        if (filledInPixels > maxPercent) {
            canvas.style.opacity = 0;
        }
    }

    /**
     * handleMouseDown method
     * @param e
     */
    handleMouseDown(e) {
        const canvas = this.canvasSelector;

        this.isDrawing = true;
        this.lastPoint = this.getMouse(e, canvas);
    }

    /**
     * handleMouseMove method
     * @param e
     */
    handleMouseMove(e) {
        const canvas = this.canvasSelector;
        const ctx = this.ctx;
        const lastPoint = this.lastPoint;
        const brush = this.brush;

        if (!this.isDrawing) {
            return;
        }

        e.preventDefault();

        const currentPoint = this.getMouse(e, canvas);
        const dist = this.distanceBetween(lastPoint, currentPoint);
        const angle = this.angleBetween(lastPoint, currentPoint);
        let x;
        let y;

        for (let i = 0; i < dist; i++) {
            x = lastPoint.x + (Math.sin(angle) * i) - 25;
            y = lastPoint.y + (Math.cos(angle) * i) - 25;
            ctx.globalCompositeOperation = 'destination-out';
            ctx.drawImage(brush, x, y);
        }

        this.lastPoint = currentPoint;
        this.handlePercentage(this.getFilledInPixels(32));
    }

    /**
     * handleMouseUp method
     * @param e
     */
    handleMouseUp(e) {
        this.isDrawing = false;
    }

    /**
     * addEventListeners method
     */
    addEventListeners() {
        const canvas = this.canvasSelector;

        canvas.addEventListener('mousedown', ::this.handleMouseDown, false);
        canvas.addEventListener('touchstart', ::this.handleMouseDown, false);
        canvas.addEventListener('mousemove', ::this.handleMouseMove, false);
        canvas.addEventListener('touchmove', ::this.handleMouseMove, false);
        canvas.addEventListener('mouseup', ::this.handleMouseUp, false);
        canvas.addEventListener('touchend', ::this.handleMouseUp, false);
    }

}

export default ScratchCard;