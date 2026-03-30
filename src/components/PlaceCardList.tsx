import {useCallback} from 'react';
import {OfferType} from '../domain/dto/offer.ts';
import PlaceCard from './PlaceCard.tsx';

interface OffersListProps {
  offers: OfferType[];
}

export function PlaceCardList({offers}: OffersListProps): JSX.Element {
  const handleMouseEnter = useCallback(() => {
  }, []);

  const handleMouseLeave = useCallback(() => {
  }, []);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={handleMouseEnter}
          onMouseExit={handleMouseLeave}
        />
      ))}
    </div>
  );
}
