export const markdown = `
Generic models like Llama 3 or GPT-4 are incredibly capable but "chatty" and prone to stylistic drift. For legal and technical compliance, you need specialized weights.

## The Fine-Tuning Protocol

We utilize **QLoRA (Quantized Low-Rank Adaptation)** to align 70B parameter models on consumer-grade hardware, reducing deployment costs by 80%.

### Our 3-Step Alignment Process:
1. **SFT (Supervised Fine-Tuning):** Teaching the model the specific "voice" and "syntax" of legal records.
2. **DPO (Direct Preference Optimization):** Forcing the model to choose compliant answers over "helpful" but risky ones.
3. **Quantization:** Compressing the model to 4-bit precision for sub-second inference.

## The Compliance Result
By fine-tuning on 50,000 anonymized legal contracts, we achieved a **99.2% syntax match** with standard corporate legal phrasing.

\`\`\`bash
# Training Command for QLoRA Adapter
accelerate launch -m time_ai.trainer \\
  --model_id "meta-llama/Llama-3-70b" \\
  --dataset "./data/legal_compliance_v4" \\
  --lora_r 64 \\
  --lora_alpha 128
\`\`\`

> "A model that knows everything is dangerous. A model that knows exactly what its job is, is an asset."
`;