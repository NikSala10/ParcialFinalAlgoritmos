export enum Attribute {
    "idevent" = "idevent",
    "image" = "image",
    "titleevent" = "titleevent",
    "date" = "date",
    "attendes" = "attendes",
    "location" = "location",
   
}

class EventCard extends HTMLElement {
    idevent?: number;
    image?: string;
    titleevent?: string;
    date?: string;
    attendes?: number;
    location?: string; 
 

    static get observedAttributes() {
        return Object.values(Attribute);
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        switch (propName) {
            case Attribute.idevent:
                this.idevent = newValue ? Number(newValue) : undefined;
                break;
            case Attribute.attendes:
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
                </div>
            `;
        }
        
    }
}

customElements.define("event-card", EventCard);
export default EventCard;