
import React, { useState } from "react"
import { Pie } from "react-chartjs-2"
import { Chart, ArcElement, Tooltip, Legend } from "chart.js"

Chart.register(ArcElement, Tooltip, Legend)

export default function App() {
  const parseInput = (val) => {
    const clean = val.replace(/\./g, '').replace(',', '.')
    return parseFloat(clean) || 0
  }

  const [homePrice, setHomePrice] = useState("")
  const [downPayment, setDownPayment] = useState("")
  const [interestRate, setInterestRate] = useState("")
  const [loanTerm, setLoanTerm] = useState("")
  const [tax, setTax] = useState("")
  const [insurance, setInsurance] = useState("")

  const loanAmount = parseInput(homePrice) - parseInput(downPayment)
  const monthlyRate = parseInput(interestRate) / 100 / 12
  const totalPayments = parseInput(loanTerm) * 12

  const monthlyPI =
    loanAmount > 0 && monthlyRate > 0 && totalPayments > 0
      ? (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalPayments))
      : 0

  const monthlyTotal = monthlyPI + parseInput(tax) + parseInput(insurance)

  const data = {
    labels: ["Principal & Interest", "Property Tax", "Insurance"],
    datasets: [
      {
        data: [monthlyPI, parseInput(tax), parseInput(insurance)],
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
        maxWidth: 1100,
        margin: "0 auto",
        padding: 24,
        fontFamily: "Manrope, sans-serif",
      }}
    >
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>
        Mortgage Calculator
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 40,
          alignItems: "flex-start",
        }}
      >
        {/* Left Column – Form */}
        <div style={{ flex: "1 1 320px", minWidth: 280 }}>
          <label>Home Price ($)</label>
          <input
            type="text"
            style={inputStyle}
            value={homePrice}
            onChange={(e) => setHomePrice(e.target.value)}
          />

          <label>Down Payment ($)</label>
          <input
            type="text"
            style={inputStyle}
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
          />

          <label>Interest Rate (%)</label>
          <input
            type="text"
            style={inputStyle}
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />

          <label>Loan Term (Years)</label>
          <input
            type="text"
            style={inputStyle}
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
          />

          <label>Property Tax ($/mo)</label>
          <input
            type="text"
            style={inputStyle}
            value={tax}
            onChange={(e) => setTax(e.target.value)}
          />

          <label>Insurance ($/mo)</label>
          <input
            type="text"
            style={inputStyle}
            value={insurance}
            onChange={(e) => setInsurance(e.target.value)}
          />
        </div>

        {/* Right Column – Card with Header (blue) and Body (white) */}
        <div
          style={{
            flex: "1 1 400px",
            minWidth: 300,
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid #E5E7EB",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header – Blue */}
          <div
            style={{
              backgroundColor: "#0070F3",
              padding: "24px 16px",
              color: "#fff",
              textAlign: "center",
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            Monthly Payment
            <div style={{ fontSize: 32, marginTop: 8 }}>
              ${monthlyTotal.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>

          {/* Body – White with chart */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "24px 16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ width: 220 }}>
              <Pie data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
