// import { concat } from 'uint8arrays'
export const toMem = (n) => {
    const inMB = Math.floor(n / 1e4) / 100;
    if (inMB < 1000)
        return `${inMB} MB`;
    const inGB = Math.floor(inMB / 10) / 100;
    return `${inGB} GB`;
};
let originalHeap = process.memoryUsage().heapUsed;
let originalExt = process.memoryUsage().external;
const bufs = [];
for (let j = 0; j < 1000; j++) {
    // bufs.push(Buffer.from([j, 1, 2, 3, 4]))
    bufs.push(Buffer.allocUnsafe(32));
}
const times = 1e6;
for (let i = 0; i < times; i++) {
    Buffer.concat(bufs);
}
console.log(times, '@@@ Buffer.concat external used:', toMem(process.memoryUsage().external - originalExt), 'heap used:', toMem(process.memoryUsage().heapUsed - originalHeap));
// originalHeap = process.memoryUsage().heapUsed
// originalExt = process.memoryUsage().external
// for (let i = 0; i < times; i++) {
//   concat(bufs)
// }
// console.log(
//   times,
//   '@@@ uint8arrays.concat allocUnsafe buffers external used:',
//   toMem(process.memoryUsage().external - originalExt),
//   'heap used:',
//   toMem(process.memoryUsage().heapUsed - originalHeap)
// )
//# sourceMappingURL=concat.js.map