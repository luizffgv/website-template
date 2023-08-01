// Spawns a bubbles simulation in the page.

class Bubble {
  x: number;
  y: number;
  velX: number = 0;
  velY: number = 0;
  radius: number;

  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
}

class Bubbles {
  #element: HTMLCanvasElement;
  #context: CanvasRenderingContext2D;
  #prevTimestamp?: DOMHighResTimeStamp;
  #bubbles: Bubble[] = [];

  constructor(element: HTMLCanvasElement) {
    this.#element = element;

    const context = this.#element.getContext("2d");
    if (context == null) throw new TypeError("Couldn't get 2D context");
    this.#context = context;

    requestAnimationFrame(this.#step.bind(this));
  }

  #step(timestamp: DOMHighResTimeStamp) {
    const width = this.#element.clientWidth;
    const height = this.#element.clientHeight;
    this.#element.width = width;
    this.#element.height = height;

    const maxDimension = Math.max(width, height);

    if (this.#prevTimestamp == null) this.#prevTimestamp = timestamp;
    const deltaSeconds = (timestamp - this.#prevTimestamp) / 1000;

    const aliveBubbles: Bubble[] = [];

    this.#context.fillStyle = "rgba(0, 0, 0, 0.01)";

    for (const bubble of this.#bubbles) {
      if (
        bubble.y - bubble.radius > this.#element.clientHeight ||
        bubble.y + bubble.radius < -5 ||
        bubble.x + bubble.radius < 0 ||
        bubble.x - bubble.radius > this.#element.clientWidth
      )
        continue;

      bubble.velX += (Math.random() - 0.5) * deltaSeconds;
      bubble.velY += (Math.random() - 0.5) * deltaSeconds;

      bubble.x += bubble.velX * maxDimension * deltaSeconds * 0.5;
      bubble.y += bubble.velY * maxDimension * deltaSeconds * 0.5;

      this.#context.beginPath();
      this.#context.arc(
        bubble.x,
        height - bubble.y,
        bubble.radius,
        0,
        2 * Math.PI
      );
      this.#context.fill();

      aliveBubbles.push(bubble);
    }

    const desiredRadius = width / 10;
    const desiredCount = width / desiredRadius / 2;

    while (aliveBubbles.length < desiredCount) {
      const x = Math.random() * width;
      const bubble = new Bubble(x, -desiredRadius, desiredRadius);
      bubble.velY = 0.1;
      aliveBubbles.push(bubble);
    }

    this.#bubbles = aliveBubbles;

    this.#prevTimestamp = timestamp;

    requestAnimationFrame(this.#step.bind(this));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.createElement("canvas");

  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.top = "0";
  canvas.style.position = "fixed";
  canvas.style.zIndex = "-1";

  document.body.appendChild(canvas);

  new Bubbles(canvas);
});
