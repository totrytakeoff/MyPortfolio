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
npm run check
npm run preview
```

`npm run check` 依次执行 ESLint、应用与 Vite 配置的 TypeScript 检查，再生成 `dist/`。

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

`.github/workflows/pages.yml` 在 pull request 中执行质量检查，在 `master` 推送或手动触发时构建并部署 GitHub Pages。CI 会根据实际仓库名注入 `VITE_BASE_PATH`，避免 Pages 子路径大小写不一致。

当前仓库的线上地址为：

```text
https://totrytakeoff.github.io/MyPortfolio/
https://totrytakeoff.github.io/MyPortfolio/#/projects/mychat
```

首次启用时，需要在仓库 `Settings -> Pages -> Build and deployment` 中选择 `GitHub Actions`。此后检查失败不会覆盖线上版本，部署成功后 `github-pages` environment 会记录实际 URL。
