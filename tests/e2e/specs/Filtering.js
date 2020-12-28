const SERVICE_NAME = 'e2e'
const SERVICE_OWNER_U1 = 'user1'
const SERVICE_OWNER_A = 'admin'
const SERVICE_DESCRIPTION = 'e2e test for service creation'

describe('Create test service 1', () => {
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
      .type('1' + SERVICE_NAME)
    cy.get('form[name="service"]')
      .find('select#owner')
      .select(SERVICE_OWNER_A)
    cy.get('form[name="service"]')
      .find('textarea#description')
      .type(SERVICE_DESCRIPTION)
  })

  it('Creates a new service', () => {
    cy.get('.service-modal')
      .find('button#create-update')
      .click()
  })
})

describe('Create test service 2', () => {
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
      .type('2' + SERVICE_NAME)
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
})

describe('Check if order changes', () => {
  it('Click on service name column header', () => {
    cy.visit('/')
    cy.get('table#service-list')
      .find('thead tr th:first')
      .click()
  })

  it('Checks new order', () => {
    let firstServiceIndex
    let secondServiceIndex

    cy.get('table#service-list')
      .find('tbody tr')
      .each(($row, rowIndex) => {
        cy.wrap($row)
          .find('td:first')
          .then($td => {
            if ($td.text().includes('1' + SERVICE_NAME)) {
              firstServiceIndex = rowIndex
            }
            if ($td.text().includes('2' + SERVICE_NAME)) {
              secondServiceIndex = rowIndex
            }
          })
      })
      .then(() => {
        expect(secondServiceIndex).to.be.lessThan(firstServiceIndex)
      })
  })
})

describe('Check if search filter results are correct', () => {
  it('types into search', () => {
    cy.visit('/')
    cy.get('input#search')
      .clear()
      .type('1' + SERVICE_NAME)

    cy.get('table#service-list')
      .find('tbody tr td:first')
      .should('contain', '1' + SERVICE_NAME)
  })

  it('changes owner', () => {
    cy.get('select#owner').select(SERVICE_OWNER_A)

    cy.get('table#service-list tbody tr').within(() => {
      cy.get('td')
        .eq(0)
        .should('contain', '1' + SERVICE_NAME)
      cy.get('td')
        .eq(1)
        .should('contain', SERVICE_OWNER_A)
    })
  })

  it('changes status', () => {
    cy.get('select#status').select('active')

    cy.get('table#service-list tbody tr').within(() => {
      cy.get('td')
        .eq(0)
        .should('contain', '1' + SERVICE_NAME)
      cy.get('td')
        .eq(1)
        .should('contain', SERVICE_OWNER_A)
      cy.get('td')
        .eq(4)
        .should('contain', 'Active')
    })
  })
})

describe('Delete services', () => {
  it('Finds test service 1 and clicks edit', done => {
    cy.visit('/')
    cy.get('table#service-list')
      .find('tbody tr')
      .each(($row, rowIndex, $list) => {
        cy.wrap($row)
          .find('td:first')
          .then($td => {
            if ($td.text().includes('1' + SERVICE_NAME)) {
              cy.wrap($list[rowIndex])
                .within(() => {
                  cy.get('td')
                    .eq(0)
                    .should('contain', '1' + SERVICE_NAME)
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

  it('Finds test service 2 and clicks edit', done => {
    cy.get('table#service-list')
      .find('tbody tr')
      .each(($row, rowIndex, $list) => {
        cy.wrap($row)
          .find('td:first')
          .then($td => {
            if ($td.text().includes('2' + SERVICE_NAME)) {
              cy.wrap($list[rowIndex])
                .within(() => {
                  cy.get('td')
                    .eq(0)
                    .should('contain', '2' + SERVICE_NAME)
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
})
