import React from 'react'
import { useState } from 'react'
import { cn } from '@/utils/utils'
import {
  GraduationCap,
  Headphones,
  BookOpen,
  FileText,
  Code,
  CircleEllipsis,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/routes/routes'
import { remote } from '@/remotes/remotes'

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  route: string
  uppercase?: boolean
}

const SidebarItem = ({
  icon,
  label,
  route,
  uppercase = false,
}: SidebarItemProps) => {
  const navigate = useNavigate()
  return (
    <a
      onClick={() => navigate(route)}
      className="flex cursor-pointer items-center gap-3 px-4 py-2.5 text-white transition-colors select-none hover:bg-[#1a2530]">
      <div className="flex h-5 w-5 items-center justify-center">{icon}</div>
      <span
        className={cn(
          'text-sm',
          uppercase ? 'font-medium tracking-wide uppercase' : '',
        )}>
        {label}
      </span>
    </a>
  )
}

const Sidebar = () => {
  const [moreExpanded, setMoreExpanded] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="fixed top-0 left-0 z-50 flex h-screen w-56 flex-col bg-[#0f1419]">
      {/* Logo */}
      <div className="px-4 py-4 text-2xl font-bold text-white">Birdly</div>

      {/* Navigation */}
      <nav className="flex-1">
        <SidebarItem
          icon={<GraduationCap size={18} />}
          label="Learn"
          route={ROUTES.HOME}
        />
        <SidebarItem
          icon={<Code size={18} />}
          label="Playground"
          route={ROUTES.PLAYGROUND}
        />
        <SidebarItem
          icon={<Headphones size={18} />}
          label="Practice"
          route={ROUTES.PRACTICE}
        />
        <SidebarItem
          icon={<BookOpen size={18} />}
          label="Guild books"
          route={ROUTES.GUIDEBOOKS}
        />
        <SidebarItem
          icon={<FileText size={18} />}
          label="Cheats"
          route={ROUTES.CHEATS}
        />
        {/* <SidebarItem icon={<Medal size={18} />} label="LEADERBOARDS" route={ROUTES.LEADERBOARDS} uppercase /> */}

        {/* More dropdown */}
        <button
          className="flex w-full items-center gap-3 px-4 py-2.5 text-white transition-colors hover:bg-[#1a2530]"
          onClick={() => setMoreExpanded(!moreExpanded)}>
          <div className="flex h-5 w-5 items-center justify-center">
            <CircleEllipsis size={18} />
          </div>
          <span className="text-sm">more</span>
          <div className="ml-auto">
            {moreExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </button>

        {/* Dropdown content would go here */}
        {moreExpanded && (
          <div className="bg-[#131a21] py-2 pl-12">
            <a
              onClick={() => navigate(ROUTES.SETTINGS)}
              className="block cursor-pointer py-2 text-sm text-white select-none hover:text-gray-300">
              Settings
            </a>
            <a
              onClick={() => navigate(ROUTES.HELP)}
              className="block cursor-pointer py-2 text-sm text-white select-none hover:text-gray-300">
              Help
            </a>
            <a
              onClick={() => navigate(ROUTES.ABOUT)}
              className="block cursor-pointer py-2 text-sm text-white select-none hover:text-gray-300">
              About
            </a>
            <a
              onClick={() => {
                remote.auth.logout()
                localStorage.removeItem('access_token')
                navigate(ROUTES.LOGIN)
              }}
              className="block cursor-pointer py-2 text-sm text-white select-none hover:text-gray-300">
              Logout
            </a>
          </div>
        )}
      </nav>
    </div>
  )
}
export default Sidebar
