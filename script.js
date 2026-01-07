const localStorageKey = 'to-do-list-tasks'

function validateIfTaskExists(data) {
    let values     = JSON.parse(localStorage.getItem(localStorageKey) || '[]')
    let inputValue = document.getElementById('input').value
    let exists     = values.find(x => x.name == inputValue)
    return !exists ? false : true
}

function newTask() {
    let input = document.getElementById('input')

    if (!input.value.trim()) {
        alert('Digite uma tarefa válida!')
    } else if (validateIfTaskExists(input.value)) {
        alert('Tarefa já cadastrada!')
    } else {
        let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]')
        values.push({
            name: input.value
        })
        localStorage.setItem(localStorageKey, JSON.stringify(values))
        showTasks()
    }

    input.value = ''
}

function showTasks() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]')
    let list = document.getElementById('list')
    list.innerHTML = ''

    for (let i = 0; i < values.length; i++) {
        list.innerHTML += `<li>${values[i]['name']}<button class="btn-check" id="btn-check" onclick='taskCheck("${values[i]['name']}")'><i class="fa-solid fa-check"></i></button></li>`
    }
}

function taskCheck(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]')
    let index = values.findIndex(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem(localStorageKey, JSON.stringify(values))

    showTasks()
}

showTasks()