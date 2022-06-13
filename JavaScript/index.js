let listDOM = document.querySelector('#list')
let taskDOM = document.querySelector('#task')
let buttonDOM = document.querySelector('#liveToastBtn')
let alert = document.querySelector('#alert')

buttonDOM.addEventListener('click', addTodo)
listDOM.addEventListener('click', deleteTodo)
document.addEventListener('DOMContentLoaded',loadAllTodosToUI)

// to do ekleme ve silme başlangıç
function addTodo(event){
    event.preventDefault()
    const newTodo = taskDOM.value.trim()
    if(newTodo == ''){
        alertFunction("danger","Lütfen Giriş Yapınız!")
    }else{
        addTodoUI(newTodo)
        addTodoToStorage(newTodo)
        alertFunction("success",'Hedef Başarılı Bir Şekilde Eklendi.')
    }
}

function addTodoUI(newTodo){
    const listItem = document.createElement('li')
    listItem.className = 'list-group-item d-flex justify-content-between align-items-center'

    const deleteIcon = document.createElement('a')
    deleteIcon.href = '#'
    deleteIcon.className = 'delete-item'
    deleteIcon.innerHTML = '<i class="fa fa-remove"></i>'

    listItem.appendChild(document.createTextNode(newTodo)) // input alanı eklendi.
    listItem.appendChild(deleteIcon)

    listDOM.appendChild(listItem)
    taskDOM.value = ''
}

function deleteTodo(event){
    if(event.target.className === 'fa fa-remove'){
        event.target.parentElement.parentElement.remove()
        deleteTodoFromStorage(event.target.parentElement.parentElement.textContent)
        alertFunction("warning",'Hedef Başarılı Bir Şekilde Silindi.')
    }else if(event.target.className === 'list-group'){
        console.log('yakaladım')
        event.target.parentElement.innerHTML = 'asd'
    }
    console.log(event.target)
}
// to do ekleme ve silme başlangıç

function addTodoToStorage(newTodo){
let todos = getTodosFromStorage()
todos.push(newTodo)

localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodosFromStorage(){
    let todos

    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    return todos
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage()
    todos.forEach(todo => {
        addTodoUI(todo)
    })
}

function deleteTodoFromStorage(deleteTodo){
    let todos = getTodosFromStorage()

    todos.forEach(
        function(todo,index){
            if(todo === deleteTodo){
                todos.splice(index,1)
            }
        }

    )
    localStorage.setItem('todos', JSON.stringify(todos))
}

//Alert Başlangıç
function alertFunction(type, message){
    const alertDiv = document.createElement('div')
    alertDiv.className = `alert alert-${type}`
    alertDiv.textContent = message;
    alert.append(alertDiv)

    setTimeout(function(){ // gelen uyarıyı 1,5 saniye sonra siler
        alertDiv.remove()
    },1000)
}
//Alert Bitiş