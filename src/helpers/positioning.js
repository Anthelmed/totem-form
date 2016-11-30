export const positionedDragTarget = () => {
    // Section 6
    const section6TargetsSelector = document.querySelectorAll('#section-6 .drag-target');
    const section6DragWrapper = document.querySelector('#section-6 .drag-wrapper');
    const dragWrapperHeight = section6DragWrapper.clientHeight;
    const dragWrapperWidth = section6DragWrapper.clientWidth;
    const theta = [];
    const n = section6TargetsSelector.length + 3;
    const r = 150;
    const so = -20;
    const frags = 360 / n;

    for (let i = 0; i <= n; i++) {
        theta.push((frags / 180) * i * Math.PI);
    }

    for (let i = 0; i < section6TargetsSelector.length; i++) {
        const target = section6TargetsSelector[i];
        const posx = Math.round(r * (Math.cos(theta[i + 1])));
        const posy = Math.round(r * (Math.sin(theta[i + 1])));

        target.style.top = (dragWrapperHeight / 2) - posx + so + 'px';
        target.style.left = (dragWrapperWidth / 2 ) + posy + so + 'px';
    }

    window.addEventListener('resize', positionedDragTarget);
};
