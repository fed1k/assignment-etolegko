
# Internet Speed Test

A simple Node.js console application for measuring download speed.

The application downloads a specified URL 10 times sequentially,
measures each request duration, calculates the average request time,
total downloaded data, and average download speed.

## Requirements

- Node.js 18 or newer
- Internet connection

No external dependencies are required.

## Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/internet-speed-test.git
cd internet-speed-test
```

## Usage

Run the application:

```bash
node speed_test.js https://example.com/image.jpg
```

Or use npm:

```bash
npm start -- https://example.com/image.jpg
```

## Example output

```text
Starting speed test: https://example.com/image.jpg
Number of requests: 10

Request 1/10: 0.523 sec, 512.00 KB
Request 2/10: 0.481 sec, 512.00 KB
Request 3/10: 0.506 sec, 512.00 KB
...

========== RESULTS ==========
Successful requests: 10
Total downloaded: 5.00 MiB
Average request time: 0.500 sec
Total download time: 5.000 sec
Average download speed: 8.39 Mbps
=============================
```

The output above is illustrative.

## Metrics and units

- Request time: seconds (sec).
- Downloaded data: mebibytes (MiB).
- Download speed: megabits per second (Mbps).

1 MiB = 1,048,576 bytes.

1 Mbps = 1,000,000 bits per second.

Average download speed is calculated by dividing the
total downloaded bits by the total download time.

Each request is completed before the next request begins.

## Configuration

In `speed_test.js`:

- `REQUEST_COUNT`: number of requests (default: 10).
- `TIMEOUT`: request timeout in milliseconds (default: 30000).

## License

MIT
