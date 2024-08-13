// 解析响应体
let body = $response.body;
let obj = JSON.parse(body);

// 检查并提取'reference'字段
if (obj.reference) {
    let reference = obj.reference;

    // 发送通知
    $notify("Reference Extracted", "Reference: ", reference);
}

// 放行流量
$done({body});
