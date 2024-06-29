/**
 * Kanji Krate
 * Kanji Krate backend
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface CreateUserDto { 
    /**
     * Version key
     */
    __v: number;
    /**
     * Indicates if the user is active
     */
    active: boolean;
    /**
     * Google authentication user ID
     */
    googleUserId: string;
    /**
     * The email of the user
     */
    email?: string;
    /**
     * hashed password
     */
    password?: string;
    /**
     * The locale of the user
     */
    locale?: string;
    /**
     * The name of the user
     */
    name?: string;
    /**
     * The permissions of the user
     */
    permissions: Array<string>;
}
