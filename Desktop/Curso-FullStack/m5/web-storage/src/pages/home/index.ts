import { state } from "../../state";

export function initHomePage(container: Element) {
   const div = document.createElement("div");
   const style = document.createElement("style");
   style.innerHTML = `
      .add-item{
         padding:0;
         padding-top:3rem;
         display:flex;
         gap:2rem;
         flex-wrap:wrap;
         justify-content:center;
      }
      @media(min-width:960px){
         .add-item{
            width:960px;
            margin:0 auto;
            justify-content:flex-start;
         }
      }
   `;

   div.innerHTML = `
      <custom-header></custom-header>
      <custom-content></custom-content>
      <ul class="add-item"></ul>
   `;

   const addItem = div.querySelector(".add-item")!;
   const tasks = state.getEnabledTasks();

   function createTasks(items) {
      addItem!.innerHTML = "";
      for (const item of items) {
         const listaItemsHTML = document.createElement("custom-item");
         listaItemsHTML.setAttribute("title", item.title);
         listaItemsHTML.setAttribute("id", item.id);
         if (item.completed) {
            listaItemsHTML.setAttribute("checked", "true");
         }

         listaItemsHTML.addEventListener("change", (e: any) => {
            return state.changeItemState(Number(e.detail.id), e.detail.value);
         });

         addItem!.appendChild(listaItemsHTML);
      }
   }

   state.suscribe(() => {
      createTasks(state.getEnabledTasks());
   });

   createTasks(tasks);

   const tag = div
      .querySelector("custom-content")
      ?.shadowRoot?.querySelector("form")
      ?.querySelector(".btn");

   tag?.addEventListener("click", (e) => {
      e.preventDefault();
      const inputEl = div
         .querySelector("custom-content")!
         .shadowRoot!.querySelector(".search");

      state.addtasks(Math.round(Math.random() * 10000), (inputEl as any).value);
      (inputEl as any).value = "";
   });

   container.appendChild(style);
   container.appendChild(div);
}
