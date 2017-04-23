import $ from 'jquery';
import cookie from 'react-cookie'

var currentUser = null;

module.exports = {
    login: function(username, pass, cb) {
        if (localStorage.token) {
            if (cb) cb(true)
            return
        }
        this.getToken(username, pass, (res) => {
            if (res.authenticated) {
                localStorage.token = res.token
                if (cb) cb(true)
            } else {
                if (cb) cb(false)
            }
        })
    },        
    
    logout: function() {
        var csrftoken = cookie.load('csrftoken');
        delete localStorage[csrftoken];
    },

    loggedIn: function() {
        var csrftoken = cookie.load('csrftoken');
        return localStorage[csrftoken];
    },

    getToken: function(username, pass, cb) {
        
        $.ajax({
            type: 'POST',
            url: '/polls/obtain-auth-token/',
            data: {
                username: username,
                password: pass
            },
            success: function(res){
                cb({
                    authenticated: true,
                    token: res.token
                })
            }
        })
    },

    setCurrentUser: function (user) {
        var csrftoken = cookie.load('csrftoken')

        if (csrftoken) {
            localStorage[csrftoken] = JSON.stringify(user);
        } else {
            console.error("no csrf token!!");
        }
    },

    getCurrentUser() {
        
        // Getting user from localstorage using csrf token
        var csrftoken = cookie.load('csrftoken');
        var user = JSON.parse(localStorage[csrftoken]);

        if (!user || user == "") {
            console.error("no user is stored");
        }

        return user;
    }
}