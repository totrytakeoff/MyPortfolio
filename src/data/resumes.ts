import type { Resume } from '../types'

export const resumes: Resume[] = [
  {
    direction: 'C++ 系统 / 后端',
    slug: 'software',
    description: '以 MyChat 和 ASD-KGRAG 为主，突出 C++20、网络编程、服务拆分与压测闭环。',
    filename: '薛晓春-C++后端开发实习-纯软版.pdf',
    highlights: ['MyChat · C++20 IM 后端', 'ASD-KGRAG · RAG 工程', '上游 PR 合并证明 × 4'],
  },
  {
    direction: '嵌入式 / 智能硬件',
    slug: 'embedded',
    description: '以 RM2026 和 Colorful-U1 为主，突出 STM32/FreeRTOS、真实设备控制与通信协议。',
    filename: '薛晓春-嵌入式软件实习.pdf',
    highlights: [
      'RM2026 · STM32F407 / FreeRTOS 电控框架',
      'Colorful-U1 · 真实设备二次开发',
      'SO101 · 舵机总线与安全控制',
    ],
  },
  {
    direction: '机器人软件 / 运动控制',
    slug: 'robotics',
    description: '以 SO101 和 RM2026 为主，突出机械臂控制、ROS2、视觉抓取与嵌入式电控实践。',
    filename: '薛晓春-机器人软件实习.pdf',
    highlights: [
      'SO101 + LeRobot · ROS2 视觉抓取',
      'RM2026 · 机器人控制框架与实时运行时',
      'OrcaSlicer/wayscrollshot PR',
    ],
  },
]
