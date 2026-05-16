# The Chama Dispute Arbitrator ⚖️

## 🌍 The Problem
Kenya has over 300,000 registered *chamas* (informal investment groups) managing billions of shillings collectively. Paradoxically, the biggest killer of these groups is not bad investments or market crashes — **it is unresolved member disputes.** When financial tensions rise, chamas risk catastrophic fracturing without a neutral, undeniable moderator to fall back on.

## 💡 The Solution
**The Chama Dispute Arbitrator** is an unbiased, AI-powered digital mediation agent designed for chama treasurers and chairpersons to call upon when things get heated. 

By ingesting the chama's own unstructured data sets—such as scanned bylaws, constitutions, M-Pesa transaction statements, and historical contribution ledgers—the Arbitrator mediates disputes purely by citing the group's own established rules. 

Built specifically for the Kenyan context, the platform seamlessly handles nuanced natural language inputs in **English, standard Kiswahili, and Nairobian Sheng** (e.g., flawlessly mapping localized terms like *ganji* and *pano* to financial constants). 

## 🛠️ Google Cloud Tech Stack
The platform's orchestration and inference layers are heavily powered by Google Cloud's most advanced tools:

- **Vertex AI Agent Builder**: Our core orchestrator mapping intent and chaining user chat messages directly into backend API extensions.
- **Vertex AI Search (RAG)**: Automatically processes and indexes uploaded constitutions and unstructured bylaws to actively ground the LLM in the specific group's facts.
- **Gemini 1.5 Flash**: A highly-performant, multimodal LLM utilized for parsing the dense mixed Kiswahili/Sheng inputs and extracting contextual intents gracefully with < 2 seconds of latency.
- **Cloud Document AI (ADK)**: Specialized document pipelines executing extraction parsing on complex, non-standard M-Pesa PDF statements and contribution ledgers.
- **Cloud Run & Cloud SQL (PostgreSQL)**: Scalable, deterministic database hooks that execute hard SQL queries against transaction ledgers; fundamentally preventing the AI agent from hallucinating whether a member paid or not.

## 🚀 Key Highlights
* **Multilingual NLP**: Speak naturally to the agent in Sheng or Swahili.
* **Deterministic Financial Verification**: Secure API webhooks prevent hallucinations.
* **Secure UI Pipeline**: Mobile-responsive Next.js interface ready to authorize encrypted file uploads.
