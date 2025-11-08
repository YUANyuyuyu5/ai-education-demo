// 恢复为调用真实API的代码
const API_BASE_URL = "https://您的ngrok地址.ngrok-free.app"; // 需要更新为实际地址

// 恢复真实的API调用函数
async function callAIAPI(question, resultDiv, type = 'preview') {
    try {
        resultDiv.innerHTML = "AI正在思考中...";
        
        const response = await fetch(`${API_BASE_URL}/ask`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question,
                max_length: 500
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        resultDiv.innerHTML = data.answer;
        
    } catch (error) {
        console.error("API调用错误:", error);
        resultDiv.innerHTML = "抱歉，AI服务暂时不可用，请稍后重试";
    }
}

// 恢复各功能函数
async function generatePreview() {
    const input = document.getElementById('preview-input').value;
    const resultDiv = document.getElementById('preview-result');
    await callAIAPI(input, resultDiv, 'preview');
}

async function generateNote() {
    const input = document.getElementById('note-input').value;
    const resultDiv = document.getElementById('note-result');
    await callAIAPI(input, resultDiv, 'note');
}

async function generateReview() {
    const input = document.getElementById('review-input').value;
    const resultDiv = document.getElementById('review-result');
    await callAIAPI(input, resultDiv, 'review');
}
