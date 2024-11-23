import '../components/nav/nav'
import { getEventsAction } from '../store/action';
import Modi,  {AttributeAdmi} from '../components/eventAdmi/eventAdmi';
import { dispatch } from '../store';
import { appState } from '../store';
class Admi extends HTMLElement {
    eventListAdmi: Modi[]=[]
        constructor()  {
            super();
            this.attachShadow( {mode: 'open'});
        }
    
        async connectedCallback() {
            if (appState.products.length === 0) {
                const action = await getEventsAction();
                dispatch(action)
            } else {
                this.render();
            }
        }

        render()  {
            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = `
                <nav-commponent></nav-commponent>
                 <div class="events"></div>
                `;
                appState.products?.forEach(event => {
                    const songItem = this.ownerDocument.createElement('modi-commponent') as Modi;
                    songItem.setAttribute(AttributeAdmi.titleevent, event.title);
                    songItem.setAttribute(AttributeAdmi.idevent, event.id);
                    songItem.setAttribute(AttributeAdmi.location, event.location);
                    songItem.setAttribute(AttributeAdmi.image, event.image);
                    songItem.setAttribute(AttributeAdmi.attendes, event.attendees );
                    songItem.setAttribute(AttributeAdmi.date, event.date);
                    this.eventListAdmi.push(songItem);
                });

            const container = this.shadowRoot?.querySelector('.events');
            this.eventListAdmi.forEach((song) => {
                container?.appendChild(song);
            });
            }
            
        }
    
    }

customElements.define('app-admi', Admi);