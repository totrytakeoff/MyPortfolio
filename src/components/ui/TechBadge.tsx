import {
  CircuitBoard,
  Code2,
  Database,
  FlaskConical,
  Network,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import type { IconType } from 'react-icons'
import {
  SiArchlinux,
  SiArm,
  SiBoost,
  SiC,
  SiCmake,
  SiCplusplus,
  SiDocker,
  SiEspressif,
  SiExpress,
  SiFastapi,
  SiGit,
  SiGnome,
  SiGithub,
  SiJavascript,
  SiLinux,
  SiMysql,
  SiNeo4J,
  SiNixos,
  SiNodedotjs,
  SiOpencv,
  SiOpengl,
  SiOpenssl,
  SiPlatformio,
  SiPostgresql,
  SiPython,
  SiQdrant,
  SiQt,
  SiReact,
  SiRedis,
  SiRos,
  SiRust,
  SiStmicroelectronics,
  SiTokio,
  SiTypescript,
  SiVite,
  SiVuedotjs,
  SiWayland,
  SiCurl,
} from 'react-icons/si'
import { VscCode } from 'react-icons/vsc'

interface BrandVisual {
  pattern: RegExp
  icon: IconType
  color: string
}

const brandVisuals: BrandVisual[] = [
  { pattern: /c\+\+/i, icon: SiCplusplus, color: '#659ad2' },
  { pattern: /^c(?:\s|\/|$)/i, icon: SiC, color: '#a8b9cc' },
  { pattern: /rust/i, icon: SiRust, color: '#e7e2dc' },
  { pattern: /tokio/i, icon: SiTokio, color: '#b7c9ee' },
  { pattern: /python/i, icon: SiPython, color: '#4b8bbe' },
  { pattern: /javascript/i, icon: SiJavascript, color: '#f7df1e' },
  { pattern: /typescript/i, icon: SiTypescript, color: '#5b9be6' },
  { pattern: /arch linux/i, icon: SiArchlinux, color: '#1793d1' },
  { pattern: /linux|posix/i, icon: SiLinux, color: '#fcc624' },
  { pattern: /wayland/i, icon: SiWayland, color: '#ef6c45' },
  { pattern: /qml/i, icon: SiQt, color: '#41cd52' },
  { pattern: /gnome/i, icon: SiGnome, color: '#6d9de8' },
  { pattern: /\bnix(?:os)?\b/i, icon: SiNixos, color: '#7ebae4' },
  { pattern: /cmake/i, icon: SiCmake, color: '#d64255' },
  { pattern: /boost/i, icon: SiBoost, color: '#f7901e' },
  { pattern: /libcurl|\bcurl\b/i, icon: SiCurl, color: '#54b948' },
  { pattern: /node\.?js/i, icon: SiNodedotjs, color: '#62ad55' },
  { pattern: /express/i, icon: SiExpress, color: '#e8ebf0' },
  { pattern: /github/i, icon: SiGithub, color: '#f0f2f5' },
  { pattern: /git/i, icon: SiGit, color: '#f05032' },
  { pattern: /docker/i, icon: SiDocker, color: '#2496ed' },
  { pattern: /postgres/i, icon: SiPostgresql, color: '#6f91d8' },
  { pattern: /mysql/i, icon: SiMysql, color: '#4f9cc8' },
  { pattern: /redis/i, icon: SiRedis, color: '#e65353' },
  { pattern: /fastapi/i, icon: SiFastapi, color: '#26a699' },
  { pattern: /neo4j/i, icon: SiNeo4J, color: '#5b9bd5' },
  { pattern: /qdrant/i, icon: SiQdrant, color: '#dc244c' },
  { pattern: /platformio/i, icon: SiPlatformio, color: '#f5822a' },
  { pattern: /esp32|espressif/i, icon: SiEspressif, color: '#e7352c' },
  { pattern: /stm32|stmicro/i, icon: SiStmicroelectronics, color: '#5aa9e6' },
  { pattern: /ros2|\bros\b/i, icon: SiRos, color: '#9aaed0' },
  { pattern: /opencv/i, icon: SiOpencv, color: '#7a6cff' },
  { pattern: /opengl/i, icon: SiOpengl, color: '#66a7d8' },
  { pattern: /qt(?:\s|$)/i, icon: SiQt, color: '#41cd52' },
  { pattern: /vue/i, icon: SiVuedotjs, color: '#42b883' },
  { pattern: /vite/i, icon: SiVite, color: '#a879ff' },
  { pattern: /react/i, icon: SiReact, color: '#61dafb' },
  { pattern: /vs code|visual studio code/i, icon: VscCode, color: '#23a8f2' },
  { pattern: /openssl|tls/i, icon: SiOpenssl, color: '#d75555' },
  { pattern: /arm gcc|\barm\b/i, icon: SiArm, color: '#33a9dc' },
]

function getFallbackIcon(name: string): LucideIcon {
  if (/postgres|redis|mysql|neo4j|qdrant|database|storage|odb/i.test(name)) return Database
  if (/grpc|protobuf|websocket|http|can|uart|sbus|spi|network|通信|协议/i.test(name)) return Network
  if (/stm32|freertos|hal|servo|舵机|hardware|硬件/i.test(name)) return CircuitBoard
  if (/test|ctest|unittest|googletest|k6|smoke|benchmark/i.test(name)) return FlaskConical
  if (/cmake|vcpkg|openocd|shell|deploy|tool/i.test(name)) return Wrench
  return Code2
}

function TechnologyGlyph({ name, size }: { name: string; size: number }) {
  const brand = brandVisuals.find((visual) => visual.pattern.test(name))

  if (brand) {
    const BrandIcon = brand.icon
    return <BrandIcon size={size} color={brand.color} aria-hidden="true" />
  }

  const FallbackIcon = getFallbackIcon(name)
  return <FallbackIcon size={size} strokeWidth={1.6} aria-hidden="true" />
}

interface TechBadgeProps {
  name: string
  variant?: 'icon' | 'label'
  className?: string
}

export function TechBadge({ name, variant = 'label', className = '' }: TechBadgeProps) {
  if (variant === 'icon') {
    return (
      <span
        className={`group/tech grid size-10 place-items-center border border-border bg-surface/45 text-text-muted transition-colors duration-200 hover:border-border-hover hover:bg-surface-2 ${className}`}
        role="img"
        aria-label={name}
        title={name}
      >
        <span className="transition-transform duration-200 group-hover/tech:-translate-y-0.5">
          <TechnologyGlyph name={name} size={20} />
        </span>
      </span>
    )
  }

  return (
    <span
      className={`inline-flex min-h-8 items-center gap-2 border border-border/80 bg-surface/55 px-2.5 py-1.5 font-mono text-[10px] leading-4 text-text-muted ${className}`}
    >
      <TechnologyGlyph name={name} size={14} />
      <span>{name}</span>
    </span>
  )
}
