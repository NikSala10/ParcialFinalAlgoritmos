import { dispatch } from '../../store/index'
import { Screens } from '../../types/store';
import { navigate } from '../../store/action';

class Nav extends HTMLElement {
   
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
              
                    <h1>EVENTS PEOPLES</h1>
                    <p id="admi">ADMI</p>
                    <p id="user">USUARIO</p>
              
          
            `;
            const edit = this.shadowRoot?.querySelector('#admi')
            edit?.addEventListener('click', () =>  {
                dispatch(navigate(Screens.ADMI));
            })

            const home = this.shadowRoot?.querySelector('#user')
            home?.addEventListener('click', () =>  {
                dispatch(navigate(Screens.USUARIO));
            })
        }
        
    }
}

customElements.define("nav-commponent", Nav);
export default Nav;