import { state } from "../../state";

class Content extends HTMLElement {
   shadow: ShadowRoot;
   constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
   }
   render() {
      const style = document.createElement("style");

      this.shadow.innerHTML = `
         <div class="contenedor">
            <h1 class="titulo">Mis pendientes</h1>
            <form>
               <label name="pendiente">Nuevo Pendiente</label>
               <div class="boton">
                  <input type="text" id="pendiente" class="search">
                  <button class="btn add-button">Agregar</button>
               </div>
            </form>
         </div>  
      `;

      style.innerHTML = `
         .contenedor{
            
            margin: 1rem 2rem;
         }
         @media(min-width:960px){
            .contenedor{
               width:960px;
               margin:0 auto;
            }
         }
         .contenedor .titulo{
            font-size:3rem;
         }

         .contenedor form{
            display:flex;
            flex-direction:column;

         }
         @media(min-width:960px){
            .contenedor form{
               flex-wrap:wrap;

            }
         }
         .contenedor label{
            margin-bottom:0.2rem;   
         }

         .contenedor input {
            height:35px;
            border:solid 2px;
            border-radius:5px;
            padding-left:10px;
            font-size:1rem;
         }
         @media(min-width:960px){
            .contenedor input{
              width:60%;
            }
         }
         .boton{
            display:flex;
            flex-direction:column;
            justify-content:center;
            
         }
         @media(min-width:960px){
            .boton{
               flex-direction:row;
               justify-content:space-evenly;
               column-gap:4rem;
               align-items:center;
               margin-top:0.2rem;

            }
         } 
         button{
            background-color:#9CBBE9;
            border:none;
            font-family:'Roboto';
            font-size:1rem;
            font-weight:500;
            height:40px;
            border-radius:8px;
            margin-top:1rem;

         }
          @media(min-width:960px){
            button{
               width:30%;
               margin-top:0;

            }
          }
      `;

      this.shadow.appendChild(style);
   }
}

customElements.define("custom-content", Content);
