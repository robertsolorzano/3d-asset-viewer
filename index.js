console.log("Script loaded");

let container;
let camera, scene, renderer, controls;
let model;

init();
animate();

function init() {
    console.log("Initializing...");
    container = document.getElementById('container');

    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(2, 7, 2);

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 10).normalize();
    scene.add(directionalLight);

    console.log("Loading model...");

    const loader = new THREE.GLTFLoader();
    loader.load('assets/model.glb', function (gltf) {
        console.log("Model loaded successfully");
        model = gltf.scene;
        scene.add(model);
    }, undefined, function (error) {
        console.error('An error occurred loading the model', error);
    });

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    if (model) {
        model.rotation.y += 0.0; 
    }

    controls.update();
    renderer.render(scene, camera);
}
