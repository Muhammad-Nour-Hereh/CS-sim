import { Button } from "@/components/ui/button"
import MyComponent from "../components/MyComponent"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Circle } from "@/components/ui/circle"
import AnswerList from "@/components/ui/list"
import Snippet from "@/components/ui/snippet"

const ComponentsPage = () => {
    return (
        <div className="flex flex-col gap-2 bg p-4 center items-center">
            <MyComponent />
            <Button>Button</Button>
            <Button variant="outline">Button</Button>
            <Button variant="destructive">Button</Button>
            <Button variant="secondary">Button</Button>
            <Button variant="ghost">Button</Button>
            <Button variant="link">Button</Button>
            <Button variant="muted">Button</Button>
            <Progress value={30} />
            <Input placeholder="edit" />
            <Separator />
            <Circle>A</Circle>
            <AnswerList
                items={["First", "Second", "Theird"]}
            />
            <Snippet />
            
        </div>
    )
}

export default ComponentsPage