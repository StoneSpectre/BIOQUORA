import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// The 3 ML endpoints
const MODULES = [
  { id: "hepatic", name: "Hepatic (Liver)", color: "#1DB891" },
  { id: "respiratory", name: "Respiratory", color: "#3B82F6" },
  { id: "endocrine/diabetes", name: "Endocrine (Diabetes)", color: "#F59E0B" },
  { id: "endocrine/thyroid", name: "Endocrine (Thyroid)", color: "#D4A843" },
  { id: "cardiovascular", name: "Cardiovascular", color: "#EF4444" },
  { id: "renal", name: "Renal", color: "#8B5CF6" },
  { id: "immunology", name: "Immunology", color: "#10B981" },
];

export default function DiagnosticDashboard() {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState(MODULES[0]);
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Set the document title dynamically
  useEffect(() => {
    document.title = "Diagnostic Intelligence | BIOQUORA";
  }, []);

  // Fetch fields when module changes
  useEffect(() => {
    // MOCK FIELDS FOR DEMONSTRATION
    setTimeout(() => {
      const mockFields = [
        { key: "age", label: "Patient Age", type: "number", min: 1, max: 120, step: 1, unit: "years", required: true },
        { key: "bmi", label: "BMI", type: "number", min: 10, max: 60, step: 0.1, normal: "18.5-24.9", required: true },
        { key: "blood_pressure_sys", label: "Systolic BP", type: "number", min: 70, max: 250, step: 1, normal: "<120", unit: "mmHg", required: true },
        { key: "blood_pressure_dia", label: "Diastolic BP", type: "number", min: 40, max: 150, step: 1, normal: "<80", unit: "mmHg", required: true },
        { key: "glucose", label: "Fasting Glucose", type: "number", min: 40, max: 400, step: 1, normal: "70-99", unit: "mg/dL", required: true },
        { key: "cholesterol", label: "Total Cholesterol", type: "number", min: 50, max: 500, step: 1, normal: "<200", unit: "mg/dL", required: true },
      ];
      setFields(mockFields);
      const initial = {};
      mockFields.forEach((f) => {
        initial[f.key] = f.min || 0;
      });
      setFormData(initial);
      setResult(null);
      setError(null);
    }, 500);
  }, [activeModule]);

  const handleChange = (k, v) => setFormData({ ...formData, [k]: Number(v) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // MOCK PREDICTION FOR DEMONSTRATION
      await new Promise(resolve => setTimeout(resolve, 1500));
      const r_score = Math.random() * 0.7 + 0.1;
      const isHighRisk = r_score > 0.5;
      const data = {
        risk_score: r_score,
        risk_percent: (r_score * 100).toFixed(1),
        diagnosis: isHighRisk ? `Elevated Risk for ${activeModule.name} Complications` : `Normal ${activeModule.name} Profile`,
        summary: isHighRisk ? "Patient parameters indicate significant deviation from baseline norms. Immediate clinical correlation required." : "Patient parameters are generally within normal physiological limits.",
        clinical_indices: {
          "Metabolic Stress Index": (Math.random() * 5).toFixed(2),
          "Systemic Inflammation": isHighRisk ? "High" : "Low",
          "Organ Perfusion": isHighRisk ? "Marginal" : "Adequate"
        },
        anomalies: isHighRisk ? ["Blood pressure exceeds normal thresholds", "Elevated lipid panel detected"] : [],
        top_factors: [
          { display_name: "Systolic BP", shap_value: (Math.random() * 0.4) * (isHighRisk ? 1 : -1) },
          { display_name: "Patient Age", shap_value: (Math.random() * 0.3) * (isHighRisk ? 1 : -1) },
          { display_name: "BMI", shap_value: (Math.random() * 0.2) * (isHighRisk ? 1 : -1) }
        ]
      };
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0D0F12", color: "#E8EAF0", fontFamily: "Inter, sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative" }}>
        
        {/* Exit Button */}
        <button 
          onClick={() => navigate('/')}
          style={{ position: "absolute", top: 0, left: 0, padding: "8px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#8A8FA8", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", transition: "all 0.2s" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#8A8FA8"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
        >
          <span>←</span> Exit to Home
        </button>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px", animation: "fadeIn 1s ease-out" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "10px", background: `linear-gradient(90deg, ${activeModule.color}, #ffffff)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Diagnostic Intelligence
          </h1>
          <p style={{ color: "#8A8FA8", fontSize: "1.1rem" }}>Multi-Organ Machine Learning Analysis powered by XGBoost & SHAP</p>
        </div>

        {/* Module Selector */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center", marginBottom: "40px" }}>
          {MODULES.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveModule(m)}
              style={{
                padding: "12px 24px", borderRadius: "30px", border: `1px solid ${activeModule.id === m.id ? m.color : "#252A35"}`,
                backgroundColor: activeModule.id === m.id ? `${m.color}20` : "#161A20",
                color: activeModule.id === m.id ? m.color : "#8A8FA8",
                fontWeight: 600, cursor: "pointer", transition: "all 0.3s ease",
                boxShadow: activeModule.id === m.id ? `0 0 20px ${m.color}30` : "none"
              }}
            >
              {m.name} Analysis
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
          {/* Form Section */}
          <div style={{ background: "#161A20", padding: "30px", borderRadius: "16px", border: "1px solid #252A35", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "20px", color: activeModule.color, display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: activeModule.color, boxShadow: `0 0 10px ${activeModule.color}` }}></span>
              Patient Biomarkers
            </h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {fields.map((f) => (
                <div key={f.key} style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <label style={{ fontSize: "0.85rem", color: "#8A8FA8", textTransform: "uppercase", letterSpacing: "0.05em", display: "flex", justifyContent: "space-between" }}>
                    <span>{f.label}</span>
                    <span style={{ color: "#4A5068" }}>{f.normal ? `Normal: ${f.normal}` : ""} {f.unit}</span>
                  </label>
                  {f.type === "select" ? (
                    <select
                      value={formData[f.key]}
                      onChange={(e) => handleChange(f.key, e.target.value)}
                      style={{ padding: "10px 14px", borderRadius: "8px", background: "#0D0F12", border: "1px solid #252A35", color: "#fff", outline: "none" }}
                    >
                      {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  ) : (
                    <input
                      type="number" step={f.step || "any"} min={f.min} max={f.max} required={f.required}
                      value={formData[f.key] ?? ""}
                      onChange={(e) => handleChange(f.key, e.target.value)}
                      style={{ padding: "10px 14px", borderRadius: "8px", background: "#0D0F12", border: "1px solid #252A35", color: "#fff", outline: "none", fontFamily: "JetBrains Mono, monospace" }}
                    />
                  )}
                </div>
              ))}
              <button type="submit" disabled={loading} style={{ marginTop: "10px", padding: "14px", borderRadius: "8px", border: "none", background: `linear-gradient(135deg, ${activeModule.color}, ${activeModule.color}aa)`, color: "#fff", fontWeight: 600, fontSize: "1rem", cursor: loading ? "wait" : "pointer", transition: "transform 0.2s", transform: loading ? "scale(0.98)" : "scale(1)" }}>
                {loading ? "Analyzing Models..." : `Run ${activeModule.name} Diagnostics`}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div style={{ background: "#161A20", padding: "30px", borderRadius: "16px", border: "1px solid #252A35", display: "flex", flexDirection: "column", gap: "20px" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#fff" }}>AI Assessment Results</h2>
            
            {!result && !error && !loading && (
              <div style={{ flex: 1, display: "flex", alignItems: "center", border: "1px dashed #252A35", borderRadius: "12px", justifyContent: "center", color: "#4A5068" }}>
                Enter patient biomarkers to generate AI inference.
              </div>
            )}

            {error && (
              <div style={{ background: "rgba(224, 92, 92, 0.1)", border: "1px solid #E05C5C", padding: "15px", borderRadius: "8px", color: "#E05C5C" }}>
                <strong>Error:</strong> {error}
              </div>
            )}

            {result && (
              <div style={{ animation: "fadeIn 0.5s ease-out", display: "flex", flexDirection: "column", gap: "20px" }}>
                
                {/* Risk Score */}
                <div style={{ background: "#0D0F12", padding: "20px", borderRadius: "12px", border: "1px solid #252A35", textAlign: "center" }}>
                  <div style={{ fontSize: "0.9rem", color: "#8A8FA8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Risk Probability</div>
                  <div style={{ fontSize: "3rem", fontWeight: 700, color: result.risk_score > 0.5 ? "#E05C5C" : activeModule.color, fontFamily: "JetBrains Mono, monospace" }}>
                    {result.risk_percent}%
                  </div>
                  <div style={{ fontSize: "1.2rem", color: result.risk_score > 0.5 ? "#E05C5C" : activeModule.color, marginTop: "5px", fontWeight: 600 }}>
                    {result.diagnosis}
                  </div>
                  {result.summary && (
                    <div style={{ fontSize: "0.9rem", color: "#8A8FA8", marginTop: "10px" }}>
                      {result.summary}
                    </div>
                  )}
                </div>

                {/* Engineered Indices Panel */}
                {result.clinical_indices && Object.keys(result.clinical_indices).length > 0 && (
                  <div style={{ background: "rgba(59, 130, 246, 0.05)", border: "1px solid rgba(59, 130, 246, 0.2)", padding: "15px", borderRadius: "12px" }}>
                    <div style={{ color: "#3B82F6", fontWeight: 600, marginBottom: "10px", fontSize: "0.9rem", textTransform: "uppercase" }}>Engineered Clinical Indices</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      {Object.entries(result.clinical_indices).map(([key, val]) => (
                        <div key={key} style={{ display: "flex", justifyContent: "space-between", background: "#0D0F12", padding: "10px", borderRadius: "8px", border: "1px solid #252A35" }}>
                          <span style={{ color: "#8A8FA8", fontSize: "0.85rem" }}>{key}</span>
                          <span style={{ color: "#E8EAF0", fontFamily: "JetBrains Mono, monospace", fontWeight: 600, fontSize: "0.9rem" }}>{val as any}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Anomalies */}
                {result.anomalies?.length > 0 && (
                  <div style={{ background: "rgba(212, 168, 67, 0.1)", border: "1px solid #D4A843", padding: "15px", borderRadius: "12px" }}>
                    <div style={{ color: "#D4A843", fontWeight: 600, marginBottom: "10px", fontSize: "0.9rem", textTransform: "uppercase" }}>⚠️ Detected Anomalies</div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                      {result.anomalies.map((a, i) => (
                        <li key={i} style={{ color: "#E8EAF0", fontSize: "0.9rem", display: "flex", gap: "8px" }}>
                          <span style={{ color: "#D4A843" }}>•</span> {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* SHAP Explanation */}
                {result.top_factors && (
                  <div>
                    <div style={{ fontSize: "0.9rem", color: "#8A8FA8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "15px" }}>Feature Importance (SHAP)</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {result.top_factors.map((f, i) => {
                        const isPositive = f.shap_value > 0;
                        const width = Math.min(Math.abs(f.shap_value) * 20, 100);
                        return (
                          <div key={i} style={{ display: "grid", gridTemplateColumns: "150px 1fr 60px", alignItems: "center", gap: "10px", fontSize: "0.85rem", fontFamily: "JetBrains Mono, monospace" }}>
                            <div style={{ color: "#8A8FA8", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }} title={f.display_name}>{f.display_name}</div>
                            <div style={{ height: "6px", background: "#0D0F12", borderRadius: "3px", position: "relative" }}>
                              <div style={{ position: "absolute", top: 0, bottom: 0, left: isPositive ? "50%" : `calc(50% - ${width / 2}%)`, width: `${width / 2}%`, background: isPositive ? "#E05C5C" : activeModule.color, borderRadius: "3px" }}></div>
                              <div style={{ position: "absolute", left: "50%", top: "-2px", bottom: "-2px", width: "1px", background: "#4A5068" }}></div>
                            </div>
                            <div style={{ color: isPositive ? "#E05C5C" : activeModule.color, textAlign: "right" }}>{f.shap_value > 0 ? "+" : ""}{f.shap_value.toFixed(2)}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>
        </div>

      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
