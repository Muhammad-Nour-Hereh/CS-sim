import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  GraduationCap,
  Headphones,
  BookOpen,
  FileText,
  Medal,
  Code,
  CircleEllipsis,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  href: string
  uppercase?: boolean
}

const SidebarItem = ({ icon, label, href, uppercase = false }: SidebarItemProps) => (
  <a href={href} className="flex items-center gap-3 px-4 py-2.5 text-white hover:bg-[#1a2530] transition-colors">
    <div className="w-5 h-5 flex items-center justify-center">{icon}</div>
    <span className={cn("text-sm", uppercase ? "uppercase font-medium tracking-wide" : "")}>{label}</span>
  </a>
)

const Sidebar = () => {
  const [moreExpanded, setMoreExpanded] = useState(false)

  return (
    <div className="h-screen w-56 bg-[#0f1419] flex flex-col">

      {/* Logo */}
      <div className="px-4 py-4 text-2xl font-bold text-white">Birdly</div>

      {/* Navigation */}
      <nav className="flex-1">
        <SidebarItem icon={<GraduationCap size={18} />} label="Learn" href="/learn" />
        <SidebarItem icon={<Headphones size={18} />} label="Practice" href="/practice" />
        <SidebarItem icon={<BookOpen size={18} />} label="Guild books" href="/books" />
        <SidebarItem icon={<FileText size={18} />} label="Cheats" href="/cheats" />
        <SidebarItem icon={<Medal size={18} />} label="LEADERBOARDS" href="/leaderboards" uppercase />
        <SidebarItem icon={<Code size={18} />} label="Playground" href="/playground" />

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
            <a href="/settings" className="block py-2 text-sm text-white hover:text-gray-300">
              Settings
            </a>
            <a href="/help" className="block py-2 text-sm text-white hover:text-gray-300">
              Help
            </a>
            <a href="/about" className="block py-2 text-sm text-white hover:text-gray-300">
              About
            </a>
          </div>
        )}
      </nav>
    </div>
  )
}
export default Sidebar