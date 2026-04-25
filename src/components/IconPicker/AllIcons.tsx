'use client'
import * as AntdIcons from '@ant-design/icons'

export const ALL_ICON_NAMES: string[] = Object.keys(AntdIcons).filter((key) =>
  /^[A-Z].*(Outlined|Filled|TwoTone)$/.test(key),
)

export function getIconComponent(
  name: string | null | undefined,
): React.ComponentType<{ style?: React.CSSProperties; className?: string }> {
  if (name && (AntdIcons as any)[name]) {
    return (AntdIcons as any)[name]
  }
  return AntdIcons.QuestionCircleOutlined
}
