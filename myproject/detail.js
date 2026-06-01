import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const PRESETS = [
    { id: 1, title: "Машина", model: "models/Range Rover.glb" },
    { id: 3, title: "Дерево", model: "models/Big Tree.glb" },
    { id: 4, title: "Пальма", model: "models/Palm Tree.glb" },
    { id: 5, title: "Машина + Дерево", models: [
        { model: "models/Range Rover.glb" },
        { model: "models/Big Tree.glb" },
    ]}
];

let camera, controls, scene, renderer;
const loader = new GLTFLoader();
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const userId = params.get('user');

if (id) {
    const data = PRESETS.find(m => m.id === Number(id));
    if (data) initScene(data.title, data.models || [{ model: data.model }]);
} else if (userId) {
    getModelByIdFromDB(userId).then(userModel => {
        if (userModel) initScene(userModel.title, [{ buffer: userModel.buffer }]);
    });
}

function initScene(title, items) {
    document.getElementById('model-title').textContent = title;
    const canvas = document.getElementById('viewer-canvas');
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.setPixelRatio(window.devicePixelRatio);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe6ebf5);

    camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 1, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const gap = 1.5;
    items.forEach((item, idx) => {
        const onLoaded = (gltf) => {
            const model = gltf.scene;
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            model.position.x = items.length > 1 ? (idx === 0 ? -gap : gap) : -center.x;
            model.position.y = -box.min.y;
            model.position.z = -center.z;

            scene.add(model);

            if (items.length === 1) {
                const maxDim = Math.max(size.x, size.y, size.z);
                camera.position.z = maxDim * 2.5;
            }
        };

        if (item.buffer) {
            loader.parse(item.buffer, '', onLoaded);
        } else {
            loader.load(item.model, onLoaded);
        }
    });

    setupControls();
    animate();
}

function setupControls() {
    document.getElementById('zoom-in').onclick = () => {
        camera.position.multiplyScalar(0.9);
        controls.update();
    };
    document.getElementById('zoom-out').onclick = () => {
        camera.position.multiplyScalar(1.1);
        controls.update();
    };

    const setView = (x, y, z) => {
        const dist = camera.position.distanceTo(controls.target);
        camera.position.set(x * dist, y, z * dist);
        controls.update();
    };

    document.getElementById('view-front').onclick = () => setView(0, 2, 1);
    document.getElementById('view-back').onclick = () => setView(0, 2, -1);
    document.getElementById('view-left').onclick = () => setView(-1, 2, 0);
    document.getElementById('view-right').onclick = () => setView(1, 2, 0);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    const canvas = document.getElementById('viewer-canvas');
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
});
