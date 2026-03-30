import {OfferType} from '../domain/dto/offer.ts';
import PlaceCard from './PlaceCard.tsx';

interface OffersListProps {
  offers: OfferType[];
  onFavoriteClick?: (offerId: string) => void;
  onCardMouseEnter?: (offerId: string) => void;
  onCardMouseLeave?: () => void;
  selectedCardId?: string;
}

function PlaceCardList({offers, onFavoriteClick, onCardMouseEnter, onCardMouseLeave, selectedCardId}: OffersListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => onCardMouseEnter?.(offer.id)}
          onMouseLeave={onCardMouseLeave}
          onFavoriteClick={onFavoriteClick}
          isSelected={selectedCardId === offer.id}
        />
      ))}
    </div>
  );
}

export default PlaceCardList;
