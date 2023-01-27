import { Router } from "@vaadin/router";
import { state } from "../../state";

class Inicio extends HTMLElement {
   connectedCallback() {
      this.render();
      const form = this.querySelector(".form") as HTMLElement;
      form.addEventListener("submit", (e) => {
         e.preventDefault();
         const input = (e.target as any).name;
         if (input.value === "") {
         } else {
            state.setName(input.value);
            Router.go("/chatroom");
         }
      });
   }
   render() {
      const style = document.createElement("style");
      this.innerHTML = `
         <div class="header"></div>
         <div class="contenedor">
            <h2 class="titulo">Bienvenid@s<span class="spanChat">al Chat</span></h2>
            <form class="form" action="">
               <label for="name" class="label">Tu Nombre</label>
               <input type="text" name="name" id="name" class="input-name" minlength="3" required>
               <button class="btn">Comenzar</button>
            </form>
         </div>
      `;

      style.innerHTML = `
         .header{
            background-color:#FF8282;
            margin:0;
            height:10vh
         }
         .contenedor{
            width:400px;
            margin:auto;
         }
         .titulo{
            font-size:3.5rem;
            font-weight:bold;
            font-family: 'Poppins';
         }
         .spanChat{
            display:block;
            font-size:1.5rem;
            text-align:end;
            margin-top:-20px;
         }
         .form{
            display:flex;
            flex-direction:column;
         }
         .label{
            font-family: 'Poppins';
            font-size:1.1rem;
            font-weight:600;
         }
         .input-name{
            text-indent:10px;
            font-family: 'Poppins';
            border:solid 2px ;
            margin-bottom:1.4rem;
            height:35px;
            font-size:1.2rem;
         }
         .input-name:focus{
            border-color: #8DE4FF;
         }
         .btn{
            font-family: 'Poppins';
            font-weight:600;
            font-size:1.2rem;
            background-color:#A5E4F7;
            height:50px;
            width:150px;  
            margin:auto; 
            border:none;
            border-radius:8px;
         }
      `;
      this.appendChild(style);
   }
}

customElements.define("custom-inicio", Inicio);
