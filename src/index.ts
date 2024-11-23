import './screens/addevent'
import './screens/admi'
import './screens//usuario'
import { addObserver, appState } from './store';
import { Screens } from './types/store';
import './components/nav/nav'

class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" })
        addObserver(this);
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = '';
            switch (appState.screen) {
                case Screens.ADMI:
                    console.log('holis');
                    const add = this.ownerDocument.createElement('app-admi');
                    this.shadowRoot?.appendChild(add);
                    break;

                case Screens.USUARIO:
                    const edit = this.ownerDocument.createElement('app-user');
                    this.shadowRoot?.appendChild(edit);
                    break

                case Screens.ADD:
                    const home = this.ownerDocument.createElement('app-add');
                    this.shadowRoot?.appendChild(home);
                    break;
                default:
                    break;
            }
        }
    }
}

customElements.define('app-container', AppContainer)