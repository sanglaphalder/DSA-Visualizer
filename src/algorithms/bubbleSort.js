import { sleep } from '../utils/helpers';

export const bubbleSort = async (array, setArray, speed, stopSignal, pauseSignal) => {
  let arr = array.map(item => ({ ...item }));
  let n = arr.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      
      // 1. CHECK FOR STOP
      if (stopSignal.current) return;

      // 2. CHECK FOR PAUSE (The Wait Loop)
      while (pauseSignal.current) {
        if (stopSignal.current) return; // Allow reset while paused
        await sleep(100); // Wait 100ms and check again
      }

      arr[j].status = 'comparing';
      arr[j + 1].status = 'comparing';
      setArray([...arr]);
      await sleep(speed);

      if (arr[j].value > arr[j + 1].value) {
        arr[j].status = 'swapping';
        arr[j + 1].status = 'swapping';
        
        let temp = arr[j].value;
        arr[j].value = arr[j + 1].value;
        arr[j + 1].value = temp;

        setArray([...arr]);
        await sleep(speed);
      }

      arr[j].status = 'default';
      arr[j + 1].status = 'default';
    }
    arr[n - 1 - i].status = 'sorted';
    setArray([...arr]);
  }
};

export const bubbleSortCPP = `#include <iostream>
using namespace std;

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main() {
    int n;
    cout << "Enter number of elements: ";
    cin >> n;
    int arr[n];
    for (int i = 0; i < n; i++) cin >> arr[i];

    bubbleSort(arr, n);

    cout << "Sorted array: \\n";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    return 0;
}`;