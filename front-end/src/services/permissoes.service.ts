export async function helloWorld() {
    return new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve("Hello World");
        }, 1000);
    });
}
