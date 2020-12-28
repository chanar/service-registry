// https://docs.cypress.io/api/introduction/api.html

const SERVICE_NAME = 'e2e'
const SERVICE_OWNER_U1 = 'user1'
const SERVICE_OWNER_A = 'admin'
const SERVICE_DESCRIPTION = 'e2e test for service creation'

describe('Create service', () => {
  it('Visits page', () => {
    cy.visit('/')
    cy.contains('h1', 'Service registry')
  })

  it('Clicks on create service button', () => {
    cy.get('button#service-create-button').click()
    cy.get('#modal-headline').contains('h3', 'Create a service')
  })

  it('Fills service modal', () => {
    cy.get('form[name="service"]')
      .find('input#name')
      .type(SERVICE_NAME)
    cy.get('form[name="service"]')
      .find('select#owner')
      .select(SERVICE_OWNER_U1)
    cy.get('form[name="service"]')
      .find('textarea#description')
      .type(SERVICE_DESCRIPTION)
  })

  it('Sets service to inactive', () => {
    cy.get('form[name="service"]')
      .find('button#status')
      .click()
    cy.get('form[name="service"]')
      .find('label[for="status"]')
      .contains('(Inactive)')
  })

  it('Creates a new service', () => {
    cy.get('.service-modal')
      .find('button#create-update')
      .click()
  })

  it('Checks if services appeared in list', done => {
    cy.get('table#service-list')
      .find('tbody tr')
      .each(($row, rowIndex, $list) => {
        cy.wrap($row)
          .find('td:first')
          .then($td => {
            if ($td.text().includes(SERVICE_NAME)) {
              cy.wrap($list[rowIndex])
                .within(() => {
                  cy.get('td')
                    .eq(0)
                    .should('contain', SERVICE_NAME)
                  cy.get('td')
                    .eq(1)
                    .should('contain', SERVICE_OWNER_U1)
                  cy.get('td')
                    .eq(3)
                    .should('contain', SERVICE_DESCRIPTION)
                  cy.get('td')
                    .eq(4)
                    .should('contain', 'Inactive')
                })
                .then(() => {
                  done()
                })
            }
          })
      })
  })
})

describe('Update service', () => {
  it('Visits page', () => {
    cy.visit('/')
  })

  it('Finds service and clicks edit', done => {
    cy.get('table#service-list')
      .find('tbody tr')
      .each(($row, rowIndex, $list) => {
        cy.wrap($row)
          .find('td:first')
          .then($td => {
            if ($td.text().includes(SERVICE_NAME)) {
              cy.wrap($list[rowIndex])
                .within(() => {
                  cy.get('td')
                    .eq(0)
                    .should('contain', SERVICE_NAME)
                  cy.get('td')
                    .eq(1)
                    .should('contain', SERVICE_OWNER_U1)
                  cy.get('td')
                    .eq(3)
                    .should('contain', SERVICE_DESCRIPTION)
                  cy.get('td')
                    .eq(4)
                    .should('contain', 'Inactive')
                })
                .then(() => {
                  cy.wrap($list[rowIndex])
                    .find('a.edit-service')
                    .click()
                    .then(() => {
                      done()
                    })
                })
            }
          })
      })
  })

  it('Checks if input values are matching', () => {
    cy.get('form[name="service"]')
      .find('input#name')
      .should('have.value', SERVICE_NAME)
    cy.get('form[name="service"]')
      .find('select#owner')
      .should('have.value', SERVICE_OWNER_U1)
    cy.get('form[name="service"]')
      .find('textarea#description')
      .should('have.value', SERVICE_DESCRIPTION)
    cy.get('form[name="service"]')
      .find('label[for="status"]')
      .contains('(Inactive)')
  })

  it('Changes service name, owner, description', () => {
    cy.get('form[name="service"]')
      .find('input#name')
      .clear()
      .type('u: ' + SERVICE_NAME)
    cy.get('form[name="service"]')
      .find('select#owner')
      .select(SERVICE_OWNER_A)
    cy.get('form[name="service"]')
      .find('textarea#description')
      .clear()
      .type('u: ' + SERVICE_DESCRIPTION)
  })

  it('Sets service to active', () => {
    cy.get('form[name="service"]')
      .find('button#status')
      .click()
    cy.get('form[name="service"]')
      .find('label[for="status"]')
      .contains('(Active)')
  })

  it('Finds Update button and clicks', () => {
    cy.get('.service-modal')
      .find('button#create-update')
      .contains('Update')
      .click()
  })

  it('Checks if services was updated', done => {
    cy.get('table#service-list')
      .find('tbody tr')
      .each(($row, rowIndex, $list) => {
        cy.wrap($row)
          .find('td:first')
          .then($td => {
            if ($td.text().includes(SERVICE_NAME)) {
              cy.wrap($list[rowIndex])
                .within(() => {
                  cy.get('td')
                    .eq(0)
                    .should('contain', 'u: ' + SERVICE_NAME)
                  cy.get('td')
                    .eq(1)
                    .should('contain', SERVICE_OWNER_A)
                  cy.get('td')
                    .eq(3)
                    .should('contain', 'u: ' + SERVICE_DESCRIPTION)
                  cy.get('td')
                    .eq(4)
                    .should('contain', 'Active')
                })
                .then(() => {
                  done()
                })
            }
          })
      })
  })
})

describe('Delete service', () => {
  it('Visits page', () => {
    cy.visit('/')
  })

  it('Finds service and clicks edit', done => {
    cy.get('table#service-list')
      .find('tbody tr')
      .each(($row, rowIndex, $list) => {
        cy.wrap($row)
          .find('td:first')
          .then($td => {
            if ($td.text().includes(SERVICE_NAME)) {
              cy.wrap($list[rowIndex])
                .within(() => {
                  cy.get('td')
                    .eq(0)
                    .should('contain', 'u: ' + SERVICE_NAME)
                  cy.get('td')
                    .eq(1)
                    .should('contain', SERVICE_OWNER_A)
                  cy.get('td')
                    .eq(3)
                    .should('contain', 'u: ' + SERVICE_DESCRIPTION)
                  cy.get('td')
                    .eq(4)
                    .should('contain', 'Active')
                })
                .then(() => {
                  cy.wrap($list[rowIndex])
                    .find('a.edit-service')
                    .click()
                    .then(() => {
                      done()
                    })
                })
            }
          })
      })
  })

  it('Finds Delete button and clicks', () => {
    cy.get('.service-modal')
      .find('button#delete')
      .contains('Delete')
      .click()
  })

  it('Confirms that service was deleted', done => {
    cy.get('table#service-list').then($table => {
      if (!$table.find('tbody tr').length) {
        done()
      }
    })

    cy.get('table#service-list')
      .find('tbody tr')
      .each($el => {
        cy.wrap($el)
          .get('td')
          .eq(0)
          .then($el => {
            cy.wrap($el)
              .should('not.contain', 'u: ' + SERVICE_NAME)
              .then(() => {
                done()
              })
          })
      })
  })
})
