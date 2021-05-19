const listDo = document.getElementById("list-body");
const addLine = document.getElementById("add-line");
let listArr = data();

if (!localStorage.hasOwnProperty("id")) {
  localStorage.id = 0;
}
if (listArr) {
  for (let item of listArr) {
    listDo.append(inputForm(item));
  }
}
function data() {
  if (localStorage.hasOwnProperty("maList")) {
    // alert(JSON.parse(localStorage.maList).maillist);
    return JSON.parse(localStorage.maList).maillist;
  } else {
    return [];
  }
}

// TODO: save items with LS
function addTask() {
  if (addText()) {
    let arrElem = { text: addText(), completed: false, index: localStorage.id };
    //filter, map
    // var arr = [{ text: "test", completed: true, index: 1 }];
    listDo.append(inputForm(arrElem));
    localStorage.id = +localStorage.id + 1;
    listArr.push(arrElem);
    addLine.value = "";
    localStorage.maList = JSON.stringify({ maillist: listArr });
  }
}

function delItemArr(id) {
  return listArr.filter((item) => item.index != id);
}

function delTask(event) {
  event.target.parentNode.parentNode.remove();
  listArr = delItemArr(event.target.value);
  localStorage.maList = JSON.stringify({ maillist: listArr });
}
function delAll() {
  while (listDo.lastChild) {
    listDo.lastChild.remove();
  }
  listArr = [];
  localStorage.maList = JSON.stringify({ maillist: listArr });
}

function addText() {
  return addLine.value.trim();
}

function checkAction(event) {
  if (event.target.checked) {
    event.target.parentNode.nextSibling.classList.add("task-done");
    listArr = listArr.map(function (item) {
      if (item.index == event.target.value) {
        item.completed = true;
        return item;
      }
      return item;
    });
    localStorage.maList = JSON.stringify({ maillist: listArr });
  } else {
    event.target.parentNode.nextSibling.classList.remove("task-done");
    listArr = listArr.map(function (item) {
      if (item.index == event.target.value) {
        item.completed = false;
        return item;
      }
      return item;
    });
    localStorage.maList = JSON.stringify({ maillist: listArr });
  }
}

function showUnchecked() {
  for (let node of document.querySelectorAll(".list-item")) {
    if (node.firstChild.firstChild.checked) {
      node.classList.add("hidden");
    } else {
      node.classList.remove("hidden");
    }
  }
}

function showChecked() {
  for (let node of document.querySelectorAll(".list-item")) {
    if (!node.firstChild.firstChild.checked) {
      node.classList.add("hidden");
    } else {
      node.classList.remove("hidden");
    }
  }
}
function showAll() {
  for (let node of document.querySelectorAll(".list-item")) {
    node.classList.remove("hidden");
  }
}

function inputForm(arrElem) {
  let div = document.createElement("div");
  div.classList.add("list-item");
  let itemCheck = document.createElement("div");
  let itemInput = document.createElement("div");
  let itemDelete = document.createElement("div");
  itemCheck.classList.add("item-check");
  if (arrElem.completed == true) {
    itemInput.classList.add("task-done");
  }
  itemInput.classList.add("item-input");
  itemDelete.classList.add("item-delete");
  div.append(itemCheck);
  div.append(itemInput);
  div.append(itemDelete);
  itemCheck.append(document.createElement("input"));
  itemCheck.firstChild.setAttribute("type", "checkbox");
  itemCheck.firstChild.setAttribute("onchange", "checkAction(event)");
  itemCheck.firstChild.setAttribute("value", arrElem.index);
  itemCheck.firstChild.checked = arrElem.completed;

  itemInput.innerText = arrElem.text;
  itemDelete.append(document.createElement("button"));
  itemDelete.firstChild.setAttribute("onclick", "delTask(event)");
  itemDelete.firstChild.innerText = "Delete";
  itemDelete.firstChild.setAttribute("value", arrElem.index);
  return div;
}
