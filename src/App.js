
import React, { useState } from "react"
import { Pie } from "react-chartjs-2"
import { Chart, ArcElement, Tooltip, Legend } from "chart.js"

Chart.register(ArcElement, Tooltip, Legend)

export default function App() {
  const [homePrice, setHomePrice] = useState(425000)
  const [downPayment, setDownPayment] = useState(85000)
  const [interestRate, setInterestRate] = useState(5)
  const [loanTerm, setLoanTerm] = useState(30)
  const [tax, setTax] = useState(280)
  const [insurance, setInsurance] = useState(66)

  const loanAmount = homePrice - downPayment
  const monthlyRate = interestRate / 100 / 12
  const totalPayments = loanTerm * 12

  const monthlyPI =
    (loanAmount * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -totalPayments))
  const monthlyTotal = monthlyPI + tax + insurance

  const data = {
    labels: ["Principal & Interest", "Property Tax", "Insurance"],
    datasets: [
      {
        data: [monthlyPI, tax, insurance],
        backgroundColor: ["#0070F3", "#7ED957", "#A259FF"],
        borderWidth: 0,
      },
    ],
  }

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: 14,
    fontFamily: "Manrope, sans-serif",
    marginBottom: 16,
    boxSizing: "border-box",
  }

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "0 auto",
        padding: 24,
      }}
    >
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>
        Mortgage Calculator
      </h2>

      <label>Home Price ($)</label>
      <input
        type="number"
        style={inputStyle}
        value={homePrice}
        onChange={(e) => setHomePrice(Number(e.target.value))}
      />

      <label>Down Payment ($)</label>
      <input
        type="number"
        style={inputStyle}
        value={downPayment}
        onChange={(e) => setDownPayment(Number(e.target.value))}
      />

      <label>Interest Rate (%)</label>
      <input
        type="number"
        style={inputStyle}
        value={interestRate}
        step="0.01"
        onChange={(e) => setInterestRate(Number(e.target.value))}
      />

      <label>Loan Term (Years)</label>
      <input
        type="number"
        style={inputStyle}
        value={loanTerm}
        onChange={(e) => setLoanTerm(Number(e.target.value))}
      />

      <label>Property Tax ($/mo)</label>
      <input
        type="number"
        style={inputStyle}
        value={tax}
        onChange={(e) => setTax(Number(e.target.value))}
      />

      <label>Insurance ($/mo)</label>
      <input
        type="number"
        style={inputStyle}
        value={insurance}
        onChange={(e) => setInsurance(Number(e.target.value))}
      />

      <div
        style={{
          marginTop: 24,
          padding: 16,
          backgroundColor: "#0070F3",
          borderRadius: 8,
          fontWeight: 700,
          fontSize: 18,
          textAlign: "center",
          color: "#fff",
        }}
      >
        Monthly Payment: ${monthlyTotal.toFixed(0)}/mo
      </div>

      <div style={{ marginTop: 32 }}>
        <Pie data={data} />
      </div>
    </div>
  )
}
