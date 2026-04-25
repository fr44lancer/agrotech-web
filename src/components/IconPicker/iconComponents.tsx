import React from 'react'
import {
  ThunderboltOutlined,
  GlobalOutlined,
  TeamOutlined,
  StarOutlined,
  BulbOutlined,
  BarChartOutlined,
  SafetyCertificateOutlined,
  HeartOutlined,
  ExperimentOutlined,
  CloudOutlined,
  CarOutlined,
  ReadOutlined,
  RocketOutlined,
  TrophyOutlined,
  SettingOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons'
import type { IconKey } from './icons'

export const ICON_COMPONENTS: Record<IconKey, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  lightning: ThunderboltOutlined,
  globe: GlobalOutlined,
  people: TeamOutlined,
  star: StarOutlined,
  bulb: BulbOutlined,
  chart: BarChartOutlined,
  shield: SafetyCertificateOutlined,
  heart: HeartOutlined,
  beaker: ExperimentOutlined,
  cloud: CloudOutlined,
  truck: CarOutlined,
  academic: ReadOutlined,
  rocket: RocketOutlined,
  trophy: TrophyOutlined,
  settings: SettingOutlined,
  location: EnvironmentOutlined,
}
