class SideBarMenu{
    get fullName(){ return cy.get('[data-test="sidenav-user-full-name"]')}
    get userName(){return cy.get('[data-test="sidenav-username"]')}
    get homeButton(){return cy.get('[data-test="sidenav-home"]')}
    get myAccountButton(){return cy.get('[data-test="sidenav-user-settings"]')}
    get notificationsButton(){return cy.get('[data-test="sidenav-notifications"]')}
    get logoutButton() {return cy.get('[data-test="sidenav-signout"]')}

     visit(){
        cy.visit('/')
    }

    logout(){
        this.logoutButton.click()
    }
}

export default new SideBarMenu()