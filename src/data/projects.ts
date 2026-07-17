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
        src: 'assets/images/mychat/group-chat-roundtrip.webp',
        alt: 'MyChat 多成员群聊往返验证界面',
        caption: '群聊往返 · 群消息持久化后向在线成员完成投递',
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
    title: 'RM2026',
    subtitle: 'RoboMaster 多车型电控框架与 FreeRTOS 实时运行时',
    category: ['embedded', 'robotics'],
    featured: true,
    role: '机器人电控开发 / 框架重构主要开发',
    period: '2025.12 - 至今',
    status: 'iterating',
    evidence: {
      level: 'A',
      items: [
        'RoboMaster 2026 个人具名证书：1 项二等奖、3 项三等奖，并有官方赛场照片',
        '当前仓库 68 次提交，其中 52 次本人署名；本轮框架重构 10/10 次本人提交',
        '当前 HEAD 的 30/30 个板级固件目标完成 ARM 交叉编译',
        '5/5 个主机测试程序通过，覆盖安全状态、设备健康、接收队列、格式化与 PID Reset',
        '正式 FreeRTOS 固件与裸机对照目标均构建通过，app.elf RAM 39.07% / FLASH 9.29%',
        'post-link 审计未发现动态堆 / stdio 禁用符号，ELF 无 RWX 段',
      ],
    },
    cover: {
      src: 'assets/images/rm2026/match-field.webp',
      alt: 'RoboMaster 官方赛场照片，画面中同时有 1 号英雄机器人与 3 号机器人',
      caption: 'RoboMaster 2026 赛场 · 框架服务于不同车型与机构控制链路',
      fit: 'cover',
      position: 'center 58%',
    },
    showcaseMedia: [
      {
        src: 'assets/images/rm2026/match-duel.webp',
        alt: '1 号英雄机器人与 3 号机器人在 RoboMaster 赛场交汇',
        caption: '比赛瞬间 · 英雄与 3 号机器人进入同一对抗场景',
        fit: 'contain',
      },
      {
        src: 'assets/images/rm2026/match-robot-03.webp',
        alt: '3 号机器人在 RoboMaster 比赛现场运行',
        caption: '比赛现场 · 机器人控制链路进入真实对抗环境',
        fit: 'cover',
        position: 'center center',
      },
      {
        src: 'assets/images/rm2026/robot-01.webp',
        alt: '1 号英雄机器人实机照片',
        caption: '1 号英雄机器人 · 云台、发射与移动底盘控制载体',
        fit: 'contain',
      },
      {
        src: 'assets/images/rm2026/robot-03.webp',
        alt: '3 号机器人实机照片',
        caption: '3 号机器人 · 赛季联调与比赛实机',
        fit: 'contain',
      },
      {
        src: 'assets/images/rm2026/team-stage.webp',
        alt: 'YZ Control 战队成员与多台 RoboMaster 机器人合影',
        caption: 'YZ Control 战队 · 多车型协作开发与赛季交付',
        fit: 'cover',
        position: 'center center',
      },
      {
        src: 'assets/images/rm2026/team-awards-wide.webp',
        alt: 'YZ Control 战队跨学院成员与比赛机器人合影',
        caption: '赛后合影 · 跨学院成员与多台参赛机器人',
        fit: 'cover',
        position: 'center center',
      },
      {
        src: 'assets/images/rm2026/team-stage-close.webp',
        alt: 'YZ Control 战队成员、校旗与比赛机器人近景合影',
        caption: '团队近景 · 机器人项目背后的协作开发成员',
        fit: 'cover',
        position: 'center center',
      },
      {
        src: 'assets/images/rm2026/awards-league.webp',
        alt: 'RoboMaster 2026 高校联盟赛个人获奖证书',
        caption: '高校联盟赛个人证书 · 步兵对抗赛二等奖 / 3V3 步兵机器人组机器人竞技奖三等奖',
        fit: 'contain',
      },
      {
        src: 'assets/images/rm2026/awards-shanghai.webp',
        alt: 'RoboMaster 2026 高校联盟赛上海站个人获奖证书',
        caption: '高校联盟赛上海站个人证书 · 3V3 非甲级队伍三等奖 / 步兵对抗赛三等奖',
        fit: 'contain',
      },
    ],
    summary:
      '面向 RoboMaster 赛季的 STM32F407 机器人电控框架，覆盖英雄、步兵等车型的底盘、云台、发射与遥控链路。先在 YueLu 基础框架上完成赛季控制和联调，再以实际问题为输入重构静态 FreeRTOS 运行时，将通信入口、状态快照、控制所有权与安全降级纳入统一边界。',
    highlights: [
      '在既有板级与通用组件上整合电机、遥控、底盘、云台和发射链路，沉淀英雄、步兵等车型的联调固件',
      '统一 ET08 / VT 控制语义，实现 VT 21B UART 帧解析、CRC16/CCITT 校验、流重同步与离线检测',
      '冻结既有控制行为，让同一 application 同时构建静态 FreeRTOS 正式固件与裸机对照目标',
      '按 application / components / platform / system / firmware / third_party 重组依赖与所有权',
      '将 ISR 收敛为有界接收入口，由任务完成协议解析并发布一致状态快照；控制任务只发布完整电机命令',
      '以统一安全状态、任务与设备健康、100ms 命令租约和 IWDG 构成故障收敛链路',
    ],
    metrics: [
      { value: '4', unit: '项赛事奖项', description: '个人证书：1 项二等奖 / 3 项三等奖' },
      { value: '30/30', unit: '板级目标', description: '当前 HEAD 全量交叉编译通过' },
      { value: '5/5', unit: '主机测试', description: '安全、健康、队列、格式化与 PID Reset' },
    ],
    stack: [
      { domain: '硬件平台', items: ['STM32F407', 'Cortex-M4F', 'ST HAL', 'CMSIS-DSP'] },
      { domain: '实时运行时', items: ['FreeRTOS', '静态分配', '任务调度', 'IWDG'] },
      { domain: '机器人控制', items: ['PID', '底盘控制', '云台控制', '发射机构', '命令租约'] },
      { domain: '通信与输入', items: ['CAN', 'UART/SBUS', 'ET08', 'DT7/DR16', 'VT03/VT13'] },
      { domain: '构建与验证', items: ['CMake', 'ARM GCC', '主机测试', 'post-link 审计', 'SEGGER RTT'] },
    ],
    links: [
      {
        label: '当前框架重构分支',
        url: 'https://github.com/totrytakeoff/RM2026/tree/refactor/infantry-freertos',
        type: 'repo',
      },
      {
        label: '赛季控制基线分支',
        url: 'https://github.com/totrytakeoff/RM2026/tree/basic_framework',
        type: 'repo',
      },
    ],
    background:
      'RoboMaster 赛季开发需要在有限周期内同时推进硬件接入、机构联调和多车型固件。项目早期为优先建立可运行的控制基线，采用 YueLu basic_framework 的板级与通用组件，在其上完成电机、遥控、底盘、云台和发射链路的适配与整合。随着设备、Demo 和车型增加，BSP、设备、控制与应用逻辑之间的依赖逐渐交织，ISR 内解析、共享可变状态和宽泛构建依赖也让正式固件难以独立验证。项目因此从“让控制链跑起来”进入“把赛季代码沉淀为可维护框架”的阶段。',
    solution:
      '重构不直接推翻已完成的机构控制，而是先冻结行为，让同一份机器人 application 同时运行在静态 FreeRTOS 正式目标与裸机对照目标上，用对照构建隔离运行时迁移风险。随后按 application、components、platform、system、firmware 与 third_party 重组代码：中断只负责有界收包，任务侧完成协议解析并发布一致快照；20ms 控制任务生成完整电机命令，5ms 电机任务独占 PID 状态与 CAN 输出；统一安全状态再结合设备健康、任务心跳、100ms 命令租约与 IWDG，将输入离线、任务停滞和命令过期收敛到明确的安全路径。',
    results:
      '项目随 YZ Control 战队进入 RoboMaster 2026 赛场，个人具名证书记录 1 项二等奖与 3 项三等奖，官方照片覆盖团队、多车型机器人与比赛现场。当前软件基线在本地完成 30/30 个板级固件目标全量交叉编译和 5/5 个主机测试程序复跑；正式 app.elf 占用 RAM 39.07%、FLASH 9.29%，post-link 审计未发现动态堆、stdio 禁用符号或 RWX 段。新的实时运行时已经形成可构建、可对照、可审计的软件基线，下一阶段继续回到实机完成重构后的整链路回归。',
    collaboration:
      '这是战队协作项目。个人工作集中在工程迁移与构建、部分电机和输入链路、英雄云台 / 发射整合、应用层组织，以及当前 FreeRTOS 运行时与框架边界重构；遥控模块、轮腿控制和部分整车固件由其他队员共同贡献。官方赛场照片与奖项用于说明真实参赛场景和团队结果，个人技术贡献则以提交记录、负责模块、构建与测试结果分别支撑。',
    upstream:
      '早期控制基线基于 HNUYueLuRM/YueLu 的 basic_framework，复用了其部分板级、设备与通用算法组件；ST HAL、FreeRTOS、CMSIS-DSP、SEGGER 等为第三方依赖。个人贡献集中在工程适配与构建、设备和输入链路、英雄机构整合、应用运行时及后续框架重构，第三方归属在仓库 THIRD_PARTY_NOTICES.md 中继续维护。',
    architecture: {
      title: '从中断输入到安全执行的实时控制闭环',
      summary:
        '正式路径把通信、状态、控制与执行拆成单向数据流：中断不承载业务决策，设备层只发布一致快照，应用层生成完整命令，执行层独占可变控制状态，所有异常最终汇入同一安全状态。',
      flow: [
        {
          label: 'INPUT',
          title: '遥控与设备反馈',
          description: 'ET08 / VT 输入、CAN 电机反馈与 BMI088 惯导数据进入板端。',
        },
        {
          label: 'ISR',
          title: '有界中断入口',
          description: 'CAN 保留最新帧，UART 写入有界队列；中断内不做完整协议解析。',
        },
        {
          label: 'SNAPSHOT',
          title: '解析与一致状态',
          description: '任务侧解析 ET08、VT、DJI 电机与 INS，并发布可校验的设备快照。',
        },
        {
          label: 'CONTROL',
          title: '机器人应用控制',
          description: '20ms 控制任务读取同一时刻状态，完成输入仲裁并发布完整电机命令。',
        },
        {
          label: 'OUTPUT',
          title: '执行与故障收敛',
          description: '5ms 电机任务独占 PID / CAN；离线、超时或任务停滞统一进入安全状态。',
        },
      ],
      decisions: [
        {
          title: '先保留赛季控制基线，再重构框架边界',
          context: '已有英雄、步兵等车型的控制与联调资产，直接重写会同时引入控制行为和架构变化。',
          decision: '保留既有机构控制与参数，把重构重点放在运行时、依赖方向和模块所有权。',
          outcome: '赛季成果可继续作为行为参照，新框架能够分阶段替换，而不是一次性推倒重来。',
          tradeoff: '迁移期会同时保留旧版 Demo 与新正式路径，需要通过目标命名和构建边界避免混用。',
        },
        {
          title: '同一 application 支撑 FreeRTOS 与裸机对照',
          context: '如果应用逻辑和调度方式同时改动，实机问题难以区分来自控制参数还是运行时迁移。',
          decision: '让正式固件与 bare-metal comparison 共享应用源文件，只替换调度与平台适配。',
          outcome: '可以在相同控制语义下对照两种运行方式，并让正式路径独立完成构建审计。',
          evidence: 'app.elf 与 baremetal_compare.elf 均在当前 HEAD 构建通过。',
        },
        {
          title: '协议解析移出 ISR',
          context: '在中断中做完整解析会放大执行时间抖动，也让异常输入与任务状态耦合。',
          decision: 'CAN 使用 latest-value mailbox，UART 使用有界接收队列，由任务完成解析和快照发布。',
          outcome: '中断路径有界，消费者只读取一致状态，通信异常也能独立统计与降级。',
        },
        {
          title: '电机任务独占 PID 与 CAN 输出',
          context: '多个任务直接修改 PID 或发送电机帧会造成竞态，也难以定义命令过期后的行为。',
          decision: '控制任务发布完整命令，5ms 电机任务独占可变控制状态，并设置 100ms 命令租约。',
          outcome: '控制计算与硬件执行职责分离，旧命令不会在上游停滞后无限持续输出。',
        },
        {
          title: '统一安全状态与静态运行时',
          context: '设备离线、任务停滞、急停和看门狗若各自处理，会产生不一致的电机行为。',
          decision: '使用统一安全状态管理器汇总设备健康、任务心跳、命令租约与 IWDG，正式路径采用静态 FreeRTOS 对象。',
          outcome: '故障能够进入可预测的 stop / zero-output 路径，运行时资源也可在链接后审计。',
        },
      ],
    },
    audit: {
      title: '当前软件基线复核',
      date: '2026-07-16',
      environment: 'Arch Linux · ARM GCC 14.2 · GCC 16.1 · CMake Debug · STM32F407',
      summary:
        '在当前 refactor 分支 HEAD 上重新执行板级全量构建、主机测试、正式 / 对照目标构建与链接后检查，结果形成当前软件基线；这些检查验证软件结构和产物，不替代重构后的整车实机回归。',
      checks: [
        {
          title: '板级固件全量构建',
          result: '30/30 个固件目标完成 ARM 交叉编译，生成对应 ELF / HEX / BIN 产物。',
          detail: '“构建目标通过”用于验证依赖和链接闭包，不等同于 30 项功能或实机测试。',
          status: 'passed',
        },
        {
          title: '主机逻辑测试',
          result: '5/5 个测试程序通过。',
          detail: '覆盖 safety、device health、formatter、RX queue 与 PID reset 行为。',
          status: 'passed',
        },
        {
          title: '正式与对照运行时',
          result: '静态 FreeRTOS app.elf 与 bare-metal comparison 目标均构建通过。',
          detail: '正式 app.elf：RAM 51,216 B（39.07%），FLASH 97,452 B（9.29%）。',
          status: 'passed',
        },
        {
          title: '链接后安全门',
          result: '未发现动态堆 / stdio 禁用符号，ELF program headers 无 RWX 段。',
          detail: '用于约束正式路径的运行时资源与可执行段权限。',
          status: 'passed',
        },
      ],
    },
    boundaries: [
      '当前重构先在一个单板机器人 application 上建立正式 FreeRTOS 软件基线；30 个固件目标全量构建通过，不等于所有车型均已完成重构后的实机验收。',
      '比赛照片与个人证书证明参赛经历和团队赛果；当前框架重构的技术结果由代码、提交、构建、测试与审计分别支撑，后续还需补充新运行时的整链路实机回归。',
    ],
    roadmap: [
      { label: '赛季多车型控制与联调', status: 'done' },
      { label: '输入链路 / 应用层整理', status: 'done' },
      { label: '静态 FreeRTOS 软件基线', status: 'done' },
      { label: '重构后实机回归', status: 'current' },
      { label: '更多机器人应用迁移', status: 'planned' },
    ],
  },
  {
    slug: 'colorful-u1',
    title: 'Colorful-U1',
    subtitle: 'Snapmaker U1 原生 / ACE 七色协同与耗材路由系统',
    category: ['embedded'],
    featured: true,
    role: '下游项目维护者 / 核心开发',
    period: '2026.06 - 至今',
    status: 'mvp-verified',
    evidence: {
      level: 'B',
      items: [
        '2026-06-05 实机记录：T0/T1/T2 保持原生，T3 由 ACE 四槽供料，native/ACE 多头协同 MVP 通过',
        '当前 main 可核验 79 个本人署名提交，其中 76 个为非合并提交',
        'Docker dry-run 主回归 91/91 通过（2026-07-16 本地复跑）',
        '真实 U1 切片 dry-run 记录 route events [0,3,2,1,2,3]，job done 100%',
        'source graph 路径已部署实机，/api/source-state 曾验证 errors=[] / warnings=[]',
        'T0 stale 已恢复至 current_source=null、source_confidence=empty（2026-06-29 实机记录）',
        '仓库版本为 1.0.0，包含 Linux/macOS Bash 与 Windows PowerShell 安装器',
      ],
    },
    cover: {
      src: 'assets/images/colorful-u1/aceandu1.webp',
      alt: 'Snapmaker U1 与 Anycubic ACE 并列连接的实机环境',
      caption: '第一版实机拓扑 · 一台 ACE 服务一个工具头，其余三个工具头保留原生进料',
      fit: 'cover',
      position: 'center center',
    },
    showcaseMedia: [
      {
        src: 'assets/images/colorful-u1/ace.webp',
        alt: '装有四色耗材的 Anycubic ACE 供料设备',
        caption: '外部耗材来源 · Anycubic ACE 四槽供料设备',
        fit: 'cover',
        position: 'center center',
      },
      {
        src: 'assets/images/colorful-u1/u1_1.webp',
        alt: 'Snapmaker U1 实机正面与原生进料环境',
        caption: '打印设备 · Snapmaker U1 四工具头与原生进料环境',
        fit: 'contain',
        position: 'center top',
      },
      {
        src: 'assets/images/colorful-u1/u1_2.webp',
        alt: 'Snapmaker U1 打印腔体与工具头实机细节',
        caption: '执行对象 · route plan 最终驱动真实工具头与耗材路径',
        fit: 'cover',
        position: 'center center',
      },
      {
        src: 'assets/images/colorful-u1/works1.webp',
        alt: '多种多色 3D 打印成品陈列',
        caption: '输出样例 · 多色模型与不同材料组合的实机打印成品',
        fit: 'cover',
        position: 'center center',
      },
      {
        src: 'assets/images/colorful-u1/dragon.webp',
        alt: '黑绿色多色龙模型打印成品',
        caption: '成品细节 · 黑绿双色龙模型',
        fit: 'cover',
        position: 'center center',
      },
      {
        src: 'assets/images/colorful-u1/duck.webp',
        alt: '紫色与黄色组合的鸭子打印模型',
        caption: '成品细节 · 紫黄双色模型',
        fit: 'cover',
        position: 'center center',
      },
      {
        src: 'assets/images/colorful-u1/penguin.webp',
        alt: '黑白黄色组合的企鹅打印模型',
        caption: '成品细节 · 多色企鹅模型',
        fit: 'contain',
        position: 'center center',
      },
      {
        src: 'assets/images/colorful-u1/works2.webp',
        alt: '陈列架上的多种 3D 打印模型',
        caption: '作品陈列 · 设备持续打印产出的模型样例',
        fit: 'contain',
        position: 'center center',
      },
    ],
    evidenceMedia: [
      {
        src: 'assets/images/colorful-u1/colorful_u1_upload.png',
        alt: 'Colorful-U1 上传打印页面中的 route plan 校验与耗材映射',
        caption: '0.97.2b 内测打印页 · Mapping、Route validate 与 Source state 通过后才开放发送',
        fit: 'contain',
      },
      {
        src: 'assets/images/colorful-u1/colorful_u1_analyze.png',
        alt: 'Colorful-U1 颜色排布分析与模型预览页面',
        caption: '颜色排布分析 · 通道分组、换料估算与 G-code 模型预览',
        fit: 'contain',
      },
    ],
    summary:
      '基于 multiACE，先将全局互斥的原生 / ACE 模式下沉到工具头级，实现一个工具头使用 ACE 四槽、其余三个工具头保留原生进料的 U1 七色协同；随后推翻 head mode 与整台 ACE 固定绑头的限制，将耗材入口抽象为 source graph，为 source 到 toolhead 的任意组合映射建立统一路由底座。',
    highlights: [
      '将 multiACE 的全局模式下沉为 per-head native / ace 配置，完成单头 ACE 四色与其余三头原生进料的七色协同 MVP',
      '推翻 per-head 二选一模型，将 native feeder 与每个 ACE slot 统一抽象为 source，以 edge 表达 source 到 toolhead 的可达关系',
      '实现 route plan v2，冻结 graph hash、initial state、tool map 与 structured events，拒绝过期或被篡改的计划',
      '将 load、unload、swap、recover 收敛到单 active-operation 状态机，每步执行后重新读取传感器与来源状态',
      '建立 G-code fail-closed 安全门，阻断 P1S/Bambu 机型签名、G380/M620 等不兼容指令，并对 rewrite 结果二次校验',
    ],
    metrics: [
      { value: '91/91', unit: '回归通过', description: '2026-07-16 Docker dry-run 主脚本复跑' },
      { value: '79', unit: '本人提交', description: '当前 main 作者统计，含 3 个合并提交' },
      { value: '7', unit: '色协同', description: '3 路原生进料 + 1 台 ACE 的 4 个槽位' },
    ],
    stack: [
      { domain: '控制后端', items: ['Python', 'FastAPI', 'WebSocket', 'Moonraker API'] },
      { domain: '固件与切片', items: ['Klipper extras', 'G-code rewrite', 'Source Graph'] },
      { domain: 'Web UI', items: ['Vue 3', 'Three.js', 'HTML/CSS'] },
      { domain: '验证', items: ['Docker Compose', 'mock Moonraker', 'Browser smoke'] },
      { domain: '交付', items: ['Shell', 'PowerShell', 'SSH', 'nginx'] },
    ],
    links: [
      {
        label: '代码仓库',
        url: 'https://github.com/totrytakeoff/Colorful-U1',
        type: 'repo',
      },
      {
        label: '中文项目说明',
        url: 'https://github.com/totrytakeoff/Colorful-U1/blob/main/README.zh-CN.md',
        type: 'doc',
      },
      {
        label: 'Source Graph 架构',
        url: 'https://github.com/totrytakeoff/Colorful-U1/blob/main/colorful-u1/docs/source_graph_architecture.md',
        type: 'doc',
      },
    ],
    background:
      '原 multiACE 以全局 normal / single / multi 模式切换 U1 原生进料器与 ACE，进入 ACE 控制后便不能让其他工具头继续以原生进料方式参与同一打印任务。Colorful-U1 的第一版先把这项全局状态下沉到每个工具头：指定一个工具头由 ACE 的四个槽位供料，其余三个工具头仍使用各自的原生进料器，由此实现 U1 配合一台 ACE 的七色协同打印。这个方案解决了“能否混用”，却仍把每个工具头固定标记为 native 或 ace，并把整台 ACE 绑定到一个工具头；当目标继续扩展为 ACE slot 任意分配、一个工具头拥有多个来源，甚至 native 与 ACE source 在同一工具头间切换时，继续增加 mode 和绑定字段已经无法清晰表达这些组合。',
    solution:
      '第一阶段，我新增 per-head native / ace 配置、ACE 到目标工具头的显式绑定，以及包含 HEAD / ACE / SLOT 的换料命令；mixed resolver 再把切片工具分别解析到原生工具头或 ACE slot，完成七色协同 MVP。第二阶段，我不再继续扩展 head mode，而是把 native feeder 和每个 ACE slot 都抽象为独立 source，工具头只保留喷嘴、传感器和当前装载状态，source 与 toolhead 通过 edge 组合。规划层因此只处理统一的 source → head 目标，不需要为 native / ACE 组合继续增加分支；具体硬件差异由 execution profile 转换为对应进退料命令。Web preflight 最终生成并校验 route plan v2，再由 G-code rewrite 与 operation state machine 执行。',
    collaboration:
      '我维护 Colorful-U1 下游仓库：先完成 multiACE 全局模式到工具头级模式的改造、mixed preflight 与七色协同 MVP，再主导 source graph、route plan、Web 路由、安全门、状态恢复与安装流程的后续重构；当前 main 中可核验 79 个本人署名提交。ACE 协议、多 ACE 基础能力与早期 Web 框架来自 SnapAce/multiACE 及社区贡献，相关历史、GPL-3.0 许可和上游署名在仓库中保留。',
    architecture: {
      title: '从全局模式到 Source Graph',
      summary:
        '这次重构不是直接从零设计一套路由系统，而是两次递进式拆分：先把上游的全局原生 / ACE 选择下沉到工具头，验证七色协同能够工作；再识别出 per-head mode 仍把来源类型固化在工具头上，最终将 source 从 toolhead 身份中彻底拆出。',
      flow: [
        {
          label: '01 / Upstream',
          title: '全局模式互斥',
          description: 'multiACE 通过 normal / single / multi 切换整机控制方式，原生进料与 ACE 无法在同一任务中协同。',
        },
        {
          label: '02 / MVP v1',
          title: '模式下沉到工具头',
          description: '引入 per-head native / ace 与 aceN_head，让一个头交给 ACE，其余三个头继续使用原生 feeder。',
        },
        {
          label: '03 / Verified',
          title: '七色协同 MVP',
          description: 'ACE 四槽在单头内换色，另外三头保持原生供料；mixed preflight 与实机核心切换链路完成验证。',
        },
        {
          label: '04 / Refactor',
          title: '来源与工具头解耦',
          description: 'native feeder 与 ACE slot 统一成为 source，edge 独立描述每个 source 可以进入哪些 toolhead。',
        },
        {
          label: '05 / Generalize',
          title: '统一规划与执行',
          description: 'route plan 只面向 source → head 目标，execution profile 再负责不同来源的具体硬件命令。',
        },
      ],
      media: {
        src: 'assets/images/colorful-u1/colorful_u1_dashboard.png',
        alt: 'Colorful-U1 控制台中的工具头、source 与 ACE 运行状态',
        caption: '0.97.2b 内测控制台 · Toolhead、Source、ACE 与 error 状态显式呈现',
        fit: 'contain',
      },
      decisions: [
        {
          title: '先用 per-head mode 验证协同能力',
          context: '上游的全局 ACE mode 无法让原生工具头与 ACE 工具头共同参与同一打印任务。',
          decision: '先把 native / ace 状态下沉到四个工具头，并以 aceN_head 显式指定整台 ACE 服务的目标头。',
          outcome: '一个工具头使用 ACE 四槽，其余三个工具头保持原生进料，形成 3 + 4 的七色协同拓扑并完成实机 MVP。',
          tradeoff: '这是为快速验证 mixed printing 设计的过渡模型，每个 head 仍只能属于一种来源类型，整台 ACE 也仍固定绑定一个 head。',
          evidence: 'colorful-u1/docs/native_ace_mvp_plan.md',
        },
        {
          title: '再将 source 从 toolhead 身份中拆出',
          context: 'slot 任意分头、单头多 source 或 native / ACE 同头切换，都无法用不断增加 head mode 组合清晰表达。',
          decision: '将每个 native feeder 和 ACE slot 建模为独立 source，以 edge 描述 source 到 head 的物理可达关系。',
          outcome: '旧单头四色、已验证的七色拓扑、1+1+2+2 和同头多来源可以由同一模型描述，规划层统一输出 source / head。',
          tradeoff: '规划层不再区分来源类型，但执行层仍通过 execution profile 处理不同硬件动作；实际 PTFE 可达性仍需人工确认。',
          evidence: 'colorful-u1/web/backend/source_graph.py',
        },
        {
          title: '冻结计划，而不是打印时临时猜测',
          context: '如果发送阶段仍接受 tool target 覆盖，预览结果可能与最终硬件命令不一致。',
          decision: 'route plan v2 保存 graph hash、initial state、events 和命令参数，打印前再次校验。',
          outcome: 'graph 变化、运行态漂移、资源冲突或 profile 命令被篡改时，任务会在发送前失败。',
          evidence: 'colorful-u1/web/backend/main.py · route-plan validate/print',
        },
        {
          title: '状态提交必须服从硬件后验检查',
          context: '传感器只说明有料/无料，不能单独证明耗材来源；失败后乐观清空映射会丢失恢复路径。',
          decision: 'load/unload/swap/recover 使用单 active operation，逐步执行并在每一步后回读状态。',
          outcome: '失败时保留 current_source 与来源置信度，stale/unknown/orphaned 状态阻止普通打印并进入专门恢复路径。',
          tradeoff: '流程更保守，异常状态需要人工确认或恢复，但避免系统自动猜测物理来源。',
          evidence: 'colorful-u1/docs/unified_slot_toolhead_flow.md',
        },
        {
          title: '对不兼容 G-code 采取 fail-closed',
          context: '一次 P1S/Bambu 启动段曾把 G380 等命令带入 U1 Web 发送路径并触发 Z 轴错误。',
          decision: '扫描机型签名、危险指令与启动段顺序；rewrite 后二次校验，不做字符串级自动转换。',
          outcome: 'P1S/Bambu 签名、G380、M620 系列及不完整 route contract 会在上传打印前被拒绝。',
          evidence: 'colorful-u1/docs/real_printer_gcode_validation_strategy.md',
        },
      ],
    },
    results:
      '第一版已在 T0/T1/T2 原生进料、T3 由 ACE 四槽供料的拓扑下完成 native + ACE 多头协同实机测试，形成 U1 三路原生来源与一台 ACE 四槽共同参与的七色能力。架构重构后，2026-07-16 在 Docker dry-run 环境复跑主回归，91/91 全部通过；真实 U1 切片样本也完成 preview → remap → validate → print，route events 为 [0,3,2,1,2,3]，最终 job done 100%。source graph 路径曾部署实机并取得 errors=[] / warnings=[]，但任意 slot → head 与 native / ACE 同头切换仍不能等同于已经完成全拓扑真机认证。',
    audit: {
      title: 'Docker 回归与实机记录审计',
      date: '2026-06-05 — 2026-07-16',
      environment:
        'Snapmaker U1 + 一台 Anycubic ACE 的第一版实机记录；本地 Docker Compose：真实 FastAPI Web + mock Moonraker。',
      summary:
        '审计将第一版七色协同实机 MVP、后续 Source Graph 软件回归和局部实机状态记录分层呈现：旧固定拓扑已经上机验证，新任意映射架构则按已完成的 dry-run 与实机部署范围陈述。',
      checks: [
        {
          title: '第一版七色协同 MVP',
          result: 'T0/T1/T2 使用原生进料，T3 由 ACE 四槽供料，native + ACE 多头协同核心链路通过实机测试。',
          detail: '该结果验证的是一台 ACE 固定服务一个工具头、其余三头保持原生进料的 3 + 4 拓扑。',
          status: 'passed',
        },
        {
          title: '主 dry-run 回归',
          result: '91/91 测试项通过，进程退出码为 0。',
          detail: '覆盖 mixed/native/ACE route、状态恢复、计划篡改、安全拒绝、配置保留与安装相关合同。',
          status: 'passed',
        },
        {
          title: '真实 U1 切片闭环',
          result: '真实切片样本完成 route-plan preview、remap、validate 与 mock print。',
          detail: 'route events [0,3,2,1,2,3]；job done 100%，error=None。该项属于真实输入 + 模拟硬件执行。',
          status: 'passed',
        },
        {
          title: 'T0 stale 实机恢复',
          result: '记录显示 T0 最终恢复为 current_source=null、source_confidence=empty。',
          detail: 'Klipper 空闲清理、Web 缓存过滤与 recover operation 共同修复残留来源映射。',
          status: 'passed',
        },
        {
          title: '1.0.0 完整发布预检',
          result: '仓库具备 release_preflight 与跨平台安装器，本轮未复跑完整发布预检。',
          detail: '本轮只执行主 Docker regression，不把静态检查、浏览器 CI、安装生命周期与真实硬件验收合并计算。',
          status: 'qualified',
        },
      ],
      media: [
        {
          src: 'assets/images/colorful-u1/colorful_u1_config.png',
          alt: 'Colorful-U1 设备、Source 执行与 Routing 配置页面',
          caption: '0.97.2b 内测配置页 · 设备参数、Source 执行参数与 Routing 分区管理',
          fit: 'contain',
        },
      ],
    },
    upstream:
      '上游链路为 BlackFrogKok/SnapAce → decay71/multiACE → Colorful-U1。SnapAce 提供 U1 + ACE 的原始集成，multiACE 扩展多 ACE、基础进退料、Web UI 与 preflight，但其运行语义仍以全局 normal / single / multi 模式区分原生与 ACE。我的第一版改动将这项状态下沉到工具头级并完成七色协同；后续 Source Graph 重构又移除了 head mode 作为核心路由依据。ACE 协议和上述上游基础能力不计作个人从零实现。',
    boundaries: [
      '这是基于 multiACE/SnapAce 演进的硬件控制 beta 项目，不把上游 ACE 协议、多 ACE 基础与早期 Web 框架计作个人原创。',
      '已经实机验证的是“一台 ACE 固定服务一个工具头 + 其余三个原生工具头”的七色协同 MVP；不把这一结果外推为任意 Source Graph 拓扑均已上机通过。',
      '91/91 是真实 Web 后端与 mock Moonraker 的 Docker dry-run 结果，不验证电机运动、传感器、PTFE 长度、温度、堵料或送料时序。',
      'Source Graph 已能表达任意 ACE slot → head、单头多 source 及 native / ACE 同头切换，但这些新组合仍需分阶段真机验证。',
      'stock native feeder 的可靠反向回抽尚未证明，软件保留相关 adapter 能力但不能写成硬件已验证。',
      '仓库版本已到 1.0.0，但 README 仍明确标注为硬件实验 beta，首次部署和变更接线必须小距离、单步验证。',
    ],
    roadmap: [
      { label: '单头 ACE 四色', status: 'done' },
      { label: 'U1 + 单 ACE 七色协同', status: 'done' },
      { label: 'Source Graph / Route Plan v2', status: 'done' },
      { label: '任意映射分阶段实机验收', status: 'current' },
      { label: '提前换料与调度优化', status: 'planned' },
    ],
  },
  {
    slug: 'so101-lerobot',
    title: 'SO101 + LeRobot',
    subtitle: '基于 LeRobot / ROS2 的视觉引导抓取系统',
    category: ['robotics', 'embedded'],
    featured: true,
    role: '个人项目 / 机器人软件全链路实现',
    period: '2026.07 - 至今',
    status: 'mvp-verified',
    evidence: {
      level: 'B',
      items: [
        '1 Mbps 总线完成 6 个 STS3215 识别、位置标定与关节状态读取',
        '持久控制器、Unix Socket CLI 与 ROS2 driver 复用统一命令语义',
        '五次平滑轨迹、逐关节限速和位置限位覆盖 6 关节控制链路',
        '26 个基础控制单元测试全部通过，覆盖状态机、轨迹与故障注入',
        'URDF / TF 与真实 JointState 在 RViz 中同步，MuJoCo 用于离线动作验证',
        '完成目标识别、平面坐标映射、抓取位姿生成与 pick-place 闭环演示',
      ],
    },
    cover: {
      src: 'assets/images/so101-lerobot/so101-reference.webp',
      alt: 'SO101 六轴机械臂参考硬件图',
      caption: '参考占位 · SO101 六轴机械臂硬件形态，后续替换为本项目实机照片',
      fit: 'cover',
      position: 'center center',
    },
    showcaseMedia: [
      {
        src: 'assets/images/so101-lerobot/leader-follower-reference.jpg',
        alt: 'SO-100 leader 与 follower 机械臂参考照片',
        caption: '参考占位 · Leader / Follower 双臂形态，后续替换为本项目采集与控制画面',
        fit: 'cover',
      },
      {
        src: 'assets/images/so101-lerobot/urdf-reference.png',
        alt: 'SO-100 机械臂 URDF 可视化参考画面',
        caption: '参考占位 · 机器人模型可视化，后续替换为本项目 RViz / MuJoCo 画面',
        fit: 'contain',
      },
      {
        src: 'assets/images/so101-lerobot/control-architecture.svg',
        alt: 'SO101 从舵机总线到视觉抓取的控制架构图',
        caption: '完整控制链路 · Hardware → Safety Controller → ROS2 → Vision → Pick & Place',
        fit: 'contain',
      },
    ],
    summary:
      '面向 SO101 六轴机械臂，完成从 1 Mbps 舵机总线、位置标定与安全轨迹控制，到 ROS2 驱动、URDF/RViz 状态同步、OpenCV 目标定位和规则式 pick-place 的完整闭环。',
    highlights: [
      '围绕 6 个 STS3215 建立标定、关节配置与硬件健康基线，统一管理位置边界、速度倍率、PID 和跟踪误差阈值',
      '实现 10–60 Hz 可配置持久控制器，以单一串口所有权消除多进程争用，并提供命名姿态、五次平滑轨迹和非阻塞目标提交',
      '用显式状态机处理 goal 抢占、取消、settling、stop/release、通信重试与 fault_hold，异常后冻结在实测姿态而非继续盲发目标',
      '封装 ROS2 driver、description、interfaces 与 bringup，发布 JointState，并通过 topic、service 和 action 接入关节目标与动作原语',
      '完成相机标定、HSV / ArUco 目标定位、像素到桌面及 base frame 的坐标变换，串联 IK 与可中断 pick-place 动作序列',
    ],
    metrics: [
      { value: '26', unit: '单测通过', description: '状态机、轨迹、关节配置与故障注入' },
      { value: '6', unit: '关节', description: 'STS3215 总线舵机，1 Mbps 串行总线' },
      { value: '60', unit: 'Hz', description: '持久控制循环最高配置频率' },
    ],
    stack: [
      { domain: '硬件与环境', items: ['SO101', 'Feetech STS3215', 'Overhead Camera', 'Arch Linux'] },
      { domain: '底层控制', items: ['Python 3.12', 'LeRobot', '五次轨迹', 'FK/IK', 'Unix Socket'] },
      { domain: '机器人中间件', items: ['ROS2', 'rclpy', 'JointState', 'Service/Action', 'Docker'] },
      { domain: '模型与仿真', items: ['URDF/Xacro', 'TF2', 'RViz2', 'MuJoCo'] },
      { domain: '视觉', items: ['OpenCV', '相机标定', 'HSV/ArUco', 'Homography'] },
      { domain: '验证', items: ['unittest', 'Fake Robot 故障注入', '真机 Pick & Place'] },
    ],
    links: [],
    background:
      'LeRobot 提供了 SO101 的硬件抽象，但一次性脚本不足以承载连续状态发布、多入口命令、动作中断和真实硬件异常恢复；视觉抓取还需要把相机观测、坐标系、运动学、轨迹与末端动作串成同一条可观测链路。项目因此从“让机械臂动起来”继续向下建立安全控制底座，向上打通 ROS2、模型可视化与视觉引导抓取。',
    solution:
      '系统以 Python 3.12 + LeRobot 直接管理 1 Mbps 舵机总线，ArmController 作为唯一串口所有者持续读取关节与硬件状态，并按逐关节配置生成同步五次轨迹。Unix Socket CLI 和 ROS2 driver 只提交目标与控制命令，避免上层绕过限位、限速、跟踪误差和故障锁存。ROS2 侧用 JointState、TF、service/action 统一状态与动作接口；视觉侧完成相机标定、目标检测和 frame 变换，再由 IK 与动作原语执行 approach、grasp、lift、place、release。',
    results:
      '完成 6 关节标定、状态读取、命名姿态与连续轨迹控制，持久控制器支持目标抢占、stop/release、通信恢复和硬件故障锁存；26 个基础控制单元测试全部通过。真实关节状态可同步驱动 URDF/RViz 模型，视觉节点输出 base frame 目标位姿，并由可中断动作序列完成目标抓取与分区放置。',
    architecture: {
      title: '从舵机总线到视觉抓取的分层控制链路',
      summary:
        '底层控制器独占真实硬件并给出统一安全语义，ROS2 负责模块化状态与命令编排，视觉与抓取节点只消费标准坐标和动作接口。硬件、控制、感知和任务层可以分别测试，也能组合成完整 pick-place 闭环。',
      flow: [
        {
          label: '01 / Hardware',
          title: 'STS3215 总线与标定',
          description: '1 Mbps 读取 6 关节位置、电压、温度与扭矩状态，标定结果映射为统一关节空间。',
        },
        {
          label: '02 / Safety',
          title: '持久安全控制器',
          description: '单串口所有权、五次轨迹、逐关节限速、目标抢占和 fault_hold 共同约束真实动作。',
        },
        {
          label: '03 / ROS2',
          title: '标准状态与命令接口',
          description: 'driver 发布 JointState / status，以 topic、service、action 承接关节命令和动作原语。',
        },
        {
          label: '04 / Model',
          title: 'URDF、TF 与仿真',
          description: '真实关节状态同步至 RViz；同一关节映射用于 MuJoCo 离线验证与运动学调试。',
        },
        {
          label: '05 / Vision',
          title: '目标检测与坐标变换',
          description: '将像素目标经内参、平面映射和 TF 转换为 robot base frame 下的抓取目标。',
        },
        {
          label: '06 / Action',
          title: '可中断 Pick & Place',
          description: 'IK 生成抓取姿态，按 approach、grasp、lift、place、release 编排可观测动作序列。',
        },
      ],
      media: {
        src: 'assets/images/so101-lerobot/control-architecture.svg',
        alt: 'SO101 机器人软件系统分层架构图',
        caption: '硬件控制、ROS2、模型、视觉与任务编排共享同一关节和坐标语义',
        fit: 'contain',
      },
      decisions: [
        {
          title: '用持久进程统一真实硬件所有权',
          context: '一次性脚本反复连接串口，多个入口并发时会争用总线，也无法持续维护动作状态和故障语义。',
          decision: 'ArmController 独占 LeRobot / STS3215 连接，上层 CLI 与 ROS2 节点通过协议提交目标并查询状态。',
          outcome: '连续动作无需反复建连，目标可以抢占和取消，stop、release 与 fault_hold 成为独立控制命令。',
          evidence: 'scripts/base_arm/arm_controller.py · controller_protocol.py · arm_cli.py',
        },
        {
          title: '把安全约束下沉到逐关节配置',
          context: '6 个关节的负载、范围和允许速度不同，只使用一组全局参数会让轻关节过慢或重关节跟踪失控。',
          decision: '以标定范围生成位置边界，并为每个关节配置速度倍率、硬上限、PID、跟踪误差和到位容差。',
          outcome: '同步五次轨迹遵守各关节峰值速度，越界目标先被收敛，异常跟踪进入可恢复的故障锁存。',
          evidence: 'configs/so101_joint_profiles.yaml · scripts/base_arm/joint_profile.py · trajectory.py',
        },
        {
          title: 'ROS2 只编排，不绕过底层控制器',
          context: '如果 ROS2 topic 直接写舵机，CLI、视觉和任务节点会形成多套控制路径，安全行为难以保持一致。',
          decision: 'driver 将 JointState、service/action 映射到同一控制协议，description 与 bringup 独立管理模型和启动配置。',
          outcome: '真实硬件、RViz、仿真和视觉任务共享关节命名、状态机与停止语义，各层可独立替换和验证。',
        },
        {
          title: '先用可解释视觉闭环完成抓取',
          context: '端到端策略会同时引入数据、训练和控制变量，不利于定位首个真实机械臂抓取闭环中的误差来源。',
          decision: '固定 overhead camera，以 HSV / ArUco、相机标定、Homography 和 TF 显式计算目标位姿。',
          outcome: '像素、桌面和机器人坐标逐级可视化，检测、标定、IK 或动作阶段的偏差都能单独复现和校正。',
        },
      ],
    },
  },
  {
    slug: 'codgent',
    title: 'Codgent',
    subtitle: '基于持久化文档与状态机的多 Agent 编程工作流',
    category: ['ai', 'systems'],
    featured: false,
    role: '个人项目 / 独立设计与实现',
    period: '2026.06',
    status: 'paused',
    evidence: {
      level: 'B',
      items: [
        '公开仓库 master 已同步 8 次本人提交，MVP 源码、测试与归档分析均可查',
        '2026-07-16 本地复跑 11/11 个 unittest smoke test 全部通过',
        '全新临时仓库完成 stub 端到端复测：plan → code → review → context sync → approved commit',
        '实现 stub、Codex CLI、Codex app-server、OpenCode、OpenCode session 与 Claude stream 6 种适配模式',
        'APPROVED 后生成 final / context_sync 记录、创建 Git commit，并将状态推进到下一任务',
        '仓库保留 ARCHITECTURE、PROJECT_STATUS、LESSONS_LEARNED 与 FUTURE_DIRECTIONS 复盘文档',
      ],
    },
    cover: {
      src: 'assets/images/codgent/workflow-architecture.svg',
      alt: 'Codgent 文档化多 Agent 编程工作流架构图',
      caption: 'Planner → Coder → Reviewer → Document Writer，由非 AI Orchestrator 负责状态、校验、日志与 Git 边界',
      fit: 'contain',
      position: 'center center',
    },
    showcaseMedia: [
      {
        src: 'assets/images/codgent/workflow-run.svg',
        alt: 'Codgent 在全新仓库完成一次 stub 工作流的运行记录',
        caption: '2026-07-16 独立复测 · 从 task001 需求到 APPROVED commit，并推进至 task002',
        fit: 'contain',
      },
    ],
    summary:
      '在完善 MyChat 时，为减少人工串联多个编码 Agent 的成本，设计并实现一套 Python CLI 工作流：以 Markdown handoff 和 state.json 保存任务状态，用可替换适配器驱动 Planner、Coder、Reviewer 与 Document Writer，并将校验、恢复、实时日志和 Git 提交纳入统一编排。MVP 跑通后完成效率复盘，项目暂缓继续扩张。',
    highlights: [
      '以 docs/agent_context 作为持久协作协议，统一保存项目上下文、任务计划、实现摘要、评审决定与最终记录',
      '实现 planning / coding / review / context_sync 状态机，支持 run、resume、后台执行与按 max-steps 分段推进',
      '抽象 6 种 Agent adapter，并为 Planner、Coder、Reviewer、Document Writer 分别保存 provider session 与模型配置',
      '对 plan / summary / review / context_sync 执行 frontmatter、task_id、文档类型和 review decision 校验，失败后自动修复或暂停等待人工',
      '将运行事件写入 current.json、JSONL 与完整输出文件，CLI 提供 status、sessions、logs 与 stream-output 观察入口',
      '以 dirty worktree guard、任务起点、APPROVED 自动提交和确认式 rollback 约束自动化工作流的 Git 边界',
    ],
    metrics: [
      { value: '11/11', unit: 'Smoke Test', description: '状态流转、校验修复、Git 基线、resume 与 rollback' },
      { value: '6', unit: 'Agent 模式', description: 'Codex / OpenCode / Claude / Stub 适配路径' },
      { value: '4', unit: '工作流角色', description: 'Planner / Coder / Reviewer / Document Writer' },
    ],
    stack: [
      { domain: '核心实现', items: ['Python 3.11+', 'argparse', 'dataclasses', '标准库'] },
      { domain: '工作流', items: ['状态机', 'Markdown handoff', 'JSON state', 'YAML frontmatter'] },
      { domain: '进程与协议', items: ['subprocess', 'JSON-RPC', 'JSONL events', 'threading/queue'] },
      { domain: 'Agent 接入', items: ['Codex CLI', 'Codex app-server', 'OpenCode', 'Claude Code'] },
      { domain: '工程验证', items: ['Git', 'unittest', '后台任务', '结构化日志'] },
    ],
    links: [
      {
        label: '代码仓库 (master)',
        url: 'https://github.com/totrytakeoff/codgent',
        type: 'repo',
      },
      {
        label: '架构说明',
        url: 'https://github.com/totrytakeoff/codgent/blob/master/ARCHITECTURE.md',
        type: 'doc',
      },
      {
        label: 'MVP 复盘',
        url: 'https://github.com/totrytakeoff/codgent/blob/master/PROJECT_STATUS.md',
        type: 'doc',
      },
    ],
    background:
      '在 MyChat 的连续开发中，不同编码 Agent 已经能够分别完成规划、实现和审查，但人工需要反复传递项目背景、确认任务边界、追踪运行状态并整理最终记录。Codgent 由此提出一个实验问题：能否把这些角色串成可恢复的自动工作流，同时让协作过程留在目标仓库中，而不是只存在于一次聊天上下文里。',
    solution:
      'Codgent 使用非 AI Orchestrator 读取 state.json 决定下一阶段，再通过统一 adapter 调用对应角色。每个 Agent 必须交付结构化 Markdown；编排器在推进前核对 frontmatter、task_id、文档类型与评审决定，格式失败时带诊断重试，仍不可靠则暂停交给人工。角色会话、模型、运行事件和完整输出分别持久化；任务通过评审后生成 final 与 context_sync，更新项目长期上下文并提交 Git。整个 CLI 只依赖 Python 标准库，外部 Agent 通过子进程、stream-json 或 app-server JSON-RPC 接入。',
    results:
      'MVP 完成了原始实验闭环：在全新仓库中可以初始化上下文，依次生成 plan、summary、review、final 与 context_sync，记录实时事件，在 APPROVED 后创建提交并推进下一任务；当前 11 个 smoke test 全部通过。真实开发试用也揭示了关键结论：对中小任务，串行角色调用、重复上下文装载和修复循环带来的时间成本，常常高于职责拆分的收益。因此项目在形成可运行 MVP 和完整复盘后暂停扩张，保留为多 Agent 编排、持久记忆与可审计工作流的实验基线。',
    architecture: {
      title: '文档协议、状态机与 Agent Adapter 分层',
      summary:
        'Agent 只负责角色任务，Orchestrator 掌握状态推进和安全边界；Markdown 是人可读的角色接口，state.json 与运行事件是机器可读的恢复依据，Git 则负责可回退的任务边界。',
      flow: [
        {
          label: '01 / Context',
          title: '初始化持久项目上下文',
          description: '在目标仓库建立 project context、architecture、roadmap、todo、state 与任务目录。',
        },
        {
          label: '02 / Plan',
          title: 'Planner 定义窄任务',
          description: '读取长期上下文与当前状态，生成带 task_id 和验收标准的 plan.md。',
        },
        {
          label: '03 / Code',
          title: 'Coder 实现并记录验证',
          description: '按计划修改目标仓库，将文件、命令和测试结果写入 summary.md。',
        },
        {
          label: '04 / Review',
          title: 'Reviewer 给出状态决定',
          description: '结合计划、实现摘要和仓库状态返回 APPROVED、CHANGES_REQUESTED、BLOCKED 或 NEEDS_HUMAN。',
        },
        {
          label: '05 / Sync',
          title: '同步上下文并建立 Git 边界',
          description: '批准后生成 final / context_sync、更新长期文档、提交变更并推进下一 task。',
        },
      ],
      media: {
        src: 'assets/images/codgent/workflow-architecture.svg',
        alt: 'Codgent 多 Agent 工作流与持久化产物架构',
        caption: '角色调用与控制面分离：Agent 生成内容，Orchestrator 决定状态、校验与提交',
        fit: 'contain',
      },
      decisions: [
        {
          title: '把文档当作 Agent 之间的稳定接口',
          context: '直接依赖聊天历史难以审计、恢复，也无法让不同 provider 在相同任务协议下接力。',
          decision: '用带 frontmatter 的 plan、summary、review 和 context_sync 承载角色输入输出。',
          outcome: '任务事实随仓库持久化，失败位置和角色责任可以直接检查。',
          tradeoff: '下游角色需要重新读取文档，显著增加上下文传递成本。',
        },
        {
          title: '状态推进由确定性编排器负责',
          context: '如果 Agent 自行决定下一步，格式错误或误判可能让工作流在错误状态继续运行。',
          decision: '由 Python 状态机解释 review decision、限制 revision、执行 handoff 校验与失败暂停。',
          outcome: 'Agent 输出不满足协议时不会静默推进，run 与 resume 可以从明确阶段继续。',
        },
        {
          title: '以 adapter 隔离不同 Agent 运行协议',
          context: 'Codex、OpenCode 与 Claude 的调用、事件格式和会话续接方式不同。',
          decision: '统一 AgentResult / AgentEvent，分别适配 CLI、JSON 流、session 与 app-server thread。',
          outcome: '每个角色可以独立选择 provider 和模型，编排层保持相同工作流语义。',
        },
        {
          title: '把可观察性与 Git 安全放进 MVP',
          context: '长时间外部进程如果只有最终输出，用户无法判断卡住、失败还是仍在执行；自动提交也可能混入原有改动。',
          decision: '持续记录事件和原始输出，并在任务开始检查 dirty worktree、记录起点、批准后提交。',
          outcome: '前台、后台和恢复流程都有可追踪记录，自动化变更保持独立任务边界。',
        },
        {
          title: '用实验结论结束当前架构扩张',
          context: 'MVP 已证明串行多角色流水线可运行，但重复调用、上下文重建和 review repair 显著拖慢中小任务。',
          decision: '暂停继续产品化，完整保留实现与复盘；未来只在低协调成本架构或强审计场景下重启。',
          outcome: '项目以可复现原型和明确工程结论收束，而不是继续堆叠控制面功能。',
        },
      ],
    },
    audit: {
      title: 'Codgent MVP 独立复核',
      date: '2026-07-16',
      environment: 'Arch Linux · Python 3.14.5 · Git 2.54.0 · unittest',
      summary:
        '复核公开 master 与本地 HEAD 一致，并在不修改项目仓库的前提下执行完整 smoke tests；随后以新建临时 Git 仓库运行 stub 工作流，检查产物、状态推进和提交结果。',
      checks: [
        {
          title: 'Smoke test 回归',
          result: '11/11 个 unittest 用例全部通过。',
          detail: '覆盖 Git 初始化、脏工作区保护、handoff 校验与修复、resume、模型状态、rollback 和完整 stub 流程。',
          status: 'passed',
        },
        {
          title: '全新仓库端到端流程',
          result: 'task001 完成 planning、coding、review、context sync 与 APPROVED commit。',
          detail: '生成 plan / summary / review / final / context_sync 和 JSONL 事件记录，状态推进至 task002 / planning。',
          status: 'passed',
        },
        {
          title: '公开仓库同步',
          result: 'GitHub master 与本地 HEAD 均为 34042c7，共 8 次本人提交。',
          detail: '源码、测试、架构、状态复盘与后续方向现已公开可查。',
          status: 'passed',
        },
        {
          title: '依赖边界',
          result: '核心 Python package 仅使用标准库，pyproject 要求 Python 3.11+。',
          detail: 'Codex、OpenCode 与 Claude 作为外部命令按所选 adapter 接入。',
          status: 'passed',
        },
      ],
    },
    boundaries: [
      '当前成果定位为串行多 Agent 工作流 MVP 与工程实验，不作为无人值守的软件开发平台；最强可重复证据是状态机、文档协议、Git 边界与 stub 回归。',
      '项目已暂停主动开发，后续方向是单一主 Agent + 并行检索 / 测试 worker + 可选评审，而不是继续增加固定串行角色。',
    ],
    roadmap: [
      { label: '文档化 handoff 协议', status: 'done' },
      { label: '状态机 / run / resume', status: 'done' },
      { label: '多 Provider 会话适配', status: 'done' },
      { label: '校验 / 日志 / Git 边界', status: 'done' },
      { label: '低协调成本架构重启', status: 'planned' },
    ],
  },
  {
    slug: 'my-niri-desk',
    title: 'my-niri-desk',
    subtitle: 'Arch Linux 上可安装的 niri + QuickShell 桌面预设',
    category: ['systems'],
    featured: false,
    role: '桌面预设维护者 / 集成开发',
    period: '2026.04 - 至今',
    status: 'iterating',
    evidence: {
      level: 'B',
      items: [
        '公开 master 共 27 次本人提交，本地 HEAD 与远端 b56dc9e 一致',
        '当前 Arch 工作站正在运行 Niri 26.04 双屏会话，QuickShell 由 systemd user service 托管',
        '本轮 niri validate、fuzzel --check-config 与 QuickShell 实例检查通过',
        '公开 v0.1.0 正式 Release 与 rolling 预发布均提供可安装 x86_64 Arch 包',
        '当前 HEAD 的 GitHub Actions package-release 构建成功',
        'systemd-oomd 当前采用 75% Swap Used Limit，并监控 app.slice / background.slice',
      ],
    },
    cover: {
      src: 'assets/images/my-niri-desk/workflow-desktop.webp',
      alt: 'my-niri-desk 实际 Niri 桌面中的终端与快捷工作流记录',
      caption: '实际桌面记录 · 以键盘导航、截图链路和滚动平铺组织日常工作流',
      fit: 'cover',
      position: 'center center',
    },
    showcaseMedia: [
      {
        src: 'assets/images/my-niri-desk/niri-config.webp',
        alt: '在实际桌面环境中编辑 Niri 配置与截图快捷键',
        caption: '配置即工作流 · Niri 快捷键、工具入口与当前桌面行为由版本化配置统一管理',
        fit: 'cover',
        position: 'center center',
      },
    ],
    summary:
      '将个人长期使用的 niri + QuickShell 桌面从零散 dotfiles 整理为 Arch Linux 预设包：统一交付窗口管理、启动器、剪贴板、截图录屏、会话恢复、壁纸与系统控制，并通过用户态服务、OOM 策略和配置同步工具维护日常运行。',
    highlights: [
      '以 PKGBUILD、payload/skel 和 my-niri-desk-apply 建立安装链，应用配置前自动备份用户目录并替换路径占位符',
      '将 QuickShell 组织为顶栏、启动器、灵动岛、通知、左右侧栏和锁屏，Launcher 覆盖应用、窗口、壁纸、文件与工具五种模式',
      '以 desk-run 统一路由截图、OCR、录屏、壁纸、剪贴板、会话、系统监控、歌词和天气等桌面工具',
      '实现 Niri 会话持续保存与恢复，记录应用、显示器、工作区和列布局，并适配双屏滚动平铺工作流',
      '用独立 quickshell.service 和 desk-app-run 拆分长期 Shell 与高风险应用进程，结合 app.slice / background.slice 的 oomd 策略控制故障影响范围',
      '提供配置漂移工具，支持 status / diff / pull / push、路径过滤与 checksum 比较，使本机配置和仓库模板可双向维护',
    ],
    metrics: [
      { value: '27', unit: '次公开提交', description: '从打包基线持续迭代到启动器、会话、壁纸与 OOM 治理' },
      { value: '5', unit: '种 Launcher 模式', description: '应用、窗口、壁纸、文件与工具统一入口' },
      { value: '75%', unit: 'Swap 阈值', description: '当前 systemd-oomd 提前介入配置' },
    ],
    stack: [
      { domain: '窗口与显示', items: ['niri', 'Wayland', 'XWayland Satellite', '双屏布局'] },
      { domain: '桌面壳层', items: ['QuickShell', 'QML', 'Qt 6', 'Niri IPC'] },
      { domain: '自动化', items: ['Bash', 'Python', 'desk-run', '配置漂移同步'] },
      { domain: '服务治理', items: ['systemd --user', 'systemd-oomd', 'cgroup', 'desk-app-run'] },
      { domain: '桌面工具', items: ['cliphist', 'grim/slurp/satty', 'OCR', 'wf-recorder', 'awww/matugen'] },
      { domain: '交付', items: ['Arch PKGBUILD', 'GitHub Actions', 'GitHub Release', 'AUR 发布视图'] },
    ],
    links: [
      {
        label: '代码仓库 (master)',
        url: 'https://github.com/totrytakeoff/my-niri-desk',
        type: 'repo',
      },
      {
        label: 'Rolling Arch 包',
        url: 'https://github.com/totrytakeoff/my-niri-desk/releases/tag/rolling',
        type: 'release',
      },
      {
        label: '安装说明',
        url: 'https://github.com/totrytakeoff/my-niri-desk/blob/master/docs/INSTALL.md',
        type: 'doc',
      },
    ],
    background:
      'Niri 提供了滚动平铺和工作区模型，但一个可长期使用的桌面还需要顶栏、启动器、通知、网络与音频控制、输入法、剪贴板、截图录屏、锁屏、壁纸和会话恢复。早期这些能力散落在不同配置与脚本中，换机和升级需要手动拼装；应用进程集中在同一 transient scope 时，内存压力也可能把桌面壳层和多个应用一起带走。项目因此从“个人配置可用”继续推进到“配置能够安装、运行、升级和恢复”。',
    solution:
      '仓库把配置拆成系统包载荷与用户应用阶段：PKGBUILD 安装模板、apply 与 OOM 配置工具，my-niri-desk-apply 先备份现有配置，再把 skel 展开到用户目录并启用 QuickShell 服务。运行态由 Niri 管理窗口和双屏工作区，QuickShell 通过 IPC 组合 Launcher、Bar、Dynamic Island、通知与侧栏，desk-run 则把截图、剪贴板、会话和壁纸脚本收敛为稳定命令入口。高风险快捷启动通过 desk-app-run 进入独立 systemd user unit，同时保留 Launcher 对单实例桌面应用的原生 .desktop 启动语义；配置维护侧再以 checksum 驱动的 sync-local-config 识别仓库与本机漂移。',
    results:
      '这套预设目前直接运行在个人 Arch Linux 工作站上，覆盖 1920×1080 外接屏与 3072×1920 内屏，并持续承载浏览器、开发工具、通信软件和工程应用。当前 Niri 配置通过校验，QuickShell 服务处于 active 状态且本次启动无重启；systemd-oomd 已按 75% Swap Used Limit 监控桌面 app.slice 与 background.slice。公开交付侧保留 v0.1.0 正式包和持续更新的 rolling 0.2.0 包，最新 package-release 工作流构建成功。',
    upstream:
      '桌面能力建立在 niri、QuickShell、wayscrollshot、cliphist、awww、matugen 等开源组件上；QuickShell 界面配置最初以源码注释所称的 Archirithm 配置为基线。个人工作集中在 Arch 打包与应用链、Niri/QuickShell 整合、启动器与剪贴板扩展、统一工具调度、会话和壁纸状态、配置同步，以及 systemd / oomd 运行治理，不将上游 compositor、shell engine 或第三方工具能力计为从零实现。',
    architecture: {
      title: '从 Arch 包到长期运行桌面的配置闭环',
      summary:
        '项目把源码模板、用户配置、桌面运行时和维护工具分成四个边界：包负责交付，apply 负责安全展开，Niri / QuickShell / systemd 负责运行，sync 与 Release 负责持续迭代。',
      flow: [
        { label: '01 / Package', title: '版本化桌面载荷', description: 'PKGBUILD 汇总依赖、配置模板、apply 脚本和 OOM 工具，并由 CI 构建 Arch 包。' },
        { label: '02 / Apply', title: '备份并展开用户配置', description: 'my-niri-desk-apply 备份原配置、替换路径、创建运行目录并启用用户服务。' },
        { label: '03 / Session', title: 'Niri + QuickShell 运行时', description: 'Niri 管理双屏滚动平铺，QuickShell 统一桌面壳层并通过 IPC 暴露交互入口。' },
        { label: '04 / Tools', title: '桌面工具与状态编排', description: 'desk-run 连接剪贴板、截图录屏、壁纸、会话恢复和系统信息，systemd 隔离关键进程。' },
        { label: '05 / Maintain', title: '漂移检查与持续发布', description: '本机和 skel 通过 status / diff / pull / push 同步，GitHub Actions 更新 rolling 包。' },
      ],
      decisions: [
        {
          title: '把 dotfiles 做成“包 + 显式 apply”',
          context: '直接由包管理器覆盖用户配置会破坏已有桌面，也让升级难以回滚。',
          decision: '包只安装版本化 skel 与工具，用户主动执行 apply；应用前按时间戳备份原配置。',
          outcome: '依赖与模板能够统一交付，同时保留用户对何时迁移和如何恢复的控制。',
        },
        {
          title: '用单一 QuickShell 根节点装配桌面能力',
          context: '顶栏、通知、启动器、侧栏和锁屏若各自启动，会重复状态后端并增加生命周期分歧。',
          decision: '由 shell.qml 装配主要模块，通过 QuickShell IPC 接收 Niri 快捷键与工具调用。',
          outcome: '桌面组件共享 Niri、网络、媒体和通知状态，入口与重启策略保持一致。',
        },
        {
          title: '区分隔离启动与原生 .desktop 启动',
          context: '把所有程序强制塞进 transient service 会改善 cgroup 隔离，但 Zed、VSCode 等单实例转发器可能启动变慢或交接失败。',
          decision: '快捷键和工具按钮使用 desk-app-run 独立 unit，Launcher 主列表保留 appObj.execute()。',
          outcome: '终端、文件管理器等入口获得独立故障边界，同时保留复杂桌面应用原有启动语义。',
        },
        {
          title: '让仓库与本机配置保持可检测漂移',
          context: '实际使用中会直接修改 ~/.config，单向复制很容易让修复遗失或把个人壁纸误提交。',
          decision: '以受管路径、checksum 和排除规则实现 status / diff / pull / push，默认排除个人壁纸。',
          outcome: '本机试验可以被发现并选择性回灌，仓库更新也能在应用前预览差异。',
        },
      ],
    },
    roadmap: [
      { label: 'Arch 包与 Release', status: 'done' },
      { label: 'QuickShell 桌面闭环', status: 'done' },
      { label: '会话 / 工具 / OOM 治理', status: 'done' },
      { label: '当前配置持续回灌', status: 'current' },
      { label: '多机器安装验证', status: 'planned' },
    ],
  },
  {
    slug: 'verge-tui',
    title: 'verge-tui',
    subtitle: 'Rust + Ratatui 的无桌面 Mihomo / Clash 控制台',
    category: ['systems'],
    featured: false,
    role: '个人项目 / 独立开发',
    period: '2026.03',
    status: 'paused',
    evidence: {
      level: 'B',
      items: [
        '公开仓库 main 与本地 HEAD 一致，7 次本人提交，源码、文档与发布配置可查',
        '已发布 v0.1.0 与 v0.1.1，提供 Linux、macOS、Windows 构建产物',
        '2026-07-16 本地以 Rust 1.93.0 对 v0.1.1 执行 workspace test 与 release build，编译通过',
        '实现 Overview / Profiles / Proxies / Logs 四个 TUI 工作区及命令模式',
        '实现 Mihomo REST / WebSocket 客户端，覆盖配置、代理切换、延迟、流量与连接数据',
        '具备 GitHub Actions 多平台 CI、Release、Debian 包与 APT Pages 发布链路',
      ],
    },
    cover: {
      src: 'assets/images/verge-tui/dashboard-overview.png',
      alt: 'verge-tui 真实运行时 Dashboard 页面',
      caption: '真实运行截图 · 独立 Mihomo 核心启动后，Dashboard 汇总 Profile、代理组、系统代理、TUN 与运行日志',
      fit: 'cover',
      position: 'center top',
    },
    showcaseMedia: [
      {
        src: 'assets/images/verge-tui/profiles.png',
        alt: 'verge-tui 订阅 Profile 管理与状态详情页面',
        caption: 'Profiles · 查看订阅用量与状态，刷新订阅并切换当前 Profile',
        fit: 'contain',
        position: 'center top',
      },
      {
        src: 'assets/images/verge-tui/proxy-groups.png',
        alt: 'verge-tui 代理组与候选节点选择页面',
        caption: 'Proxies · 左侧选择代理组，右侧浏览并切换候选节点',
        fit: 'contain',
        position: 'center top',
      },
      {
        src: 'assets/images/verge-tui/runtime-logs.png',
        alt: 'verge-tui 运行日志页面',
        caption: 'Logs · 记录独立核心启动、运行配置、订阅调度与 Profile 应用过程',
        fit: 'contain',
        position: 'center top',
      },
      {
        src: 'assets/images/verge-tui/command-help.png',
        alt: 'verge-tui 命令与快捷键帮助页面',
        caption: 'Help · Profile、节点、延迟测试、订阅、系统代理、TUN 与后端策略命令入口',
        fit: 'contain',
        position: 'center top',
      },
      {
        src: 'assets/images/verge-tui/exit-policy.png',
        alt: 'verge-tui 退出后端策略确认窗口',
        caption: 'Exit Policy · 退出 UI 时选择保留后端，或停止 Mihomo 并执行清理',
        fit: 'contain',
      },
    ],
    summary:
      '为解决 Linux 图形代理客户端不稳定、无桌面环境又缺少完整控制入口的问题，将 Clash Verge Rev 的核心管理能力整理为独立 Rust TUI：在终端中完成订阅、节点、流量、系统代理与 TUN 管理，并将界面生命周期和 Mihomo 后端生命周期拆开控制。',
    highlights: [
      '用 Ratatui + Crossterm 实现 Overview、Profiles、Proxies、Logs 四个工作区，统一键盘导航、帮助层和命令模式',
      '封装 Mihomo REST / WebSocket 客户端，接入代理组切换、单项 / 批量延迟测试、配置热更新、实时流量与连接统计',
      '实现 Direct Core First 启动策略：发现并接管现有 Unix Socket，必要时生成运行配置并启动独立 verge-mihomo',
      '建立订阅导入、重试更新、自动刷新与本地状态持久化，支持从 URL、命令行参数或文本文件批量导入',
      '将 system proxy、TUN 切换、退出清理与后端保留策略纳入同一状态机，避免 UI 退出时遗留代理和路由状态',
      '配置三平台 CI / Release，并补齐 AUR、Debian 包和可签名静态 APT 仓库的交付脚本',
    ],
    metrics: [
      { value: '2', unit: '公开 Release', description: 'v0.1.0 / v0.1.1，多平台构建产物可下载' },
      { value: '3', unit: 'Rust Crate', description: 'TUI、Mihomo API client 与状态 / 订阅核心分层' },
      { value: '3', unit: '桌面平台', description: 'Linux / macOS / Windows CI 与 Release matrix' },
    ],
    stack: [
      { domain: '语言与异步', items: ['Rust 2024', 'Tokio', 'async/await', 'mpsc'] },
      { domain: '终端交互', items: ['Ratatui', 'Crossterm', 'Sparkline', '键盘事件'] },
      { domain: '网络与协议', items: ['reqwest', 'WebSocket', 'Mihomo REST API', 'Unix Socket'] },
      { domain: '配置与状态', items: ['Serde', 'YAML', '订阅管理', '状态持久化'] },
      { domain: '系统集成', items: ['Mihomo', 'system proxy', 'TUN', 'Linux capabilities'] },
      { domain: '工程交付', items: ['GitHub Actions', 'AUR', 'Debian', 'APT Repository'] },
    ],
    links: [
      { label: '代码仓库 (main)', url: 'https://github.com/totrytakeoff/verge-tui', type: 'repo' },
      { label: 'Release v0.1.1', url: 'https://github.com/totrytakeoff/verge-tui/releases/tag/v0.1.1', type: 'release' },
      { label: '使用说明', url: 'https://github.com/totrytakeoff/verge-tui/blob/main/docs/USAGE.md', type: 'doc' },
      { label: '架构说明', url: 'https://github.com/totrytakeoff/verge-tui/blob/main/docs/ARCHITECTURE.md', type: 'doc' },
    ],
    background:
      '项目源于一个直接的 Linux 使用痛点：Clash Verge Rev 图形客户端在当时的环境中频繁崩溃，而且服务器、TTY 与远程维护场景没有桌面可用；已有命令行工具又很难同时覆盖订阅更新、节点选择、实时状态和系统代理控制。目标因此不是重做代理内核，而是为 Mihomo 提供一个不依赖桌面的完整日常控制面。',
    solution:
      '工程拆为 verge-tui、verge-core 与 mihomo-client 三个 crate。TUI 层处理视图、键盘事件、后台任务与退出确认；core 层保存配置、profile 和订阅状态；client 层统一访问 Mihomo REST API，并通过 WebSocket 持续接收 traffic 与 connections。启动时优先发现 Clash Verge 配置和已有 Unix Socket，复用运行中的核心；否则从当前订阅生成独立 runtime YAML 并拉起 verge-mihomo。系统代理和 TUN 的启停、权限诊断、后端保留策略与退出恢复则集中在应用状态中处理。',
    results:
      '项目形成了可下载安装的 v0.1.1：用户可在四个终端工作区或命令模式中导入 / 更新订阅、切换 profile 与节点、执行批量延迟测试、观察实时流量，并管理 system proxy、TUN 和核心进程。当前源码在 2026-07-16 完成 workspace 编译测试与 release 构建复核；GitHub 同时保留三平台 CI / Release、AUR、Debian 与 APT 发布配置。项目在个人代理工具迁移后暂停主动维护，但已交付的终端控制闭环和版本仍公开可查。',
    upstream:
      '项目从 Clash Verge Rev 的核心管理能力中提取并重构为独立 TUI，运行时依赖 Mihomo；系统代理与特权服务后备路径分别复用 clash-verge-rev/sysproxy-rs 和 clash-verge-service-ipc。个人工作集中在终端交互、三层 Rust workspace、Direct Core First 生命周期、订阅 / 状态管理及独立发布链路。',
    architecture: {
      title: '终端控制面与代理核心解耦',
      summary:
        '界面只负责交互和调度，状态、订阅与 API 通信分别下沉；运行中的 Mihomo 可以被接管、独立启动或在界面退出后继续保留。',
      flow: [
        { label: '01 / Discover', title: '发现本地运行环境', description: '读取 verge-tui 与 Clash Verge 配置，探测 controller、Unix Socket、核心二进制和当前 profile。' },
        { label: '02 / Adopt or Spawn', title: '接管或启动 Mihomo', description: '优先复用可用 Socket；不可用时生成 runtime YAML，启动并健康检查独立核心。' },
        { label: '03 / Control', title: '执行订阅与代理操作', description: '通过 TUI 快捷键或命令模式更新订阅、切换节点、测试延迟和修改运行配置。' },
        { label: '04 / Observe', title: '订阅实时运行数据', description: 'REST 拉取结构化状态，WebSocket 持续更新 traffic、connections 与界面曲线。' },
        { label: '05 / Exit Policy', title: '按策略收束系统状态', description: '退出时由用户或持久策略决定保留后端，或停止核心并恢复 system proxy / TUN。' },
      ],
      decisions: [
        {
          title: '优先控制现有核心，而不是强制再启动一份',
          context: 'Linux 桌面与无桌面场景可能已经存在 Clash Verge 管理的 Mihomo；重复启动会造成端口、Socket 与系统代理冲突。',
          decision: '启动时先探测现有 controller / Unix Socket，只有不可用时才生成独立配置并拉起核心。',
          outcome: '同一套 TUI 能覆盖接管和独立运行两种入口，也减少与现有客户端争抢运行资源。',
        },
        {
          title: '把持续数据放入 WebSocket 后台通道',
          context: '流量和连接数据持续变化，若在 200ms UI tick 中同步请求会阻塞输入与绘制。',
          decision: 'mihomo-client 建立 traffic / connections WebSocket，并通过 Tokio mpsc 把最新值送回 App。',
          outcome: '界面循环只消费可用更新，实时曲线和键盘交互保持解耦。',
        },
        {
          title: '将 UI 退出与代理后端退出拆开',
          context: '终端界面关闭不代表用户希望网络代理中断，但无条件保留又可能遗留系统代理或 TUN 路由。',
          decision: '提供 always-on、always-off、query 三种后端退出策略，并在停止路径执行清理。',
          outcome: '临时关闭界面可以继续代理，需要完全退出时也有明确的状态恢复路径。',
        },
        {
          title: '用 workspace 隔离交互、领域状态和协议细节',
          context: '如果配置、订阅、HTTP/WebSocket 与 Ratatui 绘制全部留在单一应用层，后续维护会持续放大耦合。',
          decision: '拆分 verge-tui、verge-core、mihomo-client 三个 crate，以数据结构和异步接口连接。',
          outcome: 'API 与订阅逻辑可独立于终端布局演进，交付仍保持单一二进制。',
        },
      ],
    },
    audit: {
      title: 'verge-tui v0.1.1 工程复核',
      date: '2026-07-16',
      environment: 'Arch Linux · Rust 1.93.0 · Cargo 1.93.0 · x86_64',
      summary:
        '核对公开 main、Release、三平台工作流与本地 HEAD，并在不修改源仓库的前提下执行 workspace test、release build、Shell 语法检查和格式检查。',
      checks: [
        { title: 'Release 构建', result: 'verge-tui v0.1.1 release profile 编译成功。', detail: '产出 x86_64 ELF 可执行文件，约 8 MiB。', status: 'passed' },
        { title: 'Workspace 测试命令', result: '3 个 crate 的 test 与 doc-test 均完成，0 failed。', detail: '当前仓库未定义单元测试用例，因此该结果证明测试目标可编译，不作为功能正确性指标。', status: 'qualified' },
        { title: '公开交付记录', result: 'GitHub 可核验 v0.1.0 与 v0.1.1 两个 Release。', detail: 'Release workflow 构建 Linux、macOS、Windows 产物，并在 Linux 侧生成 Debian 包。', status: 'passed' },
        { title: '静态工程检查', result: '安装与打包 Shell 脚本通过 bash -n；cargo fmt --check 未通过。', detail: '格式检查仅涉及 main.rs 两处换行排版，不影响本轮编译结果。', status: 'qualified' },
      ],
    },
    boundaries: [
      '代理协议与数据面由 Mihomo 提供；本项目交付的是终端控制面，并基于 Clash Verge Rev 相关组件完成核心接入、系统代理和特权服务兼容。',
    ],
    roadmap: [
      { label: '终端控制闭环', status: 'done' },
      { label: '多平台 Release', status: 'done' },
      { label: 'Debian / AUR 交付链路', status: 'done' },
      { label: '恢复维护与测试补强', status: 'planned' },
    ],
  },
  {
    slug: 'desktop-file-manager',
    title: 'Desktop File Manager',
    subtitle: 'GNOME Shell 应用菜单中的 .desktop 就地管理扩展',
    category: ['systems'],
    featured: false,
    role: '个人项目 / 独立开发',
    period: '2026.02',
    status: 'verified',
    evidence: {
      level: 'B',
      items: [
        '公开 master 保留 v1 / v1.1 两次独立提交，扩展源码、Schema 与使用说明可查',
        '在 GNOME 应用菜单中提供 Edit Entry / Open Entry Location / Properties / Remove from system 四个就地动作',
        '2026-07-17 在 GNOME Shell 50.1 DevKit 中扩展状态为 ACTIVE，四条操作路径均有真实录屏',
        'v1.1 对系统目录条目创建 Hidden=true / NoDisplay=true 的用户级覆盖，不修改包管理文件',
        '仓库 metadata 声明 GNOME Shell 45–49，四个菜单动作均可由 GSettings 独立隐藏',
      ],
    },
    cover: {
      src: 'assets/images/desktopfilemanager/context-menu.png',
      alt: 'GNOME 应用菜单中由 Desktop File Manager 注入的四个管理动作',
      caption: '真实运行界面 · 在应用右键菜单中直接编辑、定位、查看或移除 .desktop 条目',
      fit: 'contain',
      position: 'center center',
    },
    showcaseMedia: [
      {
        src: 'assets/images/desktopfilemanager/edit-entry-source.webp',
        alt: '从 GNOME 应用菜单打开并编辑 desktop entry 的操作录屏',
        caption: 'Edit Entry · 交给系统默认编辑器打开对应 .desktop 文件',
        fit: 'contain',
      },
      {
        src: 'assets/images/desktopfilemanager/open-entry-location.webp',
        alt: '从 GNOME 应用菜单定位 desktop entry 文件的操作录屏',
        caption: 'Open Entry Location · 在文件管理器中定位并选中实际条目文件',
        fit: 'contain',
      },
      {
        src: 'assets/images/desktopfilemanager/view-properties.webp',
        alt: '在 GNOME Shell 中查看应用 Desktop Entry 属性的操作录屏',
        caption: 'Properties · 查看应用元数据、Desktop Entry 字段与原始文件内容',
        fit: 'contain',
      },
      {
        src: 'assets/images/desktopfilemanager/remove-entry.webp',
        alt: '从 GNOME 应用列表移除系统 desktop entry 的操作录屏',
        caption: 'Remove from system · 确认后删除用户条目，或为系统条目创建当前用户隐藏覆盖',
        fit: 'contain',
      },
    ],
    summary:
      '面向 GNOME 应用列表中 .desktop 启动项难以直接管理的问题，将编辑、文件定位、属性检查和移除四个动作接入应用右键菜单，并针对用户条目与系统条目采用不同的安全处理路径。',
    highlights: [
      '通过 InjectionManager 扩展 AppMenu.open，在保留 GNOME 原有菜单结构的同时按固定顺序注入四个管理动作',
      '使用 GLib.KeyFile 解析 Desktop Entry，集中展示 Name、Exec、Icon、Categories、Hidden 等字段和原始文件内容',
      '调用 org.freedesktop.FileManager1.ShowItems 定位并选中文件，D-Bus 调用失败时回退到打开父目录',
      '区分用户与系统条目：前者直接删除，后者在 ~/.local/share/applications 创建同名 Hidden / NoDisplay 覆盖',
      '以 GSettings 控制各菜单项显隐，并在扩展 disable 时断开信号、关闭弹窗和清理已注入菜单项',
    ],
    metrics: [
      { value: '4', unit: '个就地动作', description: '编辑、定位、属性与移除均从应用右键菜单进入' },
      { value: '2', unit: '类移除策略', description: '用户条目删除 / 系统条目用户级隐藏' },
      { value: '45–49', unit: 'Shell 版本', description: '仓库 metadata 声明的 GNOME Shell 范围' },
    ],
    stack: [
      { domain: '扩展开发', items: ['GJS', 'JavaScript ES Modules', 'GNOME Shell Extension'] },
      { domain: 'Shell UI', items: ['AppMenu', 'InjectionManager', 'St', 'Clutter', 'ModalDialog'] },
      { domain: '系统接口', items: ['GLib', 'Gio', 'Shell.AppSystem', 'D-Bus FileManager1'] },
      { domain: '桌面规范', items: ['Desktop Entry', 'XDG Data Directory', 'GSettings Schema'] },
    ],
    links: [
      {
        label: '代码仓库 (master)',
        url: 'https://github.com/totrytakeoff/desktop-file-manager',
        type: 'repo',
      },
    ],
    background:
      'GNOME 的应用列表适合启动程序，却没有为启动项提供直接的文件管理入口。手动安装、Wine 应用、脚本工具和已经卸载不干净的软件会在菜单里留下散乱图标；要处理它们，通常需要先判断条目来自 ~/.local/share/applications 还是 /usr/share/applications，再手动查找、编辑或隐藏对应文件。这个项目把这段离散操作收回到应用图标本身。',
    solution:
      '扩展在 AppMenu 打开时解析当前 Shell.App 对应的 Desktop Entry，并动态加入 Edit、Open Location、Properties 与 Remove 四个动作。编辑交给系统默认处理程序；定位通过 FileManager1 的 ShowItems 精确选中文件；属性弹窗同时读取 Gio.AppInfo、GLib.KeyFile 解析结果和原始内容。移除操作遵循文件所有权：用户目录条目可以直接删除，而系统目录条目在权限拒绝后写入当前用户的同名覆盖，以 Hidden=true 和 NoDisplay=true 从应用列表隐藏，避免改动由系统包管理器维护的文件。',
    results:
      '项目以 v1 完成应用菜单内的编辑、定位、属性与删除入口，v1.1 将系统条目的处理从“权限不足”推进为用户级隐藏覆盖，形成了完整的就地管理路径。当前公开仓库保留实现与安装说明；真实操作素材覆盖四个动作，扩展也在本轮 GNOME Shell DevKit 会话中成功进入 ACTIVE 状态。',
    boundaries: [
      '“Remove from system”管理的是应用菜单条目：系统目录中的 .desktop 文件不会被删除或卸载软件，而是通过当前用户覆盖从菜单中隐藏。',
    ],
  },
  {
    slug: 'byteide',
    title: 'ByteIDE',
    subtitle: 'Qt 6 Widgets + QScintilla 轻量代码编辑器',
    category: ['systems'],
    featured: true,
    role: '个人项目 / 独立开发',
    period: '2025.01 - 2025.06',
    status: 'release',
    evidence: {
      level: 'B',
      items: [
        '公开仓库 main 分支 40 次提交，源码与开发过程可查',
        '5 个公开 Windows 安装包 Release：2 个 Full 版本、3 个 Python 特供版本',
        '最新 ByteIDE-forPy-v1.2.0 发布于 2025-03-02，安装包仍可下载',
        'QMainWindow、QDockWidget、QFileSystemModel、QTreeView、QTabWidget 与 QProcess 实现均可在源码定位',
        'MIT 许可证',
      ],
    },
    cover: {
      src: 'assets/images/byteide/byteide-ui-secondary.png',
      alt: 'ByteIDE Windows 开发截图中的文件树、Python 编辑器与输出区域',
      caption: '项目开发期 Windows 截图 · QFileSystemModel 文件树、QScintilla Python 编辑区与 QProcess 输出区',
      fit: 'contain',
      position: 'center top',
    },
    showcaseMedia: [
      {
        src: 'assets/images/byteide/byteide-ui.png',
        alt: 'ByteIDE 空白编辑页与内嵌终端布局',
        caption: '主界面布局 · 菜单、工具栏、多标签编辑区与底部终端 Dock',
        fit: 'contain',
        position: 'center top',
      },
    ],
    summary:
      '基于 Qt 6 Widgets 与 QScintilla 独立开发的 Windows 轻量代码编辑器，集成文件工作区、多标签编辑、C++ / Python 高亮补全、查找替换、内嵌终端和代码运行，并发布 5 个可下载安装版本。',
    highlights: [
      '用 QMainWindow、QAction、QMenu、QToolBar、QDockWidget 和状态栏搭建完整桌面应用壳层',
      '以 QFileSystemModel + QTreeView 管理目录，新建、删除、重命名与打开动作联动多标签编辑区',
      '将 QScintilla 封装为 EditArea，按扩展名切换 C++ / Python lexer，并接入 API 补全、行号、折叠与当前行标记',
      '基于 QProcess 实现带工作目录、历史命令和交互输入的终端，以及 Python / C++ 运行与强制终止入口',
      '沿 onlyForPy 分支持续修复中文 I/O、终端重启与工作目录问题，并交付 Full / Python 两类 Windows 安装包',
    ],
    metrics: [
      { value: '5', unit: 'Windows Release', description: '2 个 Full + 3 个 Python 特供安装包' },
    ],
    stack: [
      { domain: '语言与构建', items: ['C++17', 'Qt 6 Widgets', 'CMake'] },
      { domain: '窗口与交互', items: ['QMainWindow', 'QAction', 'QMenu/QToolBar', 'QDockWidget', '信号槽'] },
      { domain: 'Model / View', items: ['QFileSystemModel', 'QTreeView', 'QTabWidget'] },
      { domain: '编辑器集成', items: ['QScintilla', 'QsciLexerCPP', 'QsciLexerPython', 'QsciAPIs'] },
      { domain: '系统集成', items: ['QProcess', 'QFile/QDir', 'Windows'] },
      { domain: '交付', items: ['Inno Setup', 'Python 3.12', 'MinGW'] },
    ],
    links: [
      {
        label: '代码仓库 (main)',
        url: 'https://github.com/totrytakeoff/ByteIDE/tree/main',
        type: 'repo',
      },
      {
        label: 'Windows Release v1.2.0',
        url: 'https://github.com/totrytakeoff/ByteIDE/releases/tag/ByteIDE-forPy',
        type: 'release',
      },
      {
        label: 'Python 特供分支',
        url: 'https://github.com/totrytakeoff/ByteIDE/tree/onlyForPy',
        type: 'repo',
      },
    ],
    background:
      '在完成 Qt Widgets 基础学习后，我选择用一个完整桌面应用串起窗口组织、信号槽、Model/View、文件操作和外部进程通信。ByteIDE 以轻量代码编辑器为载体：编辑区采用 QScintilla，围绕它继续完成项目文件浏览、多文档编辑、终端与代码运行，让分散的 Qt 知识落到一套可以安装和使用的 Windows 工具中。',
    solution:
      'MainWindow 负责 QAction、菜单、工具栏、状态栏和多个 Dock 的组合；ResourceManager 用 QFileSystemModel / QTreeView 映射本地目录并处理文件操作；CodeTabWidget 与 EditArea 管理文件到标签页的映射，按扩展名切换 QsciLexerCPP / Python，并加载 API 补全。Terminal 和 CodeRunner 以 QProcess 执行命令、维护工作目录与命令历史，并承接 Python / C++ 运行输出。项目随后通过 Full 与 onlyForPy 两条交付路径打包 Windows 安装程序，并围绕中文输入输出、终端恢复、主题和工作目录继续修正。',
    results:
      '公开仓库 main 保留 40 次提交，GitHub 上可以核对 5 个 Windows 安装包 Release，最新 ByteIDE-forPy-v1.2.0 发布于 2025-03-02。项目从基础编辑器逐步补齐文件工作区、多标签、C++ / Python 编辑辅助、内嵌终端和运行控制，形成了从 Qt 界面组织、文件与进程交互到 Windows 安装包交付的完整练习闭环。',
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
