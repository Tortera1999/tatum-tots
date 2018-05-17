const app = {
    init: function(formSelector){
        this.max = 0;
        const form = document.querySelector(formSelector)
        form.addEventListener('submit', (ev) => {
            ev.preventDefault()
            this.handleSubmit(ev)
        })
    },
    handleSubmit: function(ev){
        
        const f = ev.target
        const flick = {
            name: f.flickName.value,
            id: ++this.max,
        }
        console.log(flick)
        f.reset()
    },
}

app.init('#flickForm')