import { state } from "../../state";
import map from "lodash/map";
type Message = {
   nombre: string;
   message: string;
};
class Chat extends HTMLElement {
   message: Message[] = [];
   connectedCallback() {
      state.subscribe(() => {
         const currentState = state.getState();
         this.message = currentState.message;
         this.render();
      });
      this.render();
      const form = this.querySelector(".form");
      form!.addEventListener("submit", (e) => {
         e.preventDefault();
         const target = e.target as any;
         let btn = target.text.value;
         state.pushMessage(btn);

         if (btn !== "") {
            (e.target as any).text.value = "";
         }
      });
   }
   render() {
      const currentState = state.getState();
      this.message = currentState.message;

      this.classList.add("body");
      this.innerHTML = `
            <div class="header"></div>
            <div class="contenedor">
               <div class="description-chat">
                  <h2 class="chat">Chat</h2>
                  <h4 class="chat-Name">${state.data.name}</h4>
               </div>
               <div class ="message">
                  ${this.message.map((m) => {
                     const arr = map(m);
                     return arr
                        .map((d) => {
                           console.log(state.data.name);

                           return `
                              <div class="${
                                 d.nombre === state.data.name ? "me" : "you"
                              }" style="margin-bottom:10px"> 
                                 <p style="font-size:12px;display: inline-block;">${
                                    d.nombre
                                 }</p>
                                 <h4 style="display: inline-block
                                 "> ${d.message}</h4>
                              </div>
                           `;
                        })
                        .join("");
                  })}
               </div>
               <form class="form">
                  <input type="text" id="text" class="text" name="text" required>
                  <button class="btn">Enviar</button>
               </form>
            </div>
         `;
      const style = document.createElement("style");
      style.innerHTML = `
         .body{
            height:100vh;
         }
         .header{
            background-color:#FF8282;
            margin:0;
            height:10vh
         }
         .contenedor{
            width:80%;
            margin:auto;
         }
         .description-chat{
            display:flex;
            justify-content:space-between;
            text-align:end;

         }
         .chat{
            font-size:3.5rem;
            font-weight:bold;
            font-family: 'Poppins';
            margin-bottom:0;
            margin-top:35px;
            
         }
         .chat-Name{
            font-size:1.2rem;
         }
         .message{
            padding:10px;
            height:55vh;
            overflow:scroll;
            background-color:#F8F8F8;
            margin-bottom:1rem;
            border-radius:5px;
            display: flex;
            flex-direction: column;
            justify-content:end;
            align-items:end
        }
        .me{
           width: min-content;
           float:right;
         }
         .me h4{
           padding:8px;
            background-color:#B9E97C;
        }
        .you{
           width: min-content 
         }
         .you h4{
           padding:5px;     
            background-color:#D8D8D8;
         }
         .form{
            display:flex;
            flex-direction:column;
            height:100%;
         }
         .text{
            font-size:1.3rem;
            height:30px;
            margin-bottom:1rem;
            border-radius:8px;
            text-indent:10px;

         }
         .btn{
            font-family: 'Poppins';
            font-weight:600;
            font-size:1.2rem;
            background-color:#A5E4F7;
            height:50px;
            width:120px;  
            margin:auto; 
            border:none;
            border-radius:8px;
         }
      `;
      this.appendChild(style);
   }
}

customElements.define("custom-chatroom", Chat);
