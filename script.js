const API_BASE_URL = "https://darcie-unvitreous-posthypnoticall.ngrok-free.app";
// 切换页面显示
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId + '-page').classList.add('active');
}

// 通用的API调用函数
async function callAIAPI(question, resultDiv) {
    try {
        resultDiv.innerHTML = "🧠 AI正在思考，请稍候...";
        
        // 使用 await 直接等待 fetch 完成，不需要 do...while
        const response = await fetch(`${API_BASE_URL}/ask`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                question: question,
                max_length: 300
            })
        });
        
        if (!response.ok) {
            throw new Error(`网络错误: ${response.status}`);
        }
        
        // 修正：冒号改为等号
        const data = await response.json();
        resultDiv.innerHTML = data.answer;
        
    } catch (error) {
        console.error("API调用错误:", error);
        resultDiv.innerHTML = `⚠️ 抱歉,AI服务暂时不可用。错误信息: ${error.message}`;
    }
    
    // 删除多余的 return resultDiv; 因为这不是必要的
}
// 修改后的函数 - 智能预习
async function generatePreview() {
    const input = document.getElementById('preview-input').value;
    const resultDiv = document.getElementById('preview-result');
    await callAIAPI(`请为以下医用物理学概念提供预习指导：${input}`, resultDiv);
}

// 修改后的函数 - 课堂笔记  
async function generateNote() {
    const input = document.getElementById('note-input').value;
    const resultDiv = document.getElementById('note-result');
    await callAIAPI(`请将以下课堂内容整理成结构化笔记：${input}`, resultDiv);
}

// 修改后的函数 - 错题复习
async function generateReview() {
    const input = document.getElementById('review-input').value;
    const resultDiv = document.getElementById('review-result');
    await callAIAPI(`请分析以下错题并提供解答：${input}`, resultDiv);
}
