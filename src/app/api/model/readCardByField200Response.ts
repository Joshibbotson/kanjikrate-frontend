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
import { Card } from './card';


export interface ReadCardByField200Response { 
    code?: number;
    success?: boolean;
    message?: string;
    data?: Array<Card>;
    totalCount?: number;
}

