import { IfcViewerAPI } from "web-ifc-viewer";

(async () => {
  const container = document.createElement("div");
  container.classList.add("canvas-container");
  document.body.append(container);

  const viewer = new IfcViewerAPI({
    container,
  });

  await viewer.IFC.loader.ifcManager.applyWebIfcConfig({
    USE_FAST_BOOLS: true,
    COORDINATE_TO_ORIGIN: true,
  });
  await viewer.IFC.loader.ifcManager.useWebWorkers(true, "wasm/IFCWorker.js");

  const gltfFile = await viewer.GLTF.exportIfcFileAsGltf({
    ifcFileUrl: "/house.ifc",
    getProperties: true, // важно получить св-ва модели
  });

  loadFile(gltfFile.gltf.allCategories.allFloors.file, "house.gltf"); // скачиваем саму gltf модель
  loadFile(gltfFile.json[0], "house.json"); // скачиваем св-ва модели в формате json

  loader.remove();
})();

function loadFile(file, fileName) {
  const aLink = document.createElement("a");
  const blob = new Blob([file], { type: file.type });
  const url = URL.createObjectURL(blob);
  aLink.href = url;
  aLink.download = fileName;
  aLink.click();
  aLink.remove();
}
