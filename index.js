class App{
    constructor(selectors){
        this.flicks = []
        this.max = 0;
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)
        const form = document.querySelector(selectors.formSelector)
        form.addEventListener('submit', (ev) => {
            ev.preventDefault()
            this.handleSubmit(ev)
        })
    }

    removeFlick(flick, ev){
        const item = (ev.target.closest('.flick'))
        item.remove()
        const i = this.flicks.indexOf(flick)
        this.flicks.splice(i,1)
    }

    favFlick(flick, ev){
        const item = (ev.target.closest('.flick'))
        flick.fav = item.classList.toggle('fav')
    }

    toggleEditable(flick, ev){
        const item = (ev.target.closest('.flick'))
        const btn = item.querySelector('.edit.button')
        const nameField = item.querySelector('.flickName')
        if(nameField.isContentEditable){
            nameField.contentEditable = false
            btn.textContent = 'Edit'
            btn.classList.remove ('success')

            flick.name = nameField.textContent
            //console.log(this.flicks)
        } else{
            nameField.contentEditable = true
            nameField.focus()
            btn.textContent = 'Save'
            btn.classList.add('success')
        }
    }

    saveOnEnter(flick,ev){
        if(ev.keyCode === 13){
            this.toggleEditable(flick,ev)
        }
    }

    renderListItem(flick){
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = flick.id

        const nameSpan = item.querySelector('.flickName')
        nameSpan.textContent = flick.name

        nameSpan.addEventListener('keypress', this.saveOnEnter.bind(this,flick))

        item.querySelector('.remove.button').addEventListener('click', this.removeFlick.bind(this,flick))

        item.querySelector('.fav.button').addEventListener('click', this.favFlick.bind(this,flick))

        item.querySelector('.edit.button').addEventListener('click', this.toggleEditable.bind(this,flick))

        
        // item.querySelector('.alert').addEventListener('click', (ev) =>{
        //     const b = (ev.target.parentElement.parentElement)
        //     b.parentElement.removeChild(b)
        //     this.flicks.splice(this.flicks.indexOf(flick), 1)
            
        // })

        // item.querySelector('.warning').addEventListener('click', (ev) => {
        //     const b = (ev.target.parentElement.parentElement)
        //     if(!flick.fav){
        //         b.style.backgroundColor = "yellow"
        //     }
        //     else{
        //         b.style.backgroundColor = "white"
        //     }
        //     flick.fav = !flick.fav
        // })

        // item.querySelector('.primary').addEventListener('click', (ev) =>{
        //     const d = ev.target.parentElement.parentElement;
        //     let oldIndex;
        //     for(let i = 0; i < this.list.children.length; i++){
        //         if(this.list.children[i] === d){
        //             oldIndex = i;
        //         }
        //     }
        //     try{
        //         this.list.insertBefore(d,d.previousSibling)
        //     } catch{

        //     }
        //     let reqIndex;
        //     for(let i = 0; i < this.list.children.length; i++){
        //         if(this.list.children[i] === d){
        //             reqIndex = i;
        //         }
        //     }
            
        //     let temp = this.flicks[oldIndex];
        //     this.flicks[oldIndex] = this.flicks[reqIndex]
        //     this.flicks[reqIndex] = temp
        
        // })

        // item.querySelector('.secondary').addEventListener('click', (ev) =>{
        //     const d = ev.target.parentElement.parentElement;
        //     let oldIndex;
        //     for(let i = 0; i < this.list.children.length; i++){
        //         if(this.list.children[i] === d){
        //             oldIndex = i;
        //         }
        //     }
        //     //console.log(d.textContent)
        //     try{
        //         this.list.insertBefore(d,d.nextSibling.nextSibling)
        //     } catch{

        //     }
        //     let reqIndex;
        //     for(let i = 0; i < this.list.children.length; i++){
        //         if(this.list.children[i] === d){
        //             reqIndex = i;
        //         }
        //     }
            
        //     let temp = this.flicks[oldIndex];
        //     this.flicks[oldIndex] = this.flicks[reqIndex]
        //     this.flicks[reqIndex] = temp
        // })

       

        // item.querySelector('.flickName').addEventListener('keyup', (ev) => {
        //     flick.name = (ev.target.textContent)
        //     console.log(this.list)
        //     console.log(this.flicks)
        // })
        
        return item
    }

    handleSubmit(ev){
        const f = ev.target
        const flick = {
            name: f.flickName.value,
            id: ++this.max,
            fav: false
        }

        this.flicks.unshift(flick)

        const item = this.renderListItem(flick)
        this.list.insertBefore(item, this.list.firstElementChild)

        f.reset()
    }
}

const app = new App({
    formSelector: '#flickForm',
    listSelector: '#flickList',
    templateSelector: '.flick.template',
})