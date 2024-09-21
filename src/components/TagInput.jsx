import React, { useRef } from 'react'
import deleteIcon from '../assets/delete.svg'


// main component

const TagInput = ({ onChange, tagProposals }) => {
  const inputRef = useRef(null)

  const contentChanged = () => {
    const newValue = inputRef.current.innerText
    onChange?.(newValue)
  }


  // handlers

  const onTagDelete = (tagElement) => {
    tagElement.remove()
    contentChanged()
  }

  const onProposalClick = (tag) => {
    const tagElement = document.createElement('span')
    tagElement.className =
      'bg-gray-500 pl-2 pr-1 py-[1px] rounded-full text-white mx-1 whitespace-nowrap'
    tagElement.contentEditable = 'false'
    tagElement.innerHTML = `${tag} <button class="ml-1 mt-m02em bg-white rounded-full w-08em h-08em align-middle"><img class="m-1" src=${deleteIcon} alt="remove tag" /></button>`

    // add on tag delete event handler
    tagElement.querySelector('button').addEventListener('click', () => {
      onTagDelete(tagElement)
    })

    const selection = window.getSelection()
    // check if selection with min one range exists
    if (!selection.rangeCount) return
    const range = selection.getRangeAt(0)


    // replace range with tag

    // check if range is inside TagInput
    if ((range.startContainer.parentElement !== inputRef.current && range.startContainer !== inputRef.current) || (range.endContainer.parentElement !== inputRef.current && range.endContainer !== inputRef.current)) return

    // delete range content
    range.deleteContents()

    // add tag
    range.insertNode(tagElement)
    range.setStartAfter(tagElement)
    range.setEndAfter(tagElement)

    // add space after tag
    const spaceAfter = document.createTextNode(' ')
    range.insertNode(spaceAfter)
    range.setStartAfter(spaceAfter)
    range.setEndAfter(spaceAfter)

    // set focus to input
    inputRef.current.focus()

    contentChanged()
  }

  const onInputChange = () => {
    contentChanged()
  }
  

  // render
  return (
    <div className="p-4 w-full">
      {/* Input field */}
      <div
        className="border border-gray-300 p-3 rounded-xl w-full min-h-1/2 outline-none whitespace-pre-wrap"
        contentEditable="true"
        ref={inputRef}
        onInput={onInputChange}
      ></div>

      {/* Tag proposals */}
      <div className="mt-2">
        <div className="flex flex-wrap">
          {tagProposals.map((tag, index) => (
            <button
              key={index}
              onClick={() => onProposalClick(tag)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-500 px-2 py-1 m-1 rounded-md"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TagInput