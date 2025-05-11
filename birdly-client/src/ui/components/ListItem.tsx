interface props {
  children: string
}

const ListItem = ({ children, ...props }: props) => {
  return (
    <li
      className="bg-background flex h-14 items-center rounded-2xl border-2 p-4 text-xl font-semibold hover:brightness-110 active:brightness-90"
      {...props}>
      {children}
    </li>
  )
}

export default ListItem
