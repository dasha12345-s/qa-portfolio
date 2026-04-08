import signUpPage from "../../pages/SignUp";
import loginPage from "../../pages/LoginPage"

describe('SignUp page', () => {

        beforeEach(() => {
        cy.visit('/signup')
    })
    
    it('logo and all the field/links and button should be visible', () => {
            signUpPage.logo.should('be.visible')
            signUpPage.firstName.should('be.visible').and('have.attr','required')
            signUpPage.lastName.should('be.visible').and('have.attr','required')
            signUpPage.userName.should('be.visible').and('have.attr','required')
            signUpPage.password.should('be.visible').and('have.attr','required')
            signUpPage.confirmPassword.should('be.visible').and('have.attr','required')
            signUpPage.button.should('be.visible')
            signUpPage.signInLink.should('be.visible')
        })

    it('should signUp a new user and redirect to login page', () => {
       cy.signUp()
       cy.url().should('include', '/signin')
    })

    it('should log in as a new user and redirect to a home page', () => {
        cy.signUp()
        cy.get('@registeredUser').then(((username) => {
            loginPage.login(username,'password123')
        }))
        cy.get('[data-test="main"]').should('be.visible')
    })

    it('should throw an error if password and confirm password mismatched', () => {
        signUpPage.password.type('password123')
        signUpPage.confirmPassword.type('password')

        signUpPage.confirmPasswordError.should('be.visible')
    })
})

describe('SignUp page - error message', () => {
    it('should throw an error if the required field is empty', () => {
        signUpPage.visit();
        signUpPage.firstName.focus().blur();
         cy.get('#firstName-helper-text')
        .should('be.visible')
        .and('have.text', 'First Name is required');
    })
})