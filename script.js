const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
  x: null,
  y: null,
  radius: 150
};

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Drop {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.length = Math.random() * 20 + 10;
    this.speed = Math.random() * 3 + 2;
    this.opacity = Math.random() * 0.3 + 0.3;
  }

  update() {
    let dx = this.x - mouse.x;
    let dy = this.y - mouse.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < mouse.radius) {
      let angle = Math.atan2(dy, dx);
      let force = (mouse.radius - dist) / mouse.radius;
      this.x += Math.cos(angle) * force * 10;
      this.y += Math.sin(angle) * force * 10;
    }

    this.y += this.speed;
    if (this.y > canvas.height) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(30,144,255,${this.opacity})`;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.length);
    ctx.stroke();
  }
}

let drops = [];
for (let i = 0; i < 300; i++) {
  drops.push(new Drop());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let drop of drops) {
    drop.update();
    drop.draw();
  }
  requestAnimationFrame(animate);
}

animate();
