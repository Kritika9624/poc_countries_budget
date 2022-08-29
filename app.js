const str =
  "United States^2020^3923829;United States^2019^2973920;United States^2018^3286942;China^2020^3622313;China^2019^2394820;China^2018^2297620;Germany^2020^1729224;Germany^2019^789450;Germany^2018^791670";

  let isyearselected = false;

// create 2D array from string above
const strSplit = str.split(";");
let arr = [];
strSplit.forEach((i) => {
  arr.push(i.split("^"));
});

// convert budget value to currency format
// arr.forEach((i) => {
//   let numCurr = parseInt(i[2]);
//   numCurr = numCurr.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
//   i[2] = numCurr.toString();
// });

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
function createTable(tableData) {
  // create table
  var containerDiv = document.getElementById("tableContainer");
  if (containerDiv.children.length !== 0) {
    containerDiv.removeChild(containerDiv.firstElementChild);
  }
  var table = document.createElement("table");
  table.className = "dataTable";
  table.id = "datatable";
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
  document.getElementById("tableContainer").appendChild(table);
}

createTable(arr);

let arr3 = [];
for (let i = 0; i < arr.length; i++) {
  let temp = [], flag = false;
  for(let k = 0; k <arr3.length; k++){
    if(arr[i][0] === arr3[k][0]){
      flag = true;
      break;
    }
  }
  if(flag === false){

    temp.push(arr[i][0]);
    for (let j = 0; j < arr.length; j++) {
      if (arr[i][0] === arr[j][0]) {
        temp.push(arr[j][2]);
      }
    }
    arr3.push(temp);
  }
}

function createDataTable(tableData) {
  // create table
  var containerDiv = document.getElementById("tableContainer3");
  if (containerDiv.children.length !== 0) {
    containerDiv.removeChild(containerDiv.firstElementChild);
  }
  var table = document.createElement("table");
  table.id = "datatable3";
  let thead = document.createElement("thead");
  var tableBody = document.createElement("tbody");

  let row_1 = document.createElement("tr");
  let heading_1 = document.createElement("th");
  // heading_1.innerHTML = "country";
  let heading_2 = document.createElement("th");
  heading_2.innerHTML = "2018";
  let heading_3 = document.createElement("th");
  heading_3.innerHTML = "2019";
  let heading_4 = document.createElement("th");
  heading_4.innerHTML = "2020";
  
  row_1.appendChild(heading_1);
  row_1.appendChild(heading_2);
  row_1.appendChild(heading_3);
  row_1.appendChild(heading_4);
  thead.appendChild(row_1);
  table.appendChild(thead);

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
  document.getElementById("tableContainer3").appendChild(table);
  document.getElementById('datatable3').style.display='none';
}

createDataTable(arr3)


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

// called when filters are added
let res = [], tempRes = [];
countryDropdown.passedElement.element.addEventListener(
  "addItem",
  (event) => {
    let countryValue = event.detail.value;

    arr
      .filter((c) => countryValue === c[0])
      .map((item, index) => {
        res.push(item);
      });
    arr3
      .filter((c) => countryValue === c[0])
      .map((item, index) => {
        tempRes.push(item);
      });
    createTable(res);
    createDataTable(tempRes);
    isyearselected = false;
  },
  false
);

let res2 = [], tempRes2 = [];
yearDropdown.passedElement.element.addEventListener(
  "addItem",
  (event) => {
    let countryValue = event.detail.value;

    arr
      .filter((c) => countryValue === c[1])
      .map((item, index) => {
        res2.push(item);
      });
    arr3
      .filter((c) => countryValue === c[1])
      .map((item, index) => {
        tempRes2.push(item);
      });
    createTable(res2);
    createDataTable(tempRes2);
    isyearselected = true
  },
  false
);

// called when filters are removed
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
    res = removedArr;
    if (removedArr.length === 0) {
      createTable(arr);
    } else {
      createTable(removedArr);
    }
    removedArr = [];
  },
  false
);

let removedArr2 = [];
yearDropdown.passedElement.element.addEventListener(
  "removeItem",
  (event) => {
    let countryValue = event.detail.value;
    res
      .filter((c) => countryValue !== c[1])
      .map((item) => {
        removedArr2.push(item);
      });
    res = removedArr2;
    if (removedArr2.length === 0) {
      createTable(arr);
    } else {
      createTable(removedArr2);
    }
    removedArr2 = [];
  },
  false
);



const columnChartObject = () => {
  const chart = Highcharts.chart({
    chart: {
      renderTo: "chartContainer",
      type: "column",
    },
    data: {
      table: isyearselected? "datatable" : "datatable3",
    },
    title: {
      text: "Country Budget",
    },
    xAxis: {
      title: {
        text: "Country",
      },
      // categories:uniqueCountries,
    },
    yAxis: {
      title: {
        text: "Budget",
      },
    },
    series: [],
  });
};

const barChartObject = () => {
  Highcharts.chart({
    chart: {
      renderTo: "chartContainer",
      type: "bar",
    },
    data: {
      table: isyearselected? "datatable" : "datatable3",
    },
    title: {
      text: "Country Budget",
    },
    xAxis: {
      title: {
        text: "Country",
      },
    },
    yAxis: {
      title: {
        text: "Budget",
      },
    },
  });
};

const pieChartObject = () => {
  Highcharts.chart({
    chart: {
      renderTo: "chartContainer",
      type: "pie",
    },
    data: {
      table: isyearselected? "datatable" : "datatable3",
    },
    title: {
      text: "Country Budget",
    },
    xAxis: {
      title: {
        text: "Country",
      },
    },
    yAxis: {
      title: {
        text: "Budget",
      },
    },
  });
};

function createColChart() {
  document.addEventListener("DOMContentLoaded", columnChartObject());
}
function createBarChart() {
  document.addEventListener("click", barChartObject());
}
function createPieChart() {
  document.addEventListener("click", pieChartObject());
}
createColChart()
// document.getElementById("col").addEventListener("click", createColChart());