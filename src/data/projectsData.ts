import { RealWorldProject } from '../types';

export const REAL_WORLD_PROJECTS: RealWorldProject[] = [
  {
    id: 'proj_1',
    title: 'Enterprise Financial 10-K RAG with Hybrid Search & Re-ranking',
    slug: 'financial-10k-rag-engine',
    category: 'Enterprise RAG',
    level: 'Intermediate',
    estimatedHours: 14,
    summary: 'Build a production-grade Financial Document Intelligence RAG system that parses complex SEC 10-K filings, handles tables and financial footnotes, executes Hybrid Dense + BM25 retrieval with BGE Re-ranking, and provides exact source citations.',
    businessScenario: 'Hedge funds and corporate finance teams spend thousands of hours manually analyzing 200-page SEC 10-K annual reports. Traditional naive RAG fails because financial tables lose their structure during plain-text chunking, and keyword queries for exact numbers fail on pure cosine similarity.',
    realWorldImpact: 'Reduces document analysis time from 4 hours to 12 seconds per report with 98.4% retrieval precision on balance sheets and cash flow disclosures.',
    analystAdvantage: 'As a Data Analyst, you already understand P&L statements, EBITDA, balance sheets, and tabular metrics. You know exactly what a financial analyst looks for and how numbers relate.',
    techStack: ['Python 3.11', 'FastAPI', 'Qdrant / ChromaDB', 'BGE-Reranker-Large', 'LangChain / LlamaIndex', 'Pydantic', 'Unstructured PDF'],
    architectureDiagram: `
+------------------+      +-------------------+      +-------------------------+
|  SEC 10-K PDF    | ---> | Table-Aware Parser| ---> | Semantic + Table Chunks |
+------------------+      +-------------------+      +-------------------------+
                                                                  |
                                       +--------------------------+--------------------------+
                                       |                                                     |
                                       v                                                     v
                         +---------------------------+                         +---------------------------+
                         | Dense Embeddings (OpenAI) |                         | Sparse BM25 Inverted Index|
                         +---------------------------+                         +---------------------------+
                                       |                                                     |
                                       +--------------------------+--------------------------+
                                                                  |
                                                                  v
                                                    +----------------------------+
                                                    | Reciprocal Rank Fusion(RRF)|
                                                    +----------------------------+
                                                                  |  (Top 25 Candidates)
                                                                  v
                                                    +----------------------------+
                                                    | Cross-Encoder (BGE Rerank) |
                                                    +----------------------------+
                                                                  |  (Top 5 High-Precision Chunks)
                                                                  v
                                                    +----------------------------+
                                                    | LLM Generation + Citations |
                                                    +----------------------------+
    `,
    architectureComponents: [
      { name: 'Document Ingestion & Table Slicer', role: 'Extracts HTML/Markdown tables without flattening columns', tech: 'Unstructured / PDFPlumber' },
      { name: 'Dual Retriever Engine', role: 'Executes parallel Dense vector search + BM25 keyword search', tech: 'Qdrant Vector DB + Rank-BM25' },
      { name: 'Reciprocal Rank Fusion (RRF) Layer', role: 'Normalizes and merges sparse and dense rankings', tech: 'Custom Python RRF' },
      { name: 'BGE Cross-Encoder Re-ranker', role: 'Scores (Query, Chunk) pairs with full cross-attention', tech: 'BAAI/bge-reranker-large' },
      { name: 'Citation & Verification Guard', role: 'Ensures every generated figure maps back to a page number', tech: 'FastAPI + Pydantic' }
    ],
    milestones: [
      {
        id: 'm1_1',
        title: 'Milestone 1: Table-Aware Financial Document Chunking',
        description: 'Implement a semantic chunker that preserves Markdown table syntax intact rather than splitting across arbitrary token boundaries.',
        tasks: [
          'Parse SEC 10-K HTML/PDF tables into structured Markdown tables',
          'Implement recursive character splitting that treats markdown tables as atomic units',
          'Attach rich metadata (fiscal_year, company_ticker, page_number, section_type)'
        ],
        starterCode: `def chunk_financial_document(raw_text: str, max_chunk_size: int = 1000) -> list:\n    # TODO: Implement table-preserving chunking logic\n    pass`,
        solutionCode: `import re\nfrom typing import List, Dict\n\ndef chunk_financial_document(raw_text: str, max_chunk_size: int = 1000) -> List[Dict]:\n    # Split by double newline or markdown table blocks\n    sections = re.split(r'(\\n\\|.*\\|\\n(?:\\|.*\\|\\n)+)', raw_text)\n    chunks = []\n    current_chunk = ""\n    \n    for sec in sections:\n        if not sec.strip():\n            continue\n        # If section is a table, keep it atomic\n        is_table = sec.strip().startswith('|') and '|' in sec.strip().split('\\n')[0]\n        if is_table:\n            if current_chunk:\n                chunks.append({"text": current_chunk.strip(), "is_table": False})\n                current_chunk = ""\n            chunks.append({"text": sec.strip(), "is_table": True})\n        else:\n            if len(current_chunk) + len(sec) < max_chunk_size:\n                current_chunk += "\\n\\n" + sec\n            else:\n                if current_chunk:\n                    chunks.append({"text": current_chunk.strip(), "is_table": False})\n                current_chunk = sec\n    if current_chunk:\n        chunks.append({"text": current_chunk.strip(), "is_table": False})\n    return chunks`,
        codeExplanation: 'By using regular expressions to detect Markdown table boundaries, we prevent financial columns from being bifurcated across different embedding vectors.',
        validationCriteria: [
          'Markdown tables remain 100% intact within single chunks',
          'Non-table paragraphs are packed efficiently up to max_chunk_size',
          'Metadata dictionary indicates whether chunk contains tabular metrics'
        ]
      },
      {
        id: 'm1_2',
        title: 'Milestone 2: Hybrid Dense + Sparse Indexing & RRF Fusion',
        description: 'Build a dual index pipeline that queries vector embeddings and BM25 keywords in parallel and fuses them with Reciprocal Rank Fusion.',
        tasks: [
          'Generate dense embeddings using a 1536-dim embedding model',
          'Build an in-memory or Qdrant vector index and BM25 index',
          'Implement RRF algorithm: score(d) = sum(1 / (k + rank))',
          'Return top 25 candidate chunks'
        ],
        starterCode: `class HybridFinancialRetriever:\n    def __init__(self, chunks: list):\n        self.chunks = chunks\n        # TODO: Initialize embeddings and BM25\n        pass\n\n    def retrieve(self, query: str, top_k: int = 25) -> list:\n        pass`,
        solutionCode: `from typing import List, Dict\nimport numpy as np\n\nclass HybridFinancialRetriever:\n    def __init__(self, chunks: List[Dict]):\n        self.chunks = chunks\n        self.corpus = [c["text"] for c in chunks]\n        # Tokenized for BM25 simulation\n        self.tokenized_corpus = [doc.lower().split() for doc in self.corpus]\n        \n    def retrieve(self, query: str, top_k: int = 25, rrf_k: int = 60) -> List[Dict]:\n        query_tokens = query.lower().split()\n        # 1. BM25 scoring simulation\n        bm25_scores = [sum(1.0 for token in query_tokens if token in doc) for doc in self.tokenized_corpus]\n        sparse_ranked = np.argsort(bm25_scores)[::-1]\n        \n        # 2. Dense similarity simulation (in production: Qdrant query)\n        dense_scores = [len(set(query_tokens).intersection(set(doc))) / (len(query_tokens) + 1e-5) for doc in self.tokenized_corpus]\n        dense_ranked = np.argsort(dense_scores)[::-1]\n        \n        # 3. Reciprocal Rank Fusion\n        rrf_map = {}\n        for rank, idx in enumerate(sparse_ranked[:50]):\n            rrf_map[idx] = rrf_map.get(idx, 0.0) + (1.0 / (rrf_k + rank + 1))\n        for rank, idx in enumerate(dense_ranked[:50]):\n            rrf_map[idx] = rrf_map.get(idx, 0.0) + (1.0 / (rrf_k + rank + 1))\n            \n        top_indices = sorted(rrf_map.items(), key=lambda x: x[1], reverse=True)[:top_k]\n        return [{"chunk": self.chunks[idx], "rrf_score": score} for idx, score in top_indices]`,
        codeExplanation: 'RRF ensures that if a financial query searches for an exact term like "EBITDA 2024", the sparse BM25 retriever surfaces it even if the dense semantic embedding lacks exact token precision.',
        validationCriteria: [
          'Both dense and sparse scores contribute to final ranking',
          'Handles numerical and acronym queries flawlessly',
          'Outputs candidates sorted in descending order of RRF score'
        ]
      },
      {
        id: 'm1_3',
        title: 'Milestone 3: Cross-Encoder Re-Ranking & Citation Verification',
        description: 'Pass the top 25 candidates through a cross-encoder model to select the top 5 most relevant passages and generate an answer with strict page citations.',
        tasks: [
          'Implement cross-encoder pairwise scoring between Query and Candidate',
          'Sort and trim to top 5 context chunks',
          'Construct an LLM prompt enforcing strict JSON output with citations'
        ],
        starterCode: `def generate_financial_answer_with_citations(query: str, top_chunks: list) -> dict:\n    # TODO: Build grounded prompt and citation mapper\n    pass`,
        solutionCode: `def generate_financial_answer_with_citations(query: str, top_chunks: list) -> dict:\n    context_blocks = []\n    for i, c in enumerate(top_chunks):\n        page = c.get("page", 1)\n        text = c.get("text", "")\n        context_blocks.append(f"[Source {i+1} - Page {page}]:\\n{text}")\n    \n    grounded_context = "\\n\\n".join(context_blocks)\n    prompt = f"""You are a Principal Financial Intelligence AI.\nAnswer the user query based ONLY on the provided SEC 10-K sources.\nFor every claim or number you provide, cite the Source ID [Source X].\n\nContext:\n{grounded_context}\n\nQuery: {query}\n\nProvide your response with: 1. executive_summary, 2. key_metrics, 3. citations."""\n    return {\n        "prompt": prompt,\n        "context_length_chars": len(grounded_context),\n        "sources_count": len(top_chunks)\n    }`,
        codeExplanation: 'Grounding the prompt with explicit source markers enables the LLM to provide verbatim financial citations, meeting compliance and auditing standards.',
        validationCriteria: [
          'Every financial number maps to a specific source ID',
          'Context length is strictly within the model attention budget',
          'Prompt warns against hallucinating metrics not found in the context'
        ]
      }
    ],
    keyDeliverables: [
      'Table-aware PDF parser notebook and Python module',
      'Production FastAPI endpoint: `POST /api/v1/financial-rag/query`',
      'Benchmark report comparing Naive RAG vs Hybrid RAG + BGE Re-ranking on 100 SEC questions',
      'Docker container with Qdrant Vector DB and FastAPI service'
    ],
    portfolioHighlights: [
      'Designed dual-retriever architecture combining dense vectors and BM25 using Reciprocal Rank Fusion.',
      'Increased financial tabular retrieval accuracy from 64% to 98.4% by preserving Markdown structures.',
      'Built sub-100ms cross-encoder re-ranking pipeline handling 10-K SEC annual reports.'
    ],
    datasetOrApiInfo: {
      name: 'SEC EDGAR 10-K Filings Corpus (Apple, Microsoft, Tesla, Alphabet)',
      description: 'Authentic 10-K filings with complex financial tables, balance sheets, and MD&A management disclosures.',
      samplePayloadOrSchema: `{ "ticker": "AAPL", "fiscal_year": 2024, "section": "Item 8 - Financial Statements", "table": "| (in millions) | 2024 | 2023 |\\n| Total Net Sales | $391,035 | $383,285 |" }`
    },
    xpReward: 1200
  },
  {
    id: 'proj_2',
    title: 'Autonomous Self-Healing Text-to-SQL Agent with Schema Introspection',
    slug: 'autonomous-text-to-sql-agent',
    category: 'Text-to-SQL & Analytics',
    level: 'Advanced',
    estimatedHours: 16,
    summary: 'Build an autonomous Text-to-SQL enterprise agent that dynamically introspects relational schemas, writes dialect-specific SQL queries, catches execution runtime errors in a sandbox, self-corrects syntax and logic, and returns structured data and Chart.js specs.',
    businessScenario: 'Business leaders demand real-time data insights without waiting 3 days in the data team queue. However, basic zero-shot LLM SQL generators frequently write invalid column names, hallucinate non-existent tables, or create unindexed cartesian joins that crash production databases.',
    realWorldImpact: 'Automates 80% of ad-hoc exploratory data requests with 96% first-pass SQL correctness and automatic fallback self-repair for runtime exceptions.',
    analystAdvantage: 'You know SQL inside out—joins, window functions, CTEs, aggregation semantics, and query optimization. You can evaluate and guide the agent’s SQL better than anyone.',
    techStack: ['Python 3.11', 'PostgreSQL / SQLite', 'SQLAlchemy', 'Pydantic V2', 'FastAPI', 'Chart.js Spec Generator'],
    architectureDiagram: `
+----------------+      +------------------------+      +---------------------------+
| User Query     | ---> | Schema Retriever (RAG) | ---> | Dialect-Specific LLM Gen  |
| "Top 5 users"  |      | (Relevant Tables Only) |      | (Generates PostgreSQL SQL)|
+----------------+      +------------------------+      +---------------------------+
                                                                      |
                                                                      v
                                                        +---------------------------+
                                                        | SQL Sandbox Execution Env |
                                                        +---------------------------+
                                                                      |
                                                   +------------------+------------------+
                                                   |                                     |
                                        (Execution Fails)                     (Execution Succeeds)
                                                   v                                     v
                                    +------------------------------+       +------------------------------+
                                    | Error Analyzer & Self-Repair |       | Data Summarizer & Chart Gen  |
                                    | (Feeds traceback back to LLM)|       | (Returns Data + Chart JSON)  |
                                    +------------------------------+       +------------------------------+
                                                   |
                                                   +---> (Retries up to 3 times)
    `,
    architectureComponents: [
      { name: 'Schema Dynamic Introspector', role: 'Fetches DDL schemas and sample values for relevant tables', tech: 'SQLAlchemy / Information_Schema' },
      { name: 'SQL Generation Engine', role: 'Produces optimized PostgreSQL/Snowflake queries with CTEs', tech: 'Gemini / Claude / GPT-4' },
      { name: 'Safe Execution Sandbox', role: 'Executes queries with read-only permissions and timeout guards', tech: 'Python SQLite / PostgreSQL Engine' },
      { name: 'Self-Healing ReAct Loop', role: 'Catches operational errors and feeds AST traces back to LLM', tech: 'Custom Error State Machine' },
      { name: 'Automated BI Chart Formatter', role: 'Converts returned SQL dataframes into Chart.js JSON configs', tech: 'Pandas + JSON Schema' }
    ],
    milestones: [
      {
        id: 'm2_1',
        title: 'Milestone 1: Dynamic Database Schema Introspection & DDL Retrieval',
        description: 'Build an introspection utility that extracts table DDL, column data types, foreign key relationships, and top-3 representative column values without leaking sensitive data.',
        tasks: [
          'Extract schema metadata using SQLAlchemy inspector',
          'Sample distinct values for categorical columns (e.g. status: ["ACTIVE", "CHURNED"])',
          'Format concise schema representation for prompt token efficiency'
        ],
        starterCode: `def introspect_database_schema(engine) -> str:\n    # TODO: Extract tables, columns, and foreign keys\n    pass`,
        solutionCode: `from sqlalchemy import inspect\n\ndef introspect_database_schema(engine) -> str:\n    inspector = inspect(engine)\n    schema_lines = []\n    for table_name in inspector.get_table_names():\n        columns = inspector.get_columns(table_name)\n        col_strs = [f"{c['name']} ({c['type']})" for c in columns]\n        fks = inspector.get_foreign_keys(table_name)\n        fk_strs = [f"{fk['constrained_columns']} -> {fk['referred_table']}.{fk['referred_columns']}" for fk in fks]\n        \n        line = f"TABLE {table_name} (\\n  COLUMNS: {', '.join(col_strs)}"\\n        if fk_strs:\n            line += f",\\n  FOREIGN_KEYS: {', '.join(fk_strs)}"\\n        line += "\\n)"\n        schema_lines.append(line)\n    return "\\n\\n".join(schema_lines)`,
        codeExplanation: 'Providing the foreign keys and column data types directly in the prompt prevents the LLM from inventing fictional table relationships.',
        validationCriteria: [
          'Captures all table names, column names, and data types',
          'Extracts foreign key constraints accurately',
          'Token footprint stays under 1500 tokens for 10 tables'
        ]
      },
      {
        id: 'm2_2',
        title: 'Milestone 2: The Self-Healing Execution Loop',
        description: 'Implement the execution state machine that captures syntax errors, unknown columns, and type mismatches, and orchestrates iterative LLM query repair.',
        tasks: [
          'Execute generated SQL in a restricted read-only connection',
          'Catch SQLAlchemy database errors and parse the diagnostic error message',
          'Build the retry loop that passes previous query + error message back to the LLM'
        ],
        starterCode: `async def execute_and_repair_sql(initial_sql: str, db_connection, llm_repair_fn, max_retries: int = 3):\n    # TODO: Implement self-repair retry loop\n    pass`,
        solutionCode: `import asyncio\nfrom typing import Dict, Any\n\nasync def execute_and_repair_sql(initial_sql: str, db_cursor, llm_repair_fn, max_retries: int = 3) -> Dict[str, Any]:\n    current_sql = initial_sql\n    attempt_history = []\n    \n    for attempt in range(1, max_retries + 1):\n        try:\n            db_cursor.execute(current_sql)\n            rows = db_cursor.fetchall()\n            columns = [desc[0] for desc in db_cursor.description] if db_cursor.description else []\n            return {\n                "success": True,\n                "attempts": attempt,\n                "final_sql": current_sql,\n                "columns": columns,\n                "data": rows,\n                "repair_history": attempt_history\n            }\n        except Exception as e:\n            error_msg = str(e)\n            attempt_history.append({"attempt": attempt, "failed_sql": current_sql, "error": error_msg})\n            if attempt == max_retries:\n                return {"success": False, "attempts": max_retries, "error": error_msg, "history": attempt_history}\n            # Request repaired SQL from LLM\n            current_sql = await llm_repair_fn(current_sql, error_msg)\n            \n    return {"success": False, "error": "Maximum retries exceeded"}`,
        codeExplanation: 'By maintaining an audit log of failed SQL and error feedback, the model avoids repeating the same syntactic mistake twice.',
        validationCriteria: [
          'Successfully recovers from common errors (e.g. missing GROUP BY column, mistyped column name)',
          'Stops immediately on successful execution',
          'Enforces maximum retry budget to prevent infinite loops'
        ]
      }
    ],
    keyDeliverables: [
      'Schema introspection & embedding retrieval service',
      'Self-healing Text-to-SQL engine with 96% benchmark pass rate',
      'FastAPI endpoint returning SQL query, explanation, tabular data, and Chart.js visualization config',
      'Evaluation suite testing 50 complex multi-table SQL queries'
    ],
    portfolioHighlights: [
      'Engineered an autonomous Text-to-SQL agent with dynamic schema introspection and self-correcting ReAct loops.',
      'Achieved 96% execution accuracy across multi-table JOINs and window aggregations.',
      'Built automated data visualizer mapping SQL result sets to dynamic Chart.js configurations.'
    ],
    datasetOrApiInfo: {
      name: 'Northwind & E-Commerce Snowflake Analytical Data Warehouse',
      description: 'Comprehensive 12-table relational schema with Orders, Customers, Products, Suppliers, and Inventory logs.',
      samplePayloadOrSchema: `{ "query": "Which 3 product categories generated the highest profit margin in Q3 2024?", "expected_tables": ["orders", "order_details", "products", "categories"] }`
    },
    xpReward: 1400
  },
  {
    id: 'proj_3',
    title: 'High-Throughput E-Commerce Multi-Agent Customer Support Swarm',
    slug: 'ecommerce-multi-agent-swarm',
    category: 'Autonomous Agents',
    level: 'Staff/Principal',
    estimatedHours: 18,
    summary: 'Architect a production-grade multi-agent fleet using state graphs and tool execution: Router Agent, Order & Shipping Specialist, Refund & Policy Evaluator, and Human Escalation Guard with shared memory and safety guardrails.',
    businessScenario: 'Global e-commerce platforms receive tens of thousands of customer inquiries across returns, lost packages, discount codes, and product queries. A monolithic single-prompt bot fails to manage complex business logic and frequently violates company refund policies.',
    realWorldImpact: 'Processes 50,000+ support conversations daily, resolves 78% of order disputes autonomously within strict policy bounds, and reduces human support workload by 65%.',
    analystAdvantage: 'You understand customer segmentation, business policy rules, funnel drop-offs, and operational KPI metrics.',
    techStack: ['Python 3.11', 'LangGraph / StateGraph', 'FastAPI', 'Redis Session Store', 'Pydantic V2', 'OpenTelemetry'],
    architectureDiagram: `
                                   +-------------------------+
                                   | Customer Message Influx |
                                   +-------------------------+
                                                |
                                                v
                                   +-------------------------+
                                   | Supervisor / Router Bot |
                                   +-------------------------+
                                                |
                        +-----------------------+-----------------------+
                        |                                               |
                        v                                               v
        +-------------------------------+               +-------------------------------+
        | Order & Shipping Specialist   |               | Refund & Policy Evaluator     |
        | (Tools: TrackFedEx, GetOrder) |               | (Tools: CheckPolicy, Refund)  |
        +-------------------------------+               +-------------------------------+
                        |                                               |
                        +-----------------------+-----------------------+
                                                |
                                                v
                                   +-------------------------+
                                   | State Reducer & Guard   |
                                   | (Policy & Safety Gate)  |
                                   +-------------------------+
                                                |
                                                v
                                   +-------------------------+
                                   | Verified Client Stream  |
                                   +-------------------------+
    `,
    architectureComponents: [
      { name: 'Supervisor / Triage Router', role: 'Classifies intent and delegates execution to specialized sub-agents', tech: 'LangGraph State Router' },
      { name: 'Order Tracking Agent', role: 'Calls logistics carrier APIs and calculates expected delivery dates', tech: 'Async REST Tools' },
      { name: 'Refund Compliance Agent', role: 'Verifies return windows (<30 days) and issues refund tokens', tech: 'Pydantic Business Rule Engine' },
      { name: 'Redis Conversation State Store', role: 'Preserves multi-turn state across user sessions', tech: 'Redis JSON / RedisGraph' }
    ],
    milestones: [
      {
        id: 'm3_1',
        title: 'Milestone 1: State Machine & Typed Agent State Schema',
        description: 'Define the global typed state schema and routing graph controlling transitions between supervisor, order agent, and refund agent.',
        tasks: [
          'Create Pydantic state container with messages, active_agent, order_id, and user_auth',
          'Implement conditional edge routing based on detected user intent',
          'Build state reducer to prevent message history bloat'
        ],
        starterCode: `from typing import TypedDict, List, Optional\n\nclass SupportState(TypedDict):\n    messages: List[dict]\n    current_agent: str\n    order_id: Optional[str]\n    refund_amount: Optional[float]\n    escalated: bool`,
        solutionCode: `from typing import TypedDict, List, Optional, Annotated\nimport operator\n\nclass SupportState(TypedDict):\n    messages: Annotated[List[dict], operator.add]\n    current_agent: str\n    customer_id: str\n    order_id: Optional[str]\n    refund_approved: bool\n    escalated: bool\n\ndef route_customer_intent(state: SupportState) -> str:\n    last_message = state["messages"][-1]["content"].lower()\n    if any(w in last_message for w in ["refund", "return", "money back", "broken"]):\n        return "refund_agent"\n    elif any(w in last_message for w in ["track", "where is", "shipping", "fedex", "delivered"]):\n        return "order_agent"\n    elif any(w in last_message for w in ["human", "lawyer", "manager", "sue"]):\n        return "escalation_agent"\n    return "general_faq_agent"`,
        codeExplanation: 'Typed state allows deterministic transitions and state persistence across distributed worker threads.',
        validationCriteria: [
          'State schema validates all customer context variables',
          'Router accurately directs shipping queries to order_agent and refund queries to refund_agent',
          'Escalation triggers human handoff cleanly'
        ]
      }
    ],
    keyDeliverables: [
      'Multi-agent state graph implementation with LangGraph / custom engine',
      'Mock enterprise API suite (FedEx Tracking API, Stripe Refund API, Inventory API)',
      'FastAPI WebSocket server for real-time customer streaming',
      'Safety policy evaluation suite with 100 adversarial test cases'
    ],
    portfolioHighlights: [
      'Architected multi-agent state graph handling 50,000+ customer requests daily.',
      'Implemented policy compliance guards preventing unapproved refunds and adversarial jailbreaks.',
      'Constructed distributed Redis session memory reducing duplicate customer explanations to zero.'
    ],
    datasetOrApiInfo: {
      name: 'Global Retail Customer Inquiries & Order History Database',
      description: 'Dataset of 10,000 multi-turn e-commerce dialogues with logistics and payment statuses.',
      samplePayloadOrSchema: `{ "customer_id": "cust_9921", "order_id": "ORD-44910", "item": "Wireless Noise Cancelling Headphones", "delivery_status": "Delayed in Transit", "delivered_at": null }`
    },
    xpReward: 1600
  },
  {
    id: 'proj_4',
    title: 'Multimodal Product Search & Real-Time Recommendation Engine',
    slug: 'multimodal-vector-recommendation',
    category: 'Multimodal AI',
    level: 'Advanced',
    estimatedHours: 14,
    summary: 'Build a multimodal neural search system using OpenAI CLIP / SigLIP embeddings that enables users to search an e-commerce catalog via text prompts, uploaded photos, or hybrid combination, with real-time session re-ranking.',
    businessScenario: 'Shoppers often struggle to describe fashion or furniture items with keywords ("cream minimalist oak side table with tapered legs"). Enabling users to upload an Instagram photo and instantly find matching catalog products increases checkout conversions by 38%.',
    realWorldImpact: 'Delivers sub-40ms visual similarity search across 1,000,000 SKUs with zero reliance on manual keyword tagging.',
    analystAdvantage: 'You understand click-through rates (CTR), conversion attribution, and catalog categorization taxonomy.',
    techStack: ['PyTorch', 'OpenCLIP / SigLIP', 'Qdrant Vector DB', 'FastAPI', 'Pillow', 'Docker'],
    architectureDiagram: `
+----------------------+      +--------------------------+      +---------------------------+
| User Image / Text    | ---> | Multimodal Vision-Text   | ---> | 512-dim Normalized Vector |
| "Modern brown couch" |      | Encoder (OpenCLIP)       |      | Projection                |
+----------------------+      +--------------------------+      +---------------------------+
                                                                              |
                                                                              v
                                                                +---------------------------+
                                                                | Qdrant HNSW Vector Search |
                                                                | (Cosine Similarity Top 50)|
                                                                +---------------------------+
                                                                              |
                                                                              v
                                                                +---------------------------+
                                                                | User Session Re-ranker    |
                                                                | (Multiplies user affinity)|
                                                                +---------------------------+
                                                                              |
                                                                              v
                                                                +---------------------------+
                                                                | Ranked Visual Recommendations
                                                                +---------------------------+
    `,
    architectureComponents: [
      { name: 'CLIP Vision & Text Encoder', role: 'Embeds images and text queries into a shared latent vector space', tech: 'OpenCLIP ViT-B/32' },
      { name: 'Qdrant HNSW Vector Engine', role: 'Performs sub-50ms nearest neighbor search over 1M items', tech: 'Qdrant Vector Engine' },
      { name: 'Real-Time Session Re-ranker', role: 'Boosts items aligned with the user’s recent click history', tech: 'NumPy Vector Math' }
    ],
    milestones: [
      {
        id: 'm4_1',
        title: 'Milestone 1: Shared Latent Space Image-Text Embedding Pipeline',
        description: 'Implement a preprocessing and embedding pipeline that converts uploaded images and text queries into normalized 512-dimensional vectors in the same coordinate space.',
        tasks: [
          'Load pretrained OpenCLIP / SigLIP model with torch and torchvision',
          'Write image transform pipeline (Resize, CenterCrop, Normalize)',
          'Normalize output embeddings to unit sphere ($L2=1$)'
        ],
        starterCode: `def embed_multimodal_query(image_bytes=None, text_query=None) -> list:\n    # TODO: Compute normalized CLIP embedding\n    pass`,
        solutionCode: `import torch\nimport numpy as np\n\ndef embed_multimodal_query(image_tensor=None, text_tokens=None, model=None) -> np.ndarray:\n    # In production with torch & OpenCLIP\n    with torch.no_grad():\n        if image_tensor is not None:\n            # Simulated image feature extraction\n            features = torch.randn(1, 512)\n        elif text_tokens is not None:\n            # Simulated text feature extraction\n            features = torch.randn(1, 512)\n        else:\n            raise ValueError("Either image or text must be provided")\n            \n        # Normalize to unit length\n        features /= features.norm(dim=-1, keepdim=True)\n        return features.cpu().numpy()[0]`,
        codeExplanation: 'Because CLIP maps image features and text features into the identical dimensional space, the dot product between an image vector and a text vector directly measures semantic relevance.',
        validationCriteria: [
          'Vector output dimension is exactly 512',
          'L2 norm equals 1.0 (unit vector)',
          'Handles both image uploads and text search seamlessly'
        ]
      }
    ],
    keyDeliverables: [
      'Multimodal embedding pipeline with PyTorch & CLIP',
      'FastAPI endpoint: `POST /api/v1/search/multimodal` accepting multipart image and text',
      'Interactive visual search UI displaying similarity scores and catalog matches'
    ],
    portfolioHighlights: [
      'Engineered a multimodal product search engine mapping text and image queries into a unified 512-dim vector space.',
      'Achieved sub-40ms search across 500,000 fashion catalog items using Qdrant HNSW indexing.',
      'Designed real-time session re-ranking algorithm that increased click-through rate by 34%.'
    ],
    datasetOrApiInfo: {
      name: 'DeepFashion & Amazon E-Commerce Multimodal Product Catalog',
      description: '50,000 e-commerce product photos with title, category, price, and visual style labels.',
      samplePayloadOrSchema: `{ "sku": "SHIRT-9901", "name": "Classic Oxford Linen Button Down", "category": "Men Apparel", "image_url": "https://cdn.example.com/products/shirt-9901.jpg" }`
    },
    xpReward: 1300
  },
  {
    id: 'proj_5',
    title: 'Domain-Specific Medical/Legal LLM Fine-Tuning with LoRA, QLoRA & DPO',
    slug: 'domain-llm-fine-tuning-qlora',
    category: 'Fine-Tuning & LLMOps',
    level: 'Staff/Principal',
    estimatedHours: 20,
    summary: 'Fine-tune an open-source 8B parameter model (e.g. Llama 3 / Mistral) on specialized medical/legal reasoning datasets using 4-bit Quantization (QLoRA), Low-Rank Adaptation, and Direct Preference Optimization (DPO) for zero-hallucination structured extraction.',
    businessScenario: 'Commercial API LLMs cannot be sent private patient records or sensitive client litigation briefs due to strict HIPAA / GDPR regulations. General-purpose models also struggle with complex medical jargon and legal Latin terminology.',
    realWorldImpact: 'Creates an on-premise private 8B model that outperforms GPT-4 on medical diagnosis coding benchmarks while running on a single cost-effective 24GB GPU instance.',
    analystAdvantage: 'You understand dataset preparation, distribution cleaning, synthetic data validation, and statistical significance testing.',
    techStack: ['Python 3.11', 'PyTorch', 'Hugging Face Transformers', 'PEFT & TRL', 'BitsAndBytes', 'Unsloth', 'Weights & Biases'],
    architectureDiagram: `
+---------------------------+      +---------------------------+      +---------------------------+
| Raw Medical EHR Records   | ---> | Data Cleaning & Formatting| ---> | Instruction-Response Pairs|
| & Clinical Transcripts    |      | (Anonymization & Regex)   |      | (ChatML Format)           |
+---------------------------+      +---------------------------+      +---------------------------+
                                                                                    |
                                                                                    v
                                                                      +---------------------------+
                                                                      | 4-Bit Base Model (NF4)    |
                                                                      | (Llama 3 8B Base Frozen)  |
                                                                      +---------------------------+
                                                                                    |
                                                                                    v
                                                                      +---------------------------+
                                                                      | LoRA Adapter Matrices     |
                                                                      | (A and B on W_q, W_v)     |
                                                                      +---------------------------+
                                                                                    |
                                                                                    v
                                                                      +---------------------------+
                                                                      | SFT + DPO Alignment Loss  |
                                                                      | (W&B Loss Convergence)    |
                                                                      +---------------------------+
    `,
    architectureComponents: [
      { name: 'Dataset Sanitizer & Tokenizer', role: 'Formats conversational prompts with ChatML templates', tech: 'HuggingFace Datasets & Tokenizers' },
      { name: 'NF4 4-bit Quantizer', role: 'Loads base model weights in NormalFloat4 to fit in 6GB VRAM', tech: 'BitsAndBytes' },
      { name: 'LoRA Adapter Injector', role: 'Adds trainable low-rank decomposition matrices ($W + \\frac{\\alpha}{r}BA$)', tech: 'PEFT Library' },
      { name: 'DPO Trainer & Evaluator', role: 'Aligns model output on preferred vs rejected clinical notes', tech: 'TRL (Transformer Reinforcement Learning)' }
    ],
    milestones: [
      {
        id: 'm5_1',
        title: 'Milestone 1: Mathematical LoRA Matrix Configuration & QLoRA Setup',
        description: 'Configure Low-Rank Adaptation parameters (rank r=16, alpha=32, target modules) and initialize BitsAndBytes 4-bit quantized base model.',
        tasks: [
          'Configure BitsAndBytesConfig with bnb_4bit_quant_type="nf4" and compute_dtype=torch.bfloat16',
          'Define LoraConfig targeting all linear attention projection layers (q_proj, k_proj, v_proj, o_proj)',
          'Calculate total trainable parameters vs frozen parameters percentage'
        ],
        starterCode: `def setup_qlora_training(model_name: str, lora_r: int = 16, lora_alpha: int = 32):\n    # TODO: Configure 4-bit loading and PEFT adapter\n    pass`,
        solutionCode: `from typing import Dict, Any\n\ndef setup_qlora_training(model_name: str, lora_r: int = 16, lora_alpha: int = 32) -> Dict[str, Any]:\n    # Target attention & MLP projection layers\n    target_modules = ["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"]\n    \n    # In production HuggingFace:\n    # bnb_config = BitsAndBytesConfig(load_in_4bit=True, bnb_4bit_quant_type="nf4", bnb_4bit_compute_dtype=torch.bfloat16)\n    # peft_config = LoraConfig(r=lora_r, lora_alpha=lora_alpha, target_modules=target_modules, lora_dropout=0.05, bias="none", task_type="CAUSAL_LM")\n    \n    total_params = 8_000_000_000\n    # LoRA adds ~2 * r * hidden_dim per target layer\n    trainable_params = len(target_modules) * 2 * lora_r * 4096 * 32\n    trainable_pct = (trainable_params / total_params) * 100\n    \n    return {\n        "base_model": model_name,\n        "quantization": "4-bit NormalFloat (NF4)",\n        "lora_rank": lora_r,\n        "lora_alpha": lora_alpha,\n        "target_modules": target_modules,\n        "trainable_parameters": trainable_params,\n        "trainable_percentage": f"{trainable_pct:.2f}%",\n        "estimated_vram_gb": 8.5\n    }`,
        codeExplanation: 'LoRA only trains less than 1% of total parameters while keeping the base model frozen, allowing enterprise fine-tuning on a single consumer GPU in hours instead of days.',
        validationCriteria: [
          'Calculates trainable parameter ratio accurately',
          'Targets all projection matrices for maximum downstream adaptation',
          'VRAM footprint stays under 10GB during training'
        ]
      }
    ],
    keyDeliverables: [
      'QLoRA training script and dataset preparation pipeline',
      'Evaluation benchmark comparing Pre-trained Base vs Fine-Tuned LoRA model on domain test set',
      'Exported LoRA adapter weights and GGUF quantized model for local Ollama/vLLM execution',
      'Training loss and validation perplexity curves logged to W&B'
    ],
    portfolioHighlights: [
      'Fine-tuned an open-source 8B LLM using QLoRA 4-bit quantization and DPO alignment on 20,000 domain records.',
      'Reduced memory footprint from 32GB to 8.5GB VRAM, enabling training on a single NVIDIA GPU.',
      'Achieved a 42% reduction in domain extraction hallucinations compared to base zero-shot models.'
    ],
    datasetOrApiInfo: {
      name: 'Medical Dialogue Clinical Note & ICD-10 Coding Dataset',
      description: '15,000 curated doctor-patient dialogues mapped to verified ICD-10 medical billing diagnosis codes.',
      samplePayloadOrSchema: `{ "transcript": "Patient presents with persistent dry cough, fever of 101.4F for 4 days, and wheezing.", "icd10_codes": ["R05.1", "R50.9", "R06.2"], "diagnosis": "Acute Bronchitis" }`
    },
    xpReward: 1800
  },
  {
    id: 'proj_6',
    title: 'High-Throughput Production Inference Engine with vLLM & FastAPI',
    slug: 'high-throughput-vllm-inference-engine',
    category: 'Production Inference Engine',
    level: 'Staff/Principal',
    estimatedHours: 16,
    summary: 'Build a production LLM serving cluster with vLLM continuous batching, PagedAttention memory management, AWQ 4-bit quantization, asynchronous Server-Sent Events (SSE) streaming, and prometheus telemetry.',
    businessScenario: 'Your company deployed an LLM feature that went viral. The legacy HuggingFace pipeline can only handle 4 concurrent requests before running out of GPU memory and latency spikes to 15 seconds. You must architect a high-throughput serving cluster handling 200+ requests/sec with sub-50ms TTFT.',
    realWorldImpact: 'Multiplies token generation throughput by 7.4x and cuts GPU cloud hosting costs by 70%.',
    analystAdvantage: 'You understand throughput distributions, 99th percentile (p99) latency curves, and cloud cost ROI analysis.',
    techStack: ['Python 3.11', 'vLLM', 'FastAPI', 'Prometheus', 'Grafana', 'Docker', 'NVIDIA Triton'],
    architectureDiagram: `
+-------------------------+      +---------------------------+      +---------------------------+
| 500 Concurrent Clients  | ---> | Nginx Reverse Proxy       | ---> | FastAPI Async Gateway     |
| (Web & Mobile Apps)     |      | (Load Balancer)           |      | (SSE Token Streaming)     |
+-------------------------+      +---------------------------+      +---------------------------+
                                                                                  |
                                                                                  v
                                                                    +---------------------------+
                                                                    | vLLM Engine               |
                                                                    | (PagedAttention + AWQ)    |
                                                                    +---------------------------+
                                                                                  |
                                                                                  v
                                                                    +---------------------------+
                                                                    | Continuous Batching Loop  |
                                                                    | (Dynamic Iteration Sched) |
                                                                    +---------------------------+
                                                                                  |
                                                                                  v
                                                                    +---------------------------+
                                                                    | Token Output Stream       |
                                                                    | (Time-To-First-Token <50ms)|
                                                                    +---------------------------+
    `,
    architectureComponents: [
      { name: 'FastAPI Async Gateway', role: 'Multiplexes hundreds of SSE client streams', tech: 'FastAPI + AsyncIO' },
      { name: 'vLLM Continuous Batcher', role: 'Schedules tokens dynamically per generation step', tech: 'vLLM Engine' },
      { name: 'PagedAttention Virtual Memory', role: 'Eliminates KV-cache memory fragmentation', tech: 'CUDA Kernel Paged Memory' },
      { name: 'Prometheus Telemetry Scraper', role: 'Monitors TTFT, ITL, GPU memory usage, and throughput', tech: 'Prometheus Client' }
    ],
    milestones: [
      {
        id: 'm6_1',
        title: 'Milestone 1: Server-Sent Events (SSE) Streaming Gateway',
        description: 'Build an asynchronous FastAPI streaming endpoint that consumes a token generator and streams chunks in standard SSE event protocol.',
        tasks: [
          'Implement asynchronous generator yielding `data: {"token": "..."}\\n\\n`',
          'Set response headers for EventStream (`text/event-stream`, `no-cache`)',
          'Measure Time-To-First-Token (TTFT) and Inter-Token Latency (ITL)'
        ],
        starterCode: `from fastapi import FastAPI\nfrom fastapi.responses import StreamingResponse\nimport asyncio\n\napp = FastAPI()\n\n# TODO: Implement async streaming endpoint\n`,
        solutionCode: `from fastapi import FastAPI\nfrom fastapi.responses import StreamingResponse\nimport asyncio\nimport json\nimport time\n\napp = FastAPI()\n\nasync def simulate_vllm_token_stream(prompt: str):\n    tokens = ["Global", " AI", " Engineering", " requires", " deep", " systems", " architecture", " understanding."]\n    start_time = time.time()\n    ttft_logged = False\n    \n    for i, token in enumerate(tokens):\n        if not ttft_logged:\n            ttft_ms = (time.time() - start_time) * 1000\n            ttft_logged = True\n        await asyncio.sleep(0.04) # Simulate 25 tokens/sec\n        payload = json.dumps({"index": i, "token": token, "finish_reason": None if i < len(tokens)-1 else "stop"})\n        yield f"data: {payload}\\n\\n"\n        \n@app.post("/v1/completions/stream")\nasync def stream_completions(prompt: str):\n    return StreamingResponse(\n        simulate_vllm_token_stream(prompt),\n        media_type="text/event-stream",\n        headers={"Cache-Control": "no-cache", "Connection": "keep-alive"}\n    )`,
        codeExplanation: 'Server-Sent Events allow the user interface to render tokens as they are generated by the model, dropping perceived latency from seconds to milliseconds.',
        validationCriteria: [
          'Outputs valid SSE formatted event stream chunks',
          'Maintains persistent HTTP connection without buffering',
          'Tracks TTFT metric accurately'
        ]
      }
    ],
    keyDeliverables: [
      'Production vLLM serving container with Dockerfile',
      'FastAPI asynchronous gateway with SSE streaming and OpenAI API compatibility',
      'Load-testing script (Locust / k6) proving 200 req/sec concurrency',
      'Grafana dashboard monitoring GPU VRAM, TTFT, and throughput metrics'
    ],
    portfolioHighlights: [
      'Built a high-throughput production LLM inference engine using vLLM PagedAttention and continuous batching.',
      'Achieved 7.4x higher token throughput compared to baseline HuggingFace pipelines.',
      'Architected sub-50ms Time-To-First-Token (TTFT) async streaming gateway serving hundreds of concurrent users.'
    ],
    datasetOrApiInfo: {
      name: 'High-Concurrency Benchmark Workload',
      description: 'Synthetic and real-world multi-turn conversational traffic simulating 1,000 concurrent user requests.',
      samplePayloadOrSchema: `{ "prompt": "Explain the mathematical formulation of Rotary Positional Embeddings (RoPE)", "max_tokens": 512, "temperature": 0.7 }`
    },
    xpReward: 2000
  }
];
