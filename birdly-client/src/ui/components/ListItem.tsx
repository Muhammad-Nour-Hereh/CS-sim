import { cn } from '@/lib/utils'
import { useState, useRef, useEffect } from 'react'
import IconButton from './IconButton'
import { Trash2 } from 'lucide-react'

interface Props extends React.HTMLAttributes<HTMLLIElement> {
  children: string
  isSelected?: boolean
  onValueChange?: (newValue: string) => void
  onDelete?: Function
}

const ListItem = ({
  children,
  isSelected,
  onValueChange,
  onDelete,
  ...props
}: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(children)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleDoubleClick = () => setIsEditing(true)

  const handleBlur = () => {
    setIsEditing(false)
    onValueChange?.(value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur()
    }
  }

  return (
    <li
      onDoubleClick={handleDoubleClick}
      className={cn(
        'bg-selected flex h-14 items-center justify-between rounded-2xl border-2 p-4',
        'cursor-pointer text-xl font-semibold',
        'hover:brightness-110 active:brightness-90',
        isSelected ? 'border-slate-500' : '',
      )}
      {...props}>
      {isEditing ? (
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent outline-none"
        />
      ) : (
        <>
          {value}
          <IconButton className="text-destructive" onClick={onDelete}>
            <Trash2 />
          </IconButton>
        </>
      )}
    </li>
  )
}

export default ListItem
