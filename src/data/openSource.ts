import type { OpenSourceContribution } from '../types'

export const contributions: OpenSourceContribution[] = [
  {
    index: 1,
    project: 'Zed',
    repo: 'zed-industries/zed',
    prNumber: '#59005',
    url: 'https://github.com/zed-industries/zed/pull/59005',
    summary: '为 Rust 编辑器新增选择最内层括号内容动作，覆盖嵌套、多光标与无操作场景测试。',
    value: ['阅读大型 Rust 代码库', '编辑器状态处理', '4 个文件 / 新增 122 行 / 自动化测试'],
  },
  {
    index: 2,
    project: 'OrcaSlicer',
    repo: 'OrcaSlicer/OrcaSlicer',
    prNumber: '#13833',
    url: 'https://github.com/OrcaSlicer/OrcaSlicer/pull/13833',
    summary: '在真实 Ender-3 V3 KE 上复现并修复非 ASCII / URL 敏感文件名上传失败。',
    value: ['C++ 真实设备问题定位', 'HTTP URL 百分号编码', '最小范围修复'],
  },
  {
    index: 3,
    project: 'OrcaSlicer',
    repo: 'OrcaSlicer/OrcaSlicer',
    prNumber: '#14326',
    url: 'https://github.com/OrcaSlicer/OrcaSlicer/pull/14326',
    summary: '移除 Device WebView 硬编码端口，恢复配置 URL → printer host → empty 的通用回退链。',
    value: ['配置边界', '跨设备兼容性', '回退策略修复'],
  },
  {
    index: 4,
    project: 'wayscrollshot',
    repo: 'jswysnemc/wayscrollshot',
    prNumber: '#4',
    url: 'https://github.com/jswysnemc/wayscrollshot/pull/4',
    summary: '将滚动截图拼接切换为 OpenCV ORB + RANSAC，增加节流、重复帧过滤、回退和回归测试。',
    value: ['Rust / OpenCV 特征匹配', '鲁棒性改进', '7 个文件 / 新增 741 行 / 回归测试'],
  },
]
