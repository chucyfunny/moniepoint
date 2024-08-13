let body = $response.body;
let obj = JSON.parse(body);
if (obj.reference) {
let reference = obj.reference;
        // 发送通知
    $notify("Reference Extracted", "Reference: ", reference);
}

$done({});
