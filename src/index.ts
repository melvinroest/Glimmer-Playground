// app/initializers/custom-elements.js
class HelloWorld extends HTMLElement {
  constructor() {
    super();
    console.log("constructor() HelloWorld");
    let shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `<p>hello world</p>`;
  }
}

//similar to HelloWorld -- it's simply an extension
//HTMLDivElement, HTLMLParagraphElement
class TestingAParagraph extends HTMLHeadingElement {
  constructor() {
    super();
    console.log("constructor() TestingAParagraph");
    let shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `<p>hello Mars</p>`;
  }
}

window.customElements.define("hello-world", HelloWorld);
window.customElements.define("testing-a-paragraph", TestingAParagraph, {
  extends: "h1"
});

import { ComponentManager, setPropertyDidChange } from "@glimmer/component";
import App from "./main";
import initializeCustomElements from "@glimmer/web-component";

const app = new App();
const containerElement = document.getElementById("app");

setPropertyDidChange(() => {
  app.scheduleRerender();
});

app.registerInitializer({
  initialize(registry) {
    registry.register(
      `component-manager:/${app.rootName}/component-managers/main`,
      ComponentManager
    );
  }
});

app.renderComponent("MyApp", containerElement, null);

app.boot();


