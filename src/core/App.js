import DragAndDrop from './DragAndDrop';

/**
 * App class
 */
class App {

    /**
     * begin method
     */
    static begin() {
        // Section 2 / Menu
        const section2DraggableElement = document.querySelector('#section-2 .draggable');
        const section2Bounds = document.querySelector('#section-2 .drag-wrapper');
        const section2Targets = document.querySelectorAll('#section-2 [class^="drag-target"]');

        const section2DragAndDrop = new DragAndDrop(section2DraggableElement, section2Bounds, section2Targets);

        // Section 4 / Form example 1
        const section4DraggableElement = document.querySelector('#section-4 .draggable');
        const section4Bounds = document.querySelector('#section-4 .drag-wrapper');
        const section4Targets = document.querySelectorAll('#section-4 [class^="drag-target"]');

        const section4DragAndDrop = new DragAndDrop(section4DraggableElement, section4Bounds, section4Targets);
    }
}

export default App;