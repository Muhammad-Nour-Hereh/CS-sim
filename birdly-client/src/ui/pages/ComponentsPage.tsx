import { Button } from '@/ui/components/Button'
import MyComponent from '../components/MyComponent'
import { Progress } from '@/ui/components/Progress'
import { Input } from '@/ui/components/Input'
import { Separator } from '@/ui/components/Separator'
import { Circle } from '@/ui/components/Circle'
import AnswerList from '@/ui/components/AnswerList'
import Snippet from '@/ui/components/Snippet'
import Card from '../components/Card'
import Sidebar from '../components/Sidebar'

const ComponentsPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="bg center flex flex-1 flex-col items-center gap-2 p-4 lg:ml-56">
        <MyComponent />

        <Button onClick={() => console.log('clicked')}>Button</Button>
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
        <AnswerList items={['First', 'Second', 'Theird']} />
        <Snippet />
        <Card variant="highlighted" />
      </div>
    </div>
  )
}

export default ComponentsPage
