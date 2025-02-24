self.onmessage = (e) => {
  const { imageData, width, height, gridSize } = e.data;
  const pixelWidth = width / gridSize;
  const pixelHeight = height / gridSize;
  const particles = [];

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const startIndex = (Math.floor(y * pixelHeight) * width + Math.floor(x * pixelWidth)) * 4;
      let r = 0,
        g = 0,
        b = 0;
      let count = 0;

      for (let py = 0; py < pixelHeight; py++) {
        for (let px = 0; px < pixelWidth; px++) {
          const i = startIndex + (py * width + px) * 4;
          if (i < imageData.length) {
            r += imageData[i];
            g += imageData[i + 1];
            b += imageData[i + 2];
            count++;
          }
        }
      }

      const xPos = x * (100 / gridSize);
      const yPos = y * (100 / gridSize);

      particles.push({
        color: `rgb(${Math.round(r / count)},${Math.round(g / count)},${Math.round(b / count)})`,
        x: xPos,
        y: yPos,
        originalX: xPos,
        originalY: yPos,
        vx: 0,
        vy: 0,
      });
    }
  }

  self.postMessage(particles);
};
