# Engine Baseline — 薛晓春工程作品集

> 本文档定义工程架构、目录、数据契约、路由、静态资源和工程验收要求。
> 视觉语言与响应式表现以 `UI_baseline.md` 为准；项目审计、事实、证据、文案与素材语义以 `project_content_baseline.md` 为准。

## 1. 项目目标与范围

本项目是供简历链接访问的静态工程作品集，主要服务于 C++ 系统/后端、嵌入式软件和机器人软件求职方向，并承载能够体现系统实现能力的 AI / 研究工程项目。

工程目标：

- 使用同一份结构化数据生成首页项目卡和项目详情页；
- 静态构建后部署到 GitHub Pages；
- 通过 HashRouter 支持项目详情路由；
- 清楚呈现代码、测试、压测、Release、上游 PR、实机记录和阶段路线；
- 后续增加项目时，主要修改数据文件，不复制页面结构；
- 不引入后端、数据库、登录、在线管理后台或 SSR。

本仓库是新版实现目录，不修改引用资料中的旧版 portfolio 和三份简历源工程，只复制经确认的图片与 PDF 产物。

## 2. 规范职责与优先级

发生冲突时按以下顺序处理：

1. 用户当前明确指令与工程真实性边界；
2. 项目仓库、运行记录、审计报告和经历证据总表中的已核验事实；
3. `project_content_baseline.md` 的内容审计与表达规则；
4. `src/types/index.ts` 中的实际类型契约；
5. 本文档的工程规则；
6. `UI_baseline.md` 的视觉与交互规则。

`UI_baseline.md` 不定义技术栈、目录、数据字段、构建方式或事实文案。`project_content_baseline.md` 不定义组件视觉和路由实现。本文档不重复具体颜色、字号，也不替代项目事实审计。

## 3. 技术栈

| 层 | 当前选型 | 约束 |
|---|---|---|
| 构建 | Vite 5 | 输出纯静态 `dist/` |
| UI 框架 | React 18 | 函数组件与组合式结构 |
| 语言 | TypeScript 5 | strict、无未使用变量/参数 |
| 路由 | React Router 6 `HashRouter` | 兼容 GitHub Pages 无 rewrite 环境 |
| 样式 | Tailwind CSS 3 + 全局基础 CSS | 使用现有语义颜色与字体配置 |
| 动效 | framer-motion 11 | 只实现 UI baseline 允许的动效 |
| 图标 | lucide-react | 按需导入 |

当前不把 shadcn/ui 设为强制依赖。`src/components/ui/` 用于少量本地基础组件；除非实际需求出现，不额外引入 Radix、组件生成器或整套设计系统依赖。

Google Fonts 是唯一允许的运行时外部样式资源，并必须保留系统字体回退。应用功能不能依赖外部 CDN 脚本。

## 4. 构建与配置基线

### Vite

```ts
export default defineConfig({
  plugins: [react()],
  base: '/myPortfolio/',
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
```

- GitHub Pages 目标地址为仓库子路径 `/myPortfolio/`。
- 源码可以使用 `@/` 别名，但同一目录内保持一致即可。
- 构建命令必须先分别对应用源码和 Vite 配置执行 TypeScript `--noEmit` 检查，再执行 Vite build。

### TypeScript

- `strict: true`。
- `noUnusedLocals`、`noUnusedParameters`、`noFallthroughCasesInSwitch` 保持开启。
- 类型只在 `src/types/index.ts` 集中定义，数据和组件使用 `import type`。
- 不使用 `any` 绕过项目数据或路由参数类型。

### 样式

- Tailwind 配置文件为当前实际存在的 `tailwind.config.js`。
- 全局 CSS 只放 Tailwind 指令、基础元素、通用容器和少量无法合理表达的全局规则。
- 页面与组件样式优先使用语义化 Tailwind 类，不在 JSX 中散布十六进制颜色。

## 5. 目标目录结构

```text
myPortfolio/
├── docs/
│   ├── UI_baseline.md
│   ├── engine_baseline.md
│   └── project_content_baseline.md
├── public/
│   └── assets/
│       ├── images/
│       └── resumes/
├── src/
│   ├── types/
│   │   └── index.ts
│   ├── data/
│   │   ├── profile.ts
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   ├── openSource.ts
│   │   └── resumes.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturedProjectsSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── SkillsSection.tsx
│   │   │   ├── OpenSourceSection.tsx
│   │   │   └── ResumesSection.tsx
│   │   ├── project/
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectFilter.tsx
│   │   │   ├── MetricCard.tsx
│   │   │   ├── RoadmapStrip.tsx
│   │   │   └── EvidenceBadge.tsx
│   │   └── ui/
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── ProjectsPage.tsx
│   │   ├── ProjectDetailPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── utils/
│   │   └── evidenceLevel.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

规则：

- 不为尚无复用价值的逻辑预建 hooks 或工具文件。
- 可复用行为出现后再提取，避免目录与实际实现脱节。
- `README.md` 在首版交付时补充启动、构建、预览和部署说明。

## 6. 类型与数据契约

`src/types/index.ts` 是唯一类型来源，当前主要契约如下：

| 类型 | 用途 |
|---|---|
| `ProjectCategory` | `systems / ai / embedded / robotics` 分类 |
| `EvidenceLevel` | `A / B / C / D` 证据等级 |
| `ProjectStatus` | 项目交付状态 |
| `Project` | 首页卡片与详情页共同数据 |
| `Profile` | 姓名、方向与联系方式 |
| `Skill` | 技能域与条目 |
| `OpenSourceContribution` | 四条已合并贡献 |
| `Resume` | 三个简历版本入口 |

`Project.cover` 是全部项目必需的首图资源；`gallery`、`evidenceMedia` 及详情字段 `background`、`solution`、`results`、`boundaries`、`roadmap`、`upstream`、`architecture`、`audit` 均可选。`architecture` 用结构化 flow 与 decision 解释系统取舍，`audit` 记录按日期归档的运行环境、操作检查和已发现问题。页面必须处理字段缺失，不能用非空断言假设每个项目都具备相同长度内容。

### projects.ts 必需导出

```ts
import type { Project, ProjectCategory } from '../types'

export const projects: Project[] = [/* 持续扩展的项目数据 */]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getProjectsByCategory(
  category: ProjectCategory | 'all',
): Project[] {
  if (category === 'all') return projects
  return projects.filter((project) => project.category.includes(category))
}
```

当前已录入的首批 slug：

```text
mychat
asd-kgrag
rm2026
colorful-u1
so101-lerobot
codgent
verge-tui
byteide
```

项目列表可以继续扩展；slug 一经公开应保持稳定，也不为同一项目的版本演进创建重复项目数据。

### 数据驱动规则

- 首页精选故事、完整项目卡和详情页必须读取同一 `Project` 对象。
- 技能、贡献、简历和个人信息分别来自对应 `src/data/` 文件。
- JSX 中只允许固定界面文案、状态映射和少量明确要求的首页信号指标，不复制项目长文案。
- 技术标签由 `stack` 展平后截取最多八项；指标最多展示三项。
- 所有列表使用稳定业务 key，不使用数组下标作为可变列表 key。
- 数据中的断行只用于源码可读性，不能进入 URL 或破坏正常中文排版。

## 7. 内容与证据治理

项目资料审计、事实台账、字段写作、证据分层、素材语义和内容验收统一遵循 `project_content_baseline.md`。本节只保留直接影响数据与页面实现的工程约束。

事实来源与证据优先级由 `project_content_baseline.md` 定义。项目仓库、版本化运行记录和直接审计是主要依据；`project_resume_material_audit.md`、`经历证据总表.md`、简历与交接说明用于建立调查入口和交叉核对，不能覆盖更新、更直接的项目证据。

运行时数据遵守以下规则：

- 只陈述已核验实现、指标、测试、提交、Release、PR 或实机记录。
- 路线阶段必须使用 `roadmap` 和规划语态，不能进入已交付成果描述。
- Fork 或二次开发项目必须展示 `upstream`，并区分上游能力与个人贡献。
- 压测数字必须连同测试条件和限制展示，不能外推为容量上限或通用 SLA。
- 单元测试、dry-run、交叉编译和真机验收是不同证据类型，不能互相替代。
- `boundaries` 应直接描述当前范围和未覆盖能力，不把“禁止怎样写”的元指令原样展示给访客。
- 详情页可以通过已有字段回退组织内容，但不能为了填满 section 新造事实。

当前已录入项目的核心边界示例（不能作为后续项目的固定模板）：

- **MyChat**：当前是单 Gateway 工程型 MVP；压测为跨主机单路径；完整构建仍有 ODB include 版本问题。
- **ASD-KGRAG**：定位为研究资料问答与检索工程；无临床验证；Agent 是受控确定性工作流。
- **RM2026**：早期基于 YueLuRM 框架完成多车型控制与赛季联调，当前正在重构静态 FreeRTOS 运行时；30/30 个板级固件目标已完成全量交叉编译，5/5 个主机测试程序通过，但构建结果与逻辑测试都不替代重构后的实机验收。
- **Colorful-U1**：基于 SnapAce/multiACE 的下游开发；个人贡献集中在 source graph、route plan、安全门和回归用例。
- **SO101 + LeRobot**：基础控制与逻辑测试已有证据；ROS2 工程、仿真、视觉和抓取仍是后续阶段。
- **Codgent**：串行多 Agent 工作流 MVP 已跑通并完成复盘；项目暂停是效率实验后的阶段结论，不能把后续“单主 Agent + workers”方向写成当前能力。
- **verge-tui**：交付的是 Mihomo / Clash 的终端控制面，代理协议与数据面来自 Mihomo；系统代理和特权服务兼容复用 Clash Verge Rev 相关组件。
- **ByteIDE**：基于 Qt 6 与 QScintilla 集成的轻量开发工具；公开 Release 是主要交付证据。

### 状态与证据映射

| `ProjectStatus` | 展示名称 | 状态色 |
|---|---|---|
| `verified` | 已验证 | green |
| `mvp-verified` | 实机 MVP 已验证 | green |
| `release` | 公开 Release | green |
| `in-progress` | 进行中 | amber |
| `iterating` | 持续迭代 | amber |
| `paused` | MVP 已暂停 | dim |

| `EvidenceLevel` | 含义 | 视觉色 |
|---|---|---|
| `A` | 外部验证 | green |
| `B` | 仓库、测试、压测、Release 或实机记录 | accent |
| `C` | 真实经历存在，公开材料待补 | amber |
| `D` | 路线阶段，尚未验收 | dim |

状态显示名可以集中在组件附近的小型常量中；证据等级的 formatter 与颜色映射放在 `src/utils/evidenceLevel.ts`。

## 8. 静态资源

部署目录：

```text
public/assets/images/<project-slug>/
public/assets/resumes/
```

图片源目录：

```text
/home/myself/workspace/MyNote/面试八股/7.简历优化/portfolio/assets/
```

PDF 源目录：

```text
/home/myself/workspace/MyNote/面试八股/7.简历优化/resume-h5-software/output/
/home/myself/workspace/MyNote/面试八股/7.简历优化/resume-h5-embedded/output/
/home/myself/workspace/MyNote/面试八股/7.简历优化/resume-h5-robotics/output/
```

资源规则：

- 项目图片按 `public/assets/images/<project-slug>/` 一项目一目录组织，目录名与 `Project.slug` 保持一致并统一使用小写 kebab-case。
- `public/assets/images/` 根目录不直接存放项目图片；站点级品牌资源可继续放在 `public/` 或源码资产目录。
- 复制资源，不移动、不重命名源文件，不修改旧版目录。
- 应用内路径通过 `import.meta.env.BASE_URL` 拼接，避免把仓库子路径散落在组件中。
- PDF 文件名来自 `resumes.ts`，使用浏览器 URL 编码处理中文文件名。
- 所有图片设置明确尺寸或宽高比，减少加载时布局偏移。
- `Project.cover` 与可选 `gallery` 在 `projects.ts` 中维护；组件不得建立 slug→图片硬编码表。

## 9. 路由与首页锚点

```tsx
<HashRouter>
  <Header />
  <main>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </main>
  <Footer />
</HashRouter>
```

部署 URL 示例：

```text
https://totrytakeoff.github.io/myPortfolio/#/projects/mychat
```

首页需要跨页跳转的 section id 为：

```text
skills
featured-projects
opensource
resumes
contact
```

HashRouter 与页面锚点共享浏览器 hash，不能用普通 `href="#projects"` 直接覆盖路由。站内 section 导航必须：

1. Header 主导航使用页面路由，不承担首页 section 目录；
2. 简历动作在首页滚动到 `resumes`，在其他页先导航回 `/` 后再滚动；
3. 固定 Header 的偏移由全局 `scroll-padding-top` 处理；
4. 路由切换到项目档案、详情页或 404 时恢复页面顶部。

项目卡使用 React Router `Link` 跳转 `/projects/:slug`。slug 不存在时渲染 404 状态，不抛运行时异常。

## 10. 外链与下载

- HTTP(S) 外链统一使用 `target="_blank" rel="noreferrer"`。
- GitHub、PR、Benchmark、Release 等入口来自数据文件。
- 三份简历入口从 `resumes.ts` 生成，Header 和 Hero 的“下载简历”先导航到简历选择区。
- PDF 下载链接使用同源静态资源路径，可添加 `download`；不得把某一方向简历误设为所有入口的默认文件。
- `mailto:` 和 `tel:` 使用 profile 数据生成，不重复硬编码联系方式。
- 外链按钮必须同时具备文字标签，不能只显示图标。

## 11. 组件职责

| 组件 | 职责 | 数据来源 |
|---|---|---|
| `Header` | 品牌、页面导航、GitHub、简历入口、移动菜单 | profile + 固定导航配置 |
| `Footer` | 联系方式、GitHub、版权与 `contact` 锚点 | profile |
| `HeroSection` | 姓名、方向、简介、CTA、四项关键信号 | profile + 固定已核验指标 |
| `FeaturedProjectsSection` | 首页交替式精选项目叙事 | projects API |
| `ProjectsSection` | 完整项目页分类状态与筛选列表 | projects API |
| `ProjectFilter` | 分类按钮组，不持有项目数据 | category props |
| `ProjectCard` | 单项目摘要、状态、指标、标签和详情入口 | Project prop |
| `SkillsSection` | 四个能力域 | skills.ts |
| `OpenSourceSection` | 四条合并贡献 | openSource.ts |
| `ResumesSection` | 三个简历版本与下载入口 | resumes.ts |
| `ProjectDetailPage` | slug 查询和 Case Study 内容编排 | projects API |
| `ProjectArchitecturePanel` | 可选架构流、关键决策与取舍 | Project.architecture |
| `ProjectAuditPanel` | 可选操作审计、通过项与已发现问题 | Project.audit |
| `EvidenceBadge` | 证据等级显示 | EvidenceLevel prop |
| `MetricCard` | 单项指标显示 | ProjectMetric prop |
| `RoadmapStrip` | 项目路线状态 | RoadmapItem[] prop |

页面只负责组合 section；section 负责内容布局；项目小组件负责可复用展示。不要让 `HomePage` 或 `App.tsx` 承载项目数据和复杂视觉结构。

## 12. 可选详情字段的回退规则

统一详情页不要求每个项目拥有同等长度的专门文案：

| 详情区域 | 首选字段 | 缺失时使用 |
|---|---|---|
| 背景与问题 | `background` | `summary` |
| 方案与贡献 | `solution` | `highlights` 列表 |
| 结果与证据 | `results` | `metrics` + `evidence.items` |
| 上游说明 | `upstream` | 无字段则不渲染 |
| 边界说明 | `boundaries` | 无字段则不渲染 |
| 路线进展 | `roadmap` | 无字段则不渲染 |

回退是展示组合，不是内容生成。不得把路线节点或技术栈自动改写成已完成成果。

## 13. 动效实现约束

- 使用 framer-motion 的 `motion`、`AnimatePresence` 和 layout 能力实现 UI baseline 指定的场景。
- 公共 variants 使用明确的 `Variants` 类型，避免 TypeScript 推断出不兼容 easing。
- 滚动入场使用 `viewport={{ once: true, margin: '-60px' }}`。
- 筛选列表 key 使用 `project.slug`，退出动画期间不重复挂载卡片。
- 支持 `useReducedMotion` 或等效 CSS 降级。
- 不安装第二套动效库。

## 14. 构建、验证与交付

### 命令

```bash
npm install
npm run dev
npm run build
npm run preview
```

### 必须通过的检查

1. `npm run build` 无 TypeScript 或 Vite 错误；
2. 首页按 Hero、技术栈、精选项目、开源、简历、联系顺序完整展示；
3. 全部与各项目分类筛选结果正确；
4. 所有项目卡均能进入对应详情页；
5. 不存在的 slug 和未知路由显示 404；
6. Header 页面导航、跨页简历入口和移动菜单均正确工作；
7. 三份 PDF、项目外链和四条 PR 链接可访问；
8. 所有 HTTP(S) 外链具有安全属性；
9. 桌面、平板和移动端无明显错位、遮挡和横向溢出；
10. 浏览器控制台无运行时错误；
11. 项目正文来自结构化数据，没有大段复制在 JSX；
12. 对运行时数据和组件做真实性边界检查；
13. `README.md` 说明启动、构建、预览和 GitHub Pages 部署。

`npm run lint` 使用 ESLint、TypeScript、React Hooks 与 React Refresh 规则；严格 TypeScript build 和 lint 均作为静态质量门槛。

### 视觉验证尺寸

至少检查：

```text
桌面：1440 × 900
平板：768 × 1024
移动：390 × 844
```

视觉检查按 `UI_baseline.md` 的验收清单执行，不能只以 build 成功代替页面验收。

## 15. 推荐实施顺序

1. 复制图片和 PDF，确认静态路径；
2. 创建并校验 `projects.ts` 中的项目对象；
3. 创建证据、状态和基础 UI 小组件；
4. 完成 Header、Footer、首页 sections 与 HomePage；
5. 完成详情页、404 和 HashRouter 锚点行为；
6. 构建并修复类型、资源和路由问题；
7. 进行桌面/平板/移动端视觉验收；
8. 复核事实边界、外链和下载；
9. 补充 README 和部署说明。

按三轮验收推进：先保证结构、数据和路由；再完成视觉与响应式；最后检查文案边界、证据链接和部署质量。
