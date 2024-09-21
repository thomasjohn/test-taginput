import TagInput from './components/TagInput'

function App() {
  const onTagInputChange = (newValue: string) => {
    console.log(newValue)
  }

  return (
    <>
      <div className='w-full'>
        <TagInput onChange={onTagInputChange} tagProposals={['React', 'Next.js', 'Tailwind', 'Java Script', 'CSS']} />
      </div>
    </>
  )
}

export default App
