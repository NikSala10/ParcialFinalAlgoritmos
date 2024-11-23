import { dispatch, appState } from "../../store";
import { navigate, getEventsAction } from "../../store/action";
import { Screens } from "../../types/store";
import { deleteEvent } from "../../utils/firebase";

export enum AttributeAdmi {
    "idevent" = "idevent",
    "image" = "image",
    "titleevent" = "titleevent",
    "date" = "date",
    "attendes" = "attendes",
    "location" = "location",
   
}

class Modi extends HTMLElement {
    idevent?: number;
    image?: string;
    titleevent?: string;
    date?: string;
    attendes?: number;
    location?: string; 
 

    static get observedAttributes() {
        return Object.values(AttributeAdmi);
    }

    attributeChangedCallback(propName: AttributeAdmi, oldValue: string | undefined, newValue: string | undefined) {
        switch (propName) {
            case AttributeAdmi.idevent:
                this.idevent = newValue ? Number(newValue) : undefined;
                break;
            case AttributeAdmi.attendes:
                this.attendes = newValue ? Number(newValue) : undefined;
                break;
            default:
                this[propName] = newValue;
                break;
        }
        
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }



    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <div class="song">
            <div class="perfil">
                <div id="img">
                    <img src="${this.image}" >
                </div>
                <div class="texts">
                    <p>${this.titleevent}</p>
                    <p id="autor">${this.date}</p>
                </div>
            </div>
            <p class="album">${this.attendes}</p>
            <p class="duracion">${this.location}</p>
            <button id="delete">Delete</button>
        </div>
        <button id="agregar">Agregar Evento</button>
            `;
           

            const deleteButton = this.shadowRoot.querySelector('#delete');
            deleteButton?.addEventListener('click', () => {
                this.deleteProduct(String(this.idevent));
                alert('Evento borrado')
            });

            const add = this.shadowRoot?.querySelector('#agregar')
            add?.addEventListener('click', () =>  {
                dispatch(navigate(Screens.ADD));
            })
        }
        
        
    }
    async deleteProduct(productId: string | undefined) {
        if (productId) {
            try {
                await deleteEvent(productId);
                const action = await getEventsAction();
                dispatch(action);
            } catch (error) {
                console.error('Error al eliminar el producto:', error);
            }
        } else {
            console.error('ID del producto no proporcionado para eliminar.');
        }
    }

}

customElements.define("modi-commponent", Modi);
export default Modi;