import { sleep } from '../../utils/helpers';

export const insertionSort = async (array, setArray, speed, stopSignal, pauseSignal) => {
  let arr = array.map(item => ({ ...item }));
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    if (stopSignal.current) return;
    while (pauseSignal.current) {
      if (stopSignal.current) return;
      await sleep(100);
    }

    let j = i;
    arr[i].status = 'comparing';
    setArray([...arr]);
    await sleep(speed);

    while (j > 0 && arr[j - 1].value > arr[j].value) {
      if (stopSignal.current) return;
      while (pauseSignal.current) {
        if (stopSignal.current) return;
        await sleep(100);
      }

      arr[j].status = 'swapping';
      arr[j - 1].status = 'swapping';
      setArray([...arr]);
      await sleep(speed);

      const temp = arr[j].value;
      arr[j].value = arr[j - 1].value;
      arr[j - 1].value = temp;

      setArray([...arr]);
      await sleep(speed);

      arr[j].status = 'default';
      j--;
    }

    arr[j].status = 'default';
    for (let k = 0; k <= i; k++) arr[k].status = 'sorted';
    setArray([...arr]);
  }
};

export const insertionSortCPP = `#include <iostream>
using namespace std;

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

int main() {
    int n;
    cout << "Enter number of elements: ";
    cin >> n;

    int arr[n];
    for (int i = 0; i < n; i++) cin >> arr[i];

    insertionSort(arr, n);

    cout << "Sorted array: \\n";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    return 0;
}`;
