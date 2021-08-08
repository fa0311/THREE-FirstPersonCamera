window.addEventListener("DOMContentLoaded", main);

function main() {
    const width = 1920;
    const height = 1080;
    const canvas = document.querySelector("#canvas");
    canvas.addEventListener("click", e => {
        canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
        canvas.requestPointerLock();

    });

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(
        45,
        width / height,
        1,
        2000
    );
    camera.position.set(0, 0, 800);



    const geometry = new THREE.BoxGeometry(50, 50, 50);
    const material = new THREE.MeshStandardMaterial({
        color: 0x6699FF,
        roughness: 0.5
    });
    const box = new THREE.Mesh(geometry, material);
    scene.add(box);

    /*
    // ドーナツ
    const geometry = new THREE.TorusGeometry(300, 100, 64, 100);
    const material = new THREE.MeshStandardMaterial({
        color: 0x6699FF,
        roughness: 0.5
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    */

    /*
        // 平行光源
        const light = new THREE.DirectionalLight(0xffffff);
        light.intensity = 2;
        light.position.set(2, 2.5, 1);
        */



    const light = new THREE.PointLight(0xFFFFFF, 2, 1000, 1.0);
    light.position.set(0, 0, 0);
    scene.add(light);

    view();

    function view() {

        requestAnimationFrame(view);



        let _euler = new THREE.Euler(0, 0, 0, 'YXZ');
        _euler.setFromQuaternion(camera.quaternion);
        _euler.y -= mousedata.x;
        _euler.x = Math.max(Math.PI / 2 - Math.PI, Math.min(Math.PI / 2 - 0, _euler.x - mousedata.y));
        camera.quaternion.setFromEuler(_euler);


        if (keydata.up && keydata.right) {
            camera.position.z -= Math.cos(_euler.y - Math.PI / 2.5) * 3;
            camera.position.x -= Math.sin(_euler.y - Math.PI / 2.5) * 3;
        } else if (keydata.up && keydata.left) {
            camera.position.z += Math.cos(_euler.y - Math.PI / 1.5) * 3;
            camera.position.x += Math.sin(_euler.y - Math.PI / 1.5) * 3;
        } else if (keydata.down && keydata.right) {
            camera.position.z -= Math.cos(_euler.y - Math.PI / 1.5) * 3;
            camera.position.x -= Math.sin(_euler.y - Math.PI / 1.5) * 3;
        } else if (keydata.down && keydata.left) {
            camera.position.z += Math.cos(_euler.y - Math.PI / 2.5) * 3;
            camera.position.x += Math.sin(_euler.y - Math.PI / 2.5) * 3;
        } else if (keydata.up) {
            camera.position.z -= Math.cos(_euler.y) * 3;
            camera.position.x -= Math.sin(_euler.y) * 3;
        } else if (keydata.down) {
            camera.position.z += Math.cos(_euler.y) * 3;
            camera.position.x += Math.sin(_euler.y) * 3;
        } else if (keydata.right) {
            camera.position.z -= Math.cos(_euler.y - Math.PI / 2) * 3;
            camera.position.x -= Math.sin(_euler.y - Math.PI / 2) * 3;
        } else if (keydata.left) {
            camera.position.z += Math.cos(_euler.y - Math.PI / 2) * 3;
            camera.position.x += Math.sin(_euler.y - Math.PI / 2) * 3;
        }

        mousedata.update();

        light.position.z = camera.position.z;
        light.position.x = camera.position.x;
        light.position.y = camera.position.y;

        renderer.render(scene, camera);
    }

    canvas.addEventListener("mousemove", function(e) {
        mousedata.x += e.movementX / 1000;
        mousedata.y += e.movementY / 1000;
        // const obj = scene.getObjectByName("object");
        // camera.rotation.z = Math.atan2(mouseY, mouseX) + -(Math.PI * 90 / 180);
    });


}

class key {
    constructor() {
        this.up = false;
        this.down = false;
        this.right = false;
        this.left = false;
    }
}
class mouse {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
    update() {
        this.x = 0;
        this.y = 0;
    }
}

let keydata = new key();
let mousedata = new mouse();

function keyupfunc(event) {
    if (event.keyCode == 87) {
        keydata.up = false;
    }
    if (event.keyCode == 65) {
        keydata.left = false;
    }
    if (event.keyCode == 83) {
        keydata.down = false;
    }
    if (event.keyCode == 68) {
        keydata.right = false;
    }
}

function keydownfunc(event) {
    if (event.keyCode == 87) {
        keydata.up = true;
    }
    if (event.keyCode == 65) {
        keydata.left = true;
    }
    if (event.keyCode == 83) {
        keydata.down = true;
    }
    if (event.keyCode == 68) {
        keydata.right = true;
    }
}

addEventListener("keydown", keydownfunc);
addEventListener("keyup", keyupfunc);