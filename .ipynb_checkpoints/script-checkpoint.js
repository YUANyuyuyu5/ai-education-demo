// 切换页面显示
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId + '-page').classList.add('active');
}

// 模拟AI生成预习提纲
function generatePreview() {
    const input = document.getElementById('preview-input').value;
    const resultDiv = document.getElementById('preview-result');

    // 这里是预设的答案，用来模拟AI的输出
    const previewAnswers = {
        "导数与微分": `【导数与微分】预习提纲\n\n一、核心概念\n1. 导数的定义：瞬时变化率\n2. 几何意义：曲线切线的斜率\n\n二、必会公式\n• (x^n)' = nx^(n-1)\n• (sin x)' = cos x\n\n三、典型例题（略）`,
        "不定积分": `【不定积分】预习提纲\n\n一、核心概念\n1. 原函数与不定积分\n2. 积分的基本性质\n\n二、基本积分公式\n• ∫x^n dx = x^(n+1)/(n+1) + C\n• ∫e^x dx = e^x + C`
    };

    const answer = previewAnswers[input] || `关于【${input}】的详细预习提纲正在生成中...\n（这里是模拟的AI输出，实际项目将接入真实AI）`;
    resultDiv.innerHTML = answer;
}

// 模拟AI整理课堂笔记
function generateNote() {
    const input = document.getElementById('note-input').value;
    const resultDiv = document.getElementById('note-result');

    // 模拟笔记整理结果
    const noteAnswer = `【整理的课堂笔记】\n\n一、知识要点\n• 提取出的核心概念1\n• 提取出的核心概念2\n\n二、公式与定理\n• 重要公式1\n• 重要公式2\n\n三、教师强调的易错点\n• 注意细节1\n• 注意细节2`;
    resultDiv.innerHTML = noteAnswer;
}

// 模拟AI分析错题
function generateReview() {
    const input = document.getElementById('review-input').value;
    const resultDiv = document.getElementById('review-result');

    // 模拟错题分析结果
    const reviewAnswer = `【错题分析报告】\n\n一、错误原因\n• 概念理解偏差：相关概念混淆\n• 计算失误：某步骤计算错误\n\n二、正确解法\n1. 第一步...\n2. 第二步...\n3. 第三步...\n\n三、举一反三\n推荐练习同类型题目3道`;
    resultDiv.innerHTML = reviewAnswer;
}