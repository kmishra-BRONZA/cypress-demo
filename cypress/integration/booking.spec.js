/// <reference types="cypress" />

context('Booking', () => {
    beforeEach(() => {
        cy.server();
        cy.route('/api/booking/search*', 'fixture:response-search.json').as('searchBookings');
        cy.visit('http://localhost:2000');
    })

    it('Should searching for Bookings using Hierarchy Filters', () => {
        cy.get('#filter-label-brands select').select('GAP');
        cy.get('#filter-label-channel ul').contains('.checkbox', 'Retail').find('.checkbox__input').check();
        cy.get('#filter-label-market ul').contains('.checkbox', 'United States - Retail').find('.checkbox__input').check();
        cy.get('#filter-label-division ul').contains('.checkbox', '1 112 - MENS').find('.checkbox__input').check();
        cy.get('#filter-label-department ul').contains('.checkbox', '1 112 1120 - MENS BOTTOMS').find('.checkbox__input').check();
        cy.get('#filter-label-class ul').contains('.checkbox', '1 112 1120 0 - BASICS').find('.checkbox__input').check();
        cy.get('#filter-label-subclass ul').contains('.checkbox', '1 112 1120 0 1 - PLAIN FR').find('.checkbox__input').check();
        cy.get('#filter-label-timeFrame select').first().select('Booking Period');
        cy.get('#filter-label-years select').select('2021');
        cy.get('#filter-label-period select').select('Summer');

        cy.get('.modal-footer__submit-btn').should('not.be.disabled');
        cy.get('.modal-footer__submit-btn').click();

        cy.wait('@searchBookings');

        cy.get('.ag-center-cols-container .ag-row').should('have.length', 2);
    })
})
