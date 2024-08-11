const body = $response.body; // 获取响应体
try {
    const obj = JSON.parse(body); // 将响应体解析为JSON对象
    // 检查JSON对象中是否存在reference键和provider是否为"SMILE_ID"
    if (obj.reference && obj.provider === "SMILE_ID") {
        sendEmailLink(obj.reference);
    } else {
        $done({ body }); // 如果不符合条件，返回原始响应体
    }
} catch (e) {
    // 如果解析JSON失败，返回原始响应体
    console.log("解析错误: ", e);
    $done({ body });
}

function sendEmailLink(reference) {
    const emailBody = `Reference: ${reference}`;
    const emailLink = `mailto:your_email@example.com?subject=Reference&body=${encodeURIComponent(emailBody)}`;
    $notify("发送邮件链接", "", emailLink);
    $done();
}
