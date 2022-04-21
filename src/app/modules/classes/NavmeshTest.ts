import {
  Component,
  Entity,
  MultiPropertySchema,
  System,
  SystemDefinition,
  THREE,
  Geometry,
  registerComponent,
  Scene,
} from "aframe";

declare global {
  interface Window {
    box: any;
    CS1: any;
    StateManager: any;
  }
}

const CS1 = window.CS1;
const StateManager = window.StateManager;

export class NavmeshTest {
  constructor() {}
  async run() {
    // create blue box
    const box = await CS1.scene.add("a-box");
    console.log("box");
    console.log(box);
    box?.setAttribute("color", "yellow");
    box?.object3D.position.set(0, 1, -5);
    
    const map = document.createElement("a-gltf-model");
    map.setAttribute("src","https://cdn.glitch.global/5dfc0d3a-8dfb-4899-829a-b4bf07441fcf/IntroLevel%20Glb.glb?v=1648778202991");
    map.setAttribute("id","map");
    
    const navmesh = document.createElement("a-gltf-model");
    navmesh.setAttribute("src", "https://cdn.glitch.global/5dfc0d3a-8dfb-4899-829a-b4bf07441fcf/IntroLevel%20Navmesh.glb?v=1648778191448");
    navmesh.id = "navmesh";
    navmesh.setAttribute("visible", false);
    
    CS1.scene.entity.appendChild(map);
    // CS1.scene.entity.appendChild(navmesh);

    //add a-cursor as child of camera
    //const cursor = document.createElement("a-cursor");
    //CS1.cam.entity.appendChild(cursor);
    
    //add navmesh constraint to camera
    CS1.cam.entity.setAttribute("simple-navmesh-constraint", "navmesh:#navmesh;fall:0.5;height:1.65;");
    box.addEventListener("click", (e) => {
      StateManager.dispatch({
        type: "path-mutation",
        payload: {
          path: "house.rooms.bathroom.locked",
          value: box.getAttribute("color") === "green" ? false : true,
        },
      });
    });

    StateManager.subscribe("house.rooms.bathroom.locked", () => {
      box.setAttribute(
        "color",
        box.getAttribute("color") === "green" ? "red" : "green"
      );
    });
  }
}
