# 薛晓春工程作品集

面向 C++ 系统/后端、嵌入式软件和机器人软件实习方向，并承载 AI / 研究工程内容的静态工程作品集。首页用于快速选择，完整项目档案和详情页用于核对代码、测试、指标、上游记录与工程边界。

## 本地运行

```bash
npm install
npm run dev
```

Vite 开发地址默认带有仓库子路径：

```text
http://localhost:5173/myPortfolio/
```

## 质量检查

```bash
npm run lint
npm run build
npm run preview
```

`npm run build` 会先检查应用和 Vite 配置的 TypeScript，再生成 `dist/`。

## 路由

项目使用 `HashRouter`，兼容 GitHub Pages 无服务端 rewrite 的静态部署：

```text
/#/                         首页
/#/projects                 完整项目档案
/#/projects/mychat          项目详情示例
```

## 内容维护

- 项目审计、内容凝练与素材语义：[Project Content Baseline](docs/project_content_baseline.md)
- UI 与响应式规范：[UI Baseline](docs/UI_baseline.md)
- 数据契约与工程规范：[Engine Baseline](docs/engine_baseline.md)

- 个人信息：`src/data/profile.ts`
- 项目：`src/data/projects.ts`
- 技术栈：`src/data/skills.ts`
- 开源贡献：`src/data/openSource.ts`
- 简历：`src/data/resumes.ts`
- 图片：`public/assets/images/`
- PDF：`public/assets/resumes/`

首页精选项目、完整项目列表和详情页共用同一份 `Project` 数据。新增项目时应补齐首图、摘要、证据和边界，不在组件中复制项目文案。

## GitHub Pages

Vite 的 `base` 已设为 `/myPortfolio/`。构建后将 `dist/` 内容发布到仓库对应的 Pages 来源即可。详情路由示例：

```text
https://totrytakeoff.github.io/myPortfolio/#/projects/mychat
```
