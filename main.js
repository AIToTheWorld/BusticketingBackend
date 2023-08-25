import QrScanner from 'path/to/qr-scanner.min.js';

const videoElem = document.querySelector('video');
const startButton = document.getElementById('startScan');
const stopButton = document.getElementById('stopScan');
const resultDiv = document.getElementById('result');

const qrScanner = new QrScanner(
    videoElem,
    result => {
        console.log('decoded qr code:', result);
        resultDiv.textContent = `QR Code Content: ${result.data}`;
    },
    { returnDetailedScanResult: true }
);

startButton.addEventListener('click', () => {
    qrScanner.start();
});

stopButton.addEventListener('click', () => {
    qrScanner.stop();
});
