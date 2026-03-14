import {useEffect, useState} from 'react';
import {OfferType} from '../mocks/OfferType.ts';
import {PlaceCard} from './PlaceCard.tsx';

interface OffersListProps {
  offers: OfferType[];
}

export function PlaceCardList({ offers }: OffersListProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  useEffect(() => {
  }, [activeCard]);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => setActiveCard(offer.id)}
          onMouseExit={() => setActiveCard(null)}
        />
      ))}
    </div>
  );
}
