import Header from './Header';
import Section from './Section';

import DragAndDrop from './DragAndDrop';
import ColorWheel from './ColorWheel';

import { sections } from '../config/globalVariables';
import { paths } from '../data/paths';

/**
 * App class
 */
class App {

    /**
     * begin method
     */
    static begin() {


        const sectionsSelector = document.querySelectorAll('[id^="section-"]');
        const header = new Header();
        let nbSectionsForm = 0;

        document.querySelector('body').classList.add('transition-in');
        sectionsSelector[0].classList.add('transition-in');

        for (let i = 0; i < sectionsSelector.length; i++) {
            const sectionSelector = sectionsSelector[i];
            const sectionIndex = parseInt(sectionSelector.getAttribute('data-section-index'));
            const sectionIsForm = sectionSelector.getAttribute('data-section-is-form');
            let sectionFormIndex = -1;

            if (sectionIsForm === 'true') {
                nbSectionsForm++;
                sectionFormIndex = nbSectionsForm;
            }

            const section = new Section(sectionIndex, sectionFormIndex, paths, ::header.update);
            sections[sectionIndex] = section;

            if (i !== 0) {
                sectionSelector.classList.add('transition-out')
            }
            sectionSelector.style.zIndex = sectionsSelector.length - i;
        }

        /*// Section 2 / Menu
        const section2DraggableElement = document.querySelector('#section-2 .draggable');
        const section2Bounds = document.querySelector('#section-2 .drag-wrapper');
        const section2Targets = document.querySelectorAll('#section-2 [class^="drag-target"]');

        const section2DragAndDrop = new DragAndDrop(section2DraggableElement, section2Bounds, section2Targets);*/

        // Section 4 / Form example 1
        const section4DraggableElement = document.querySelector('#section-4 .draggable');
        const section4Bounds = document.querySelector('#section-4 .drag-wrapper');
        const section4Targets = document.querySelectorAll('#section-4 [class^="drag-target"]');

        const section4DragAndDrop = new DragAndDrop(section4DraggableElement, section4Bounds, section4Targets);

        // Section 6 / Form example 3
        const section6KnobElement = document.querySelector('#section-6 .knob');
        const section6DraggableElement = document.querySelector('#section-6 .draggable');

        const section6ColorWheel = new ColorWheel(section6KnobElement, section6DraggableElement);
    }
}

export default App;