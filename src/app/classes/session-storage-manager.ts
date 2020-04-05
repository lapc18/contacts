import { UserDetails } from './../models/user-details';
import { Injectable } from '@angular/core';

const USER_NAME = "user_name";
const USER_LAST_NAME = "user_last_name";
const USER_EMAIL = "user_email";
const USER_PROFILE = "user_profile";
const USER_TOKEN = "user_token";

@Injectable({
    providedIn: 'root'
})
export class SessionStorageManager {
    clear() {
        sessionStorage.clear();
    }

    saveUserDetails(user: UserDetails): void {
        sessionStorage.setItem(USER_NAME, user.name);
        sessionStorage.setItem(USER_LAST_NAME, user.lastName);
        sessionStorage.setItem(USER_EMAIL, user.email);
        sessionStorage.setItem(USER_PROFILE, user.profile);
        sessionStorage.setItem(USER_TOKEN, user.tkn);
    }

    getCurrentUser(): UserDetails {
        return {
            name: sessionStorage.getItem(USER_NAME).toString(),
            lastName: sessionStorage.getItem(USER_LAST_NAME).toString(),
            email: sessionStorage.getItem(USER_EMAIL).toString(),
            profile: sessionStorage.getItem(USER_PROFILE).toString(),
            tkn: sessionStorage.getItem(USER_TOKEN).toString()
        };
    }

    getToken(): string {
        return sessionStorage.getItem(USER_TOKEN).toString();
    }

}
