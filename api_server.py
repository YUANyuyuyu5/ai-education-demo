from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

class QuestionRequest(BaseModel):
    question: str
    max_length: int = 512

app = FastAPI(title="医用物理学AI助手API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

model = None
tokenizer = None

@app.on_event("startup")
async def load_model():
    global model, tokenizer
    print("正在加载模型，请稍候...")
    model_path = "/root/output/Qwen2-1.5B-Instruct"  
    try:
        tokenizer = AutoTokenizer.from_pretrained(model_path)
        model = AutoModelForCausalLM.from_pretrained(
            model_path,
            torch_dtype=torch.float16,
            device_map="auto"
        )
        print("模型加载成功！")
    except Exception as e:
        print(f"模型加载失败: {e}")

@app.post("/ask")
async def ask_question(request: QuestionRequest):
    if model is None:
        raise HTTPException(status_code=503, detail="模型正在加载，请稍后再试")
    
    try:
        inputs = tokenizer(request.question, return_tensors="pt").to(model.device)
        with torch.no_grad():
            outputs = model.generate(
                **inputs,
                max_length=request.max_length,  
                temperature=0.7,
                do_sample=True,
                pad_token_id=tokenizer.eos_token_id
            )
        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        answer = response.split("回答：")[-1].strip() if "回答：" in response else response  
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"生成回答时出错: {str(e)}")

@app.get("/")
async def health_check():
    return {"status": "online", "message": "医用物理学AI助手API服务运行正常"}