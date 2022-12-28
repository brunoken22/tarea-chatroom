class Header extends HTMLElement {
   shadow = this.attachShadow({ mode: "open" });
   constructor() {
      super();
      this.render();
   }
   render() {
      this.shadow.innerHTML = `
         <div style="background: linear-gradient(90deg, rgba(255,130,133,1) 5%, rgba(255,255,255,1) 47%, rgba(255,130,133,1) 98%);
         ;height:8vh;"></div>
      `;
   }
}

customElements.define("custom-header", Header);
