import '../components/nav/nav'
import EventCard,  {Attribute} from '../components/eventcard/eventCard';
import { getEventsAction } from '../store/action';
import { dispatch } from '../store';
import { appState } from '../store';
class Usuario extends HTMLElement {
    EventListUsuario: EventCard[]=[]
        constructor()  {
            super();
            this.attachShadow( {mode: 'open'});
        }
    
        async connectedCallback() {
            if (appState.products.length === 0) {
                const eventsAction = await getEventsAction();
                dispatch(eventsAction)
            }
            this.render();
        }

        async render()  {
            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = `
                <nav-commponent></nav-commponent>
                 <div class="events"></div>
                 <button id="register">Registrarse como asistente</button>
                `;
                appState.products?.forEach(event => {
                    const songItem = this.ownerDocument.createElement('event-card') as EventCard;
                    songItem.setAttribute(Attribute.titleevent, event.albumname);
                    songItem.setAttribute(Attribute.date, event.author);
                    songItem.setAttribute(Attribute.location, event.image);
                    songItem.setAttribute(Attribute.image, event.stock);
                    songItem.setAttribute(Attribute.attendes, event.price);
                    this.EventListUsuario.push(songItem);
                });
    
                const container = this.shadowRoot?.querySelector('.events');
                this.EventListUsuario.forEach((event) => {
                    container?.appendChild(event);
                });
            };
            }
        
        }
    
    

customElements.define('app-user', Usuario);