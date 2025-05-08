import { Button } from "@/components/ui/button"
import MyComponent from "../components/MyComponent"

const ComponentsPage = () => {
    return (
        <div className="flex flex-col gap-2 bg-amber-200 p-4 center items-center">
            <MyComponent />
            <Button>Button</Button>
            <Button variant="outline">Button</Button>
            <Button variant="destructive">Button</Button>
            <Button variant="secondary">Button</Button>
            <Button variant="ghost">Button</Button>
            <Button variant="link">Button</Button>
        </div>
    )
}

export default ComponentsPage