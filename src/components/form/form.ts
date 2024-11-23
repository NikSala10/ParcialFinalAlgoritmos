import { dispatch } from '../../store';
import { navigate } from '../../store/action';
import { Screens } from '../../types/store';
import { addEvent } from '../../utils/firebase';
const form = {
    title: '',
    date: '',
    location: '',
    image: '',
    attendees : '',
}
class EventForm extends HTMLElement {
   
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }
    changeTitle(e: any)  {
        form.title = e.target.value;
    }
    changeDateandHour(e: any)  {
        form.date = e.target.value;
    }
    changeUbication(e: any)  {
        form.location = e.target.value;
    }

    changeNumberAssitences(e: any)  {
        form.attendees = e.target.value;
    }
    changeImage(e: any) {
        form.image = e.target.value;
       
    }
    
    
    submitForm()  {
        addEvent(form);
        alert('Evento creado')
        dispatch(navigate(Screens.ADMI))
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <div>
                    <input type="text" id="title" placeholder="Enter title">
                     <input type="text" id="dateandhour" placeholder="Enter date and hour">
                      <input type="text" id="ubication" placeholder="Ubication" >
                      <input type="number" id="assistences" placeholder="Numbers of Assitence">
                       <input type="text" id="imageLink" placeholder="Enter image URL">
                    <button id="submitButton" type="submit">Add Event</button>
                </div>
            `;
            const buttonSubmit = this.shadowRoot?.querySelector("#submitButton")as HTMLButtonElement;
                buttonSubmit.addEventListener('click', this.submitForm);

                const songTitle = this.shadowRoot?.querySelector("#title") as HTMLInputElement;
                songTitle.addEventListener('change', this.changeTitle);
	
                const songArtist = this.shadowRoot?.querySelector("#dateandhour") as HTMLInputElement;
                songArtist.addEventListener('change', this.changeDateandHour);

                const songAlbum = this.shadowRoot?.querySelector("#ubication") as HTMLInputElement;
                songAlbum.addEventListener('change', this.changeUbication);

                const songDuration = this.shadowRoot?.querySelector("#assistences") as HTMLInputElement;
                songDuration.addEventListener('change', this.changeNumberAssitences);

                const songImage = this.shadowRoot?.querySelector("#imageLink") as HTMLInputElement;
                songImage.addEventListener('change', this.changeImage);
        }
        
    }
}

customElements.define("event-form", EventForm);
export default EventForm;