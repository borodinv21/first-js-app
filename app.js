const noteInput = document.getElementById('note_input')
const addNoteButton = document.getElementById('add_note_button')
const notesList = document.getElementById('notes_list')

const myNotes = []

addNoteButton.onclick = function () {
    if (noteInput.value.length === 0) { return }

    myNotes.push(
        {
            title: noteInput.value,
            completed: false 
        }
    )
    
    showNotes(myNotes)

    noteInput.value = ''
}

function showNotes (myNotes) {
    notesList.innerHTML = ``
    for (let i = 0; i < myNotes.length; i++){
        notesList.insertAdjacentHTML('beforeend', getNoteTemplate(myNotes[i], i))
    }
}

function getNoteTemplate (note, index) {
    return `
        <li>
            <span class="${note.completed ? 'text-decoration-line-through' : ''}">${note.title}</span>
            <span>
                <button data-index="${index}" data-type="complete">+</button>
                <button data-index="${index}" data-type="delete">-</button>
            </span>
        </li>
    `
}

notesList.onclick = function (event) {
    const noteIndex = event.target.dataset.index
    const buttonType = event.target.dataset.type
    
    if (noteIndex == undefined) { return }

    buttonType == 'complete' ? noteComplete(noteIndex) : noteDelete(noteIndex)
}

function noteDelete (index) {
    myNotes.splice(index, 1)
    showNotes(myNotes)
}

function noteComplete (index) {
    if (myNotes[index].completed) {
        myNotes[index].completed = false
    } else {
        myNotes[index].completed = true
    }
    showNotes(myNotes)
}




