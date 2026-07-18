import * as THREE from "three";

const COLORS = {
  background: 0xf8fafc,
  surface: 0xffffff,
  muted: 0xf1f5f9,
  border: 0xe2e8f0,
  ink: 0x0b0f14,
  road: 0x222831,
  roadSoft: 0x343c47,
  primary: 0x1d4ed8,
  primaryDark: 0x1e40af,
  primarySoft: 0xbfdbfe,
  teal: 0x06b6d4,
  success: 0x16a34a,
  landscape: 0xcddfce,
  landscapeDark: 0x7e9c82,
  warm: 0xf6e7c1
};

function standardMaterial(color, options = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: options.roughness ?? 0.72,
    metalness: options.metalness ?? 0.02,
    transparent: options.transparent ?? false,
    opacity: options.opacity ?? 1,
    emissive: options.emissive ?? 0x000000,
    emissiveIntensity: options.emissiveIntensity ?? 0
  });
}

function addBox(group, size, position, material, options = {}) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.position.set(...position);
  mesh.rotation.set(...(options.rotation ?? [0, 0, 0]));
  mesh.castShadow = options.castShadow ?? true;
  mesh.receiveShadow = options.receiveShadow ?? true;
  group.add(mesh);
  return mesh;
}

function addCylinder(group, radius, height, position, material, sides = 16) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, height, sides),
    material
  );
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);
  return mesh;
}

function addTree(group, x, z, scale, materials) {
  addCylinder(group, 0.24 * scale, 2.1 * scale, [x, 1.05 * scale, z], materials.treeTrunk, 10);
  const crown = new THREE.Mesh(
    new THREE.ConeGeometry(1.35 * scale, 3.2 * scale, 8),
    materials.landscapeDark
  );
  crown.position.set(x, 3.05 * scale, z);
  crown.castShadow = true;
  group.add(crown);
}

function addApartment(group, x, z, floors, width, materials) {
  const height = floors * 3.15;
  addBox(group, [width, height, 11], [x, height / 2 + 0.6, z], materials.surface);
  addBox(
    group,
    [width + 0.5, 0.42, 11.5],
    [x, height + 0.82, z],
    materials.ink,
    { castShadow: false }
  );

  const face = x < 0 ? x + width / 2 + 0.02 : x - width / 2 - 0.02;
  for (let floor = 0; floor < floors; floor += 1) {
    for (let bay = -1; bay <= 1; bay += 1) {
      const window = addBox(
        group,
        [0.1, 1.05, 1.65],
        [face, 2.2 + floor * 3.05, z + bay * 2.9],
        floor % 2 === 0 ? materials.primarySoft : materials.warm,
        { castShadow: false }
      );
      window.rotation.y = Math.PI / 2;
    }
  }
}

function createVehicle(color, materials) {
  const vehicle = new THREE.Group();
  const bodyMaterial = standardMaterial(color, { roughness: 0.38, metalness: 0.18 });
  const glassMaterial = standardMaterial(0x9fc3df, {
    roughness: 0.18,
    metalness: 0.12,
    transparent: true,
    opacity: 0.84
  });

  addBox(vehicle, [3.3, 0.9, 5.4], [0, 0.95, 0], bodyMaterial);
  addBox(vehicle, [2.7, 0.85, 2.9], [0, 1.75, -0.35], glassMaterial);
  addBox(vehicle, [2.25, 0.13, 0.2], [0, 1.05, -2.73], materials.ink, {
    castShadow: false
  });
  addBox(vehicle, [1.55, 0.08, 0.05], [0, 0.82, 2.73], materials.surface, {
    castShadow: false
  });

  const wheels = [];
  for (const x of [-1.72, 1.72]) {
    for (const z of [-1.72, 1.72]) {
      const wheel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.48, 0.48, 0.28, 16),
        materials.ink
      );
      wheel.position.set(x, 0.52, z);
      wheel.rotation.z = Math.PI / 2;
      wheel.castShadow = true;
      vehicle.add(wheel);
      wheels.push(wheel);
    }
  }

  vehicle.userData.wheels = wheels;
  return vehicle;
}

function addParkingMarkings(group, materials) {
  for (const side of [-1, 1]) {
    for (let z = -22; z >= -75; z -= 9.5) {
      const x = side * 15.2;
      addBox(group, [6.8, 0.04, 0.14], [x, 0.69, z - 4.1], materials.border, {
        castShadow: false
      });
      addBox(group, [0.14, 0.04, 8.2], [x - side * 3.35, 0.69, z], materials.border, {
        castShadow: false
      });
    }
  }
}

function addGate(group, materials) {
  const gate = new THREE.Group();
  gate.position.z = 26;

  addBox(gate, [2.3, 8.8, 2.4], [-8.3, 4.4, 0], materials.surface);
  addBox(gate, [2.3, 8.8, 2.4], [8.3, 4.4, 0], materials.surface);
  addBox(gate, [19, 1.25, 2.4], [0, 8.35, 0], materials.ink);
  addBox(gate, [7.8, 0.16, 0.06], [0, 8.3, 1.23], materials.primary, {
    castShadow: false
  });

  const sign = addBox(gate, [7.2, 1.6, 0.18], [0, 8.35, 1.31], materials.primary, {
    castShadow: false
  });
  sign.material = materials.primary;

  const barrierPivot = new THREE.Group();
  barrierPivot.position.set(-7.1, 1.8, -3.1);
  const barrierArm = addBox(
    barrierPivot,
    [12.7, 0.28, 0.34],
    [6.35, 0, 0],
    materials.surface
  );
  for (let x = 1.2; x < 12.2; x += 2.3) {
    addBox(barrierPivot, [1.05, 0.3, 0.36], [x, 0, 0], materials.primary, {
      castShadow: false
    });
  }
  barrierArm.castShadow = true;
  gate.add(barrierPivot);

  addCylinder(gate, 0.28, 5.8, [5.8, 2.9, 5.2], materials.ink, 12);
  const cameraHead = addBox(gate, [1.35, 0.75, 1.2], [5.8, 5.9, 4.7], materials.ink);
  cameraHead.rotation.x = -0.24;
  addCylinder(gate, 0.19, 0.14, [5.8, 5.75, 4.05], materials.teal, 16).rotation.x = Math.PI / 2;

  const scannerRings = [];
  for (let index = 0; index < 3; index += 1) {
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: COLORS.primary,
      transparent: true,
      opacity: 0.22 - index * 0.05,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(3.8 + index * 1.7, 0.06, 8, 56),
      ringMaterial
    );
    ring.position.set(0, 3.5, 0.5);
    gate.add(ring);
    scannerRings.push(ring);
  }

  group.add(gate);
  return { barrierPivot, scannerRings };
}

function addControllerHub(group, materials) {
  const hub = new THREE.Group();
  hub.position.set(0, 0, -105);

  addBox(hub, [16, 1.2, 15], [0, 0.6, 0], materials.muted);
  addBox(hub, [10.5, 8, 8.5], [0, 4.6, 0], materials.ink);
  addBox(hub, [8.2, 4.6, 0.16], [0, 4.8, 4.33], materials.primaryDark, {
    castShadow: false
  });

  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 5; column += 1) {
      addBox(
        hub,
        [0.95, 0.08, 0.12],
        [-2.8 + column * 1.4, 3.35 + row * 1.35, 4.46],
        column <= row + 1 ? materials.teal : materials.primarySoft,
        { castShadow: false }
      );
    }
  }

  const beacon = addCylinder(hub, 0.42, 0.95, [0, 9.1, 0], materials.success, 16);
  const dataNodes = [
    new THREE.Vector3(-18, 3.2, -64),
    new THREE.Vector3(17, 4.2, -74),
    new THREE.Vector3(-15, 5.2, -91),
    new THREE.Vector3(14, 3.4, -122)
  ];
  const hubPoint = new THREE.Vector3(0, 8.4, -105);
  const pulses = [];

  dataNodes.forEach((point, index) => {
    const geometry = new THREE.BufferGeometry().setFromPoints([point, hubPoint]);
    const line = new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({
        color: index % 2 === 0 ? COLORS.primary : COLORS.teal,
        transparent: true,
        opacity: 0.38
      })
    );
    group.add(line);

    const pulse = new THREE.Mesh(
      new THREE.SphereGeometry(0.24, 12, 12),
      new THREE.MeshBasicMaterial({ color: index % 2 === 0 ? COLORS.primary : COLORS.teal })
    );
    group.add(pulse);
    pulses.push({ pulse, start: point.clone(), end: hubPoint.clone(), phase: index * 0.23 });
  });

  group.add(hub);
  return { beacon, pulses };
}

function createMaterials() {
  return {
    surface: standardMaterial(COLORS.surface),
    muted: standardMaterial(COLORS.muted),
    border: standardMaterial(COLORS.border),
    ink: standardMaterial(COLORS.ink, { roughness: 0.6, metalness: 0.08 }),
    road: standardMaterial(COLORS.road, { roughness: 0.9 }),
    roadSoft: standardMaterial(COLORS.roadSoft, { roughness: 0.86 }),
    primary: standardMaterial(COLORS.primary, {
      roughness: 0.42,
      metalness: 0.08,
      emissive: COLORS.primary,
      emissiveIntensity: 0.08
    }),
    primaryDark: standardMaterial(COLORS.primaryDark, {
      roughness: 0.45,
      emissive: COLORS.primaryDark,
      emissiveIntensity: 0.2
    }),
    primarySoft: standardMaterial(COLORS.primarySoft),
    teal: standardMaterial(COLORS.teal, {
      roughness: 0.35,
      emissive: COLORS.teal,
      emissiveIntensity: 0.5
    }),
    success: standardMaterial(COLORS.success, {
      emissive: COLORS.success,
      emissiveIntensity: 0.6
    }),
    landscape: standardMaterial(COLORS.landscape),
    landscapeDark: standardMaterial(COLORS.landscapeDark),
    treeTrunk: standardMaterial(0x80634b),
    warm: standardMaterial(COLORS.warm)
  };
}

function createWorldGeometry(scene, materials) {
  const world = new THREE.Group();
  scene.add(world);

  addBox(world, [54, 1.2, 224], [0, 0, -43], materials.surface, {
    castShadow: false
  });
  addBox(world, [14, 0.22, 216], [0, 0.72, -42], materials.road, {
    castShadow: false
  });
  addBox(world, [3.5, 0.3, 216], [-8.8, 0.76, -42], materials.muted, {
    castShadow: false
  });
  addBox(world, [3.5, 0.3, 216], [8.8, 0.76, -42], materials.muted, {
    castShadow: false
  });

  for (let z = 54; z >= -140; z -= 8) {
    addBox(world, [0.16, 0.06, 3.3], [0, 0.88, z], materials.border, {
      castShadow: false
    });
  }

  for (const side of [-1, 1]) {
    addBox(world, [14, 0.55, 55], [side * 18, 0.35, -48], materials.landscape, {
      castShadow: false
    });
  }

  addParkingMarkings(world, materials);

  addApartment(world, -20, -24, 4, 10, materials);
  addApartment(world, 20, -39, 5, 10, materials);
  addApartment(world, -20, -63, 5, 10, materials);
  addApartment(world, 20, -76, 4, 10, materials);

  for (const [x, z, scale] of [
    [-13, 42, 1],
    [14, 48, 1.15],
    [-17, 10, 0.9],
    [17, 2, 1.1],
    [-13, -42, 0.9],
    [13, -56, 0.95],
    [-16, -88, 1.2],
    [18, -112, 1]
  ]) {
    addTree(world, x, z, scale, materials);
  }

  const parkedVehicles = [
    [-15, -29, 0x64748b],
    [15, -39, 0x0f766e],
    [-15, -58, 0xb45309],
    [15, -68, 0x475569]
  ];
  parkedVehicles.forEach(([x, z, color]) => {
    const vehicle = createVehicle(color, materials);
    vehicle.position.set(x, 0.72, z);
    vehicle.scale.setScalar(0.78);
    world.add(vehicle);
  });

  const gate = addGate(world, materials);
  const controller = addControllerHub(world, materials);
  const activeVehicle = createVehicle(COLORS.primary, materials);
  activeVehicle.scale.setScalar(0.88);
  world.add(activeVehicle);

  return { world, gate, controller, activeVehicle };
}

export function createParktekWorld(host) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(COLORS.background);
  scene.fog = new THREE.Fog(COLORS.background, 54, 180);

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 400);
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: "high-performance"
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.domElement.className = "parktek-world-canvas";
  host.appendChild(renderer.domElement);

  const hemisphere = new THREE.HemisphereLight(0xffffff, 0x9aa8b8, 2.2);
  scene.add(hemisphere);

  const sun = new THREE.DirectionalLight(0xffffff, 3.6);
  sun.position.set(-34, 58, 42);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -62;
  sun.shadow.camera.right = 62;
  sun.shadow.camera.top = 80;
  sun.shadow.camera.bottom = -80;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 180;
  scene.add(sun);

  const materials = createMaterials();
  const geometry = createWorldGeometry(scene, materials);

  const cameraCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(21, 18, 73),
      new THREE.Vector3(10, 11, 46),
      new THREE.Vector3(2, 6.4, 21),
      new THREE.Vector3(-7, 7.2, -13),
      new THREE.Vector3(9, 10.5, -48),
      new THREE.Vector3(-3, 8.2, -82),
      new THREE.Vector3(12, 12.5, -113),
      new THREE.Vector3(0, 22, -145)
    ],
    false,
    "catmullrom",
    0.28
  );
  const vehicleCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-2.2, 0.78, 61),
      new THREE.Vector3(-2.2, 0.78, 28),
      new THREE.Vector3(-2.2, 0.78, -18),
      new THREE.Vector3(2.2, 0.78, -62),
      new THREE.Vector3(2.2, 0.78, -98),
      new THREE.Vector3(0, 0.78, -129)
    ],
    false,
    "catmullrom",
    0.25
  );

  const lookPoint = new THREE.Vector3();
  const vehiclePoint = new THREE.Vector3();
  const vehicleTarget = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);
  const vehicleMatrix = new THREE.Matrix4();

  function resize() {
    const width = Math.max(1, host.clientWidth);
    const height = Math.max(1, host.clientHeight);
    const mobile = width <= 860;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.35 : 1.8));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.fov = mobile ? 50 : 42;
    camera.updateProjectionMatrix();
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  resize();

  return {
    render({ progress, time }) {
      const cameraProgress = THREE.MathUtils.smoothstep(progress, 0, 1);
      cameraCurve.getPointAt(Math.min(1, cameraProgress), camera.position);
      cameraCurve.getPointAt(Math.min(1, cameraProgress + 0.025), lookPoint);
      lookPoint.y -= progress > 0.82 ? 3.8 : 1.25;
      camera.lookAt(lookPoint);

      const vehicleProgress = THREE.MathUtils.clamp(progress * 1.09 - 0.015, 0, 1);
      vehicleCurve.getPointAt(vehicleProgress, vehiclePoint);
      vehicleCurve.getPointAt(Math.min(1, vehicleProgress + 0.008), vehicleTarget);
      geometry.activeVehicle.position.copy(vehiclePoint);
      vehicleMatrix.lookAt(vehiclePoint, vehicleTarget, up);
      geometry.activeVehicle.quaternion.setFromRotationMatrix(vehicleMatrix);
      geometry.activeVehicle.userData.wheels.forEach((wheel) => {
        wheel.rotation.x = -time * 3.1 - vehicleProgress * 42;
      });

      const barrierOpen = THREE.MathUtils.smoothstep(progress, 0.16, 0.28);
      geometry.gate.barrierPivot.rotation.z = -barrierOpen * 1.32;
      geometry.gate.scannerRings.forEach((ring, index) => {
        const pulse = 1 + Math.sin(time * 2.4 - index * 0.8) * 0.05;
        ring.scale.setScalar(pulse);
        ring.material.opacity =
          (0.2 - index * 0.045) * (0.35 + Math.sin(time * 2 - index) * 0.18);
      });

      geometry.controller.beacon.material.emissiveIntensity = 0.55 + Math.sin(time * 3) * 0.22;
      geometry.controller.pulses.forEach(({ pulse, start, end, phase }) => {
        const amount = (time * 0.18 + phase) % 1;
        pulse.position.lerpVectors(start, end, amount);
      });

      renderer.render(scene, camera);
    },

    dispose() {
      resizeObserver.disconnect();
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose());
        } else if (object.material) {
          object.material.dispose();
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    }
  };
}
