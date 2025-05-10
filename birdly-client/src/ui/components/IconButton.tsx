import { isValidElement, ReactElement } from "react"

interface IconButtonProps {
    children: ReactElement
}

const IconButton = ({ children }: IconButtonProps) => {
    let iconName = "icon"

    if (isValidElement(children) && typeof children.type === "function") {
        iconName = children.type.name ?? "icon"
    }

    return (
        <button
            className="size-8 flex items-center justify-center text-border rounded-md 
                 filter hover:brightness-140 active:brightness-90 transition"
            aria-label={iconName}
        >
            {children}
        </button>
    )
}

export default IconButton
