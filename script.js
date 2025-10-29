<<<<<<< HEAD
const API_BASE_URL = " https://darcie-unvitreous-posthypnotically.ngrok-free.dev";

// 切换页面显示
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId + '-page').classList.add('active'); // 修复：移除多余的)
}

// 通用的API调用函数
async function callAIAPI(question, resultDiv) {
    try {
        // 先显示友好提示
        resultDiv.innerHTML = "AI助手正在启动，请耐心等待1-2分钟...";
        
        const response = await fetch(`${API_BASE_URL}/ask`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({question: question, max_length: 300})
        });

        // 友好处理模型加载中的状态
        if (response.status === 503) {
            resultDiv.innerHTML = "模型加载即将完成，请稍等片刻后重试...";
            return;
        }
        
        if (!response.ok) {
            throw new Error(`网络错误：${response.status}`);
        }
        
        // 正常返回AI答案
        const data = await response.json();
        resultDiv.innerHTML = data.answer;
        
    } catch (error) {
        resultDiv.innerHTML = "⚠️服务暂时不稳定，请刷新页面重试";
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
    
    // 直接调用通用API函数
    await callAIAPI(`请为以下医用物理学概念提供预习指导：${input}`, resultDiv);
}

// 课堂笔记功能函数
async function generateNote() {
    const input = document.getElementById('note-input').value;
    const resultDiv = document.getElementById('note-result');
    
    if (!input) {
        resultDiv.innerHTML = "请输入课堂内容";
        return;
    }
    
    await callAIAPI(`请将以下课堂内容整理成结构化笔记：${input}`, resultDiv);
}

// 错题复习功能函数
async function generateReview() {
    const input = document.getElementById('review-input').value;
    const resultDiv = document.getElementById('review-result');
    
    if (!input) {
        resultDiv.innerHTML = "请输入错题内容";
        return;
    }
    
    await callAIAPI(`请分析以下错题并提供解答：${input}`, resultDiv);
}
=======
const API_BASE_URL = "https://darcie-unvitreous-posthypnotically.ngrok-free.dev";
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
        resultDiv.innerHTML = "🧠 AI助手正在启动，请耐心等待1-2分钟...";
        
        const response = await fetch(`${API_BASE_URL}/ask`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({question: question, max_length: 300})
        });
        
        // 友好处理模型加载中的状态
        if (response.status === 503) {
            resultDiv.innerHTML = "⏳ 模型加载即将完成，请稍等片刻后重试...";
            return;
        }
        
        if (!response.ok) {
            throw new Error(`网络错误: ${response.status}`);
        }
        
        // 正常返回AI答案
        const data = await response.json();
        resultDiv.innerHTML = data.answer;
        
    } catch (error) {
        resultDiv.innerHTML = "⚠️ 服务暂时不稳定，请刷新页面重试";
    }
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

>>>>>>> 2b4b2a19d0fd033a0b39e720ebaa95cff5309dbb
