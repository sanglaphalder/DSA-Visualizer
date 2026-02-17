import { sleep } from '../utils/helpers';

export const radixSort = async (array, setArray, speed, stopSignal, pauseSignal) => {
    let arr = array.map(item => ({ ...item }));

    if (arr.length === 0) return;

    const getMax = async (arr) => {
        let max = arr[0].value;
        let maxIdx = 0;

        // Highlight first element as initial max
        arr[0].status = 'pivot';
        setArray([...arr]);
        await sleep(speed);

        for (let i = 1; i < arr.length; i++) {
            if (stopSignal.current) return max;
            while (pauseSignal.current) {
                if (stopSignal.current) return max;
                await sleep(100);
            }

            // Highlight current element being compared
            arr[i].status = 'comparing';
            setArray([...arr]);
            await sleep(speed);

            if (arr[i].value > max) {
                // If new max found, reset old max status and highlight new max
                arr[maxIdx].status = 'default';
                max = arr[i].value;
                maxIdx = i;
                arr[maxIdx].status = 'pivot';
            } else {
                // Return current element to default
                arr[i].status = 'default';
            }

            setArray([...arr]);
            await sleep(speed);
        }

        // Blink the result
        for (let k = 0; k < 3; k++) {
            arr[maxIdx].status = 'default';
            setArray([...arr]);
            await sleep(150);
            arr[maxIdx].status = 'pivot';
            setArray([...arr]);
            await sleep(150);
        }

        // Reset status before sorting starts
        arr[maxIdx].status = 'default';
        setArray([...arr]);

        return max;
    };

    const countSort = async (exp) => {
        if (stopSignal.current) return;

        let output = new Array(arr.length);
        let count = new Array(10).fill(0);

        for (let i = 0; i < arr.length; i++) {
            if (stopSignal.current) return;
            while (pauseSignal.current) {
                if (stopSignal.current) return;
                await sleep(100);
            }

            arr[i].status = 'comparing';
            setArray([...arr]);
            await sleep(Math.max(10, Math.floor(speed / 2)));

            count[Math.floor(arr[i].value / exp) % 10]++;

            arr[i].status = 'default';
            setArray([...arr]);
        }

        if (stopSignal.current) return;

        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        for (let i = arr.length - 1; i >= 0; i--) {
            if (stopSignal.current) return;
            while (pauseSignal.current) {
                if (stopSignal.current) return;
                await sleep(100);
            }

            const digit = Math.floor(arr[i].value / exp) % 10;
            const index = count[digit] - 1;
            // CLONE THE OBJECT here to break reference with original array position
            output[index] = { ...arr[i] };
            count[digit]--;
        }

        for (let i = 0; i < arr.length; i++) {
            if (stopSignal.current) return;
            while (pauseSignal.current) {
                if (stopSignal.current) return;
                await sleep(100);
            }

            arr[i] = output[i];
            arr[i].status = 'swapping';
            setArray([...arr]);
            await sleep(speed);

            arr[i].status = 'default';
            setArray([...arr]);
        }
    };

    let max = await getMax(arr);

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        if (stopSignal.current) return;
        await countSort(exp);
    }

    for (let i = 0; i < arr.length; i++) {
        if (stopSignal.current) return;
        arr[i].status = 'sorted';
    }
    setArray([...arr]);
};

export const radixSortCPP = `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int getMax(int arr[], int n) {
    int mx = arr[0];
    for (int i = 1; i < n; i++)
        if (arr[i] > mx)
            mx = arr[i];
    return mx;
}

void countSort(int arr[], int n, int exp) {
    int output[n];
    int i, count[10] = {0};

    for (i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;

    for (i = 1; i < 10; i++)
        count[i] += count[i - 1];

    for (i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }

    for (i = 0; i < n; i++)
        arr[i] = output[i];
}

void radixsort(int arr[], int n) {
    int m = getMax(arr, n);

    for (int exp = 1; m / exp > 0; exp *= 10)
        countSort(arr, n, exp);
}

int main() {
    int n;
    cout << "Enter number of elements: ";
    cin >> n;
    int arr[n];
    for (int i = 0; i < n; i++) cin >> arr[i];

    radixsort(arr, n);

    cout << "Sorted array: \\n";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    return 0;
}`;
