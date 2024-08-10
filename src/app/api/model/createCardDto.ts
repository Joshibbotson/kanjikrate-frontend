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


export interface CreateCardDto { 
    /**
     * Version key
     */
    __v: number;
    /**
     * The front text of the card
     */
    front: string;
    /**
     * The back text of the card
     */
    back: string;
    /**
     * The deckId the card belongs to
     */
    deck: object;
    /**
     * The date the card was last reviewed
     */
    lastReviewed?: string;
    /**
     * The interval (in days) before the card will be reviewed again
     */
    interval: number;
    /**
     * The number of times the card has been reviewed
     */
    repetitions: number;
    /**
     * The ease factor of the card, representing how easy it is to remember
     */
    easeFactor: number;
}

