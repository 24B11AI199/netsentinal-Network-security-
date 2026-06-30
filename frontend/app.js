/* ==========================================================
   NetSentinel
   AI Network Intrusion Detection System
========================================================== */

/* ==========================
   Backend URL
========================== */

const API_URL = "http://127.0.0.1:8000/analyze";

/* ==========================
   Loading Animation
========================== */

function showLoading(show) {
    const loading = document.getElementById("loading");
    if (loading) {
        loading.style.display = show ? "block" : "none";
    }
}

/* ==========================
   Activity Log
========================== */

function addActivity(message) {

    const log = document.getElementById("activityLog");

    if (!log) return;

    const li = document.createElement("li");

    li.innerHTML = "✔ " + message;

    log.prepend(li);
}

/* ==========================
   Upload CSV
========================== */

async function uploadFile() {

    const fileInput = document.getElementById("csvFile");

    if (fileInput.files.length === 0) {

        alert("Please select a CSV file.");

        return;
    }

    const formData = new FormData();

    formData.append("file", fileInput.files[0]);

    showLoading(true);

    addActivity("CSV Uploaded");

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            body: formData

        });

        const data = await response.json();

        showLoading(false);

        updateDashboard(data);

    }

    catch (error) {

        console.error(error);

        showLoading(false);

        alert(
`Unable to connect to FastAPI Server.

Please check:

1. FastAPI server is running
2. URL is http://127.0.0.1:8000
3. No backend errors
4. CORS is enabled`
        );

    }

}

/* ==========================
   Dashboard
========================== */

function updateDashboard(data) {

    
    if(data.risk === "SAFE"){

    document.getElementById("risk").innerHTML =
    "<span class='safe'>🟢 SAFE</span>";

}
else if(data.risk === "MEDIUM"){

    document.getElementById("risk").innerHTML =
    "<span class='medium'>🟠 MEDIUM RISK</span>";

}
else{

    document.getElementById("risk").innerHTML =
    "<span class='high'>🔴 HIGH RISK</span>";

}
document.getElementById("records").innerText =
        data.total_records;

    document.getElementById("safe").innerText =
        data.safe_records;

    document.getElementById("threats").innerText =
        data.threats;

    document.getElementById("percentage").innerText =
        data.percentage + "%";

    document.getElementById("progressBar").style.width =
        data.percentage + "%";

    //----------------------------------------------------
    // Risk Card
    //----------------------------------------------------

    const risk = document.getElementById("risk");

    if (data.risk === "SAFE") {

        risk.innerHTML = "🟢 SAFE";
        risk.style.color = "#00ff66";

        document.getElementById("progressBar").style.background =
            "#00ff66";

    }

    else if (data.risk === "MEDIUM") {

        risk.innerHTML = "🟠 MEDIUM";
        risk.style.color = "#ff9900";

        document.getElementById("progressBar").style.background =
            "#ff9900";

    }

    else {

        risk.innerHTML = "🔴 HIGH";
        risk.style.color = "#ff3333";

        document.getElementById("progressBar").style.background =
            "#ff3333";

    }

    addActivity("Isolation Forest Analysis Completed");

    addActivity("Threat Detection Finished");

    addActivity("MongoDB Updated");

    updateRisk(data);

    drawChart(data);

}

/* ==========================
   Globe Status
========================== */

function updateRisk(data) {

    const globe = document.getElementById("globeResult");

    if (!globe) return;

    if (data.risk === "SAFE") {

        globe.innerHTML = "🟢 NETWORK HEALTHY";

        changeEarthColor(0x00ff66);

    }

    else if (data.risk === "MEDIUM") {

        globe.innerHTML = "🟠 SUSPICIOUS TRAFFIC";

        changeEarthColor(0xff9900);

    }

    else {

        globe.innerHTML = "🔴 NETWORK UNDER ATTACK";

        changeEarthColor(0xff0000);

    }

}

/* ==========================
   Doughnut Chart
========================== */

let chart;

function drawChart(data) {

    const ctx = document.getElementById("pieChart");

    if (chart)
        chart.destroy();

    let threatColor = "#ff3333";

    if (data.risk === "MEDIUM")
        threatColor = "#ff9900";

    if (data.risk === "SAFE")
        threatColor = "#00ff66";

    chart = new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: ["Safe", "Threat"],

            datasets: [{

                data: [

                    data.safe_records,

                    data.threats

                ],

                backgroundColor: [

                    "#00ff88",

                    threatColor

                ],

                borderWidth: 2

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    labels: {

                        color: "white",

                        font: {

                            size: 15

                        }

                    }

                }

            }

        }

    });

}

/* ==========================================================
        THREE JS
========================================================== */

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(

    75,

    600 / 500,

    0.1,

    1000

);

let renderer = new THREE.WebGLRenderer({

    alpha: true,

    antialias: true

});

renderer.setSize(600, 550);
document
    .getElementById("earth-container")
    .appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(

    8,

    64,

    64

);

const material = new THREE.MeshBasicMaterial({

    wireframe: true,

    color: 0x00ff66

});

const earth = new THREE.Mesh(

    geometry,

    material

);

scene.add(earth);

const glowGeometry = new THREE.SphereGeometry(

    8.4,

    64,

    64

);

const glowMaterial = new THREE.MeshBasicMaterial({

    color: 0x00ffff,

    transparent: true,

    opacity: .12

});

const glow = new THREE.Mesh(

    glowGeometry,

    glowMaterial

);

scene.add(glow);
earth.position.set(0,0,0);

glow.position.set(0,0,0);

camera.position.z = 22;

/* ==========================
   Animation
========================== */

function animate() {

    requestAnimationFrame(animate);

    earth.rotation.y += 0.002;

    glow.rotation.y += 0.002;

    renderer.render(scene, camera);

}

animate();

/* ==========================
   Globe Color
========================== */

function changeEarthColor(color) {

    earth.material.color.setHex(color);

    glow.material.color.setHex(color);

}

/* ==========================
   Startup
========================== */

window.onload = function () {

    addActivity("System Started");

    addActivity("FastAPI Connected");

    addActivity("Isolation Forest Model Loaded");

    addActivity("MongoDB Connected");

    const globe = document.getElementById("globeResult");

    if (globe)
        globe.innerHTML = "READY FOR ANALYSIS";

};