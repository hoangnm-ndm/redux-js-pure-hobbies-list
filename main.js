const { createStore } = window.Redux;

const initialState = JSON.parse(localStorage['hobby_list']) || []

const hobbyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_HOBBY':  {
      const newList = state;
      newList.push(action.payload)
      return newList
    }
    default:
      return state;
  }
  return state
}

const store = createStore(hobbyReducer)

const renderHobbiesList = (hobbies) => {
  if(!Array.isArray(hobbies) || hobbies.length === 0) return
  let ulElementId = document.querySelector('#ulElementId')
  if(!ulElementId) return
  ulElementId.innerHTML = ''
  for (const hobby of hobbies) {
    const liElement = document.createElement('li')
    liElement.textContent = hobby
    ulElementId.appendChild(liElement)
  }
}

const initialHobbiesList = store.getState()
renderHobbiesList(initialHobbiesList)

const hobbyFormId = document.querySelector('#hobbyFormId')
if(hobbyFormId) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const hobbyInputId = document.querySelector('#hobbyInputId')
    if(!hobbyInputId) return;
    const action = {
      type: 'ADD_HOBBY',
      payload: hobbyInputId.value,
    }
    store.dispatch(action)
    hobbyFormId.reset()
  }
  hobbyFormId.addEventListener('submit', handleFormSubmit)
}
store.subscribe(() => {
  renderHobbiesList(store.getState())
  // localStorage.setItem('hobby_list', JSON.stringify(store.getState()))
  localStorage['hobby_list'] = JSON.stringify(store.getState())
})