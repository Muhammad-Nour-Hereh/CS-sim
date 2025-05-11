import { cn } from '@/lib/utils'

interface props {
  children: string
  isSelected?: boolean
}

const ListItem = ({ children, isSelected, ...props }: props) => {
  return (
    <li
      className={cn(
        'bg-selected flex h-14 items-center rounded-2xl border-2 p-4',
        'cursor-pointer text-xl font-semibold',
        'hover:brightness-110 active:brightness-90',
        isSelected ? 'border-slate-500' : '',
      )}
      {...props}>
      {children}
    </li>
  )
}

export default ListItem
