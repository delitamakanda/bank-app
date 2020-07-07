
import AppDispatcher from '../dispatchers/main';
import AuthConstants from '../constants';
import 'core-js';
import BaseStore from './BaseStore';
import BankAPI from '../api/BankApi';
import jwt from 'jsonwebtoken';
import history from '../utils/history';

class AuthStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this.registerToActions.bind(this));

        this._user = null;
        this._jwt = null;
    }

    async registerToActions(action) {
        console.log(action);
        switch(action.actionType) {
            case AuthConstants.LOGIN_USER:
                const data = await BankAPI.login(action.username, action.password);
                const response = await data.json();

                if (data.ok !== false) {
                    console.log('Log in successfully');
                    
                    // Create token
                    const token = jwt.sign(response, AuthConstants.LOGIN_SECRET_KEY, {
                        expiresIn: 1440 // expires in 24 hours
                    });
                    
                    // Set token to localStorage to use for authenticated requests
                    localStorage.token = token;

                    // Set state
                    this._user = action.username;
                    this._jwt = token;

                    history.push('/dashboard');
                }

                this.emitChange();
                break;

            case AuthConstants.LOGOUT_USER:
                console.log('Store receives Logout action');

                delete localStorage.token;
                this._user = null;
                this._jwt = null;

                this.emitChange();
                break;
            case AuthConstants.SIGNUP_USER:
                console.log('Store receives signup action');

                const user = await BankAPI.signup(action.first_name, action.last_name, action.username, action.password, action.email);

                if (user.ok !== false) {
                    console.log('Signup successfully');

                    history.push('/login');

                }

                this.emitChange();
                break;

            default:
                break;
        };
    }

    // Get Method
    get user() { 
        return this._user;
    }

    get jwt() { 
        return this._jwt;
    }

    // Set Method
    set user(user) {
        this._user = user;
    }

    set jwt(jwt) {
        this._jwt = jwt;
    }

    // Check user logged in
    isLoggedIn() {
        if (typeof localStorage.token != 'undefined') {
            try {
                // eslint-disable-next-line
                const decoded = jwt.verify(localStorage.token, AuthConstants.LOGIN_SECRET_KEY);
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        }
        return false;
    }

    /* reduce(state, action) {
        switch (action.type) {
            case AuthConstants.CREATED_ACCOUNT:
                break;
            case AuthConstants.LOGIN_USER:
                break;

            case AuthConstants.SIGNUP_USER:
                break;

            case AuthConstants.CURRENT_USER:
                break;

            case AuthConstants.LOGOUT_USER:
                break;

            default:
                return state;
        }
    } */

    
}

export default new AuthStore(AppDispatcher);