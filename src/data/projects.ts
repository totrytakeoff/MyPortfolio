import type { Project, ProjectCategory } from '../types'

export const projects: Project[] = [
  {
    slug: 'mychat',
    title: 'MyChat',
    subtitle: 'C++20 HTTP/WSS 统一接入与多进程 IM 后端',
    category: ['systems'],
    featured: true,
    role: '仓库维护者 / 核心开发',
    period: '2025.07 - 至今',
    status: 'in-progress',
    evidence: {
      level: 'B',
      items: [
        '公开仓库 dev 分支，121 次提交来自同一 Git 身份',
        'Gateway 统一 packet 重构对应 commit 94399b2，核心源码可定位',
        '跨主机压测报告、前后快照与原始日志完整归档',
        'WSS 200/200 建连成功，connect p95 14ms',
        '200 用户 / 250ms：714.4 msg/s，RTT p95 35.91ms，客户端错误 0',
        'HTTP 1→500 VU：46,296 请求，失败 0，p95 3.75ms',
        '阶段性 40/40 CTest（commit e34ba0e）',
        '2026-07-14 完成本机六进程端到端操作验证，页面、日志与数据库记录已归档',
      ],
    },
    cover: {
      src: 'assets/images/mychat/architecture-overview.webp',
      alt: 'MyChat 当前 Gateway、五个服务与存储层架构总览',
      caption: '2026-07 当前链路：Web Client 只访问 Gateway，业务由五个服务处理并落到 PostgreSQL / Redis',
      fit: 'cover',
      position: 'center 53%',
    },
    showcaseMedia: [
      {
        src: 'assets/images/mychat/direct-chat-roundtrip.webp',
        alt: 'MyChat 双账号在线私聊往返验证界面',
        caption: '在线私聊往返 · 消息持久化后由 Push callback 投递到连接所有者',
        fit: 'cover',
        position: 'center top',
      },
      {
        src: 'assets/images/mychat/offline-message-pulled.webp',
        alt: 'MyChat 接收方重新登录后拉取离线消息',
        caption: '离线补偿 · 接收方重新登录并同步收件箱后恢复消息',
        fit: 'contain',
        position: 'center',
      },
    ],
    evidenceMedia: [
      {
        src: 'assets/images/mychat/benchmark-summary.webp',
        alt: 'MyChat 2026-06-23 跨主机压测指标总览',
        caption: '同一次基准中的 WSS 吞吐与 RTT、HTTP ramp、建连成功率；数字需与测试条件一起理解',
        fit: 'cover',
        position: 'center top',
      },
    ],
    summary:
      '围绕接入层职责耦合与 WebSocket 生命周期问题，重构 C++20 IM 后端：将 HTTP/WSS 收敛为统一 packet 链路，并让 User、Message、Friend、Group、Push 在进程内与 gRPC 六进程模式下复用同一服务边界。消息先持久化，再 ack 与在线投递，离线历史负责补偿。',
    highlights: [
      '以 MessageParser → UnifiedMessage → Handler Registry 收敛 HTTP/WSS，业务 payload 留在 service dispatcher',
      '将 WSS 每消息异步线程改为固定线程池 + RAII inflight cap，过载时快速拒绝并保留统计',
      '统一 TLS/WebSocket 错误路径到幂等关闭流程，保证 session exactly-once 移除',
      '远程 Push 通过 Gateway callback 回到连接所有者查询 session 并完成投递',
      '实现 Redis RAII 连接池的耗尽等待、generation 隔离与断线后一次重连',
      '用 C++ bench_ws、k6 与 Python 编排跨主机压测，归档命令、快照和原始日志',
    ],
    metrics: [
      { value: '714.4', unit: 'msg/s', description: 'WSS 200 并发 / 250ms，错误 0' },
      { value: 'p95 35ms', unit: 'RTT', description: 'WSS 消息往返延迟' },
      { value: '46,296', unit: 'req', description: 'HTTP 1→500 VU，失败率 0%' },
    ],
    stack: [
      { domain: '核心语言', items: ['C++20', 'CMake', 'vcpkg'] },
      { domain: '网络', items: ['Boost.Asio/Beast', 'OpenSSL/TLS', 'WebSocket'] },
      { domain: '服务通信', items: ['gRPC', 'Protobuf'] },
      { domain: '存储', items: ['PostgreSQL', 'ODB', 'Redis/hiredis'] },
      { domain: '认证', items: ['JWT', 'PBKDF2-HMAC-SHA256'] },
      { domain: '验证客户端', items: ['React', 'TypeScript', 'Vite'] },
      { domain: '测试与压测', items: ['GoogleTest', 'CTest', 'k6', 'Python', 'Docker Compose'] },
    ],
    links: [
      {
        label: '代码仓库 (dev)',
        url: 'https://github.com/totrytakeoff/MyChat/tree/dev',
        type: 'repo',
      },
      {
        label: '压测报告',
        url: 'https://github.com/totrytakeoff/MyChat/blob/dev/docs/benchmark/benchmark_report_20260623_gateway_refactor_full/benchmark_report_20260623_gateway_refactor_full.md',
        type: 'benchmark',
      },
      {
        label: '统一 packet 重构',
        url: 'https://github.com/totrytakeoff/MyChat/commit/94399b2',
        type: 'other',
      },
      {
        label: '架构总结',
        url: 'https://github.com/totrytakeoff/MyChat/blob/dev/docs/final_sum_docs/01_项目整体架构总览.md',
        type: 'doc',
      },
    ],
    background:
      '这个项目真正需要解决的不是再增加一个好友或群聊接口，而是让两种客户端协议、五个服务边界、短连接请求与长连接状态在同一个接入层里仍然可解释。旧链路中的 HTTP controller、local/remote client 与业务 DTO 逐渐侵入 Gateway；WSS 热路径又出现每消息异步线程膨胀、连接错误路径分散和压测后残留。与此同时，独立 Push 进程无法直接访问 Gateway 内存中的 session，消息实时性与可恢复性也需要明确分层。',
    solution:
      '我把 Gateway 收敛为协议接入、鉴权、cmd 路由、连接管理与 packet 转发五类职责：HTTP JSON 和 WSS Protobuf envelope 都先进入 UnifiedMessage，再由同一 handler 选择进程内 dispatcher 或 gRPC ForwardPacket。消息服务遵循“先持久化、再 ack、再 best-effort push”，在线投递失败由历史与离线拉取补偿；远程 Push 通过 callback 回到持有连接的 Gateway。网络侧以固定线程池、RAII inflight guard 与统一 perform_close 管理负载和会话生命周期。',
    results:
      '2026-06-23 跨主机基准中，WSS 200/200 建连成功；200 用户每 250ms 发送时达到 714.4 msg/s，RTT p95 35.91ms，客户端错误 0。HTTP 1→500 VU ramp 完成 46,296 请求，失败 0，p95 3.75ms。另一轮生命周期复测中，客户端退出并超过 idle timeout 后 CLOSE-WAIT 与 ESTAB 均回落为 0。2026-07-14 本机六进程操作审计又完成了双账号好友、私聊、群聊、在线推送与离线补偿闭环。',
    architecture: {
      title: '把协议差异收敛为一条 packet 链路',
      summary:
        '统一并不意味着 Gateway 解析所有业务。它只读取 envelope、路由元数据和可信身份，再把原始 JSON 或 Protobuf payload 交给业务服务。这样 HTTP/WSS 与 local/remote 四种组合共享同一套命令入口，而 User、Message、Friend、Group 仍各自拥有字段校验、状态机和持久化逻辑。',
      flow: [
        {
          label: '01 / input',
          title: 'HTTP JSON / WSS Protobuf',
          description: '短连接接口与 TLS WebSocket 共用一个客户端接入边界。',
        },
        {
          label: '02 / normalize',
          title: 'MessageParser → UnifiedMessage',
          description: '协议差异转换为 cmd、header、query 与原始 payload，不展开业务 DTO。',
        },
        {
          label: '03 / route',
          title: 'MessageProcessor → Registry',
          description: '按 cmd_id 找到 handler，并在命令语义内完成鉴权和可信 uid 注入。',
        },
        {
          label: '04 / execute',
          title: 'Local Dispatcher / gRPC ForwardPacket',
          description: '同一 packet 契约可进程内执行，也可转发到独立服务进程。',
        },
        {
          label: '05 / state',
          title: 'Service → PostgreSQL / Redis',
          description: '业务服务处理规则与持久状态；Redis 承载 token/session 等临时状态。',
        },
        {
          label: '06 / deliver',
          title: 'Push → Gateway callback → WSS',
          description: '投递策略在 Push，真正的 session lookup 与写连接回到 Gateway。',
        },
      ],
      media: {
        src: 'assets/images/mychat/direct-message-flow.webp',
        alt: 'MyChat HTTP 单聊从 Gateway 到 Message Service 的 packet 链路',
        caption: 'HTTP 单聊示例：Gateway 从 token 注入可信 sender，Message dispatcher 才解析 receiver 与 content',
        fit: 'cover',
        position: 'center 48%',
      },
      decisions: [
        {
          title: 'Gateway 不再拥有业务 DTO',
          context: '旧 controller / local client / remote client 让新增接口需要在 Gateway 复制解析与映射。',
          decision: '用 cmd_id + packet envelope 固定接入主链路，业务 payload 下沉到各 service dispatcher。',
          outcome: '同一 handler 可选择进程内实现或 gRPC adapter，HTTP 与 WSS 复用服务侧规则。',
          tradeoff: 'ForwardPacket 弱化了逐业务 RPC 的强类型表达，cmd_id、envelope 与统一错误模型必须持续治理。',
          evidence: 'gateway/message_processor · gateway/command_handlers · services/*/*_packet_dispatcher.cpp',
        },
        {
          title: '把 WSS 热路径放进受控执行器',
          context: '早期每消息 std::async 再叠加 detached waiter，高频场景会放大线程与等待开销；关闭路径也分散。',
          decision: '改为固定线程池单次投递，以 RAII guard 管理 inflight 计数，并把异常统一导向幂等 perform_close。',
          outcome: '最重有效样本 200 用户 / 250ms 下客户端错误 0，独立复测后 session 与 TCP 残留归零。',
          tradeoff: '4096 上限尚未通过容量实验标定；全局线程池也未按业务隔离，当前属于粗粒度保护。',
          evidence: 'gateway/gateway_server/gateway_server.cpp · common/network/websocket_session.cpp',
        },
        {
          title: '让远程 Push 回到连接所有者',
          context: 'push_server 是独立进程，无法直接访问 Gateway 进程内的 uid → sessions 与 WebSocket 对象。',
          decision: 'PushRuntime 负责 fanout 决策，再通过 GatewayPushDeliveryService callback 查询 session、写 payload 和标记 delivered。',
          outcome: '本地与远程 Push 共用 PushNotifier 抽象，连接对象始终由 Gateway 管理。',
          tradeoff: '当前只验证单 Gateway；扩展到多 Gateway 还需要 uid → instance 路由与失效修正。',
          evidence: 'services/push/push_runtime.cpp · gateway/push/gateway_push_delivery_service.cpp',
        },
        {
          title: '持久化负责可靠性，Push 负责实时性',
          context: '接收方可能离线，在线 session 也可能在落库后、投递前断开。',
          decision: 'Message / Group 先持久化并返回 ack，再产生 push_event；失败时由 history / offline 拉取补偿。',
          outcome: '发送成功不依赖对方在线，本次实测也验证了断线发送、重新登录和离线消息恢复。',
          tradeoff: '尚无 MQ/outbox、client_msg_id 幂等、设备级投递日志与严格会话 sequence。',
          evidence: 'services/message/message_packet_dispatcher.cpp · services/push/push_runtime.cpp',
        },
      ],
    },
    audit: {
      title: '2026-07-14 本机端到端操作审计',
      date: '2026-07-14',
      environment:
        'Arch Linux · Gateway + User / Message / Friend / Group / Push 六进程 · PostgreSQL / Redis · React / Vite 验证客户端 · 1440×1000',
      summary:
        '我从启动脚本和依赖健康检查开始，创建 Alice、Bob 两个新账号，按真实页面顺序完成资料更新、搜索、好友申请与接受、私聊、建群与加群、群聊、在线 WSS 推送、断线发送和重新登录后的离线恢复。页面截图、运行日志和数据库记录分别归档，验证条件与适用范围见边界说明。',
      checks: [
        {
          title: '六进程与依赖启动',
          result: 'Gateway、五个服务、PostgreSQL 与 Redis 均启动并监听预期端口，Gateway health 可访问。',
          detail: '运行日志未检出 error / warn / fatal；服务关闭前对监听端口和 stats 再做一次收尾检查。',
          status: 'passed',
        },
        {
          title: '好友与单聊闭环',
          result: '完成用户搜索、好友申请、对端接受和双向私聊；接收方在其他页面时收到未读提示与在线推送。',
          detail: 'PostgreSQL 可查到两名测试用户、好友关系和两条方向相反的消息记录。',
          status: 'passed',
        },
        {
          title: '群聊与远程 Push',
          result: '完成建群、按群号搜索、加群、成员列表和双向群消息；接收方收到群消息在线提示。',
          detail: '测试群 Gateway 联调室包含两名成员，消息由 Group service 生成 fanout 后交给 Push。',
          status: 'passed',
        },
        {
          title: '离线补偿语义',
          result: '关闭 Bob 会话后由 Alice 发送消息，Bob 重新登录、同步收件箱并打开历史后恢复该消息。',
          detail: '消息状态从发送侧“已发送”进入接收侧历史，并在拉取后显示“已送达”。',
          status: 'passed',
        },
        {
          title: '浏览器与 Web 构建',
          result: '全新接收方标签页完成操作后控制台 0 error / 0 warning；React 客户端 npm build 成功。',
          detail: '验证客户端定位为后端联调入口，不把静态构建等同于全系统构建。',
          status: 'passed',
        },
      ],
    },
    boundaries: [
      '当前验证的是单 Gateway 与单机六进程拓扑；服务发现、负载均衡、多 Gateway 在线路由和 MQ 尚未落地。',
      '跨主机数据来自固定网络路径和测试接口组合：WSS 接收数包含 ack + push，HTTP ramp 主要覆盖 health / info，不代表容量上限或完整业务写吞吐。',
      '阶段性 40/40 CTest 只对应 commit e34ba0e；当前 HEAD 的全量重编译仍受 ODB 2.4 / 2.5 include 冲突影响。',
      'Gateway 当前对 Authorization 字段名大小写敏感；本次浏览器联调在本地代理统一该字段后完成。',
      '消息已具备持久化、在线投递和离线恢复，但尚无严格 sequence、client_msg_id 幂等、设备级投递日志和完整客户端 ACK。',
    ],
  },
  {
    slug: 'asd-kgrag',
    title: 'ASD-KGRAG',
    subtitle: 'ASD 领域知识图谱增强 RAG 问答系统',
    // 同时覆盖系统实现与 AI / GraphRAG 项目筛选。
    category: ['systems', 'ai'],
    featured: true,
    role: '团队项目 · 主要系统开发与实现',
    period: '2026.05 - 至今',
    status: 'iterating',
    evidence: {
      level: 'B',
      items: [
        '公开仓库当前 50 次提交均来自本人 Git 身份，当前审计 HEAD 为 7678744',
        '456/456 篇文档解析成功，7,568/7,568 个 chunk 抽取任务成功、失败 0',
        '线上 Dashboard 实读：Neo4j 3,684 实体 / 17,816 总关系，Qdrant 7,568 points',
        '当前 HEAD 本地复跑 16 个 unittest，16/16 通过（2026-07-15）',
        '线上平衡模式自然问法实测：SSE 200，首字 4.483s / 总计 24.899s，4 条文献引用与 12 条图谱关系',
        '50 题自然问法检索诊断 50/50；Agent 真实生成记录 50/50 成功、50/50 规则检查通过',
      ],
    },
    cover: {
      src: 'assets/images/asd-kgrag/dashboard-graph.png',
      alt: 'ASD-KGRAG Dashboard 中的知识图谱力导向视图',
      caption: '线上 Dashboard 实读 · 50 个代表节点 / 92 条可视关系',
      fit: 'cover',
      position: 'center center',
    },
    showcaseMedia: [
      {
        src: 'assets/images/asd-kgrag/ask-answer.png',
        alt: 'ASD-KGRAG 对自然问法生成带证据边界的回答',
        caption: '线上 Ask 实测 · 自然问法、文献编号、图谱编号与非诊断边界同时返回',
        fit: 'contain',
        position: 'center top',
      },
      {
        src: 'assets/images/asd-kgrag/dashboard-overview.png',
        alt: 'ASD-KGRAG Dashboard 图谱统计总览',
        caption: '线上 Dashboard · 实体、关系、Chunk、证据等级与来源分布',
        fit: 'contain',
        position: 'center top',
      },
      {
        src: 'assets/images/asd-kgrag/dashboard-relations.png',
        alt: 'ASD-KGRAG Dashboard 的语义关系列表',
        caption: '关系浏览 · support、confidence 与 qa_usage 等证据字段共同保留',
        fit: 'contain',
        position: 'center top',
      },
    ],
    summary:
      '面向 ASD 研究资料构建可追溯 GraphRAG 系统：将 456 篇文献处理为 7,568 个证据 chunk，写入 Neo4j 与 Qdrant；在线侧通过查询路由、别名与重写、图向量混合检索和证据组织生成带文献及关系引用的回答，并配套 Dashboard、评测与协作数据回流。',
    highlights: [
      '搭建文档解析、清洗分块、并发实体关系抽取、归一化与双库入库闭环，支持断点续跑和失败重试',
      '融合 Neo4j 图证据与 Qdrant 多查询向量召回，以 alias/rewrite、具体概念优先、质量字段和证据等级进行检索组织',
      '实现可解释的受控 Agent：确定性路由、证据策略、最多一次补检索、trace 与失败时证据降级回答',
      '以 FastAPI 线程池承接同步检索与生成路径，并通过 SSE 逐 token 输出状态、上下文、答案和耗时',
      '建设 React Dashboard、50 题评测、自然问法检索诊断和学生返还 CSV 校验合并工作流',
    ],
    metrics: [
      { value: '7,568', unit: 'chunk', description: '抽取任务 7,568/7,568 成功，失败 0' },
      { value: '50/50', unit: '自然问法检索', description: '忽略人工 keywords 的 balanced 诊断记录' },
      { value: '16/16', unit: '单元测试', description: '2026-07-15 当前 HEAD 本地复跑' },
    ],
    stack: [
      { domain: '服务与语言', items: ['Python 3.12', 'FastAPI', 'SSE', 'OpenAI-compatible API'] },
      { domain: '图与向量', items: ['Neo4j', 'Cypher', 'Qdrant', 'SentenceTransformers', 'BAAI BGE'] },
      { domain: '检索与编排', items: ['GraphRAG', '混合检索', 'query rewrite', 'alias expansion', '受控 Agent'] },
      { domain: '前端', items: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'ECharts'] },
      { domain: '质量与部署', items: ['unittest', '检索诊断', '规则评测', 'Docker Compose', 'Nginx'] },
    ],
    links: [
      {
        label: '代码仓库',
        url: 'https://github.com/totrytakeoff/ASD-KGRAG',
        type: 'repo',
      },
      {
        label: '自然问法检索实验',
        url: 'https://github.com/totrytakeoff/ASD-KGRAG/blob/master/docs/experiments/2026-07-10_retrieval_diagnostics.md',
        type: 'doc',
      },
    ],
    background:
      'ASD 资料跨文献、量表、干预方式和人群边界分散，仅做向量相似度召回很难解释“答案来自哪段文献、对应哪条关系、证据应如何使用”。团队还需要把问题收集、人工复核和别名候选稳定回流到系统。因此项目目标不是给出诊断结论，而是建立从资料处理、图向量检索、证据化回答到评测治理的研究工程闭环。',
    solution:
      '离线侧把 456 篇资料解析、清洗并切分为 7,568 个 chunk，抽取实体、语义关系与 Evidence 节点后写入 Neo4j，同时将 chunk embedding 写入 Qdrant。在线侧先做确定性意图路由与 query alias/rewrite，再合并图谱证据和多查询向量召回；按具体概念、关系相关性、质量标记与证据等级排序，并从长 chunk 中截取关键词最密集窗口。受控 Agent 根据证据 flags 决定回答策略和最多一次补检索，最终通过 evidence prompt 与 SSE 输出带 [C] 文献引用、[G] 图谱关系和边界提示的回答。',
    results:
      '当前已形成可部署的桌面内测闭环：456/456 篇资料完成解析，7,568/7,568 个 chunk 抽取成功；线上 Dashboard 实读为 3,684 个实体、17,816 条总关系和 7,568 个 chunk。50 题无人工关键词自然问法检索诊断记录为 50/50；默认 Agent/Qwen 27B 真实生成记录为 50/50 成功、50/50 规则检查通过。2026-07-15 线上单题操作测试返回 4 条文献引用与 12 条图谱关系，首字 4.483 秒、总计 24.899 秒。',
    collaboration:
      '这是团队研究项目。当前公开仓库的 50 次提交均来自本人 Git 身份，个人负责离线数据管线、Neo4j/Qdrant 检索、问答与受控 Agent、FastAPI、Dashboard、评测和部署等主要系统实现。学生协作任务被明确限定为问题收集、低成本回答审核、实体别名候选和文献片段复核；领域资料与医学内容来自团队和文献，不把这些内容归为个人独立产出。',
    architecture: {
      title: '从文献到可追溯回答的双库证据链',
      summary:
        '图谱负责显式关系、证据用途与路径解释，向量库负责语义召回原文 chunk；查询理解、检索组织、回答策略和评测记录把两条链路连接成可诊断的系统，而不是把图谱作为回答后的装饰。',
      flow: [
        {
          label: '01 / Corpus',
          title: '文献摄取与分块',
          description: '解析 456 篇研究资料，清洗并切分为 7,568 个带来源元数据的 chunk。',
        },
        {
          label: '02 / Extract',
          title: '实体关系抽取',
          description: '并发抽取实体、关系与证据，支持状态记录、断点续跑、重试和归一化。',
        },
        {
          label: '03 / Store',
          title: 'Neo4j + Qdrant',
          description: '图数据库保存实体、关系、Evidence 与 Chunk 链路；向量库保存 7,568 个 chunk embedding。',
        },
        {
          label: '04 / Understand',
          title: '路由与查询扩展',
          description: '识别评估、干预、诊断边界等意图，生成关键词并执行 alias、隐含概念和自然问法重写。',
        },
        {
          label: '05 / Retrieve',
          title: '混合召回与证据组织',
          description: '融合图关系、图证据和多查询向量结果，以具体概念、质量标记、证据等级与密集窗口降噪。',
        },
        {
          label: '06 / Answer',
          title: '边界策略与流式回答',
          description: '最多一次受控补检索，按 evidence policy 生成 [C]/[G] 引用、边界提示、trace 与降级回答。',
        },
      ],
      decisions: [
        {
          title: '以 Neo4j 与 Qdrant 分担“关系解释”和“原文召回”',
          context: '单一向量结果能找到相似文本，却难稳定表达实体关系、证据用途与来源路径；只依赖图谱又会损失自然问法的语义召回。',
          decision: '实体、语义关系、Evidence 与 Chunk 链路进入 Neo4j，原文 chunk embedding 进入 Qdrant；查询时分别召回再统一排序。',
          outcome: '线上回答可以同时呈现文献 citation 与图谱路径，当前单题实测返回 4 条文献引用和 12 条关系。',
          tradeoff: '双库一致性、实体噪声与关系质量需要额外的数据治理和诊断工具。',
          evidence: 'scripts/qa/kgrag_answer.py::retrieve_context',
        },
        {
          title: '用受控 Agent 承载路由与证据策略',
          context: '研究资料问答需要可复现的安全边界，开放循环可能扩大不稳定行为，也难定位一次回答为何补检索或降级。',
          decision: '采用规则路由、evidence flags、answer policy 和最多一次固定计划补检索，并记录 trace。',
          outcome: 'Agent 成为统一调度与可观测入口；诊断边界问法可在首轮证据不足时补入评估相关图谱关系。',
          tradeoff: '确定性策略便于解释，但泛化能力取决于路由规则、别名和评测集覆盖。',
          evidence: 'scripts/qa/agent_tools.py::run_toolized_agent',
        },
        {
          title: '把质量主线放在检索与证据组织',
          context: '早期失败更多来自口语化查询、泛词压过具体概念、弱实体污染和长 chunk 截断，而不是缺少更复杂的 Agent 循环。',
          decision: '加入 query rewrite、alias 扩展、具体关键词优先、实体质量降噪、证据等级权重和关键词密集窗口截取。',
          outcome: '忽略人工 keywords 的 50 题自然问法 balanced 检索诊断由阶段性 40/50 推进至 50/50。',
          tradeoff: '结果仍依赖当前结构化题集和规则检查，需要更广的自然问题与人工评审。',
          evidence: 'scripts/qa/retrieval_diagnostics.py + scripts/retrieval/hybrid_search.py',
        },
        {
          title: '同步检索进线程池，回答通过 SSE 增量返回',
          context: 'Neo4j、Qdrant、embedding 与模型调用均可能阻塞 FastAPI async handler；完整回答延迟又不适合让界面长期静默。',
          decision: '非流式路径使用 run_in_threadpool，流式端点输出 routing、retrieving、follow-up、token、done 或 degraded 事件。',
          outcome: '线上 Ask 能展示阶段状态、首字和总耗时；本次验证 SSE 请求返回 200 且无业务控制台报错。',
          tradeoff: '当前仍是单实例内部测试部署，尚未验证持续流量下的资源隔离与容量边界。',
          evidence: 'scripts/qa/kgrag_api.py::ask_stream + frontend/src/App.tsx',
        },
        {
          title: '让评测、诊断和协作数据形成回流闭环',
          context: '“能回答”不足以定位是检索、证据、生成还是边界策略失效，团队返还的人工数据也需要统一格式与校验。',
          decision: '建设 50 题评测、baseline/Agent compare、单 query 检索诊断、Dashboard 运行记录和学生 CSV 校验合并流程。',
          outcome: '可查看失败检查、自然问法命中、延迟与治理候选，并把问题、审核、别名和 chunk 复核结果纳入后续迭代。',
          tradeoff: '当前质量通过主要是规则检查，不等同于领域专家对答案质量的确认。',
          evidence: 'scripts/qa/evaluate_qa.py + scripts/qa/return_store.py',
        },
      ],
      media: {
        src: 'assets/images/asd-kgrag/ask-graph-evidence.png',
        alt: 'ASD-KGRAG 单次回答展开后的图谱证据路径',
        caption: '线上实测 · 回答所用 12 条关系及其可视化路径',
        fit: 'contain',
        position: 'center',
      },
    },
    evidenceMedia: [
      {
        src: 'assets/images/asd-kgrag/dashboard-performance.png',
        alt: 'ASD-KGRAG Dashboard 中的模型性能记录',
        caption: '模型性能记录 · Qwen3.5-27B balanced Agent 的 50 题运行结果与耗时',
        fit: 'contain',
        position: 'center',
      },
    ],
    audit: {
      title: '线上问答与 Dashboard 操作审计',
      date: '2026-07-15',
      environment: 'master@7678744；本地 Python venv；线上 Nginx/FastAPI；Chromium 1440×1000',
      summary:
        '在不修改线上配置与数据的前提下，完成一次自然问法的完整流式问答，并只读巡检 Dashboard 概览、实体、关系、图谱、题集和性能页面；同时复跑当前 HEAD 的 unittest，问答、证据展示与管理链路均完成验证。',
      checks: [
        {
          title: '当前 HEAD 单元测试',
          result: '16/16 通过，覆盖 query rewrite、retrieval cache、证据 fallback、评测检查、密钥持久化和 Agent gate。',
          detail: '.venv/bin/python -B -m unittest discover -s tests -v',
          status: 'passed',
        },
        {
          title: '线上 SSE 问答',
          result: '请求返回 200，回答未降级；首字 4.483s、总计 24.899s，附 4 条文献引用和 12 条图谱关系。',
          detail: '问题属于单一表现能否判断 ASD 的诊断边界自然问法；回答明确要求专业评估。',
          status: 'passed',
        },
        {
          title: 'Dashboard 只读巡检',
          result: '登录后 stats、graph-data、entities、relations、benchmarks 与 eval-questions 请求均返回 200。',
          detail: '登录前 /auth/verify 的 401 为预期鉴权行为；未触发模型基准、编辑、上传或删除操作。',
          status: 'passed',
        },
        {
          title: '50 题评测记录',
          result: '自然问法检索诊断 50/50；默认 Agent 真实生成记录 50/50 成功、50/50 规则检查通过。',
          detail: '题集仍较结构化，质量判定以规则为主，不能据此推导普遍回答质量提升。',
          status: 'qualified',
        },
      ],
    },
    research: {
      title: '融合视觉语义与证据重排序的孤独症康复 GraphRAG 问答方法研究',
      status: '拟开展 · 题目暂定',
      role: '团队内主要系统开发与实现，拟负责多模态管线、实验平台与系统集成',
      summary:
        '后续计划在当前文本 GraphRAG 与评测基线上引入 VLM，把文献图表或康复场景中的视觉语义转换为可追溯证据，并与文本 chunk、实体关系共同重排序。研究重点放在视觉证据如何进入图谱、如何保留来源边界，以及多模态证据重排是否能在自然问法与边界问题上带来可测量改进。',
      questions: [
        '如何把视觉内容对齐到文献 chunk、实体和关系，同时保留来源、时间与证据等级？',
        '如何根据 query route 联合重排视觉证据、图谱关系和向量文本，抑制泛实体与弱证据？',
        '如何通过自然问法、人工复核、对照与消融实验区分 VLM、重排序和数据治理各自的贡献？',
      ],
      deliverables: [
        'VLM 视觉语义抽取与证据入库原型',
        '多模态证据重排序、对照与消融实验',
        '可复现实验记录与论文草稿，后续再决定投稿安排',
      ],
      boundary:
        'VLM 管线、多模态实验和论文均属于后续计划，当前尚未实现、完成实验或投稿；现阶段可核验成果仍是文本 GraphRAG 系统、检索诊断和线上内测。',
    },
    boundaries: [
      '当前定位为研究资料检索与证据化问答工程，不用于诊断、治疗建议或替代专业评估。',
      'VLM、视觉语义融合、多模态证据重排序与论文投稿均是规划内容，不能写成当前成果。',
      'Agent 是受控确定性工作流，回答质量主线仍是数据、图谱、检索、重排序与证据组织。',
      '50/50 结果来自当前 50 题结构化题集与规则检查，不能证明对开放问题的普遍质量提升。',
      '图谱仍存在孤立实体、单 chunk 实体、低置信关系和跨类型别名冲突，route-aware relation rerank 仍待继续推进。',
      '线上操作审计只覆盖一次 Ask 和 Dashboard 只读路径，不代表长时间稳定性或容量结论。',
    ],
    roadmap: [
      { label: '文本 GraphRAG 闭环', status: 'done' },
      { label: '证据重排 / 数据治理', status: 'current' },
      { label: 'VLM 视觉语义融合', status: 'planned' },
      { label: '多模态对照 / 消融', status: 'planned' },
      { label: '论文撰写与投稿', status: 'planned' },
    ],
  },
  {
    slug: 'rm2026',
    title: 'RoboMaster 电控框架',
    subtitle: 'STM32F407 + FreeRTOS 机器人电控工程',
    category: ['embedded', 'robotics'],
    featured: true,
    role: '应用层主要开发者',
    period: '2025.12 - 2026.04',
    status: 'in-progress',
    evidence: {
      level: 'B',
      items: [
        '本地仓库 65 次本人提交',
        '主固件 app.elf 本地交叉编译通过，RAM 59.74% / FLASH 9.12%',
        '约 30 个联调 demo 目标，抽样 4 个编译通过',
        'infantry_minimal / infantry_shoot_et08_demo / vt_link_monitor_demo / integrated_vt_km_demo 编译通过',
        '公开 basic_framework 分支',
      ],
    },
    cover: {
      src: 'assets/images/rm2026-code.png',
      alt: 'RM2026 robot_cmd 应用层代码截图',
      caption: 'basic_framework 分支中的统一控制命令应用层',
      fit: 'cover',
      position: 'center top',
    },
    summary:
      '基于 YueLuRM 基础框架，在 STM32F407 上完成应用层迁移、输入后端抽象和调试 demo。覆盖底盘、云台、发射控制链路，ET08/DT7/VT03-VT13 图传输入后端和消息中心解耦架构。',
    highlights: [
      '将裸机 demo 迁移至 FreeRTOS 应用层（Src/application），统一初始化与任务调度',
      '设计 robot_cmd 输入后端，将 ET08/DT7/VT 协议映射为统一控制结构并集中急停仲裁',
      '实现 VT 图传 21B UART 帧解析、CRC16/CCITT 校验、流重同步和离线检测',
      '以 robot_def.h 集中 CAN/ID、PID、串口和输入映射，降低跨文件调参成本',
      '提供 VT 链路监视和步兵最小框架独立调试 demo',
    ],
    metrics: [
      { value: '65', unit: '本人提交', description: '本地 basic_framework 分支可核验' },
      { value: '~30', unit: '联调目标', description: 'CMake 构建体系，输出 ELF/HEX/BIN' },
    ],
    stack: [
      { domain: '硬件平台', items: ['STM32F407', 'FreeRTOS', 'HAL'] },
      { domain: '通信协议', items: ['CAN', 'UART/SBUS', 'ET08', 'DT7/DR16', 'VT03/VT13'] },
      { domain: '构建', items: ['CMake', 'ARM GCC', 'OpenOCD'] },
      { domain: '调试', items: ['VOFA+', 'SEGGER RTT', '串口 monitor'] },
    ],
    links: [
      {
        label: '代码仓库 (basic_framework)',
        url: 'https://github.com/totrytakeoff/RM2026/tree/basic_framework',
        type: 'repo',
      },
    ],
    upstream:
      '基于 HNUYueLuRM/YueLu 旧框架二次开发；ST HAL、FreeRTOS、CMSIS-DSP 为第三方上游组件。',
    boundaries: [
      '个人工作集中在现有框架上的应用层迁移、输入后端、通信链路和调试 demo。',
      '当前处于单板全向步兵与 ET08 上车联调阶段，完整整车验收仍待补充。',
      'test_infantry_chassis_gimbal_et08_demo 当前编译失败，其余约 30 个目标也未进行全量通过验证。',
      '实机稳定性仍需视频、日志和调参曲线补证。',
    ],
    roadmap: [
      { label: '应用层迁移', status: 'done' },
      { label: '输入后端 / VT 链路', status: 'done' },
      { label: '实机联调验收', status: 'current' },
      { label: '自动化测试 / CI', status: 'planned' },
    ],
  },
  {
    slug: 'colorful-u1',
    title: 'Colorful-U1',
    subtitle: 'Snapmaker U1 混合多色打印路由系统',
    category: ['embedded'],
    featured: true,
    role: '下游分支核心开发者',
    period: '2026.06 - 至今',
    status: 'mvp-verified',
    evidence: {
      level: 'B',
      items: [
        '68 个下游提交，集中在 source graph / route plan / G-code safety',
        '77 个 Docker dry-run 回归用例',
        'T0/T1/T2 原生 + T3 ACE 拓扑完成混合打印 MVP（README 记录）',
        '真实 U1 切片 dry-run 记录 route events [0,3,2,1,2,3]，job done 100%',
        'T0 stale 恢复至 current_source=null（2026-06-29 实机记录）',
      ],
    },
    cover: {
      src: 'assets/images/Colorful_U1/aceandu1.webp',
      alt: 'Snapmaker U1 与 Anycubic ACE 并列连接的实机环境',
      caption: 'U1 原生进料与外接 ACE 并存的 mixed routing 硬件拓扑',
      fit: 'cover',
      position: 'center center',
    },
    showcaseMedia: [
      {
        src: 'assets/images/Colorful_U1/u1_1.webp',
        alt: 'Snapmaker U1 实机正面与进料环境',
        caption: 'U1 实机 · 原生进料头与外接供料环境细节',
        fit: 'contain',
        position: 'center top',
      },
      {
        src: 'assets/images/Colorful_U1/u1_2.webp',
        alt: 'Snapmaker U1 打印腔体与工具头实机细节',
        caption: 'U1 打印腔体 · 路由执行最终落到真实工具头与材料路径',
        fit: 'cover',
        position: 'center center',
      },
    ],
    summary:
      '基于 multiACE/SnapAce 二次开发，为 Snapmaker U1 原生进料头与 Anycubic ACE 建立显式路由模型。通过 Web preflight、route plan v2、G-code rewrite 和打印前安全校验实现 native/ACE 混合打印闭环。',
    highlights: [
      '设计 source graph 模型，以显式 edge 约束 native/ACE source 与物理 toolhead 映射',
      '实现 route plan v2，保存 graph hash 和 initial_state，打印前校验并阻止过期计划执行',
      '增加 G-code 安全门，阻断 P1S/Bambu 机型签名、G380/M620 等危险命令',
      '建立 77 个 Docker dry-run 回归用例，覆盖 mixed routing、stale 恢复和 route plan 篡改',
      '编写实机部署脚本，包含远端备份、Klipper 重启、ready 健康检查和文件一致性校验',
    ],
    metrics: [
      { value: '77', unit: '回归用例', description: 'Docker dry-run，覆盖 routing/safety/stale' },
      { value: '68', unit: '下游提交', description: 'source graph / route plan / G-code safety' },
    ],
    stack: [
      { domain: '后端', items: ['Python', 'FastAPI', 'Moonraker API'] },
      { domain: '固件扩展', items: ['Klipper extras', 'G-code rewrite'] },
      { domain: '测试', items: ['Docker dry-run', 'mock Moonraker'] },
      { domain: '部署', items: ['Shell 脚本', 'SSH 部署'] },
    ],
    links: [
      {
        label: '代码仓库',
        url: 'https://github.com/totrytakeoff/Colorful-U1',
        type: 'repo',
      },
    ],
    upstream:
      '下游 Fork 自 decay71/multiACE（上游链路：BlackFrogKok/SnapAce → decay71/multiACE → Colorful-U1）。SnapAce/multiACE 的原始 ACE 协议、多 ACE 基础支持和 Web UI 框架不属于个人贡献。',
    boundaries: [
      '当前是基于 multiACE/SnapAce 的硬件控制 beta 分支。',
      '个人贡献集中在 mixed routing、source graph、route plan、安全门和回归测试。',
      'native + ACE 同 head 的完整实机混合打印仍待进一步验证。',
      '77 个条目是已建立的 dry-run 用例数量，本次审计未执行全量复跑。',
    ],
  },
  {
    slug: 'so101-lerobot',
    title: 'SO101 + LeRobot',
    subtitle: '真实机械臂基础控制与 ROS2/视觉抓取路线',
    category: ['robotics', 'embedded'],
    featured: true,
    role: '规划与核心控制实现',
    period: '2026.07 - 至今',
    status: 'in-progress',
    evidence: {
      level: 'B',
      items: [
        '22 个 unittest 全部通过（2026-07-11 本地复跑）',
        '1Mbps 总线识别 6 个 STS3215，定位并解决供电电压异常',
        '完成 SO101 位置标定，读取 6 关节归一化状态',
        '持久控制器 + Unix Socket CLI 实现，包含状态机、goal 抢占和 fault_hold',
        '五次平滑轨迹 + 逐关节限速，单测验证峰值不超配置速度',
      ],
    },
    cover: {
      src: 'assets/images/so101-reference.webp',
      alt: 'SO101 六轴机械臂硬件',
      caption: 'SO101 总线舵机、标定与持久控制器的硬件对象',
      fit: 'cover',
      position: 'center center',
    },
    summary:
      '在 Arch Linux + Python 3.12 + LeRobot 环境完成 SO101 六轴总线舵机识别、标定与状态读取，实现持久控制器和 Unix Socket CLI，建立安全控制底座；规划 ROS2 driver、URDF 和视觉抓取路线。',
    highlights: [
      '1Mbps 总线识别 6 个 STS3215，定位并修复供电电压异常',
      '实现命名姿态、五次平滑轨迹和 10–60Hz 可配置持久控制器',
      'Unix Socket CLI 支持 goal 抢占、取消、stop/release 和 fault_hold',
      '轨迹、关节配置、状态机与通信异常注入共 22 个单元测试通过',
      '规划 ROS2 driver、URDF、RViz、仿真、OpenCV 视觉和 pick-place 路线',
    ],
    metrics: [
      { value: '22', unit: '单测通过', description: '2026-07-11 本地复跑，全部通过' },
      { value: '6', unit: '关节', description: 'STS3215 总线舵机，控制器默认 60Hz' },
    ],
    stack: [
      { domain: '硬件', items: ['SO101', 'Feetech STS3215', 'Arch Linux'] },
      { domain: '控制', items: ['Python', 'LeRobot 0.5.2', '五次轨迹', 'Unix Socket'] },
      { domain: '测试', items: ['unittest', 'fake robot 故障注入'] },
      { domain: '路线规划', items: ['ROS2 Humble', 'URDF/RViz', 'OpenCV', 'MuJoCo/Gazebo'] },
    ],
    links: [],
    roadmap: [
      { label: '基础控制', status: 'done' },
      { label: '真机验收', status: 'current' },
      { label: 'ROS2 / RViz', status: 'planned' },
      { label: '视觉抓取', status: 'planned' },
      { label: '策略学习', status: 'planned' },
    ],
    boundaries: [
      '当前仅验证 ROS2 Humble Docker CLI，driver 与相关 ROS2 package 尚未落地。',
      '视觉、仿真和抓取仍属于后续路线阶段。',
      '22 个单测使用 fake robot，不能替代持久控制器真机验收。',
      '控制器默认 60Hz 是软件配置，不代表已完成长期真机稳定性测试。',
    ],
  },
  {
    slug: 'byteide',
    title: 'ByteIDE',
    subtitle: 'Qt 6 + QScintilla 轻量 IDE',
    category: ['systems'],
    featured: true,
    role: '独立开发',
    period: '2025.01 - 2025.03',
    status: 'release',
    evidence: {
      level: 'B',
      items: [
        '公开仓库，40 次提交',
        '5 个公开 Release，最新 ByteIDE-forPy-v1.2.0（2025-03-02）',
        'MIT 许可证',
      ],
    },
    cover: {
      src: 'assets/images/byteide-ui.png',
      alt: 'ByteIDE 桌面界面截图',
      caption: 'Qt 6 与 QScintilla 集成的编辑、文件树和终端界面',
      fit: 'cover',
      position: 'center top',
    },
    showcaseMedia: [
      {
        src: 'assets/images/byteide-ui-secondary.png',
        alt: 'ByteIDE 打开 Python 文件时的编辑与终端界面',
        caption: '工程文件树、多标签编辑、Python 高亮与内嵌终端布局',
        fit: 'contain',
        position: 'center top',
      },
    ],
    summary:
      '基于 C++17/Qt6/QScintilla 开发的轻量 IDE，实现工程文件树、多标签编辑、C++/Python 语法高亮与补全、查找替换、QProcess 内嵌终端和代码运行，发布 5 个可下载 Release。',
    highlights: [
      '使用 QFileSystemModel + QTreeView 实现工程文件树和资源管理',
      '使用 QTabWidget 管理多标签编辑，并集成 QScintilla 的 C++/Python 高亮补全',
      '通过 QProcess 接入内嵌终端、代码运行与进程终止控制',
      '实现查找、前后匹配、替换和全部替换',
      '发布 5 个 Release，最新版本为 ByteIDE-forPy-v1.2.0',
    ],
    metrics: [
      { value: '5', unit: 'Release', description: '公开可下载，最新发布于 2025-03-02' },
    ],
    stack: [
      { domain: '语言', items: ['C++17'] },
      { domain: 'GUI', items: ['Qt 6', 'QScintilla', 'QTabWidget', 'QTreeView'] },
      { domain: '系统', items: ['QProcess', 'CMake'] },
    ],
    links: [
      {
        label: '代码仓库',
        url: 'https://github.com/totrytakeoff/ByteIDE',
        type: 'repo',
      },
      {
        label: 'Release v1.2.0',
        url: 'https://github.com/totrytakeoff/ByteIDE/releases',
        type: 'release',
      },
    ],
    boundaries: [
      '编辑能力通过 QScintilla 集成，项目未自行实现编辑器内核。',
      '当前定位为轻量桌面开发工具，尚无插件系统和语言服务生态。',
      '跨平台构建记录、长期使用反馈和 Release 下载数据仍待补充。',
    ],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getProjectsByCategory(
  category: ProjectCategory | 'all',
): Project[] {
  if (category === 'all') return projects
  return projects.filter((project) => project.category.includes(category))
}
