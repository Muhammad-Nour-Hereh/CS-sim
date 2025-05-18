import { Button } from '@/components/ui/Button'
import MyComponent from '../ui/MyComponent'
import { Progress } from '@/components/ui/Progress'
import { Input } from '@/components/ui/Input'
import { Separator } from '@/components/ui/Separator'
import { Circle } from '@/components/ui/Circle'
import AnswerList from '@/components/ui/AnswerList'
import Snippet from '@/components/ui/Snippet'
import Card from '../ui/Card'
// import Sidebar from '../components/Sidebar'
import AnswerFeedback from '../ui/AnswerFeedback'

const ComponentsPage = () => {
  return (
    // <div className="flex">
    //  <Sidebar />
    <div className="bg center flex flex-1 flex-col items-center gap-2 p-4">
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
      <AnswerFeedback
        variant="correct"
        subtitle="5 words"
        onContinue={() => console.log('Continue clicked')}
      />
    </div>
    // </div>
  )
}

export default ComponentsPage
