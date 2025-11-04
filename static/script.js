document.getElementById("uploadBtn").onclick = async () => {
  const files = document.getElementById("fileInput").files;
  const formData = new FormData();
  for (let file of files) formData.append("files", file);
  const res = await fetch("/upload", { method: "POST", body: formData });
  const data = await res.json();
  if (data.converted) loadConverted();
};

async function loadConverted() {
  const res = await fetch("/converted");
  const files = await res.json();
  const container = document.getElementById("convertedList");
  const combineList = document.getElementById("combineList");
  container.innerHTML = combineList.innerHTML = "";
  files.forEach(f => {
    const item = document.createElement("div");
    item.innerHTML = `<a href="/download/converted/${f}" target="_blank">${f}</a>`;
    container.appendChild(item);
    const chk = document.createElement("input");
    chk.type = "checkbox"; chk.value = f;
    combineList.appendChild(chk);
    combineList.appendChild(document.createTextNode(" " + f));
    combineList.appendChild(document.createElement("br"));
  });
}

document.getElementById("combineBtn").onclick = async () => {
  const checked = [...document.querySelectorAll('#combineList input:checked')].map(e => e.value);
  if (!checked.length) return alert("Select files to combine!");
  const res = await fetch("/combine", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ files: checked })
  });
  const data = await res.json();
  document.getElementById("downloadLink").innerHTML =
    `<a href="/download/combined/${data.combined}" target="_blank">Download Combined File</a>`;
};

document.getElementById("qrBtn").onclick = async () => {
  const text = document.getElementById("qrText").value;
  const res = await fetch("/generate_qr", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  const data = await res.json();
  document.getElementById("qrResult").innerHTML = `<img src="${data.qr_path}" width="120">`;
};

window.onload = loadConverted;




















