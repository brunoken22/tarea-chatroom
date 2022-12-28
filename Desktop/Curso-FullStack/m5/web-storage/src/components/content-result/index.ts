class Result extends HTMLElement {
   shadow: ShadowRoot;
   tagName: string;
   tags: string[] = ["h1", "p"];
   tag: string = "p";
   constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      if (this.tags.includes(this.getAttribute("tag")!)) {
         this.tag = this.getAttribute("tag") || this.tag;
      }

      this.render();
   }
   render() {
      const tag = document.createElement(this.tag);
      tag.textContent = this.textContent;
      this.shadow.appendChild(tag);
   }
}

customElements.define("custom-result", Result);
