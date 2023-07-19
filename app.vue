<!-- <script> -->
    const app = Vue.createApp({
        data() {
        return {
            navTitle: 'Vue Course',
            footerMessage: 'testdriven.io',
            users: [
                'user1',
                'employee17',
                'Bob',
                'Sara',
                'Garfield'
            ],
            usersTextColor: [
                'black',
                'black',
                'black',
                'blue',
                'black',
            ],
            displayUsers: true,
            newUser: '',
            displaySearch: false,
            searchName: ''
            }
        },
        methods: {
            changeDisplay() {
                this.displayUsers = !this.displayUsers
            },
            addNewUser(newUserInput) {
            if (newUserInput !== '') {
            // Add the user to the local array of users
            this.users.push(newUserInput)
            // Clear the value of the new user's name
            this.newUser = ''

            // Add the styling for the new user to highlight the new user only  
            for (var i = 0; i < this.usersTextColor.length; i++) {              
                this.usersTextColor[i] = 'black'                                  
            }                                                                   
            this.usersTextColor.push('darkgreen')             

            }
            },
            toggleSearch() {
                this.displaySearch = !this.displaySearch
            }
        },
        computed: {
            numberOfUsersText() {
                if (this.users.length == 1) {
                    return 'This is 1 user.'
                } else {
                    return 'Ther are ' + this.users.length + 'users.'
                }
            },
            searchResults() {
                if (this.searchName != '') {
                    return this.users.filter(el => el.match(this.searchName))
                } else {
                    return ''
                }
            },
            searchTextClass() {
                if (this.searchName != '') {
                return 'searchTitleBold';
                } else {
                return 'searchTitleNormal';
                }
            }
        }
    });

    app.component('app-header', {
    template: `
        <header>
            <div class="title">
                <h1>Header Component</h1>
            </div>
            <nav>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                    <li><button v-on:click="toggleSearch">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button></li>
                    </ul>
            </nav>
        </header>`
    })

    app.component('app-footer', {
    template: '<footer><h4>Footer Component</h4></footer>'
    })

    const mountedApp = app.mount('#vue-app')
<!-- </script> -->