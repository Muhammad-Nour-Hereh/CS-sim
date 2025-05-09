import React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  GraduationCap,
  Headphones,
  BookOpen,
  FileText,
  Code,
  CircleEllipsis,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/objects/routes"

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  route: string
  uppercase?: boolean
}

const SidebarItem = ({ icon, label, route, uppercase = false }: SidebarItemProps) => {
  const navigate = useNavigate()
  return <a onClick={() => navigate(route)} className="flex items-center gap-3 px-4 py-2.5 text-white hover:bg-[#1a2530] transition-colors">
    <div className="w-5 h-5 flex items-center justify-center">{icon}</div>
    <span className={cn("text-sm", uppercase ? "uppercase font-medium tracking-wide" : "")}>{label}</span>
  </a>
}

const Sidebar = () => {
  const [moreExpanded, setMoreExpanded] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="h-screen w-56 bg-[#0f1419] flex flex-col fixed top-0 left-0 z-50">

      {/* Logo */}
      <div className="px-4 py-4 text-2xl font-bold text-white">Birdly</div>

      {/* Navigation */}
      <nav className="flex-1">
        <SidebarItem icon={<GraduationCap size={18} />} label="Learn" route={ROUTES.HOME} />
        <SidebarItem icon={<Code size={18} />} label="Playground" route={ROUTES.PLAYGROUND} />
        <SidebarItem icon={<Headphones size={18} />} label="Practice" route={ROUTES.PRACTICE} />
        <SidebarItem icon={<BookOpen size={18} />} label="Guild books" route={ROUTES.GUIDEBOOKS} />
        <SidebarItem icon={<FileText size={18} />} label="Cheats" route={ROUTES.CHEATS} />
        {/* <SidebarItem icon={<Medal size={18} />} label="LEADERBOARDS" route={ROUTES.LEADERBOARDS} uppercase /> */}

        {/* More dropdown */}
        <button
          className="w-full flex items-center gap-3 px-4 py-2.5 text-white hover:bg-[#1a2530] transition-colors"
          onClick={() => setMoreExpanded(!moreExpanded)}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <CircleEllipsis size={18} />
          </div>
          <span className="text-sm">more</span>
          <div className="ml-auto">{moreExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</div>
        </button>

        {/* Dropdown content would go here */}
        {moreExpanded && (
          <div className="pl-12 py-2 bg-[#131a21]">
            <a onClick={() => navigate(ROUTES.SETTINGS)} className="block py-2 text-sm text-white hover:text-gray-300">
              Settings
            </a>
            <a onClick={() => navigate(ROUTES.HELP)} className="block py-2 text-sm text-white hover:text-gray-300">
              Help
            </a>
            <a onClick={() => navigate(ROUTES.ABOUT)} className="block py-2 text-sm text-white hover:text-gray-300">
              About
            </a>
          </div>
        )}
      </nav>
    </div>
  )
}
export default Sidebar