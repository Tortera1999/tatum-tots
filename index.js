const app = {
    init: function(selectors){
        this.flicks = []
        this.max = 0;
        this.list = document.querySelector(selectors.listSelector)
        const form = document.querySelector(selectors.formSelector)
        form.addEventListener('submit', (ev) => {
            ev.preventDefault()
            this.handleSubmit(ev)
        })
    },

    renderListItem: function(flick){
        const item = document.createElement('li')
        item.dataset.id = flick.id
        item.textContent = flick.name
        return item
    },

    handleSubmit: function(ev){
        const f = ev.target
        const flick = {
            name: f.flickName.value,
            id: ++this.max,
        }

        this.flicks.push(flick)

        this.list.appendChild(this.renderListItem(flick))
        f.reset()
    },
}

app.init({
    formSelector: '#flickForm',
    listSelector: '#flickList',
})