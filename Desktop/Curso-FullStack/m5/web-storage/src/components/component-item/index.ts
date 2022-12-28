import { state } from "../../state";

const deleteItem = require("../../imagen/delete.png");

customElements.define(
   "custom-item",
   class extends HTMLElement {
      shadow: ShadowRoot;
      title: string;
      checked: boolean = false;
      constructor() {
         super();
         this.shadow = this.attachShadow({ mode: "open" });
      }
      connectedCallback() {
         this.title = this.getAttribute("title") || "";
         this.checked = this.hasAttribute("checked");
         this.id = this.getAttribute("id")!;

         const style = document.createElement("style");
         style.innerHTML = `
            .root{
               font-size:1rem;
               border-radius:4px;
               padding:22px 13px;
               background-color:#FFF599;
               width:311px;
               height:111px;
               display:flex;
               justify-content:space-between;
               align-items:center;
            }
            @media(min-width:960px){
               .root{
                  width:272px;
               }
            }
            .titulo.checked{
               text-decoration: line-through;
               
            }
            .root__check{
               height:100%;   
               display:flex;
               flex-direction:column;
               justify-content:space-between;
               
            }
         `;
         this.render();
         this.shadow.appendChild(style);
      }
      addCallback() {
         const checkEl = this.shadow.querySelector(".checkbox");

         checkEl!.addEventListener("click", (e) => {
            e.preventDefault();
            const target = e.target as any;
            const event = new CustomEvent("change", {
               detail: {
                  id: this.id,
                  value: target.checked,
               },
            });
            this.dispatchEvent(event);
         });
      }
      render() {
         const div = document.createElement("div");
         div.classList.add("root");
         div.innerHTML = `
   
            <h4 class="titulo ${this.checked ? "checked" : ""}">${
            this.title
         }</h4>
            <div class="root__check">
               <input type="checkbox" class="checkbox" ${
                  this.checked ? "checked" : ""
               }/>
               <a href="#" class="deleteTag"><img src="${deleteItem}" alt="delete"></a>
            </div>
            
         `;
         const deleteTag = div.querySelector(".deleteTag");

         deleteTag?.addEventListener("click", (e) => {
            e.preventDefault();

            state.deleteItems(this.getAttribute("id"));
         });

         // const root = this.shadow.querySelectorAll("custom-item")!;
         // for (let el of root) {
         //    console.log(el.shadowRoot!.innerHTML);
         // }

         this.shadow.appendChild(div);
         this.addCallback();
      }
   }
);
