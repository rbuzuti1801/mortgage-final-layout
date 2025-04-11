
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
        </div>

        {/* Right Column – Card with Header (blue) and Body (white) */}
        <div
          style={{
            flex: "1 1 400px",
            minWidth: 300,
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #E5E7EB",
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
              ${monthlyTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
