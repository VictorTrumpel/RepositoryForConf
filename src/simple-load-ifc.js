import { IfcViewerAPI } from "web-ifc-viewer";
import { Color } from "three";

(async () => {
  const container = document.createElement("div");
  container.classList.add("canvas-container");
  document.body.append(container);

  const viewer = new IfcViewerAPI({
    container,
    backgroundColor: new Color(0xffffff),
  });

  const loader = document.createElement("h1");
  loader.innerHTML = "Загрузка модели...";
  document.body.append(loader);

  await viewer.IFC.loader.ifcManager.useWebWorkers(true, "wasm/IFCWorker.js");

  await viewer.IFC.loader.ifcManager.applyWebIfcConfig({
    COORDINATE_TO_ORIGIN: true, // смещаем модель к началу координат (а то можно и не найти)
  });

  await viewer.IFC.loadIfcUrl("/house.ifc"); //

  loader.remove();

  window.ondblclick = async () => {
    await viewer.IFC.selector.pickIfcItem(false, true);
  };
})();
