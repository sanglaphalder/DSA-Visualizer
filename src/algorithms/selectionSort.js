import { sleep } from '../utils/helpers';

export const selectionSort = async (array, setArray, speed, stopSignal, pauseSignal) => {
  let arr = array.map(item => ({ ...item }));
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    if (stopSignal.current) return;
    while (pauseSignal.current) {
      if (stopSignal.current) return;
      await sleep(100);
    }

    let minIndex = i;
    arr[minIndex].status = 'swapping';
    setArray([...arr]);
    await sleep(speed);

    for (let j = i + 1; j < n; j++) {
      if (stopSignal.current) return;
      while (pauseSignal.current) {
        if (stopSignal.current) return;
        await sleep(100);
      }

      arr[j].status = 'comparing';
      setArray([...arr]);
      await sleep(speed);

      if (arr[j].value < arr[minIndex].value) {
        arr[minIndex].status = 'default';
        minIndex = j;
        arr[minIndex].status = 'swapping';
        setArray([...arr]);
        await sleep(speed);
      } else {
        arr[j].status = 'default';
      }
    }

    if (stopSignal.current) return;
    while (pauseSignal.current) {
      if (stopSignal.current) return;
      await sleep(100);
    }

    if (minIndex !== i) {
      arr[i].status = 'swapping';
      arr[minIndex].status = 'swapping';
      setArray([...arr]);
      await sleep(speed);

      const temp = arr[i].value;
      arr[i].value = arr[minIndex].value;
      arr[minIndex].value = temp;

      setArray([...arr]);
      await sleep(speed);

      arr[minIndex].status = 'default';
    } else {
      arr[minIndex].status = 'default';
    }

    arr[i].status = 'sorted';
    setArray([...arr]);
  }
};

export const selectionSortCPP = `#include <iostream>
using namespace std;

void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex != i) {
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}

int main() {
    int n;
    cout << "Enter number of elements: ";
    cin >> n;

    int arr[n];
    for (int i = 0; i < n; i++) cin >> arr[i];

    selectionSort(arr, n);

    cout << "Sorted array: \\n";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    return 0;
}`;
