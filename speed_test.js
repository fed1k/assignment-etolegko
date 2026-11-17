
const { performance } = require("node:perf_hooks");

const REQUEST_COUNT = 10;
const TIMEOUT = 30000;

async function measureSpeed(url) {
    let totalBytes = 0;
    let totalTime = 0;

    console.log(`Starting speed test: ${url}`);
    console.log(`Number of requests: ${REQUEST_COUNT}\n`);

    for (let i = 0; i < REQUEST_COUNT; i++) {
        const controller = new AbortController();

        const timeoutId = setTimeout(() => {
            controller.abort();
        }, TIMEOUT);

        const startTime = performance.now();

        try {
            const response = await fetch(url, {
                signal: controller.signal,
                headers: {
                    "User-Agent": "InternetSpeedTest/1.0"
                }
            });

            if (!response.ok) {
                throw new Error(
                    `HTTP error: ${response.status} ${response.statusText}`
                );
            }

            const data = await response.arrayBuffer();

            const elapsed = (performance.now() - startTime) / 1000;
            const downloadedBytes = data.byteLength;

            totalBytes += downloadedBytes;
            totalTime += elapsed;

            console.log(
                `Request ${i + 1}/${REQUEST_COUNT}: ` +
                `${elapsed.toFixed(3)} sec, ` +
                `${(downloadedBytes / 1024).toFixed(2)} KB`
            );

        } catch (error) {
            console.error(
                `\nRequest ${i + 1} failed: ${error.message}`
            );
            return;
        } finally {
            clearTimeout(timeoutId);
        }
    }

    const averageTime = totalTime / REQUEST_COUNT;

    const speedMbps = (totalBytes * 8) / totalTime / 1_000_000;

    console.log("\n========== RESULTS ==========");
    console.log(`Successful requests: ${REQUEST_COUNT}`);
    console.log(
        `Total downloaded: ${(totalBytes / 1024 / 1024).toFixed(2)} MiB`
    );
    console.log(`Average request time: ${averageTime.toFixed(3)} sec`);
    console.log(`Total download time: ${totalTime.toFixed(3)} sec`);
    console.log(`Average download speed: ${speedMbps.toFixed(2)} Mbps`);
    console.log("=============================");
}

async function main() {
    const url = process.argv[2];

    if (!url) {
        console.error("Usage: node speed_test.js <URL>");
        process.exitCode = 1;
        return;
    }

    try {
        const parsedUrl = new URL(url);

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
            throw new Error("Only HTTP and HTTPS URLs are supported.");
        }

        await measureSpeed(parsedUrl.toString());
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exitCode = 1;
    }
}

main();
