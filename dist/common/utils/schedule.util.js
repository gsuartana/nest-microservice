"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleManager = exports.createNotifyManager = exports.scheduleMicrotask = void 0;
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
function scheduleMicrotask(callback) {
    sleep(0).then(callback);
}
exports.scheduleMicrotask = scheduleMicrotask;
function createNotifyManager() {
    let queue = [];
    let transactions = 0;
    let notifyFn = (callback) => {
        callback();
    };
    let batchNotifyFn = (callback) => {
        callback();
    };
    const flush = () => {
        const originalQueue = queue;
        queue = [];
        if (originalQueue.length) {
            scheduleMicrotask(() => {
                batchNotifyFn(() => {
                    originalQueue.forEach((callback) => {
                        notifyFn(callback);
                    });
                });
            });
        }
    };
    const batch = (callback) => {
        let result;
        transactions++;
        try {
            result = callback();
        }
        finally {
            transactions--;
            if (!transactions)
                flush();
        }
        return result;
    };
    const schedule = (callback) => {
        if (transactions) {
            queue.push(callback);
        }
        else {
            scheduleMicrotask(() => {
                notifyFn(callback);
            });
        }
    };
    const batchCalls = (callback) => {
        return ((...args) => {
            schedule(() => {
                callback(...args);
            });
        });
    };
    const setNotifyFunction = (fn) => {
        notifyFn = fn;
    };
    const setBatchNotifyFunction = (fn) => {
        batchNotifyFn = fn;
    };
    return {
        batch,
        batchCalls,
        schedule,
        setNotifyFunction,
        setBatchNotifyFunction,
    };
}
exports.createNotifyManager = createNotifyManager;
exports.scheduleManager = createNotifyManager();
//# sourceMappingURL=schedule.util.js.map