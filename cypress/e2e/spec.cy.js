// Basic functions test:
// 1: it Loads Properly OK
// 2: it can add a todo OK
// 3: it can add more than 1 todo OK
// 4: it can update a task OK
// 5: it can delete a task OK

describe('Metrobi Q7 Tester', () => {
  const task = 'Task to be done';
  const newTask = 'Another todo'
  const editTask = 'New task to be done';
  let LOCAL_STORAGE_MEMORY = {};

  Cypress.Commands.add("mSaveLocalStorage", () => {
    Object.keys(localStorage).forEach((key) => {
      LOCAL_STORAGE_MEMORY[key] = localStorage[key];
    });
  });

  Cypress.Commands.add("mRestoreLocalStorage", () => {
    Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
      localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
  });

  beforeEach(() => {
    cy.mRestoreLocalStorage()
    cy.visit('http://localhost:3000/react-todo-project');
  })

  afterEach(() => {
    cy.mSaveLocalStorage()
  })

  it('is loaded', () => {
    cy.contains('todos');
  })

  it('adds todo', () => {
    cy.get('input[name=title]').type(`${task}{enter}`)
  })

  it('adds new todo', () => {
    cy.get('div[class=inner]')
      .children('form')
      .children('input[name=title]').type(`${newTask}{enter}`)
    
    cy.get('ul')
      .should('have.length', 2)
      .children()
      .last()
      .should('have.text', newTask)
  })

  it('edits a todo', () => {
    cy.contains(task).dblclick()

    cy.get('ul')
      .children('li')
      .children('input[type=text]')
      .should('have.value', task)
      .first()
      .type('{selectall}{backspace}')
      .type(`${editTask}{enter}`)
      
  })

  it('deletes a todo', () => {
    const delTask = 'Task to be deleted';
    cy.get('input[name=title]').type(`${delTask}{enter}`)
    
    cy.contains('li', delTask).within(() => {
      cy.get('button')
        .find('svg')
        .click()
    })
      
  })
})

