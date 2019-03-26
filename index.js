document.querySelector(".card-container").style.cssText =
  "display: flex; justify-content: center; ";
document.querySelector(".card").style.cssText =
  "background: rgb(207, 216, 241); width: 40em; height: 100%; padding: 2em; border: 3px solid black";

document.querySelector(".heading").innerHTML = "Trello API";
document
  .querySelector(".heading")
  .setAttribute(
    "style",
    "font-size: 3em;font-weight: bold;justify-content: center;border-bottom: 3px solid black;"
  );
document.querySelector("body").style.background = "#64c764";
cardName = document.querySelector(".card-name");
cardName.innerHTML = "Test Card";
cardName.style.cssText = "text-align: center; font-size: 2em; margin: 2em;";
var display = document.querySelector(".display");
// display.style.cssText = "display: flex;";
document.querySelector(".input-container").style.cssText =
  "padding-bottom: 2em";
document.querySelector(".heading-list").style.cssText =
  "border-bottom: 3px solid black; text-align: center";

/************************************************************************************************************************************************************/
/********************API*********************************************************************************************** */

var dataAPI = [];

fetch(
  "https://api.trello.com/1/cards/5c9759dc55c7a26d77b74ea2/checklists?key=b70a784b7e15771cde299ed1d9ad682b&token=48f4cbd501664f420da0403ba48dc1639f132e0341d54410fbd33f483b6d1a73"
)
  .then(response => {
    return response.json();
  })
  .then(data => {
    // Work with JSON data here
    //console.log(data)
    for (var j = 0; j < data.length; j++) {
      var checklists = {};
      var card = document.createElement("p");
      card.innerHTML = data[j]["name"];
      var del = document.createElement("button");
      del.innerHTML = "DELETE";
      let delitemlist = 'deletecheckitem("' + data[j]["id"] + '")';
      del.setAttribute("onclick", delitemlist);
      var button = document.createElement("button");
      button.innerHTML = "ADD CHECK ITEMS";
      let addcheckitem = 'addcheckitem("' + data[j]["id"] + '")';
      button.setAttribute("onclick", addcheckitem);
      display.appendChild(card);
      display.appendChild(button);
      display.appendChild(del);
      checklists.id = data[j]["id"];
      checklists.name = data[j]["name"];
      checklists.checkitems = [];

      for (var i = 0; i < data[j]["checkItems"].length; i++) {
        var checkitem = {};
        checkitem.state = data[j]["checkItems"][i]["state"];
        checkitem.id = data[j]["checkItems"][i]["id"];
        checkitem.name = data[j]["checkItems"][i]["name"];

        // var oid = data[j]["checkItems"][i]["id"];

        var item = document.createElement("div");
        display.appendChild(item);
        item.style.cssText = "display: flex; justify-content: space-around;";
        var x = document.createElement("INPUT");
        x.setAttribute("type", "checkbox");
        // x.setAttribute("name", data[j]["checkItems"][i]["name"]);

        let status;
        if (data[j]["checkItems"][i]["state"] == "complete") {
          x.checked = true;
          status = true;
        } else {
          x.checked = false;
          status = false;
        }
        var fn =
          'checkstatus("' +
          data[j]["checkItems"][i]["id"] +
          '", ' +
          status +
          ")";
        var del = document.createElement("button");
        del.innerHTML = "DELETE";
        let delitemlist =
          'deletechecklist("' +
          data[j]["checkItems"][i]["id"] +
          '", "' +
          data[j]["id"] +
          '")';
        del.setAttribute("onclick", delitemlist);
        x.setAttribute("onclick", fn);
        item.appendChild(x);
        var child = document.createElement("div");
        child.innerHTML = data[j]["checkItems"][i]["name"];
        item.appendChild(child);
        item.appendChild(del);
        checklists.checkitems.push(checkitem);
      }
      dataAPI.push(checklists);
    }
  })
  .catch(err => {
    // Do something for an error here
    console.log(err);
  });
console.log(dataAPI);
/**************************API****END***************************************************************/
/*****************BUTTON CLICK**********ADD**NEW**CHECK LIST********************************************************************/

function readValue() {
  var inputValue = document.querySelector(".input").value;
  console.log(inputValue);
  if (inputValue != "") {
    var data = null;

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === this.DONE) {
        console.log(this.responseText);
      }
    });
    var url =
      "https://api.trello.com/1/checklists?idCard=5c9759dc55c7a26d77b74ea2&name=" +
      inputValue +
      "&key=b70a784b7e15771cde299ed1d9ad682b&token=48f4cbd501664f420da0403ba48dc1639f132e0341d54410fbd33f483b6d1a73";
    xhr.open("POST", url);

    xhr.send(data);
    setTimeout(dalayFunction, 1000);
  }
}
/***************************END********************************************************************************************************************************************************************************************/
/************************EVENT LISTENER***********************************************************************************************************************************************/

function checkstatus(oid, status) {
  var data = null;
  var ischeck;
  if (status == true) {
    ischeck = "incomplete";
  } else {
    ischeck = "complete";
  }
  var url =
    "https://api.trello.com/1/cards/5c9759dc55c7a26d77b74ea2/checkItem/" +
    oid +
    "?state=" +
    ischeck +
    "&key=b70a784b7e15771cde299ed1d9ad682b&token=48f4cbd501664f420da0403ba48dc1639f132e0341d54410fbd33f483b6d1a73";
  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function() {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
  });

  xhr.open("PUT", url);

  xhr.send(data);
  setTimeout(dalayFunction, 2000);
}
function dalayFunction() {
  document.location.reload(true);
}
/*********************************************************************** */

function addcheckitem(id) {
  console.log(id);
  var person = prompt("Please enter check item name", "");
  if (person != null) {
    var data = null;

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === this.DONE) {
        console.log(this.responseText);
      }
    });
    let url =
      "https://api.trello.com/1/checklists/" +
      id +
      "/checkItems?name=" +
      person +
      "&checked=false&key=b70a784b7e15771cde299ed1d9ad682b&token=48f4cbd501664f420da0403ba48dc1639f132e0341d54410fbd33f483b6d1a73";
    xhr.open("POST", url);

    xhr.send(data);
    setTimeout(dalayFunction, 1000);
  }
}

function deletecheckitem(id) {
  console.log(id);
  var data = null;

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function() {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
  });
  var url =
    "https://api.trello.com/1/checklists/" +
    id +
    "?key=b70a784b7e15771cde299ed1d9ad682b&token=48f4cbd501664f420da0403ba48dc1639f132e0341d54410fbd33f483b6d1a73";
  xhr.open("DELETE", url);

  xhr.send(data);
  setTimeout(dalayFunction, 1000);
}
function deletechecklist(checkitemid, checklistid) {
  console.log(checkitemid, checklistid);

  var data = null;

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function() {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
  });
  var url =
    "https://api.trello.com/1/checklists/" +
    checklistid +
    "/checkItems/" +
    checkitemid +
    "?key=b70a784b7e15771cde299ed1d9ad682b&token=48f4cbd501664f420da0403ba48dc1639f132e0341d54410fbd33f483b6d1a73";
  xhr.open("DELETE", url);

  xhr.send(data);
  setTimeout(dalayFunction, 2000);
}
