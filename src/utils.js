export const delay = function(delayMs) {
    return new Promise((resolve) => {
        setTimeout(resolve, delayMs);
    });
};

export const retryEvery = async (asyncFunc, { interval = 500, maxAttempts = 1} = {}) => {
    try {
        const asyncFuncResult = await asyncFunc();
        return asyncFuncResult;
    } catch (e) {
        console.log('retrying e', e);
        let currentAttempt = 1;
        while (currentAttempt++ <= maxAttempts) {
            try {
                console.log('retrying now');
                const funcResult = await asyncFunc();
                console.log('funcResult', funcResult);
            } catch (e) {
                console.log('caught error', e);
                console.log('currentAttempt', currentAttempt);
                if (currentAttempt === maxAttempts) {
                    console.log('max attempts reached');
                    throw e;
                }
            }

            await delay(interval);
        }
    }
};