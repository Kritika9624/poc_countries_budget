const str =
  "United States^2020^3923829;United States^2019^2973920;United States^2018^32869420;China^2020^3622313;China^2019^2394820;China^2018^2297620;Germany^2020^1729224;Germany^2019^789450;Germany^2018^791670;Japan^2020^1666454;Japan^2019^1020720;Japan^2018^986250;France^2020^1334944;France^2019^627190;France^2018^564950;United Kingdom^2020^966407;United Kingdom^2019^541210;United Kingdom^2018^532360;Italy^2020^863785;Italy^2019^374590;Italy^2018^394970;India^2020^620739;India^2019^322300;India^2018^291410;Canada^2020^598434;Canada^2019^362920;Canada^2018^356820;Spain^2020^481945;Spain^2019^262320;Spain^2018^265350;Russia^2020^468651;Russia^2019^309980;Russia^2018^293520;Australia^2020^459546;Australia^2019^271050;Australia^2018^272940";

// create 2D array from string above
const strSplit = str.split(";");
let arr = [];
strSplit.forEach((i) => {
  arr.push(i.split("^"));
});

// convert budget value to currency format
arr.forEach((i) => {
   let numCurr = parseInt(i[2]);
   numCurr = numCurr.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
   i[2] = numCurr.toString();
})

// remove duplicate countries
let uniqeCountries = [];
arr.forEach((c) => {
    if (!uniqeCountries.includes(c[0])) {
        uniqeCountries.push(c[0]);
    }
});

// console.log(uniqeCountries)

// country select

let countrySelect = document.getElementById('demo-2')

uniqeCountries.forEach((i) => {
    var countryOp = document.createElement('option');
    countryOp.value = i;
    countryOp.innerHTML=i
    countrySelect.appendChild(countryOp);

})

// function to create html table from string
function createTable(tableData) {
  var table = document.createElement("table");
  let thead = document.createElement("thead");
  var tableBody = document.createElement("tbody");

//   create header of table
  let row_1 = document.createElement("tr");
  let heading_1 = document.createElement("th");
  heading_1.innerHTML = "Country";
  let heading_2 = document.createElement("th");
  heading_2.innerHTML = "Year";
  let heading_3 = document.createElement("th");
  heading_3.innerHTML = "Budget($)";
  heading_3.className = "budget";

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
  document.body.appendChild(table);
  
}


// 
createTable(arr);



// choices code starts here

var firstElement = document.getElementById('demo-1');
// var choices1 = new Choices(firstElement, {
//     delimiter: ',',
//     editItems: true,
//     maxItemCount: 5,
//     allowHTML: true,
// });