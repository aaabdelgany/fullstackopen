describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'abdu test',
        username: 'abdu',
        password: 'ifrah'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user) 
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('username');
      cy.contains('password');
    })

    describe('Login',function() {
      it('succeeds with correct credentials', function() {
        cy.get('#username').type('abdu');
        cy.get('#pw').type('ifrah');
        cy.get('#loginButton').click();
        cy.contains('logged in');
      })
  
      it('fails with wrong credentials', function() {
        cy.get('#username').type('hmm');
        cy.get('#pw').type('ifrah');
        cy.get('#loginButton').click();
        cy.contains('wrong username or password')
      })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({username:'abdu',password:'ifrah'})
    })
    it('a new blog can be created', function() {
      cy.contains('Create Blog').click();
      cy.get('#title').type('a test blog');
      cy.get('#author').type('cypress');
      cy.get('#url').type('fso');
      cy.get('#saveButton').click();
      cy.contains('cypress');
    })
    it('a new blog can be liked',function() {
      cy.contains('Create Blog').click();
      cy.get('#title').type('a test blog');
      cy.get('#author').type('cypress');
      cy.get('#url').type('fso');
      cy.get('#saveButton').click();
      cy.contains('View').click();
      cy.contains('Like').click();
      cy.contains('likes 1');
    })

    it('a blog can be deleted', function() {
      cy.contains('Create Blog').click();
      cy.get('#title').type('a test blog');
      cy.get('#author').type('asdasd');
      cy.get('#url').type('ugghghg');
      cy.get('#saveButton').click();
      cy.contains('View').click();
      cy.on('window:confirm', () => true);
      cy.contains('Delete Blog').click();
      cy.get('html').should('not.contain','a test blog by asdasd');
    })

    it('order of liked blogs', function() {
      const blog={
        title:'this is my test',
        author:'no',
        url: 'fso'
      }
      const blog2={
        title:'first blog',
        author:'not supposed to be at the bottom',
        url: 'fso'
      }
      cy.createBlog(blog2);
      cy.contains('View').click();
      cy.contains('Like').click();
      cy.contains('Like').click();
      cy.contains('Like').click();
      cy.createBlog(blog);
      cy.get('.blog').should('contain','first blog by not supposed to be at the bottom')
    })
  })
})