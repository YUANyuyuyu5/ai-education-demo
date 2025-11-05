const API_BASE_URL = " https://darcie-unvitreous-posthypnotically.ngrok-free.dev";

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
        // 先显示友好提示
        resultDiv.innerHTML = "AI助手正在启动,请耐心等待1-2分钟...";
        
        const response = await fetch(`${API_BASE_URL}/ask`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question,
                max_length: 300
            })
        });
        
        // 友好处理模型加载中的状态
        if (response.status === 503) {
            resultDiv.innerHTML = "模型加载即将完成，请稍等片刻后重试...";
            return;
        }
        
        if (!response.ok) {
            throw new Error(`网络错误: ${response.status}`);
        }
        
        // 正常返回AI答案
        const data = await response.json();
        resultDiv.innerHTML = data.answer;
        
    } catch (error) {
        console.error("API调用错误:", error);
        resultDiv.innerHTML = "AI服务暂时不稳定,请刷新页面重试";
    }
}

// 预习功能函数
async function generatePreview() {
    const input = document.getElementById('preview-input').value;
    const resultDiv = document.getElementById('preview-result');
    
    if (!input) {
        resultDiv.innerHTML = "请输入预习内容";
        return;
    }
    
    await callAIAPI(`请为以下医用物理学概念提供预习指导: ${input}`, resultDiv);
}

// 课堂笔记功能函数
async function generateNote() {
    const input = document.getElementById('note-input').value;
    const resultDiv = document.getElementById('note-result');
    
    if (!input) {
        resultDiv.innerHTML = "请输入课堂内容";
        return;
    }
    
    await callAIAPI(`请将以下课堂内容整理成结构化笔记: ${input}`, resultDiv);
}

// 错题复习功能函数
async function generateReview() {
    const input = document.getElementById('review-input').value;
    const resultDiv = document.getElementById('review-result');
    
    if (!input) {
        resultDiv.innerHTML = "请输入错题内容";
        return;
    }
    
    await callAIAPI(`请分析以下错题并提供解答: ${input}`, resultDiv);
}
