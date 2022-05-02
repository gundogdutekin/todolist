"use strict";
const btnAdd = document.querySelector("#btnAdd");
const alertBar = document.querySelector(".alert");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
btnAdd.addEventListener("click", itemAdd);
btnDeleteAll.addEventListener("click", itemDeleteAll);

let firstItemList = JSON.parse(localStorage.getItem("itemArr2"));

if (firstItemList !== null) {
    for (const key in firstItemList) {
        let task = document.querySelector(".list-group");
        let li = document.createElement("li");
        task.append(li);
        li.className = "list-group-item";
        let drop = `<div class="form-check float-start">
                    <input class="form-check-input" type="checkbox" value="${key}" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                    
                    </label>
                </div><span class="itemText">${firstItemList[key]}</span>
                <div class="dropdown float-end">
                    <i role="button" class="fa-solid fa-trash-can ps-2 deleteItem"></i>
                    <i role="button" class="fa-solid fa-pen ps-2 editItem"></i>
                </div>`;
        li.innerHTML = drop;
    }
} else {
    firstItemList = [];
}

const deleteItem = document.querySelectorAll(".deleteItem");
deleteItem.forEach((element) => {
    element.addEventListener("click", function(e) {
        e.preventDefault;
        firstItemList.splice(itemGetId(e.target), 1);
        localStorage.clear();
        localStorage.setItem("itemArr2", JSON.stringify(firstItemList));
        window.location.reload();
    });
});

const editItem = document.querySelectorAll(".editItem");
editItem.forEach((element) => {
    element.addEventListener("click", function(e) {
        e.preventDefault;
        let itemList = JSON.parse(localStorage.getItem("itemArr2"));
        let valueText = itemList.splice(itemGetId(e.target), 1);
        let inputGroup = document.querySelector(".input-group");
        let input = document.querySelector("#inputAdd");
        let isBtn = document.querySelector("#inputUpdate");
        if (isBtn == null) {
            let btn = document.createElement("button");
            btn.setAttribute("id", "inputUpdate");
            btn.classList.add("btn", "btn-primary", "float-end", "ms-1");
            btn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
            inputGroup.append(btn);
        }
        input.setAttribute("data-id", itemGetId(e.target));
        input.value = valueText;
    });
});

function itemGetId(element) {
    let p1 = element.parentElement;
    let p2 = p1.parentElement;
    let delItemId = p2.children[0].children[0].value;
    return delItemId;
}

function itemDeleteAll() {
    let itemAll = document.querySelectorAll(".list-group-item");
    itemAll.forEach((element) => {
        element.remove();
    });

    localStorage.clear();
}

function alertDanger(alertText) {
    alertBar.textContent = alertText;
    alertBar.classList.remove("d-none");
    setInterval(function() {
        alertBar.classList.add("d-none");
    }, 2000);
    let inputAdd = document.querySelector("#inputAdd");
    let dataId = inputAdd.hasAttribute("data-id");
    if (dataId) {
        input.value = inputAdd;
    } else {
        inputAdd.value = "";
        inputAdd.focus();
    }
}
//add todolist
function itemAdd(e) {
    e.preventDefault();
    let input = document.querySelector("#inputAdd");

    let inputAdd = input.value;

    if (inputAdd === "") {
        alertDanger("Lütfen item alanını boş bırakmayınız.");
    } else {
        let itemList = JSON.parse(localStorage.getItem("itemArr2"));

        if (itemList === null) {
            firstItemList.push(inputAdd);
            localStorage.setItem("itemArr2", JSON.stringify(firstItemList));

            window.location.reload();
        } else {
            const found = itemList.find((element) => element === inputAdd);

            if (found === undefined) {
                firstItemList.push(inputAdd);

                localStorage.setItem("itemArr2", JSON.stringify(firstItemList));
                window.location.reload();
            } else {
                alertDanger(
                    "Lütfen başka bir değer giriniz.Böyle bir değer var zaten.."
                );
            }
        }
    }
}
const inputGroup = document.querySelector("#input-group");
inputGroup.addEventListener("click", function(e) {
    if (e.target.parentElement.id == "inputUpdate") {
        let input = document.querySelector("#inputAdd");

        let inputAdd = input.value;
        let inputId = input.getAttribute("data-id");
        let localArr = JSON.parse(localStorage.getItem("itemArr2"));
        let isArray = localArr.findIndex((element) => element == inputAdd);
        if (isArray == -1) {
            localArr.splice(inputId, 1, inputAdd);
            localStorage.setItem("itemArr2", JSON.stringify(localArr));
            window.location.reload();
        } else {
            alertDanger("Lütfen başka bir değer giriniz.Böyle bir değer var zaten..");
        }
    }
});