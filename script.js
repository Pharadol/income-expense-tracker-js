var idElements = [
  "balance",
  "moneyPlus",
  "moneyMinus",
  "list",
  "form",
  "text",
  "amount",
];

for (let i = 0; i < idElements.length; i++) {
  let = idElements[i] = "";
  idElements[i] = document.getElementById(idElements[i]);
}

const dataTransaction = [
  { id: 1, text: "salary", amount: +35000 },
  { id: 2, text: "travel expenses", amount: -5000 },
  { id: 3, text: "house rent", amount: -10000 },
];

let transactions = dataTransaction;

function init() {
  list.innerHTML = "";
  transactions.forEach(addDataToList);
  calculateMoney();
}

function addDataToList(transactions) {
  const symbol = transactions.amount < 0 ? "-" : "+";
  const status = transactions.amount < 0 ? "minus" : "plus";
  const item = document.createElement("li");
  result = formatNumber(Math.abs(transactions.amount));
  item.innerHTML = `${transactions.text}<span class="number ${status}">${symbol}${result}</span><button href="#" class="deleteBtn" onclick="removeData(${transactions.id})">X</button>`;
  list.appendChild(item);
}
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
function autoID() {
  return Math.floor(Math.random() * 1000000);
}

function calculateMoney() {
  const amounts = transactions.map((transactions) => transactions.amount);
  //คำนวณยอดคงเหลือ
  const total = amounts.reduce((result, item) => (result += item), 0).toFixed(2); //result start at 0 += item ไปเรื่อยๆ
  // คำนวณรายรับ
  const income = amounts.filter((item) => item > 0).reduce((result, item) => (result += item), 0).toFixed(2);
  // คำนวณรายจ่าย
  const expense = (amounts.filter((item) => item < 0).reduce((result, item) => (result += item), 0) * -1).toFixed(2);

  // แสดงผลทางจอภาพ
  balance.innerText = `฿` + formatNumber(total);
  moneyPlus.innerText = `฿` + formatNumber(income);
  moneyMinus.innerText = `฿` + formatNumber(expense);
}

function removeData(id) {
  transactions = transactions.filter((transactions) => transactions.id !== id);
  init();
}
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("กรุณาป้อนข้อมูลให้ครบ");
  } else {
    const data = {
      id: autoID(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(data);
    addDataToList(data);
    calculateMoney();
    text.value = "";
    amount.value = "";
  }
}

form.addEventListener("submit", addTransaction);
init();