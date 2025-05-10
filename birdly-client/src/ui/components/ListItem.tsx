interface props {
    children: string
}

const ListItem = ({ children }: props) => {
  return <li>{children}</li>
}

export default ListItem
