let body = $response.body;
let obj = JSON.parse(body);

if (obj.reference) {
    $notify("Reference Captured", "Reference:", obj.reference);
}

$done({body});
