'use strict'
const btnAdd = document.querySelector('#btnAdd')
const alertBar = document.querySelector('.alert')
const btnDeleteAll = document.querySelector('#btnDeleteAll')
btnAdd.addEventListener('click', itemAdd)
btnDeleteAll.addEventListener('click', itemDeleteAll)

let firstItemList = JSON.parse(localStorage.getItem('itemArr2'))

if (firstItemList !== null) {
    for (const key in firstItemList) {
        let task = document.querySelector('.list-group')
        let li = document.createElement('li')
        task.append(li)
        li.className = 'list-group-item'
        let drop = `<div class="form-check float-start ">
                    <input class="form-check-input"  type="checkbox" value="${key}" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                    
                    </label>
                </div><span class="itemText ">${firstItemList[key]}</span>
                <div class="dropdown float-end">
                    <i role="button" class="fa-solid fa-trash-can ps-2 deleteItem"></i>
                    <i role="button" class="fa-solid fa-pen ps-2 editItem"></i>
                </div>`
        li.innerHTML = drop
    }
} else {
    firstItemList = []
}

const deleteItem = document.querySelectorAll('.deleteItem')
deleteItem.forEach((element) => {
    element.addEventListener('click', function(e) {
        e.preventDefault
        firstItemList.splice(itemGetId(e.target), 1)
        localStorage.clear()
        localStorage.setItem('itemArr2', JSON.stringify(firstItemList))
        window.location.reload()
    })
})

const editItem = document.querySelectorAll('.editItem')
editItem.forEach((element) => {
    element.addEventListener('click', function(e) {
        e.preventDefault
        let itemList = JSON.parse(localStorage.getItem('itemArr2'))
        let valueText = itemList.splice(itemGetId(e.target), 1)
        let inputGroup = document.querySelector('.input-group')
        let input = document.querySelector('#inputAdd')
        let isBtn = document.querySelector('#inputUpdate')
        if (isBtn == null) {
            let btn = document.createElement('button')
            btn.setAttribute('id', 'inputUpdate')
            btn.classList.add('btn', 'btn-primary', 'float-end', 'ms-1')
            btn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'
            inputGroup.append(btn)
        }
        input.setAttribute('data-id', itemGetId(e.target))
        input.value = valueText
    })
})

function itemGetId(element) {
    let p1 = element.parentElement
    let p2 = p1.parentElement
    let delItemId = p2.children[0].children[0].value
    return delItemId
}

function itemDeleteAll() {
    let itemAll = document.querySelectorAll('.list-group-item')
    itemAll.forEach((element) => {
        element.remove()
    })

    localStorage.clear()
}
//add todolist
function itemAdd(e) {
    e.preventDefault()
    let input = document.querySelector('#inputAdd')

    let inputAdd = input.value

    if (inputAdd === '') {
        alertDanger('Lütfen item alanını boş bırakmayınız.')
    } else {
        let itemList = JSON.parse(localStorage.getItem('itemArr2'))

        if (itemList === null) {
            firstItemList.push(inputAdd)
            localStorage.setItem('itemArr2', JSON.stringify(firstItemList))

            window.location.reload()
        } else {
            const found = itemList.find((element) => element === inputAdd)

            if (found === undefined) {
                firstItemList.push(inputAdd)

                localStorage.setItem('itemArr2', JSON.stringify(firstItemList))
                window.location.reload()
            } else {
                alertDanger(
                    'Lütfen başka bir değer giriniz.Böyle bir değer var zaten..'
                )
            }
        }
    }
}
const inputGroup = document.querySelector('#input-group')
inputGroup.addEventListener('click', function(e) {
    if (e.target.parentElement.id == 'inputUpdate') {
        let input = document.querySelector('#inputAdd')
        let inputId = input.getAttribute('data-id')
        let localArr = JSON.parse(localStorage.getItem('itemArr2'))
        let inputAdd = input.value
        if (inputAdd == '') {
            let valueText = localArr[inputId]
            console.log(valueText)
            input.value = valueText
            alertDanger('Lütfen boş alan bırakmayınız..')
        } else {
            let isArray = localArr.findIndex((element) => element == inputAdd)
            if (isArray == -1) {
                localArr.splice(inputId, 1, inputAdd)
                localStorage.setItem('itemArr2', JSON.stringify(localArr))
                window.location.reload()
            } else {
                alertDanger(
                    'Lütfen başka bir değer giriniz.Böyle bir değer var zaten..'
                )
            }
        }
    }
})
const listGroup = document.querySelector('.list-group')
let object = listGroup.children
for (let key in object) {
    const element = object[key]
    let object1 = element.children
    for (const key2 in object1) {
        let element2 = object1[key2]
        let object2 = element2.children
        for (const key3 in object2) {
            const element3 = object2[key3]
            if (element3.className == 'form-check-input') {
                element3.addEventListener('change', (e) => {
                    if (element3.checked) {
                        element.classList.add('bg-danger')
                    } else {
                        element.classList.remove('bg-danger')
                    }
                })
            }
        }
    }
}

function alertDanger(alertText) {
    alertBar.textContent = alertText
    alertBar.classList.remove('d-none')
    setTimeout(function() {
        alertBar.classList.add('d-none')
    }, 2000)
}