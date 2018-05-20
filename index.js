const app = {
    init: function(selectors){
        this.flicks = []
        this.max = 0;
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)
        const form = document.querySelector(selectors.formSelector)
        form.addEventListener('submit', (ev) => {
            ev.preventDefault()
            this.handleSubmit(ev)
        })
    },

    renderListItem: function(flick){
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = flick.id
        item.querySelector('.alert').addEventListener('click', (ev) =>{
            const b = (ev.target.parentElement.parentElement)
            b.parentElement.removeChild(b)
            //console.log(flicks)
            //console.log(this.flicks.indexOf(flick))
            this.flicks.splice(this.flicks.indexOf(flick), 1)
            //console.log(this.flicks)
            //console.log(flick)
        })

        item.querySelector('.warning').addEventListener('click', (ev) => {
            const b = (ev.target.parentElement.parentElement)
            if(!flick.fav){
                b.style.backgroundColor = "yellow"
            }
            else{
                b.style.backgroundColor = "white"
            }
            flick.fav = !flick.fav
            //console.log(flick.fav)
        })

        item.querySelector('.primary').addEventListener('click', (ev) =>{
            const d = ev.target.parentElement.parentElement;
            let oldIndex;
            for(let i = 0; i < this.list.children.length; i++){
                if(this.list.children[i] === d){
                    oldIndex = i;
                }
            }
            try{
                this.list.insertBefore(d,d.previousSibling)
            } catch{

            }
            let reqIndex;
            for(let i = 0; i < this.list.children.length; i++){
                if(this.list.children[i] === d){
                    reqIndex = i;
                }
            }
            
            let temp = this.flicks[oldIndex];
            this.flicks[oldIndex] = this.flicks[reqIndex]
            this.flicks[reqIndex] = temp
            //console.log(this.flicks)
            //console.log(this.list)
        
        })

        item.querySelector('.secondary').addEventListener('click', (ev) =>{
            const d = ev.target.parentElement.parentElement;
            let oldIndex;
            for(let i = 0; i < this.list.children.length; i++){
                if(this.list.children[i] === d){
                    oldIndex = i;
                }
            }
            //console.log(d.textContent)
            try{
                this.list.insertBefore(d,d.nextSibling.nextSibling)
            } catch{

            }
            let reqIndex;
            for(let i = 0; i < this.list.children.length; i++){
                if(this.list.children[i] === d){
                    reqIndex = i;
                }
            }
            
            let temp = this.flicks[oldIndex];
            this.flicks[oldIndex] = this.flicks[reqIndex]
            this.flicks[reqIndex] = temp
            //console.log(this.flicks)
            //console.log(this.list)
        })

        item.querySelector('.flickName').textContent = flick.name

        item.querySelector('.flickName').addEventListener('keyup', (ev) => {
            flick.name = (ev.target.textContent)
            console.log(this.list)
            console.log(this.flicks)
        })
        
        return item
    },

    handleSubmit: function(ev){
        const f = ev.target
        const flick = {
            name: f.flickName.value,
            id: ++this.max,
            fav: false
        }

        this.flicks.unshift(flick)
        //console.log(this.flicks)

        const item = this.renderListItem(flick)
        this.list.insertBefore(item, this.list.firstElementChild)

        f.reset()
    },
}

app.init({
    formSelector: '#flickForm',
    listSelector: '#flickList',
    templateSelector: '.flick.template'
})