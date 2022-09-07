import { Uint8ArrayList } from '../src/index.js';
const toMem = (n) => {
    const inMB = Math.floor(n / 1e4) / 100;
    if (inMB < 1000)
        return `${inMB} MB`;
    const inGB = Math.floor(inMB / 10) / 100;
    return `${inGB} GB`;
};
if (global.gc) {
    global.gc();
}
const originalHeap = process.memoryUsage().heapUsed;
const originalExt = process.memoryUsage().external;
const list = new Uint8ArrayList();
// const list = new BufferList()
const times = 1e6;
for (let n = 0; n < times; n++) {
    for (let i = 0; i < 1000; i++) {
        list.append(Buffer.allocUnsafe(32).subarray());
    }
    list.sublist();
    list.consume(32 * 1000);
    if (n % 1e3 === 0) {
        if (global.gc) {
            global.gc();
        }
        console.log(`${Math.floor(n / 1e3)} / ${times / 1e3}`, '@@@ Buffer.allocUnsafe(32).subarray() external used:', toMem(process.memoryUsage().external - originalExt), 'heap used:', toMem(process.memoryUsage().heapUsed - originalHeap));
    }
}
list.consume(list.byteLength);
if (global.gc) {
    global.gc();
}
console.log('@@@ Buffer.allocUnsafe(32).subarray() external used:', times, toMem(process.memoryUsage().external - originalExt), 'heap used:', toMem(process.memoryUsage().heapUsed - originalHeap));
//# sourceMappingURL=memTest.js.map