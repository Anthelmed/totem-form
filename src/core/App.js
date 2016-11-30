import Router from './Router';
import Transition from './Transition';
import Header from './Header';
import Section from './Section';

import DragAndDrop from './DragAndDrop';
import ColorWheel from './ColorWheel';
import ScratchCard from './ScratchCard';

import { sections, sectionsColor } from '../config/globalVariables';

import { positionedDragTarget } from '../helpers/positioning';

/**
 * App class
 */
class App {

    /**
     * begin method
     */
    static begin() {

        // Router
        const router = new Router();
        window.router = router;

        // Transition
        const transition = new Transition();

        // Header
        const header = new Header();

        // Sections
        const sectionsSelector = document.querySelectorAll('[id^="section-"]');
        const path = 'data/waveAnimation.json';

        for (let i = 0; i < sectionsSelector.length; i++) {
            const sectionSelector = sectionsSelector[i];

            sections[i] = new Section(i, sectionsColor[i], path);
            sectionSelector.style.zIndex = sectionsSelector.length - i;
        }

        new DragAndDrop(3);
        new DragAndDrop(4);
        new DragAndDrop(6);
        new ColorWheel(8);
        new ScratchCard(10);

        positionedDragTarget();

        // Waiting time for introduction (totaly random)
        setTimeout(() => {
            router.next();

            setTimeout(() => {
                router.next();

                setTimeout(() => {
                    router.next();
                }, 15000);
            }, 5000);
        }, 6000);
    }
}

export default App;