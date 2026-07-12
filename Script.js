const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const patternSelect = document.getElementById('patternSelect');

let img = new Image();

// Populate dropdown from patterns.js
patterns.forEach(p => {
  const option = document.createElement('option');
  option.value = p.name;
  option.textContent = p.label;
  patternSelect.appendChild(option);
});

upload.addEventListener('change', e => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function(event) {
    img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

colorPicker.addEventListener('input', () => {
  ctx.fillStyle = colorPicker.value;
  ctx.globalAlpha = 0.5;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1.0;
});

patternSelect.addEventListener('change', () => {
  const selected = patterns.find(p => p.name === patternSelect.value);
  if (selected && selected.draw) {
    selected.draw(ctx, canvas);
  }
});
