// Create a menu app, use at least one array, at least two classes.
//The menu should have the options to create, view, and delete elements.

// Shopping lists: items to put on the list, what store to find them at, and what list
//this item belongs to

class Items {
  constructor(name, store) {
    this.name = name; 
    this.store = store;
  }

 
}

class List {
  constructor(name) {
    this.name = name; 
    this.list = [];
  }

  addItem(item) {
    if (item instanceof Items) {
      console.log(item);
      console.log(this.list);
      this.list.push(item);
    } else {
      throw new Error(`You can only add a shopping item.  argument is not a 
      shopping item: ${item}`);
    }
  }

  describe () { //put description of item too
    let listItems = "";
    console.log(this.list)
    for(let i = 0; i < this.list.length; i++) {
      listItems += `${this.list[i].name} from ${this.list[i].store},  `
    }

    return (
      `This shopping list, ${this.name}, has ${this.list.length} items:
       ${listItems} `);

  }
}

class Menu {
  constructor() {
    this.lists = [];
    this.selectedList = null; //only one list at a time
  }

start() {
  let selection = this.showMainMenuOptions(); 
  while (selection != 0) {
    switch(selection) {
      case '1' : 
        this.createList();
        break;
      case '2' :
        this.viewList();
        break;
      case '3' :
        this.deleteList();
        break;
      case '4' :
        this.displayLists();
        break;
      default:
        selection = 0;
    }
    selection = this.showMainMenuOptions();
  }
  alert('Exiting menu.');
}

showMainMenuOptions() {
  return prompt (`
    0) exit menu
    1) create a new list
    2) view a list and add item to list
    3) delete a list
    4) display all lists  
  `);
}

displayLists() {
  let listString = '';
    for (let i = 0; i < this.lists.length; i++) {
      listString += i+ ') ' + this.lists[i].name + '\n';
    }
    alert(listString);
}

createList() {
  let name = prompt('Enter name for new shopping list: ');
  this.lists.push(new List(name));
}

viewList() {
  let index = prompt('Enter the index of the list to view:'); 
  if (index > -1 && index < this.lists.length) {
    this.selectedList = this.lists[index];
    let description = 'Shopping List: ' + this.selectedList.name + '\n';
    description += ' ' + this.selectedList.describe() + '\n';
    for (let i=0; i < this.selectedList.length; i++) {  
      description += i + ') ' + this.selectedList.items[i].describe() + '\n';
    }
    let selection1 = this.showListMenuOptions(description);
    switch (selection1) {
      case '1' :
        this.createItem();
        break;
      case '2' :
        this.deleteItem();
    }
  }
}

showListMenuOptions(description) {
  return prompt(`
  ${description}
  1) Add Item
  2) Delete Item`)
}

deleteList() {
  let index = prompt('Enter the number of the list you wish to delete: ');
  if (index > -1 && index < this.lists.length) {
    this.lists.splice(index,1);
  }
}

createItem() {
  let name = prompt('Enter new item for shopping list: ');
  let store = prompt('Enter store this item can be found: ');
  this.selectedList.addItem(new Items(name, store));
}

deleteItem() {
  let index = prompt('Enter the number of the item that you wish to delete: ');
  if (index > -1 && index < this.selectedList.list.length) {
    this.selectedList.list.splice(index, 1);
  }
}
}

let menu = new Menu ();
menu.start(); 