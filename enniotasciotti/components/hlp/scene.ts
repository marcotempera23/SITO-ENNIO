/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck -- porting diretto della scena JavaScript del sito HLP
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

// Scena del sito (stessa materia del sito dello Human Longevity Program): una sola nuvola di particelle che,
// mentre si scorre, si ricompone nelle cinque immagini del programma:
//
//   0  nanoparticella biomimetica (apertura)
//   1  gemello digitale           (longevità)
//   2  Multistage Vector         (drug delivery)
//   3  scaffold di fibre          (medicina rigenerativa)
//   4  globo del percorso        (Pisa · Houston · Pechino · Roma)
//
// Ogni particella conosce la propria posizione in tutte e cinque le forme;
// lo shader le mescola con i pesi `state.w1..w4` (GSAP li interpola) e durante
// i passaggi aggiunge un vortice (`state.chaos`), così la trasformazione non
// è una semplice dissolvenza ma un movimento fisico della materia.

const N_SHAPES = 5;

const VERT = /* glsl */ `
  attribute vec3 aS1;
  attribute vec3 aS2;
  attribute vec3 aS3;
  attribute vec3 aS4;
  attribute vec3 aFrom;
  attribute vec3 aRand;          // x: ritardo/colore, y: dimensione, z: fase
  uniform vec4 uW;               // pesi delle forme 1..4 (la forma 0 prende il resto)
  uniform float uAssemble;
  uniform float uChaos;
  uniform float uTime;
  uniform float uPixel;
  varying float vMix;
  varying float vAlpha;
  varying float vGlow;
  void main() {
    float w0 = clamp(1.0 - uW.x - uW.y - uW.z - uW.w, 0.0, 1.0);
    vec3 pos = position * w0 + aS1 * uW.x + aS2 * uW.y + aS3 * uW.z + aS4 * uW.w;

    // vortice durante i passaggi tra una forma e l'altra
    float ph = aRand.z * 6.2831;
    vec3 swirl = vec3(
      sin(ph + uTime * 0.9 + pos.y * 3.1),
      cos(ph * 1.3 + uTime * 0.7 + pos.x * 2.7),
      sin(ph * 0.7 + uTime * 0.8 + pos.z * 3.3));
    pos += swirl * uChaos * (0.18 + 0.32 * aRand.x);
    // respiro leggero a forma composta
    pos += normalize(pos + vec3(0.0001)) * sin(uTime * 1.4 + ph * 3.0) * 0.006;

    // ingresso: dalla polvere sparsa alla forma
    float p = clamp((uAssemble - aRand.x * 0.5) / 0.5, 0.0, 1.0);
    p = p < 0.5 ? 4.0 * p * p * p : 1.0 - pow(-2.0 * p + 2.0, 3.0) / 2.0;
    pos = mix(aFrom, pos, p);

    // impulsi di dati che scorrono nel reticolo e nei vasi
    float flow = smoothstep(0.035, 0.0, abs(fract(pos.y * 0.45 - uTime * 0.22) - 0.5));
    vGlow = flow * (uW.z + uW.w * 0.8) * step(0.55, aRand.y);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (0.55 + aRand.y * 1.25) * (1.0 + vGlow * 0.5) * uPixel / -mv.z;
    vMix = aRand.x;
    vAlpha = mix(0.2, 1.0, p) * (0.62 + 0.38 * sin(uTime * 1.8 + ph * 5.0));
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying float vMix;
  varying float vAlpha;
  varying float vGlow;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    vec3 c = mix(uColorA, uColorB, smoothstep(0.35, 1.0, vMix));
    c = mix(c, vec3(1.0), vGlow * 0.4);
    gl_FragColor = vec4(c, a * vAlpha * uOpacity * (1.0 + vGlow * 0.6));
  }
`;

// ── Forme ──────────────────────────────────────────────────────────────────
const rnd = (a = -1, b = 1) => a + Math.random() * (b - a);
const dirRandom = (v = new THREE.Vector3()) => v.randomDirection();

function shapeCell(n) {
  const out = new Float32Array(n * 3);
  const R = 0.8;
  const spikes = Array.from({ length: 150 }, () => dirRandom());
  const golden = Math.PI * (3 - Math.sqrt(5));
  const nSurf = Math.floor(n * 0.5);
  for (let i = 0; i < n; i++) {
    let x, y, z;
    if (i < nSurf) {                               // membrana: sfera di Fibonacci
      const yy = 1 - (i / (nSurf - 1)) * 2;
      const r = Math.sqrt(1 - yy * yy);
      const t = golden * i;
      const k = R + rnd(-0.012, 0.012);
      x = Math.cos(t) * r * k; y = yy * k; z = Math.sin(t) * r * k;
    } else if (i < n * 0.66) {                     // nucleo
      const d = dirRandom();
      const k = 0.26 * Math.cbrt(Math.random());
      x = d.x * k; y = d.y * k; z = d.z * k;
    } else if (i < n * 0.88) {                     // ligandi di superficie
      const d = spikes[Math.floor(Math.random() * spikes.length)];
      const t = Math.random();
      const k = R + t * 0.16;
      const end = t > 0.86 ? 0.018 : 0.004;      // piccola testa sulla punta
      x = d.x * k + rnd(-end, end); y = d.y * k + rnd(-end, end); z = d.z * k + rnd(-end, end);
    } else {                                       // corona rada
      const d = dirRandom();
      const k = rnd(1.05, 1.5);
      x = d.x * k; y = d.y * k; z = d.z * k;
    }
    out.set([x, y, z], i * 3);
  }
  return out;
}

// ── Forme proprie del sito del Prof. Tasciotti ───────────────────────────
// 2  Multistage Vector: particella discoidale di silicio poroso che rilascia
//    nanoparticelle dai pori (la piattaforma di drug delivery)
function shapeMSV(n) {
  const out = new Float32Array(n * 3);
  const R = 0.9, H = 0.18, pore = 0.062, step = 0.17;
  // pori a nido d'ape sulla faccia superiore
  const pores = [];
  for (let i = -8; i <= 8; i++) for (let j = -8; j <= 8; j++) {
    const x = i * step + (j % 2 ? step / 2 : 0), z = j * step * 0.866;
    if (Math.hypot(x, z) < R - 0.08) pores.push([x, z]);
  }
  // nanoparticelle: alcune ancora nei pori, altre in uscita lungo spirali
  const nps = Array.from({ length: 90 }, (_, i) => {
    const [px, pz] = pores[Math.floor(Math.random() * pores.length)];
    if (i < 36) return new THREE.Vector3(px, H / 2 - 0.02, pz);
    const t = Math.random();
    const a = Math.atan2(pz, px) + t * 1.6;
    const d = Math.hypot(px, pz) * (1 + t * 0.9) + t * 0.15;
    return new THREE.Vector3(Math.cos(a) * d, H / 2 + 0.08 + t * 0.95, Math.sin(a) * d);
  });
  const v = new THREE.Vector3();
  for (let k = 0; k < n; k++) {
    const r = Math.random();
    if (r < 0.42) {                                  // bordi dei pori: la faccia è un nido d'ape
      const [px, pz] = pores[Math.floor(Math.random() * pores.length)];
      const a = Math.random() * Math.PI * 2, d = pore * rnd(0.96, 1.04);
      v.set(px + Math.cos(a) * d, H / 2 + rnd(-0.004, 0.004), pz + Math.sin(a) * d);
    } else if (r < 0.52) {                           // interno dei pori, più in profondità
      const [px, pz] = pores[Math.floor(Math.random() * pores.length)];
      const a = Math.random() * Math.PI * 2;
      v.set(px + Math.cos(a) * pore * 0.9, H / 2 - rnd(0.02, H * 0.8), pz + Math.sin(a) * pore * 0.9);
    } else if (r < 0.62) {                           // bordo esterno del disco
      const a = Math.random() * Math.PI * 2;
      v.set(Math.cos(a) * R, rnd(-H / 2, H / 2), Math.sin(a) * R);
    } else if (r < 0.7) {                            // fondo emisferico, rado
      const a = Math.random() * Math.PI * 2, d = R * Math.sqrt(Math.random());
      v.set(Math.cos(a) * d, -H / 2 - 0.2 * Math.sqrt(Math.max(0, 1 - (d / R) ** 2)), Math.sin(a) * d);
    } else {                                         // nanoparticelle (piccoli ammassi luminosi)
      v.copy(nps[Math.floor(Math.random() * nps.length)]).add(dirRandom().multiplyScalar(0.034 * Math.cbrt(Math.random())));
    }
    v.toArray(out, k * 3);
  }
  // inclinato verso chi guarda, così si vede il nido d'ape
  const m = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0.78, 0, 0.2));
  for (let k = 0; k < n; k++) { v.fromArray(out, k * 3).applyMatrix4(m); v.y -= 0.15; v.toArray(out, k * 3); }
  return out;
}

// 3  Scaffold rigenerativo: un fascio di fibre intrecciate a nodo, con cellule aderenti
function shapeScaffold(n) {
  const out = new Float32Array(n * 3);
  const P = 2, Q = 3, S = 0.29, fibers = 22;
  const knot = (t, o = new THREE.Vector3()) => {
    const r = Math.cos(Q * t) + 2;
    return o.set(r * Math.cos(P * t) * S, r * Math.sin(P * t) * S, -Math.sin(Q * t) * S * 1.4);
  };
  const p0 = new THREE.Vector3(), p1 = new THREE.Vector3(), T = new THREE.Vector3(), N = new THREE.Vector3(), B = new THREE.Vector3();
  const fiberPhase = Array.from({ length: fibers }, () => [Math.random() * Math.PI * 2, rnd(0.025, 0.075)]);
  for (let k = 0; k < n; k++) {
    const t = Math.random() * Math.PI * 2;
    knot(t, p0); knot(t + 0.001, p1);
    T.subVectors(p1, p0).normalize();
    N.crossVectors(T, Math.abs(T.z) < 0.9 ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(1, 0, 0)).normalize();
    B.crossVectors(T, N);
    let x, y, z;
    if (Math.random() < 0.86) {                       // fibre che si avvolgono
      const [ph, rad] = fiberPhase[Math.floor(Math.random() * fibers)];
      const a = ph + t * 7;
      const j = 0.006;
      x = p0.x + (N.x * Math.cos(a) + B.x * Math.sin(a)) * rad + rnd(-j, j);
      y = p0.y + (N.y * Math.cos(a) + B.y * Math.sin(a)) * rad + rnd(-j, j);
      z = p0.z + (N.z * Math.cos(a) + B.z * Math.sin(a)) * rad + rnd(-j, j);
    } else {                                           // cellule che colonizzano lo scaffold
      const c = dirRandom().multiplyScalar(0.035 * Math.cbrt(Math.random()));
      const a = Math.random() * Math.PI * 2;
      x = p0.x + (N.x * Math.cos(a) + B.x * Math.sin(a)) * 0.1 + c.x;
      y = p0.y + (N.y * Math.cos(a) + B.y * Math.sin(a)) * 0.1 + c.y;
      z = p0.z + (N.z * Math.cos(a) + B.z * Math.sin(a)) * 0.1 + c.z;
    }
    out.set([x, y, z], k * 3);
  }
  return out;
}

// 4  Il globo del percorso: Pisa, Houston, Pechino, Roma, collegate da archi
export const CITIES = { pisa: [43.72, 10.4], houston: [29.76, -95.37], pechino: [39.9, 116.4], roma: [41.9, 12.5] };
function shapeGlobe(n) {
  const out = new Float32Array(n * 3);
  const R = 0.86;
  const ll = (lat, lon, r = R, o = new THREE.Vector3()) => {
    const la = THREE.MathUtils.degToRad(lat), lo = THREE.MathUtils.degToRad(lon);
    return o.set(Math.cos(la) * Math.sin(lo) * r, Math.sin(la) * r, Math.cos(la) * Math.cos(lo) * r);
  };
  const city = Object.values(CITIES).map(([la, lo]) => ll(la, lo));
  const routes = [[0, 1], [1, 2], [1, 3], [0, 3], [3, 2]];
  const golden = Math.PI * (3 - Math.sqrt(5));
  const nDots = Math.floor(n * 0.42);
  const v = new THREE.Vector3();
  for (let k = 0; k < n; k++) {
    const r = Math.random();
    if (k < nDots) {                                  // superficie punteggiata
      const yy = 1 - (k / (nDots - 1)) * 2, rr = Math.sqrt(1 - yy * yy), t = golden * k;
      v.set(Math.cos(t) * rr * R, yy * R, Math.sin(t) * rr * R);
    } else if (r < 0.3) {                             // meridiani e paralleli
      if (Math.random() < 0.5) ll(Math.floor(Math.random() * 7) * 30 - 90 + 15, rnd(-180, 180), R, v);
      else ll(rnd(-88, 88), Math.floor(Math.random() * 12) * 30, R, v);
    } else if (r < 0.8) {                             // archi tra le città
      const [a, b] = routes[Math.floor(Math.random() * routes.length)];
      const t = Math.random();
      const dist = city[a].distanceTo(city[b]);
      v.copy(city[a]).lerp(city[b], t).normalize().multiplyScalar(R + Math.sin(Math.PI * t) * dist * 0.28);
    } else if (r < 0.94) {                            // città
      v.copy(city[Math.floor(Math.random() * city.length)]).add(dirRandom().multiplyScalar(0.035 * Math.cbrt(Math.random())));
    } else {                                          // anello orbitale
      const a = Math.random() * Math.PI * 2, d = rnd(1.08, 1.14);
      v.set(Math.cos(a) * d, rnd(-0.01, 0.01), Math.sin(a) * d).applyAxisAngle(new THREE.Vector3(1, 0, 0), 0.32);
    }
    v.toArray(out, k * 3);
  }
  return out;
}

function bodyFromModel(gltf, n) {
  const verts = [];
  const v = new THREE.Vector3();
  gltf.scene.updateMatrixWorld(true);
  gltf.scene.traverse((c) => {
    if (!c.isMesh) return;
    const p = c.geometry.attributes.position;
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i).applyMatrix4(c.matrixWorld);
      verts.push(v.x, v.y, v.z);
    }
  });
  const all = new Float32Array(verts);
  const box = new THREE.Box3().setFromArray(all);
  const size = box.getSize(new THREE.Vector3()), ctr = box.getCenter(new THREE.Vector3());
  const s = 2 / size.y;
  const total = all.length / 3;
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const k = Math.floor(Math.random() * total) * 3;
    out[i * 3] = (all[k] - ctr.x) * s;
    out[i * 3 + 1] = (all[k + 1] - ctr.y) * s;
    out[i * 3 + 2] = (all[k + 2] - ctr.z) * s;
  }
  return out;
}

// ── Scena ──────────────────────────────────────────────────────────────────
export function createScene({ canvas, mobile = false, reduced = false, onProgress }) {
  const n = mobile ? 7000 : 16000;
  const state = {
    w1: 0, w2: 0, w3: 0, w4: 0,   // pesi delle forme 1..4 (corpo, elica, reticolo, vasi)
    assemble: 0,
    chaos: 0,
    dist: 1.5,         // distanza della camera (multipli dell'inquadratura)
    ty: 0,             // quota inquadrata
    sx: 0,             // spostamento laterale della figura (frazione della larghezza)
    spin: 1,           // velocità di rotazione
    halo: 1,           // anelli attorno alla nanoparticella
    rot: 0,            // rotazione aggiuntiva (il globo segue il percorso)
  };
  const colors = { a: new THREE.Color("#8fd8ff"), b: new THREE.Color("#e9c98f") };

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 1.75));
  // Con il post-processing (EffectComposer + OutputPass) il colore di sfondo viene
  // convertito in sRGB due volte e risulta grigio-azzurro (≈ #26353b invece di
  // #04090c). Lo si compensa decodificandolo una volta in più.
  const bg = new THREE.Color("#04090c");
  renderer.setClearColor(new THREE.Color().setRGB(bg.r, bg.g, bg.b, THREE.SRGBColorSpace), 1);
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x04090c, 0.05);
  const camera = new THREE.PerspectiveCamera(32, 1, 0.05, 80);
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.75, 0.42, 0.18);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  const root = new THREE.Group();
  scene.add(root);

  // polvere di fondo
  const dust = (() => {
    const m = mobile ? 400 : 1100;
    const pos = new Float32Array(m * 3);
    for (let i = 0; i < m; i++) {
      const r = 3 + Math.random() * 10, t = Math.random() * Math.PI * 2;
      pos.set([Math.cos(t) * r, (Math.random() - 0.5) * 10, Math.sin(t) * r - 2], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const p = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xe9dfc9, size: 0.02, transparent: true, opacity: 0.3, depthWrite: false, blending: THREE.AdditiveBlending }));
    scene.add(p);
    return p;
  })();

  // anelli orbitali attorno alla nanoparticella
  const halos = [0.0, 1.1, 2.2].map((rot, i) => {
    const curve = new THREE.EllipseCurve(0, 0, 1.18 + i * 0.12, 1.18 + i * 0.12, 0, Math.PI * 2);
    const line = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(curve.getPoints(180)),
      new THREE.LineBasicMaterial({ color: i === 1 ? 0xe9dfc9 : 0x8fd8ff, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending })
    );
    line.rotation.set(Math.PI / 2 + 0.35 * (i - 1), rot, 0);
    root.add(line);
    return line;
  });

  // geometria con le cinque forme
  const geo = new THREE.BufferGeometry();
  const s0 = shapeCell(n);
  const from = new Float32Array(n * 3);
  const rand = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const d = dirRandom(), r = 2 + Math.random() * 4;
    from.set([d.x * r, d.y * r * 0.8, d.z * r], i * 3);
    rand.set([Math.random(), Math.random(), Math.random()], i * 3);
  }
  geo.setAttribute("position", new THREE.BufferAttribute(s0, 3));
  geo.setAttribute("aS1", new THREE.BufferAttribute(s0.slice(), 3));   // il corpo arriva col modello
  geo.setAttribute("aS2", new THREE.BufferAttribute(shapeMSV(n), 3));
  geo.setAttribute("aS3", new THREE.BufferAttribute(shapeScaffold(n), 3));
  geo.setAttribute("aS4", new THREE.BufferAttribute(shapeGlobe(n), 3));
  geo.setAttribute("aFrom", new THREE.BufferAttribute(from, 3));
  geo.setAttribute("aRand", new THREE.BufferAttribute(rand, 3));

  const mat = new THREE.ShaderMaterial({
    vertexShader: VERT, fragmentShader: FRAG,
    uniforms: {
      uW: { value: new THREE.Vector4() }, uAssemble: { value: 0 }, uChaos: { value: 0 },
      uTime: { value: 0 }, uPixel: { value: 6 }, uOpacity: { value: 0.8 },
      uColorA: { value: colors.a }, uColorB: { value: colors.b },
    },
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  root.add(points);

  const loaded = new Promise((resolve) => {
    new GLTFLoader().load(
      "/avatar.glb",
      (gltf) => {
        geo.getAttribute("aS1").array.set(bodyFromModel(gltf, n));
        geo.getAttribute("aS1").needsUpdate = true;
        resolve();
      },
      (xhr) => { if (xhr.total) onProgress?.(xhr.loaded / xhr.total); },
      () => resolve()   // senza modello il corpo resta una sfera: la pagina funziona lo stesso
    );
  });

  // inquadratura
  let W = 1, H = 1;
  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderer.setSize(W, H, false);
    composer.setSize(W, H);
    mat.uniforms.uPixel.value = renderer.getPixelRatio() * (mobile ? 5.2 : 4.4) * (H / 900);
  }
  window.addEventListener("resize", resize);
  resize();
  const fitDistance = () => {
    const half = THREE.MathUtils.degToRad(camera.fov) / 2;
    const aspect = Math.max(camera.aspect, 0.45);
    return Math.max(1.15 / Math.tan(half), 0.9 / (Math.tan(half) * aspect)) * 1.12;
  };

  const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
  if (!reduced) {
    window.addEventListener("pointermove", (e) => {
      pointer.x = (e.clientX / W) * 2 - 1;
      pointer.y = (e.clientY / H) * 2 - 1;
    }, { passive: true });
  }

  let visible = true, angle = 0;
  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    const dt = Math.min(clock.getDelta(), 0.05);
    if (!visible || document.hidden) return;
    const t = clock.elapsedTime;
    const u = mat.uniforms;
    u.uW.value.set(state.w1, state.w2, state.w3, state.w4);
    u.uAssemble.value = state.assemble;
    u.uChaos.value = state.chaos;
    u.uTime.value = t;

    if (!reduced) angle += dt * 0.14 * state.spin;
    root.rotation.y = angle + state.rot;
    root.rotation.x = Math.sin(t * 0.15) * 0.06;

    const w0 = Math.max(0, 1 - state.w1 - state.w2 - state.w3 - state.w4);
    halos.forEach((h, i) => {
      h.material.opacity = 0.2 * w0 * state.halo * state.assemble;
      h.rotation.z = t * (0.12 + i * 0.05) * (i % 2 ? -1 : 1);
    });

    pointer.sx += (pointer.x - pointer.sx) * Math.min(1, dt * 2.5);
    pointer.sy += (pointer.y - pointer.sy) * Math.min(1, dt * 2.5);
    const d = fitDistance() * state.dist;
    camera.position.set(pointer.sx * 0.14 * d, state.ty + 0.1 * d - pointer.sy * 0.07 * d, d);
    camera.lookAt(0, state.ty, 0);
    camera.setViewOffset(W, H, -state.sx * W, 0, W, H);
    dust.rotation.y = t * 0.012;
    composer.render();
  });

  return { state, colors, loaded, setVisible(v) { visible = v; } };
}

export const SHAPE_COUNT = N_SHAPES;
