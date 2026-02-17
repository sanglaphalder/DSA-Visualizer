import { sleep } from '../utils/helpers';

export const quickSort = async (array, setArray, speed, stopSignal, pauseSignal) => {
    let arr = array.map(item => ({ ...item }));
    
    // Main Recursive Function
    const solve = async (low, high) => {
        if (low < high) {
            let pivotIdx = await partition(arr, low, high, setArray, speed, stopSignal, pauseSignal);
            
            if (pivotIdx === -1) return; // Stop if signal received

            await solve(low, pivotIdx - 1);
            await solve(pivotIdx + 1, high);
        } else if (low >= 0 && low < arr.length) {
            // Single element is always sorted
            arr[low].status = 'sorted';
            setArray([...arr]);
        }
    };

    await solve(0, arr.length - 1);
    
    // Ensure everything is marked sorted at the end
    if (!stopSignal.current) {
        arr.forEach(item => item.status = 'sorted');
        setArray([...arr]);
    }
};

const partition = async (arr, low, high, setArray, speed, stopSignal, pauseSignal) => {
    let pivotValue = arr[high].value;
    arr[high].status = 'pivot'; // Highlight Pivot with color
    setArray([...arr]);

    let i = low - 1;

    for (let j = low; j < high; j++) {
        
        // STOP & PAUSE LOGIC 
        if (stopSignal.current) return -1;
        
        while (pauseSignal.current) {
            if (stopSignal.current) return -1;
            await sleep(100);
        }

        arr[j].status = 'comparing';
        setArray([...arr]);
        await sleep(speed);

        if (arr[j].value < pivotValue) {
            i++;
            // Swapping Visualization
            arr[i].status = 'swapping';
            arr[j].status = 'swapping';
            
            [arr[i].value, arr[j].value] = [arr[j].value, arr[i].value];
            
            setArray([...arr]);
            await sleep(speed);
            
            arr[i].status = 'default';
        }
        arr[j].status = 'default';
    }

    if (stopSignal.current) return -1;
    while (pauseSignal.current) {
        if (stopSignal.current) return -1;
        await sleep(100);
    }

    // Pivot placement swap
    [arr[i + 1].value, arr[high].value] = [arr[high].value, arr[i + 1].value];
    
    arr[high].status = 'default';
    arr[i + 1].status = 'sorted'; // Pivot is now in its correct place
    setArray([...arr]);
    await sleep(speed);

    return i + 1;
};


export const quickSortCPP = `#include <iostream>
using namespace std;

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    quickSort(arr, 0, n - 1);
    cout << "Sorted array: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    return 0;
}`;