import  { DEFAULT_COLOR, CHECKING_COLOR, SORTED_COLOR, DEFAULT_SPEED } from '../visualizer/sortingVisualizer';

function merge(arr, l, m, r, animations)
{
    const n1 = m - l + 1;
    const n2 = r - m;

    // Create temp arrays
    const L = new Array(n1);
    const R = new Array(n2);

    // Copy data to temp arrays L[] and R[]
    for (let i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (let j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    // Merge the temp arrays back into arr[l..r]

    // Initial index of first subarray
    let i = 0;

    // Initial index of second subarray
    let j = 0;

    // Initial index of merged subarray
    let k = l;

    const aux = [];

    while (i < n1 && j < n2) {
        const animation1 = {
            'animate': [i + l, j + m + 1],
            'mode': 'compare',
        }
        animations.push(animation1);

        const animation2 = {
            'animate': [i + l, j + m + 1],
            'mode': 'uncompare',
        }
        animations.push(animation2);


        if (L[i] <= R[j]) {
            aux.push(L[i]);

            arr[k] = L[i];
            i++;
        }
        else {
            aux.push(R[j]);

            arr[k] = R[j];
            j++;
        }
        k++;
    }

    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
        aux.push(L[i]);

        arr[k] = L[i];
        i++;
        k++;
    }

    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
        aux.push(R[j]);

        arr[k] = R[j];
        j++;
        k++;
    }

    const animation3 = {
        'animate': [l, r],
        'order': aux,
        'mode': 'merge',
    }
    animations.push(animation3);
}

// l is for left index and r is
// right index of the sub-array
// of arr to be sorted */
function mergesort(arr, l, r, animations){
    if(l >= r){
        return;//returns recursively
    }
    const m = l + parseInt((r - l)/2);
    mergesort(arr, l, m, animations);
    mergesort(arr,m+1, r, animations);
    merge(arr, l, m, r, animations);
}

export function getMergeAnimations(array) {
    const animations = [];
    mergesort(array, 0, array.length - 1, animations);
    return animations;
}

export default function mergeAnimate(animations, speed, isSmallArray) {
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
                case 'merge':
                    for (let j = barOneIndex; j <= barTwoIndex; j++) {
                        const value = animation.order[j - barOneIndex];

                        toBeAnimated[j].style.height = `${value}px`;
                        if (isSmallArray)
                            toBeAnimated[j].innerHTML = value;
                    }
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