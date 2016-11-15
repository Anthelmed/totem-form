import DragAndDrop from './DragAndDrop';

/**
 * App class
 */
class App {

    /**
     * begin method
     */
    static begin() {

        const sections = document.querySelectorAll('[id^="section-"]');

        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            let index = section.getAttribute('data-index');

            section.addEventListener('click', () => {
                section.classList.remove('visible');
                KUTE.to('#path-beforeMorph-'+ index, {
                    path: '#path-step-1-' + index
                }, {
                    easing: 'easingCubicInOut',
                    duration: 500
                }).start();
            });
            section.style.zIndex = sections.length - i;
        }

        /*// Section 2 / Menu
        const section2DraggableElement = document.querySelector('#section-2 .draggable');
        const section2Bounds = document.querySelector('#section-2 .drag-wrapper');
        const section2Targets = document.querySelectorAll('#section-2 [class^="drag-target"]');

        const section2DragAndDrop = new DragAndDrop(section2DraggableElement, section2Bounds, section2Targets);

        // Section 4 / Form example 1
        const section4DraggableElement = document.querySelector('#section-4 .draggable');
        const section4Bounds = document.querySelector('#section-4 .drag-wrapper');
        const section4Targets = document.querySelectorAll('#section-4 [class^="drag-target"]');

        const section4DragAndDrop = new DragAndDrop(section4DraggableElement, section4Bounds, section4Targets);*/
    }
}

export default App;