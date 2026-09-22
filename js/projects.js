import { vec3, mat4 } from 'gl-matrix';

const canvas = document.getElementById('webgl-canvas');
const gl = canvas.getContext('webgl2');

if (!gl) throw new Error('WebGL2 not supported');

gl.viewport(0, 0, canvas.width, canvas.height);
gl.enable(gl.DEPTH_TEST);

const vertices = new Float32Array([
  -0.5, -0.5,  0.5,   0.0,  0.0,  1.0,
   0.5, -0.5,  0.5,   0.0,  0.0,  1.0,
  -0.5,  0.5,  0.5,   0.0,  0.0,  1.0,
  -0.5,  0.5,  0.5,   0.0,  0.0,  1.0,
   0.5, -0.5,  0.5,   0.0,  0.0,  1.0,
   0.5,  0.5,  0.5,   0.0,  0.0,  1.0,

   0.5, -0.5,  0.5,   1.0,  0.0,  0.0,
   0.5, -0.5, -0.5,   1.0,  0.0,  0.0,
   0.5,  0.5,  0.5,   1.0,  0.0,  0.0,
   0.5,  0.5,  0.5,   1.0,  0.0,  0.0,
   0.5, -0.5, -0.5,   1.0,  0.0,  0.0,
   0.5,  0.5, -0.5,   1.0,  0.0,  0.0,

   0.5, -0.5, -0.5,   0.0,  0.0, -1.0,
  -0.5, -0.5, -0.5,   0.0,  0.0, -1.0,
   0.5,  0.5, -0.5,   0.0,  0.0, -1.0,
   0.5,  0.5, -0.5,   0.0,  0.0, -1.0,
  -0.5, -0.5, -0.5,   0.0,  0.0, -1.0,
  -0.5,  0.5, -0.5,   0.0,  0.0, -1.0,

  -0.5, -0.5, -0.5,  -1.0,  0.0,  0.0,
  -0.5, -0.5,  0.5,  -1.0,  0.0,  0.0,
  -0.5,  0.5, -0.5,  -1.0,  0.0,  0.0,
  -0.5,  0.5, -0.5,  -1.0,  0.0,  0.0,
  -0.5, -0.5,  0.5,  -1.0,  0.0,  0.0,
  -0.5,  0.5,  0.5,  -1.0,  0.0,  0.0,

  -0.5,  0.5,  0.5,   0.0,  1.0,  0.0,
   0.5,  0.5,  0.5,   0.0,  1.0,  0.0,
  -0.5,  0.5, -0.5,   0.0,  1.0,  0.0,
  -0.5,  0.5, -0.5,   0.0,  1.0,  0.0,
   0.5,  0.5,  0.5,   0.0,  1.0,  0.0,
   0.5,  0.5, -0.5,   0.0,  1.0,  0.0,

  -0.5, -0.5, -0.5,   0.0, -1.0,  0.0,
   0.5, -0.5, -0.5,   0.0, -1.0,  0.0,
  -0.5, -0.5,  0.5,   0.0, -1.0,  0.0,
  -0.5, -0.5,  0.5,   0.0, -1.0,  0.0,
   0.5, -0.5, -0.5,   0.0, -1.0,  0.0,
   0.5, -0.5,  0.5,   0.0, -1.0,  0.0,
]);

const vao = gl.createVertexArray();
const vbo = gl.createBuffer();

gl.bindVertexArray(vao);

gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const elementSize = Float32Array.BYTES_PER_ELEMENT;
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 6 * elementSize, 0);
gl.enableVertexAttribArray(0);

gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 6 * elementSize, 3 * elementSize);
gl.enableVertexAttribArray(1);

gl.bindBuffer(gl.ARRAY_BUFFER, null);
gl.bindVertexArray(null);

const vertexSource = await loadShader('../shaders/vert.glsl');
const fragmentSource = await loadShader('../shaders/frag.glsl');

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexSource);
gl.compileShader(vertexShader);
checkStatus(vertexShader, 'VERTEX');

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentSource);
gl.compileShader(fragmentShader);
checkStatus(fragmentShader, 'FRAGMENT');

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
checkStatus(program, 'PROGRAM');

const view = mat4.create();
const projection = mat4.create();

mat4.lookAt(view, [0.0, 0.0, 3.0], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]);
mat4.perspective(projection, Math.PI / 4, canvas.width / canvas.height, 0.1, 100.0);

const lightPos = vec3.fromValues(3.0, 1.0, 1.0);
vec3.transformMat4(lightPos, lightPos, view);
const lightColor = [0.5, 0.5, 0.5];

gl.useProgram(program);
gl.uniformMatrix4fv(gl.getUniformLocation(program, 'view'), false, view);
gl.uniformMatrix4fv(gl.getUniformLocation(program, 'projection'), false, projection);
gl.uniform3fv(gl.getUniformLocation(program, 'light.position'), lightPos);
gl.uniform3fv(gl.getUniformLocation(program, 'light.ambient'), lightColor);
gl.uniform3fv(gl.getUniformLocation(program, 'light.diffuse'), lightColor);
gl.uniform3fv(gl.getUniformLocation(program, 'light.specular'), lightColor);
gl.uniform3fv(gl.getUniformLocation(program, 'material.color'), [0.9412, 0.7490, 0.4235]);
gl.uniform1f(gl.getUniformLocation(program, 'material.shininess'), 32.0);

requestAnimationFrame(render);
function render(time) {
  const currentFrame = time * 0.001;

  gl.clearColor(0.0, 0.0, 0.0, 0.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const model = mat4.create();
  mat4.rotate(model, model, currentFrame * 1.2 * Math.PI / 4, [0.0, 1.0, 0.0]);
  mat4.rotate(model, model, currentFrame * 0.8 * Math.PI / 4, [1.0, 0.0, 0.0]);

  const normalView = mat4.create();
  mat4.multiply(normalView, view, model);
  mat4.invert(normalView, normalView);

  gl.useProgram(program);
  gl.uniformMatrix4fv(gl.getUniformLocation(program, 'model'), false, model);
  gl.uniformMatrix4fv(gl.getUniformLocation(program, 'normalView'), true, normalView);

  gl.bindVertexArray(vao);
  gl.drawArrays(gl.TRIANGLES, 0, 36);

  requestAnimationFrame(render);
}

async function loadShader(url) {
  const response = await fetch(url);
  return await response.text();
}

function checkStatus(shader, type) {
  if (type !== 'PROGRAM') {
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('ERROR compiling shader of type:', type);
      throw new Error(gl.getShaderInfoLog(shader));
    }
  } else {
    if (!gl.getProgramParameter(shader, gl.LINK_STATUS)) {
      console.error('ERROR linking program of type:', type);
      throw new Error(gl.getProgramInfoLog(shader));
    }
  }
}
