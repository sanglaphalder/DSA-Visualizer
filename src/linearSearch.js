import { sleep } from './utils/helpers';

export const linearSearch = async (array, setArray, speed, stopSignal, pauseSignal) => {
    // Create a copy of the array to avoid direct mutation
    let arr = array.map(item => ({ ...item }));
    let n = arr.length;

    // Pick a random target from the existing array
    let randomIndex = Math.floor(Math.random() * n);
    let target = arr[randomIndex].value;
    
    arr[randomIndex].status = 'target'; 
    setArray([...arr]);

    console.log(`Linear Search Target: ${target}`);

    for (let i = 0; i < n; i++) {
        
        // --- STOP & PAUSE LOGIC ---
        if (stopSignal.current) return;
        
        // Handle pause functionality
        while (pauseSignal.current) {
            if (stopSignal.current) return;
            await sleep(100);
        }

        // Mark current element as 'comparing' (Yellow)
        arr[i].status = 'comparing';
        setArray([...arr]);
        await sleep(Math.max(speed, 100));

        // Check if the current element matches the target
        if (arr[i].value === target) {
            arr[i].status = 'sorted'; // Mark as Found (Green)
            setArray([...arr]);
            
            await sleep(1000); 
            return; 
        }

        // If no match, reset status to default (Blue)
        arr[i].status = 'default';
        setArray([...arr]);
    }
};

export const linearSearchCPP = `#include <iostream>
using namespace std;

// Function to perform Linear Search
int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i; // Element found at index i
        }
    }
    return -1; // Element not found
}

int main() {
    int arr[] = {10, 50, 30, 70, 80, 20};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 30;

    int result = linearSearch(arr, n, target);

    if (result != -1) {
        cout << "Element found at index: " << result;
    } else {
        cout << "Element not found";
    }
    return 0;
}`;
export const linearSearchJAVA = `public class Main {

    static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] arr = {10, 50, 30, 70, 80, 20};
        int target = 30;

        int result = linearSearch(arr, target);

        if (result != -1) {
            System.out.println("Element found at index: " + result);
        } else {
            System.out.println("Element not found");
        }
    }
}`;
