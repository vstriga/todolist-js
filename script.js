const listDo = document.getElementById("list-body");
const addLine = document.getElementById("add-line");
const allBtn = document.getElementById("all");
const checkedBtn = document.getElementById("checked");
const uncheckedBtn = document.getElementById("unchecked");
const leftLabel = document.getElementById("left-label");

let listArr = data();
let counter = count();
leftLabel.innerText = counter + " items left";

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
    return JSON.parse(localStorage.maList).maillist;
  } else {
    return [];
  }
}

function addTask(event) {
  if (event.key == "Enter" && addLine.value.trim()) {
    let arrElem = {
      text: addLine.value.trim(),
      completed: false,
      index: localStorage.id,
    };
    listDo.append(inputForm(arrElem));
    localStorage.id = +localStorage.id + 1;
    listArr.push(arrElem);
    addLine.value = "";
    localStorage.maList = JSON.stringify({ maillist: listArr });
    counter = count();
    leftLabel.innerText = counter + " items left";
  }
}

function delItemArr(id) {
  return listArr.filter((item) => item.index != id);
}

function delTask(event) {
  event.target.parentNode.parentNode.remove();
  listArr = delItemArr(event.target.value);
  localStorage.maList = JSON.stringify({ maillist: listArr });
  counter = count();
  leftLabel.innerText = counter + " items left";
}

function delChecked() {
  listArr = listArr.filter((item) => item.completed == false);
  while (listDo.lastChild) {
    listDo.lastChild.remove();
  }
  for (let item of listArr) {
    listDo.append(inputForm(item));
  }
  localStorage.maList = JSON.stringify({ maillist: listArr });
}

function count() {
  if (listArr.filter((item) => item.completed == false)) {
    return listArr.filter((item) => item.completed == false).length;
  } else {
    return 0;
  }
}

function checkAction(event) {
  if (event.target.checked) {
    event.target.parentNode.lastChild.classList.add("task-done");
    listArr = listArr.map(function (item) {
      if (item.index == event.target.value) {
        item.completed = true;
        return item;
      }
      return item;
    });
    localStorage.maList = JSON.stringify({ maillist: listArr });
  } else {
    event.target.parentNode.lastChild.classList.remove("task-done");
    listArr = listArr.map(function (item) {
      if (item.index == event.target.value) {
        item.completed = false;
        return item;
      }
      return item;
    });
    localStorage.maList = JSON.stringify({ maillist: listArr });
  }
  counter = count();
  leftLabel.innerText = counter + " items left";
}

function showUnchecked() {
  uncheckedBtn.classList.add("active-btn");
  checkedBtn.classList.remove("active-btn");
  allBtn.classList.remove("active-btn");
  for (let node of document.querySelectorAll(".list-item")) {
    if (node.firstChild.firstChild.checked) {
      node.classList.add("hidden");
    } else {
      node.classList.remove("hidden");
    }
  }
}

function showChecked() {
  checkedBtn.classList.add("active-btn");
  allBtn.classList.remove("active-btn");
  uncheckedBtn.classList.remove("active-btn");
  for (let node of document.querySelectorAll(".list-item")) {
    if (!node.firstChild.firstChild.checked) {
      node.classList.add("hidden");
    } else {
      node.classList.remove("hidden");
    }
  }
}

function showAll() {
  allBtn.classList.add("active-btn");
  uncheckedBtn.classList.remove("active-btn");
  checkedBtn.classList.remove("active-btn");
  for (let node of document.querySelectorAll(".list-item")) {
    node.classList.remove("hidden");
  }
}

function inputForm(arrElem) {
  let div = document.createElement("div");
  div.classList.add("list-item");
  let itemCheck = document.createElement("div");
  let itemInput = document.createElement("label");
  let itemDelete = document.createElement("div");
  itemCheck.classList.add("blue", "item-check");
  if (arrElem.completed == true) {
    itemInput.classList.add("task-done");
  }
  itemInput.classList.add("item-input");
  itemDelete.classList.add("item-delete", "hidden");
  div.append(itemCheck);
  div.append(itemDelete);
  itemCheck.append(document.createElement("input"));
  itemCheck.append(itemInput);
  itemCheck.firstChild.setAttribute("type", "checkbox");
  itemCheck.firstChild.setAttribute("onchange", "checkAction(event)");
  itemCheck.firstChild.setAttribute("value", arrElem.index);
  itemCheck.firstChild.setAttribute("id", arrElem.index);
  itemCheck.firstChild.checked = arrElem.completed;
  itemCheck.lastChild.innerText = arrElem.text;
  itemCheck.lastChild.setAttribute("for", arrElem.index);
  itemInput.innerText = arrElem.text;
  itemDelete.append(document.createElement("button"));
  itemDelete.firstChild.setAttribute("onclick", "delTask(event)");
  itemDelete.firstChild.classList.add("cross");
  itemDelete.firstChild.setAttribute("value", arrElem.index);
  return div;
}
