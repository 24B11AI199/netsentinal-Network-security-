NetSentinel: AI-Powered Network Intrusion Detection System
**Project Report:**
**Abstract**
NetSentinel is an AI-powered network intrusion detection system that detects anomalous network traffic using the Isolation Forest machine learning algorithm. The system provides a FastAPI backend, MongoDB storage, and an interactive HTML/CSS/JavaScript dashboard.
**Introduction**
Cyberattacks continue to increase in frequency and sophistication. Traditional signature-based IDS cannot detect unknown attacks effectively. This project applies anomaly detection to identify suspicious traffic.
**Problem Statement**
Develop a web-based intrusion detection system capable of analyzing uploaded CSV network traffic datasets, detecting anomalies, storing detected threats, and presenting results visually.
**Objectives**
• Detect anomalous packets using Isolation Forest.
• Store detected threats in MongoDB.
• Display analytics on an interactive dashboard.
• Provide an easy-to-use web interface.
**System Requirements**
Hardware: 8 GB RAM, Intel i5 or equivalent.
Software: Windows 10/11, Python 3.13, VS Code, MongoDB Compass, FastAPI, scikit-learn, pandas, Chart.js, Three.js.
**Technology Stack**
Frontend: HTML, CSS, JavaScript
Backend: FastAPI
Database: MongoDB
Machine Learning: Isolation Forest
Libraries: pandas, joblib, scikit-learn
**System Architecture**
CSV Dataset -> FastAPI Backend -> Isolation Forest Model -> Threat Detection -> MongoDB -> Dashboard
**Methodology**
The uploaded CSV is parsed by FastAPI. Selected numerical features are passed to the trained Isolation Forest model. Predictions labelled -1 are treated as threats, stored in MongoDB, and summarized for the frontend.
**Implementation**
Frontend includes file upload, threat summary, risk indicator, globe visualization, activity log, and pie chart. Backend exposes /analyze endpoint. MongoDB stores detected alerts.
**Working**
1. User uploads CSV.
2. Backend reads dataset.
3. Isolation Forest predicts anomalies.
4. Threats stored in MongoDB.
5. Dashboard displays total packets, threats, safe packets, percentage, and risk level.
**Results**
The prototype successfully classifies uploaded traffic into safe and anomalous packets, updates dashboard statistics, and visualizes threat distribution.
**Advantages**
Fast anomaly detection, lightweight deployment, interactive visualization, extensible architecture.
**Limitations**
Uses offline CSV datasets; real-time packet capture is not implemented.
**Future Scope**
Integrate live packet sniffing, deep learning models, SIEM integration, email alerts, and cloud deployment.
**Conclusion**
NetSentinel demonstrates the practical use of AI for network intrusion detection by combining Isolation Forest, FastAPI, MongoDB, and a modern web dashboard.
**References**
1. Scikit-learn Documentation
2. FastAPI Documentation
3. MongoDB Documentation
4. OWASP
5. NIST Cybersecurity Framework
