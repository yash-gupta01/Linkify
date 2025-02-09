import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:3000';

export let options = {
    stages: [
        { duration: '10s', target: 10 },  // Ramp up to 10 users
        { duration: '20s', target: 50 },  // Hold at 50 users
        { duration: '10s', target: 0 },   // Ramp down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'],  // 95% of requests < 500ms
        http_req_failed: ['rate<0.01'],   // Error rate < 1%
    },
};

export default function () {
    let randomUrl = `https://example.com/wfegsgsegsegsvsegsegsegsege`;

    // **Step 1: Shorten URL**
    let shortenRes = http.post(`${BASE_URL}/shorten`, JSON.stringify({ url: randomUrl }), {
        headers: { 'Content-Type': 'application/json' },
    });

    check(shortenRes, {
        'Shorten URL is successful': (res) => res.status === 201,
    });

    if (shortenRes.status !== 201) return; // Stop if failed

    let shortenedId = shortenRes.json().shortenedUrl;

    sleep(1);

    // **Step 2: Expand URL (First Request - Uncached)**
    let expandRes1 = http.get(`${BASE_URL}/${shortenedId}`);
    let firstResponseTime = expandRes1.timings.duration;

    check(expandRes1, {
        'Expand URL is successful (Uncached)': (res) =>
            res.status === 200 && res.json().originalUrl === randomUrl,
    });

    sleep(1);

    // **Step 3: Expand URL (Second Request - Cached)**
    let expandRes2 = http.get(`${BASE_URL}/${shortenedId}`);
    let secondResponseTime = expandRes2.timings.duration;

    check(expandRes2, {
        'Expand URL is successful (Cached)': (res) =>
            res.status === 200 && res.json().originalUrl === randomUrl,
        'Response from cache is faster': () => secondResponseTime < firstResponseTime,
    });

    sleep(1);

    // **Step 4: Fetch Analytics**
    let analyticsRes = http.get(`${BASE_URL}/analytics/${shortenedId}`);

    check(analyticsRes, {
        'Analytics fetch is successful': (res) => res.status === 200,
    });

    sleep(1);
}
