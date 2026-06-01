import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="product-detail-card" style="display: flex; flex-direction: column; align-items: center;">
                <div id="model-3d-container" style="width: 100%; height: 500px; background: #f0f4f8; border-radius: 20px; position: relative;">
                    <div id="loader-status" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">Загрузка модели...</div>
                </div>
                <div class="product-info" style="padding: 20px; text-align: center;">
                    <h2>${data.title}</h2>
                    <p>${data.text}</p>
                </div>
            </div>
        `;
    }

    initThree(modelPath) {
        const container = document.getElementById('model-3d-container');
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0f4f8);

        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(0, 2, 5);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        scene.add(new THREE.AmbientLight(0xffffff, 1.2));
        const sun = new THREE.DirectionalLight(0xffffff, 1);
        sun.position.set(5, 10, 7);
        scene.add(sun);

        const loader = new GLTFLoader();
        loader.load(modelPath, (gltf) => {
            const model = gltf.scene;
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());

            model.position.x = -center.x;
            model.position.y = -box.min.y;
            model.position.z = -center.z;

            scene.add(model);
            document.getElementById('loader-status').style.display = 'none';

            const size = box.getSize(new THREE.Vector3());
            camera.position.z = Math.max(size.x, size.y, size.z) * 2;
            controls.update();
        }, undefined, (err) => {
            document.getElementById('loader-status').textContent = "Ошибка загрузки .glb";
        });

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();
    }

    render(data) {
        this.parent.innerHTML = this.getHTML(data);
        if (data.modelPath) {
            this.initThree(data.modelPath);
        }
    }
}
