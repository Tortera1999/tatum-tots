const app = {
    init: function(formSelector){
        const form = document.querySelector(formSelector)
        form.addEventListener('submit', this.handleSubmit)
    },
    handleSubmit: function(ev){
        ev.preventDefault()
        const f = ev.target
        console.log(f.flickName.value)
    },



}

app.init('#flickForm')