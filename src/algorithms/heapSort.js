import { sleep } from '../utils/helpers';

export const heapSort = async (array, setArray, speed, stopSignal, pauseSignal) => {
  let arr = array.map(item => ({ ...item }));
  let n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    const shouldStop = await heapify(arr, n, i, setArray, speed, stopSignal, pauseSignal);
    if (shouldStop) return;
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // CHECK FOR STOP
    if (stopSignal.current) return;

    // CHECK FOR PAUSE
    while (pauseSignal.current) {
      if (stopSignal.current) return;
      await sleep(100);
    }

    // Swap root (max element) with last element
    arr[0].status = 'swapping';
    arr[i].status = 'swapping';
    setArray([...arr]);
    await sleep(speed);

    [arr[0].value, arr[i].value] = [arr[i].value, arr[0].value];
    
    arr[0].status = 'default';
    arr[i].status = 'sorted';
    setArray([...arr]);
    await sleep(speed);

    // Heapify the reduced heap
    const shouldStop = await heapify(arr, i, 0, setArray, speed, stopSignal, pauseSignal);
    if (shouldStop) return;
  }

  // Mark the first element as sorted
  arr[0].status = 'sorted';
  setArray([...arr]);
};

const heapify = async (arr, heapSize, rootIndex, setArray, speed, stopSignal, pauseSignal) => {
  let largest = rootIndex;
  let left = 2 * rootIndex + 1;
  let right = 2 * rootIndex + 2;

  // CHECK FOR STOP
  if (stopSignal.current) return true;

  // CHECK FOR PAUSE
  while (pauseSignal.current) {
    if (stopSignal.current) return true;
    await sleep(100);
  }

  // Highlight current root as pivot (being heapified)
  if (arr[rootIndex].status !== 'sorted') {
    arr[rootIndex].status = 'pivot';
    setArray([...arr]);
    await sleep(speed);
  }

  // Compare with left child
  if (left < heapSize && arr[left].status !== 'sorted') {
    arr[left].status = 'comparing';
    setArray([...arr]);
    await sleep(speed);

    if (arr[left].value > arr[largest].value) {
      largest = left;
    }
  }

  // Compare with right child
  if (right < heapSize && arr[right].status !== 'sorted') {
    arr[right].status = 'comparing';
    setArray([...arr]);
    await sleep(speed);

    if (arr[right].value > arr[largest].value) {
      largest = right;
    }
  }

  // Reset comparing states
  if (left < heapSize && arr[left].status === 'comparing') {
    arr[left].status = 'default';
  }
  if (right < heapSize && arr[right].status === 'comparing') {
    arr[right].status = 'default';
  }

  // If largest is not the root, swap and continue heapifying
  if (largest !== rootIndex) {
    arr[rootIndex].status = 'swapping';
    arr[largest].status = 'swapping';
    setArray([...arr]);
    await sleep(speed);

    [arr[rootIndex].value, arr[largest].value] = [arr[largest].value, arr[rootIndex].value];

    arr[rootIndex].status = 'default';
    arr[largest].status = 'default';
    setArray([...arr]);
    await sleep(speed);

    // Recursively heapify the affected subtree
    return await heapify(arr, heapSize, largest, setArray, speed, stopSignal, pauseSignal);
  } else {
    // Reset root status if no swap needed
    if (arr[rootIndex].status === 'pivot') {
      arr[rootIndex].status = 'default';
      setArray([...arr]);
    }
  }

  return false;
};

export const heapSortCPP = `#include <iostream>
using namespace std;

void heapify(int arr[], int n, int i) {
    int largest = i;       // Initialize largest as root
    int left = 2 * i + 1;  // Left child index
    int right = 2 * i + 2; // Right child index

    // If left child is larger than root
    if (left < n && arr[left] > arr[largest])
        largest = left;

    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest])
        largest = right;

    // If largest is not root
    if (largest != i) {
        swap(arr[i], arr[largest]);
        // Recursively heapify the affected subtree
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    // Extract elements from heap one by one
    for (int i = n - 1; i > 0; i--) {
        // Move current root to end
        swap(arr[0], arr[i]);
        // Heapify the reduced heap
        heapify(arr, i, 0);
    }
}

int main() {
    int n;
    cout << "Enter number of elements: ";
    cin >> n;
    int arr[n];
    cout << "Enter elements: ";
    for (int i = 0; i < n; i++) cin >> arr[i];

    heapSort(arr, n);

    cout << "Sorted array: \\n";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    return 0;
}`;
