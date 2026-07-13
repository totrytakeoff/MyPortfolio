import type { Project, ProjectCategory } from '../types'

export const projects: Project[] = [
  {
    slug: 'mychat',
    title: 'MyChat',
    subtitle: 'C++20 分布式即时通讯系统',
    category: ['cpp'],
    featured: true,
    role: '仓库维护者 / 核心开发',
    period: '2025.07 - 至今',
    status: 'in-progress',
    evidence: {
      level: 'B',
      items: [
        '公开仓库 dev 分支，代码可查',
        '跨主机压测原始日志归档',
        '200 并发 WSS 建连成功 200 / 失败 0，p95 14ms',
        '200 用户 / 250ms：714.4 msg/s，RTT p95 35.91ms，错误 0',
        'HTTP 1→500 VU：46,296 请求，失败率 0%，p95 3.75ms',
        '阶段性 40/40 CTest（commit e34ba0e）',
      ],
    },
    cover: {
      src: 'assets/images/mychat-architecture.png',
      alt: 'MyChat Gateway 与业务服务架构图',
      caption: 'Gateway、业务服务与存储层的当前工程边界',
      fit: 'contain',
    },
    summary:
      'Gateway 统一接入 HTTP/WebSocket，按 User/Message/Friend/Group/Push 拆分服务边界，支持进程内调用与 gRPC 多进程模式。以代码、跨主机压测和连接生命周期复测建立可追溯工程基准。',
    highlights: [
      '重构 Gateway 为统一 packet boundary，业务 payload 下沉至 service dispatcher',
      'WebSocket 热路径改为固定线程池 + RAII inflight 限流，幂等关闭 TLS 会话',
      '远程 Push 通过 Gateway callback 回到连接所有者完成 session lookup 与投递',
      'Redis RAII 连接池支持断线重连、generation 隔离和耗尽等待',
      '搭建 C++ bench_ws + k6 + Python 压测编排和原始日志归档闭环',
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
      { domain: '测试与压测', items: ['GoogleTest', 'CTest', 'k6'] },
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
    ],
    background:
      'IM 后端的核心挑战在于 Gateway 同时承载 HTTP/WebSocket、多服务边界统一路由、连接生命周期治理和在线推送投递语义。',
    solution:
      'Gateway 通过 MessageParser → UnifiedMessage → MessageProcessor → HandlerRegistry 统一分发 packet，业务服务只处理 payload；WebSocket 使用固定线程池与 inflight cap 防止热路径失控；Push 服务通过 Gateway callback 回到连接所有者投递，不直接访问内存 session。',
    results:
      '200 并发 WSS 连接全部成功，714.4 msg/s 下 0 客户端错误；HTTP 500 VU 压测累计 46,296 请求且失败率为 0%；生命周期复测后 CLOSE-WAIT / ESTAB 均回落为 0。',
    boundaries: [
      '当前为单 Gateway 工程型 MVP，尚无服务发现、负载均衡和 MQ。',
      '当前完整构建存在 ODB 2.4/2.5 include 版本冲突待修复。',
      '压测来自跨主机单路径场景，只代表该次测试环境与负载。',
      '阶段性 40/40 CTest 对应 commit e34ba0e，不代表当前 HEAD 全量复现。',
    ],
  },
  {
    slug: 'asd-kgrag',
    title: 'ASD-KGRAG',
    subtitle: 'ASD 领域知识图谱增强 RAG 问答系统',
    // 该分类用于当前作品集的系统/后端求职筛选。
    category: ['cpp'],
    featured: true,
    role: '核心开发（全链路主要提交者）',
    period: '2026.05 - 至今',
    status: 'iterating',
    evidence: {
      level: 'B',
      items: [
        '公开仓库，50 次提交，单一作者',
        '456 篇文档提取成功 456/456',
        '7,568/7,568 chunk 抽取任务状态成功',
        'Neo4j：3,684 实体 / 17,816 总关系，Qdrant：7,568 points',
        '16/16 单元测试通过',
        '5 题 quick e2e 全部通过（真实 Neo4j/Qdrant）',
      ],
    },
    cover: {
      src: 'assets/images/asd-kgrag-ui.png',
      alt: 'ASD-KGRAG 问答界面截图',
      caption: '问答入口与图谱、向量混合召回的产品界面',
      fit: 'cover',
      position: 'center top',
    },
    summary:
      '面向 ASD 研究资料构建可追溯 RAG 问答系统：离线处理 456 篇文献建立 Neo4j 图谱与 Qdrant 向量库；在线侧通过混合检索、evidence prompt 生成带文献引用的回答；配套 FastAPI/SSE 服务和评测体系。',
    highlights: [
      '并发实体关系抽取，支持断点续跑和重试，完成 7,568/7,568 chunk 处理',
      '融合 Neo4j 图检索与 Qdrant 向量召回，并加入 alias 扩展、实体噪声惩罚和证据等级权重',
      '受控 Agent 采用确定性路由、最多一次补检索、9 步 trace 和降级证据回答',
      '将 FastAPI 同步路径放入线程池，避免阻塞 async handler，并提供 SSE 流式输出',
      '16 个单测 + quick e2e 覆盖数据库、API、CLI 和 Agent trace',
    ],
    metrics: [
      { value: '7,568', unit: 'chunk', description: '抽取任务全部成功，0 失败' },
      { value: '3,684', unit: '实体', description: 'Neo4j 图谱当前规模' },
      { value: '16/16', unit: '单测', description: '本地复测全部通过' },
    ],
    stack: [
      { domain: '后端', items: ['Python', 'FastAPI', 'SSE'] },
      { domain: '存储', items: ['Neo4j', 'Qdrant', 'Docker Compose'] },
      { domain: '检索', items: ['混合检索', 'Embedding', 'query rewrite'] },
      { domain: '测试', items: ['unittest', 'e2e smoke'] },
    ],
    links: [
      {
        label: '代码仓库',
        url: 'https://github.com/totrytakeoff/ASD-KGRAG',
        type: 'repo',
      },
    ],
    boundaries: [
      '当前定位为研究资料检索与问答工程，无临床验证。',
      'Agent 是受控确定性工作流，并非开放式自主编排。',
      '现有 50 题 Agent 对照不能证明回答质量提升。',
      '本次审计未验证前端构建。',
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
      src: 'assets/images/colorful-u1-hardware.jpg',
      alt: 'Snapmaker U1 与 ACE 硬件实机照片',
      caption: '用于 mixed routing 与安全门验证的真实设备环境',
      fit: 'cover',
      position: 'center 43%',
    },
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
    gallery: [
      {
        src: 'assets/images/so100-urdf.png',
        alt: 'SO100 机械臂 URDF 可视化参考',
        caption: 'URDF 与 RViz 路线的结构参考；当前仍属于后续阶段',
        fit: 'contain',
      },
      {
        src: 'assets/images/so100-leader-follower.jpg',
        alt: 'SO100 leader-follower 机械臂参考图',
        caption: 'Leader-follower 形态参考，不作为当前真机验收证据',
        fit: 'cover',
      },
    ],
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
    category: ['cpp'],
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
