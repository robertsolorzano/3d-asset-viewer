let container, camera, scene, renderer, controls, model, ambientLight;

init();
animate();

function init() {
    container = document.getElementById('container');
    const fileInput = document.getElementById('file-input');
    const lightIntensitySlider = document.getElementById('light-intensity');
    const uploadTrigger = document.getElementById('upload-trigger');

    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 7, 10);

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    ambientLight = new THREE.AmbientLight(0xffffff, 6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 10).normalize();
    scene.add(directionalLight);

    const gridHelper = new THREE.GridHelper(100, 100);
    scene.add(gridHelper);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    lightIntensitySlider.addEventListener('input', (event) => {
        ambientLight.intensity = event.target.value;
    });

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const contents = e.target.result;
                loadModel(contents);
                document.getElementById('placeholder').style.display = 'none';
            };
            reader.readAsArrayBuffer(file);
        }
    });

    uploadTrigger.addEventListener('click', () => {
        fileInput.click();
    });

    window.addEventListener('resize', onWindowResize, false);
}

function loadModel(contents) {
    const loader = new THREE.GLTFLoader();
    loader.parse(contents, '', (gltf) => {
        if (model) {
            scene.remove(model);
        }
        model = gltf.scene;
        scene.add(model);
    }, (error) => {
        console.error('An error occurred loading the model', error);
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    if (model) {
        model.rotation.y += 0.01;
    }

    controls.update();
    renderer.render(scene, camera);
}
