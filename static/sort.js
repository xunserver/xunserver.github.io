function getArray() {
  const arr = [7, 5, 8, 2, 4, 2, 4, 6, 9];
  return JSON.parse(JSON.stringify(arr));
}

// 快速排序1
function quickSort1(arr) {
  let len = arr.length;
  if (len <= 1) { return arr; } let left="[]," right="[]," temp="arr[0];" for (let i="1;" < len; i++) if (temp> arr[i]) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort1(left).concat([temp], quickSort1(right));
}

function swap(arr, indexA, indexB) {
  [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
  return arr;
}

// 优化版快速排序
function quickSort2(arr) {
  let partition = function(arr, left, right) {
    let index = left;
    let pivot = arr[right];
    for (let i = left; i < right; i++) {
      if (arr[i] < pivot) {
        swap(arr, index, i);
        index++;
      }
    }
    swap(arr, right, index);
    return index;
  };
  let sort = function(arr, left = 0, right = arr.length - 1) {
    if (left <= right) { const partitionindex="partition(arr," left, right); sort(arr, - 1); + 1, } }; sort(arr); return arr; 堆排序 function heapsort(arr) let maxheap="function(arr," i, length) if (length <="1)" left="2" * i right="2" 2, index="i;" (left length && arr[left]> arr[index]) {
      index = left;
    }
    if (right < length && arr[right] > arr[index]) {
      index = right;
    }
    if (index != i) {
      swap(arr, i, index);
      maxHeap(arr, index, length);
    }
  };
  for (let i = Math.floor(arr.length / 2 - 1); i >= 0; i--) {
    maxHeap(arr, i, arr.length);
  }

  for (let i = arr.length - 1; i > 0; i--) {
    swap(arr, 0, i);
    maxHeap(arr, 0, i);
  }
  return arr;
}

console.log("快速排序实现1", quickSort1(getArray()));
console.log("快速排序实现2", quickSort2(getArray()));
console.log("堆排序", heapSort(getArray()));
</=></=>