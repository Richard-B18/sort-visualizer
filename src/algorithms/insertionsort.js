import  { DEFAULT_COLOR, CHECKING_COLOR, SORTED_COLOR, DEFAULT_SPEED } from '../sortingVisualizer/sortingVisualizer';

export function insertion(array) {

    const n = array.length;
    const animations = [] // array of objects, every object has an array to show and numbers being swapped

    let i, key, j;
    for (i = 1; i < n; i++) {
        key = array[i];
        j = i - 1;

        while (j >= 0 && array[j] > key) {
            const animation1 = {
                'animate': [j, i],
                'mode': 'compare',
            }
            animations.push(animation1);

            const animation2 = {
                'animate': [j, i],
                'mode': 'uncompare',
            }
            animations.push(animation2);

            array[j + 1] = array[j];
            j = j - 1;
        }
        array[j + 1] = key;
        const animation3 = {
            'animate': [j + 1, i],
            'mode': 'insert',
        }
        animations.push(animation3);
    }
    return animations;
}

export default function insertionAnimation(animations, speed) {
    const toBeAnimated = document.getElementsByClassName('array-bar');

    for (let i = 0; i < animations.length; i++) {
        const animation = animations[i];

        const barOneIndex = animation.animate[0];
        const barTwoIndex = animation.animate[1];

        setTimeout(() => {
            switch (animation.mode) {
                case 'compare':
                    toBeAnimated[barOneIndex].style.backgroundColor = CHECKING_COLOR;
                    toBeAnimated[barTwoIndex].style.backgroundColor = CHECKING_COLOR;
                    break;
                case 'uncompare':
                    toBeAnimated[barOneIndex].style.backgroundColor = DEFAULT_COLOR;
                    toBeAnimated[barTwoIndex].style.backgroundColor = DEFAULT_COLOR;
                    break;
                case 'insert':
                    const keyHeight = toBeAnimated[barTwoIndex].style.height;
                    const keyValue = toBeAnimated[barTwoIndex].innerHTML;
                    for (let j = barTwoIndex; j > barOneIndex; j--) {
                        toBeAnimated[j].style.height = toBeAnimated[j - 1].style.height;
                        toBeAnimated[j].innerHTML = toBeAnimated[j - 1].innerHTML;
                    }
                    toBeAnimated[barOneIndex].style.height = keyHeight;
                    toBeAnimated[barOneIndex].innerHTML = keyValue;
                    break;
                default:
                    return;
            }
        }, DEFAULT_SPEED * i / speed);
    }

    for (let i = 0; i < toBeAnimated.length; i++) {
        setTimeout(() => {
            toBeAnimated[i].style.backgroundColor = SORTED_COLOR;
        }, DEFAULT_SPEED * animations.length / speed + 3 * i);
    }
}