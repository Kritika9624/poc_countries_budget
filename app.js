const str =
  "United States^2020^3923829;United States^2019^2973920;United States^2018^32869420;China^2020^3622313;China^2019^2394820;China^2018^2297620;Germany^2020^1729224;Germany^2019^789450;Germany^2018^791670";

// create 2D array from string above
const strSplit = str.split(";");
let arr = [];
strSplit.forEach((i) => {
  arr.push(i.split("^"));
});

// convert budget value to currency format
arr.forEach((i) => {
  let numCurr = parseInt(i[2]);
  numCurr = numCurr.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  i[2] = numCurr.toString();
});

// remove duplicate countries
// create array for unique countries
let uniqueCountries = [];
let years = [];
arr.forEach((c) => {
  if (!uniqueCountries.includes(c[0])) {
    uniqueCountries.push(c[0]);
  }

  if (!years.includes(c[1])) {
    years.push(c[1]);
  }
});

// country select
// populating options in select
uniqueCountries.forEach((i) => {
  var countryOp = document.createElement("option");
  countryOp.value = i;
  countryOp.innerHTML = i;
  countrySelect.appendChild(countryOp);
});

years.forEach((i) => {
  var year = document.createElement("option");
  year.value = i;
  year.innerHTML = i;
  yearSelect.appendChild(year);
});



// function to create html table from string
function createTable(tableData, isDdn = false) {
  // create table
  var containerDiv = document.getElementById('tableContainer');
  if(containerDiv.children.length !== 0){
    containerDiv.removeChild(containerDiv.firstElementChild);
  }
  var table = document.createElement("table");
  table.className = "dataTable";
  let thead = document.createElement("thead");
  var tableBody = document.createElement("tbody");

  let row_1 = document.createElement("tr");
  let heading_1 = document.createElement("th");
  heading_1.innerHTML = "Country";
  let heading_2 = document.createElement("th");
  heading_2.innerHTML = "Year";
  let heading_3 = document.createElement("th");
  heading_3.innerHTML = "Budget($)";

  row_1.appendChild(heading_1);
  row_1.appendChild(heading_2);
  row_1.appendChild(heading_3);
  thead.appendChild(row_1);
  table.appendChild(thead);

  // looping over 2d array
  tableData.forEach(function (rowData) {
    var row = document.createElement("tr");
    rowData.forEach(function (cellData) {
      var cell = document.createElement("td");
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  });
  table.appendChild(tableBody);
  document.getElementById('tableContainer').appendChild(table);


}

createTable(arr);

// choices code starts here

var countryDropdown = new Choices("#countrySelect", {
  searchEnabled: true,
  searchChoices: true,
  allowHTML: true,
  removeItems: true,
  removeItemButton: true,
  items: [],
  choices: [],
  placeholder: true,
  placeholderValue: "Select country",
});

var yearDropdown = new Choices("#yearSelect", {
  searchEnabled: true,
  searchChoices: true,
  allowHTML: true,
  removeItems: true,
  removeItemButton: true,
  items: [],
  choices: [],
  placeholder: true,
  placeholderValue: "Select year",
});


let res = [];
countryDropdown.passedElement.element.addEventListener(
  "addItem",
  (event) => {
    let countryValue = event.detail.value;
    
    arr
      .filter((c) => countryValue === c[0])
      .map((item, index) => {
        res.push(item);
      });
    createTable(res);
  },
  false
);

let removedArr = [];
countryDropdown.passedElement.element.addEventListener(
  "removeItem",
  (event) => {
    let countryValue = event.detail.value;
    res
      .filter((c) => countryValue !== c[0])
      .map((item) => {
        removedArr.push(item);
      });
      console.log(res)
      console.log(removedArr)
      res=removedArr
    createTable(removedArr);
    removedArr = []
  },
  false
);
