export * from './auth.service';
import { AuthService } from './auth.service';
export * from './card.service';
import { CardService } from './card.service';
export * from './deck.service';
import { DeckService } from './deck.service';
export * from './user.service';
import { UserService } from './user.service';
export const APIS = [AuthService, CardService, DeckService, UserService];
