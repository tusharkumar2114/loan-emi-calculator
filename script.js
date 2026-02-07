const loanAmount = document.getElementById("loanAmount");
const interestRate = document.getElementById("interestRate");
const tenure = document.getElementById("tenure");

const loanVal = document.getElementById("loanVal");
const rateVal = document.getElementById("rateVal");
const tenureVal = document.getElementById("tenureVal");

const emiValue = document.getElementById("emiValue");
const amortization = document.getElementById("amortization");

let chart;

function calculateEMI() {
  const P = +loanAmount.value;
  const annualRate = +interestRate.value;
  const years = +tenure.value;

  loanVal.textContent = P.toLocaleString();
  rateVal.textContent = annualRate;
  tenureVal.textContent = years;

  const r = annualRate / 12 / 100;
  const n = years * 12;

  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  emiValue.textContent = emi.toFixed(2);

  let balance = P;
  let totalInterest = 0;
  amortization.innerHTML = "";

  for (let i = 1; i <= n; i++) {
    const interest = balance * r;
    const principal = emi - interest;
    balance -= principal;
    totalInterest += interest;

    amortization.innerHTML += `
      <tr>
        <td>${i}</td>
        <td>${principal.toFixed(2)}</td>
        <td>${interest.toFixed(2)}</td>
        <td>${Math.max(balance,0).toFixed(2)}</td>
      </tr>
    `;
  }

  updateChart(P, totalInterest);
}

function updateChart(principal, interest) {
  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
      labels: ["Principal", "Interest"],
      datasets: [{
        data: [principal, interest],
        backgroundColor: ["#4CAF50", "#FF7043"]
      }]
    }
  });
}

document.querySelectorAll("input").forEach(input =>
  input.addEventListener("input", calculateEMI)
);

calculateEMI();
