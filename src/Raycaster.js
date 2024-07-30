import * as THREE from "three";

const raycaster = new THREE.Raycaster(); // создаем луч, который будет проходить через меши
raycaster.setFromCamera(pointer, camera); // задаем лучу 2 точки.
// Первая точка из области, где точно есть меши, вторая - наша камера.
const intersects = raycaster.intersectObjects(scene.children);
// тут возвращается массив того, что мы пересекли. Элемент с нулевым индексом - это то, что на первом плане.
