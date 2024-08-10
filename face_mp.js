// 第一步：获取新的图片数据
const fetchNewImages = () => {
    const url = "https://mpfacetxt.myngn.top/getChipperContent.php";

    const request = {
        url: url,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "request_start": true
        })
    };

    return $task.fetch(request).then(response => {
        if (response.statusCode === 200) {
            let response_data = JSON.parse(response.body);
            return JSON.parse(response_data.file_content); // 假设返回的数据是NewImages的JSON字符串
        } else {
            console.log(`请求失败，HTTP 状态码：${response.statusCode}`);
            return null;
        }
    }, reason => {
        console.log("请求失败，错误信息如下：");
        console.log(reason.error);
        return null;
    });
};

// 第二步：拦截请求并替换 images 数据
const interceptRequest = (newImages) => {
    let body = $request.body;
    let bodyObj = JSON.parse(body);

    if (newImages) {
        // 替换 images 字段
        if (bodyObj.images) {
            bodyObj.images = newImages;
        }
    } else {
        console.log("No newImages data found.");
    }

    // 将修改后的 JSON 对象转回字符串
    body = JSON.stringify(bodyObj);

    // 返回修改后的请求体
    $done({ body });
};

// 执行流程
fetchNewImages().then(newImages => {
    // 拦截并修改 images 请求
    interceptRequest(newImages);
});
